import { t } from '@/hooks/web'
import { LAYOUT } from '@/router/constant'

import type { AppRouteRecordRaw } from '@/router/type'

const echart: AppRouteRecordRaw = {
  path: '/echart',
  name: 'REchart',
  component: () => import('@/views/demo/echart/index'),
  meta: {
    i18nKey: t('menu.Echart'),
    icon: 'echart',
    order: 1,
  },
}

export default echart
