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
  NGrid,
  NText,
  NForm,
} from 'naive-ui'
import {
  RCollapseGrid,
  RTable,
  RIcon,
  RMoreDropdown,
  RModal,
} from '@/components'

import type { DataTableColumns } from 'naive-ui'
import { NFormItem } from 'naive-ui'
import { GetUserList } from '@/api/user'
import CreateUser from './components/CreateUser'

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
  setup() {
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

    const paginationRef = reactive({
      page: 1,
      pageSize: 10,
      itemCount: 0,
      pageSizes: [10, 20, 30, 40, 50],
      showSizePicker: true,
      onUpdatePage: (page: number) => {
        paginationRef.page = page

        refreshUserList()
      },
      onUpdatePageSize: (pageSize: number) => {
        paginationRef.pageSize = pageSize
        paginationRef.page = 1

        refreshUserList()
      },
    })

    const tableData = ref<User[]>([])

    const userListData = ref<ListResp<User> | null>(null)

    watchEffect(() => {
      if (userListData.value) {
        paginationRef.itemCount = userListData.value.total
      }
    })

    onMounted(() => {
      refreshUserList()
    })

    const refreshUserList = async () => {
      try {
        const resp = await GetUserList({
          page: paginationRef.page,
          pageSize: paginationRef.pageSize,
        })
        tableData.value = resp.data.list
        userListData.value = resp.data

        console.log(resp)
        console.log(tableData.value)
      } catch (error: unknown) {
        window.$message.error((error as BaseResp).message)
      }
    }

    const modal2 = ref(false)

    // 新增
    const handleAdd = () => {
      window.$message.info('新增')
      modal2.value = true
    }

    const onSubmit = (data) => {
      console.log('asdd', data)
    }

    const onCancel = () => {
      window.$message.info('取消')
      modal2.value = false
    }

    return {
      ...toRefs(state),
      tableData,
      onSubmit,
      paginationRef,
      actionColumns,
      baseColumns,
      tableMenuOptions,
      handleMenuSelect,
      handleAdd,
      modal2,
      onCancel,
    }
  },
  render() {
    return (
      <NSpace wrapItem={false} vertical>
        <RModal v-model:show={this.modal2} preset="card" title="新建用户">
          <CreateUser onCancel={this.onCancel} />
        </RModal>
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
              {/* <span>标题插槽:</span> */}
              {/* <NSwitch
                onUpdateValue={(value: boolean) => (this.tableLoading = value)}
              ></NSwitch> */}
              <NButton type="primary" onClick={this.handleAdd}>
                新增
              </NButton>
              <NButton>导出</NButton>
            </NSpace>
          }
          data={this.tableData}
          pagination={this.paginationRef}
          v-model:columns={this.actionColumns}
          remote
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
        ></RTable>
      </NSpace>
    )
  },
})

export default UserManage
