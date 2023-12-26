import { t } from '@/hooks/web'
import { LAYOUT } from '@/router/constant'

import type { AppRouteRecordRaw } from '@/router/type'

const epaper: AppRouteRecordRaw = {
  path: '/epaper',
  name: 'Epaper',
  component: LAYOUT,
  meta: {
    i18nKey: '墨水屏管理',
    icon: 'other',
    order: 4,
  },
  children: [
    {
      path: 'editor',
      name: 'Editor',
      component: () => import('@/views/epaper/editor/index'),
      meta: {
        noLocalTitle: '编辑器',
        keepAlive: true,
      },
    },
  ],
}

export default epaper
