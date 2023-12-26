/**
 *
 * @author Ray <https://github.com/XiaoDaiGua-Ray>
 *
 * @date 2023-10-05
 *
 * @workspace ray-template
 *
 * @remark 今天也是元气满满撸代码的一天
 */

import { NPopover } from 'naive-ui'
import { RIcon } from '@/components'

import config from '../config'
import props from '../props'
import { print } from '@/utils/basic'

import type { TableProvider } from '../type'

export default defineComponent({
  name: 'TablePrint',
  props,
  setup(props) {
    const { wrapperRef } = inject<TableProvider>(
      config.tableKey,
      {} as TableProvider,
    )

    const printTableClick = () => {
      const { printTableOptions } = props
      const { type = 'html', printOptions = {} } = printTableOptions ?? {}

      if (
        printOptions.documentTitle === '' ||
        printOptions.documentTitle === void 0 ||
        printOptions.documentTitle === null
      ) {
        printOptions.documentTitle = typeof title === 'string' ? title : ''
      }

      printDom(wrapperRef, {
        printOptions,
        domToImageOptions,
      })

      print(document.getElementById(uuidTable), options)
    }

    return {
      printTableClick,
    }
  },
  render() {
    return (
      <NPopover showArrow={false}>
        {{
          trigger: () => (
            <RIcon
              name="print"
              size={config.tableIconSize}
              cursor="pointer"
              onClick={this.printTableClick.bind(this)}
            />
          ),
          default: () => '打印表格',
        }}
      </NPopover>
    )
  },
})
