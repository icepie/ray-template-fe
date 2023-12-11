/**
 *
 * @author Ray <https://github.com/XiaoDaiGua-Ray>
 *
 * @date 2022-12-08
 *
 * @workspace ray-template
 *
 * @remark 今天也是元气满满撸代码的一天
 */

import {
  NTag,
  NButton,
  NGridItem,
  NSelect,
  NInput,
  NDatePicker,
  NSwitch,
  NSpace,
  NPopover,
  NCard,
} from 'naive-ui'
import { RCollapseGrid, RTable, RIcon, RMoreDropdown } from '@/components'

import type { DataTableColumns } from 'naive-ui'
import { GetUserList } from '@/api/user'

type RowData = {
  id: number
  name: string
  username: string
  avatar: string
  role: string
  updatedAt: string
  createdAt: string
}

const UserManage = defineComponent({
  name: 'UserManage',
  async setup() {
    const baseColumns = [
      {
        title: 'ID',
        key: 'id',
        width: 50,
        resizable: true,
        maxWidth: 100,
        minWidth: 50,
      },
      {
        title: '创建时间',
        key: 'createdAt',
        width: 300,
        resizable: true,
        maxWidth: 400,
        minWidth: 300,
      },
      {
        title: '更新时间',
        key: 'updatedAt',
        width: 300,
        resizable: true,
        maxWidth: 400,
        minWidth: 300,
      },
      {
        title: '用户名',
        key: 'username',
        resizable: true,
        width: 120,
        maxWidth: 300,
        minWidth: 100,
      },
      {
        title: '角色',
        key: 'role',
        render: (row: RowData) => {
          //   const tags = row.tags.map((tagKey) => {
          //     return (
          //       <NTag type="info" bordered={false} style="margin-right: 6px">
          //         {tagKey}
          //       </NTag>
          //     )
          //   })
          //   return tags
          // 单个

          const tag = (
            <NTag type="info" bordered={false} style="margin-right: 6px">
              {row.role}
            </NTag>
          )
          return tag
        },
        width: 120,
        maxWidth: 300,
        minWidth: 100,
      },
      {
        title: '名称',
        key: 'name',
        width: 120,
        maxWidth: 300,
        minWidth: 100,
      },
      {
        title: '头像',
        key: 'avatar',
        width: 120,
        maxWidth: 300,
        minWidth: 100,
      },

      {
        title: 'Action',
        key: 'actions',
        render: (row: RowData) => (
          <NSpace wrapItem={false} align="center">
            <NButton size="tiny">查看</NButton>
            <RMoreDropdown
              options={[
                {
                  label: '编辑',
                  key: 'edit',
                },
                {
                  label: '新增',
                  key: 'add',
                },
              ]}
              onSelect={(key) => {
                window.$message.info(`当前选择: ${key}`)
              }}
            />
          </NSpace>
        ),
      },
    ]
    const actionColumns = ref<DataTableColumns<RowData>>(
      [...baseColumns].map((curr) => ({ ...curr, width: 400 })),
    )

    const tableMenuOptions = [
      {
        label: '编辑',
        key: 'edit',
      },
      {
        label: () => <span style="color: red;">删除</span>,
        key: 'delete',
      },
    ]
    const state = reactive({
      gridItemCount: 4,
      gridCollapsedRows: 1,
      tableLoading: false,
    })

    const handleMenuSelect = (key: string | number) => {
      window.$message.info(`${key}`)
    }

    const tableData = ref<User[]>([])

    const userList = ref<User[]>([])

    const GetUserListReq = ref<GetUserListReq>({
      page: 1,
      pageSize: 10,
    })

    const refreshUserList = async () => {
      try {
        const resp = await GetUserList(GetUserListReq.value)
        tableData.value = resp.data.list

        console.log(resp)
        console.log(tableData.value)
      } catch (error: unknown) {
        window.$message.error((error as BaseResp).message)
      }
    }

    onMounted(() => {
      refreshUserList()
      //   window.$message.info('我是 UserManage 页面的 mounted 钩子函数')
    })

    return {
      ...toRefs(state),
      tableData,
      actionColumns,
      baseColumns,
      tableMenuOptions,
      handleMenuSelect,
    }
  },
  render() {
    return (
      <NSpace wrapItem={false} vertical>
        <RCollapseGrid
          bordered={false}
          collapsedRows={this.gridCollapsedRows}
          cols={this.gridItemCount}
          onUpdateValue={(value: boolean) =>
            window.$message.info(
              `我是 RCollapseGrid 组件${value ? '收起' : '展开'}的回调函数`,
            )
          }
        >
          {{
            action: () => (
              <>
                <NButton type="primary">搜索</NButton>
                <NButton>重置</NButton>
              </>
            ),
            default: () => (
              <>
                <NGridItem>
                  <NSelect />
                </NGridItem>
                <NGridItem>
                  <NInput />
                </NGridItem>
                <NGridItem>
                  <NDatePicker type="datetimerange" clearable />
                </NGridItem>
                <NGridItem>
                  <NInput />
                </NGridItem>
                <NGridItem>
                  <NInput />
                </NGridItem>
              </>
            ),
          }}
        </RCollapseGrid>
        <RTable
          style="margin-top: 18px"
          scrollX={2000}
          title={
            <NSpace align="center">
              <span>标题插槽:</span>
              <NSwitch
                onUpdateValue={(value: boolean) => (this.tableLoading = value)}
              ></NSwitch>
            </NSpace>
          }
          data={this.tableData}
          v-model:columns={this.actionColumns}
          pagination={{
            pageSize: 10,
          }}
          contextMenuOptions={this.tableMenuOptions}
          loading={this.tableLoading}
          onContextMenuClick={this.handleMenuSelect.bind(this)}
          toolOptions={[
            <NPopover>
              {{
                trigger: () => (
                  <RIcon
                    name="search"
                    size="18"
                    cursor="pointer"
                    onClick={() => {
                      window.$message.info('点击了搜索按钮')
                    }}
                  />
                ),
                default: () => '我是自定义工具栏示例',
              }}
            </NPopover>,
          ]}
        >
          {{
            tableFooter: () => '表格的底部内容区域插槽，有时候你可能会用上',
            tableAction: () => '表格的操作区域内容插槽，有时候可能会用上',
          }}
        </RTable>
      </NSpace>
    )
  },
})

export default UserManage
