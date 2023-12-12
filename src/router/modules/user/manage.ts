import { t } from '@/hooks/web'
import type { AppRouteRecordRaw } from '@/router/type'

const userManage: AppRouteRecordRaw = {
  path: '/user/manage',
  name: 'UserManage',
  component: () => import('@/views/user/manage/index'),
  meta: {
    i18nKey: t('menu.UserManage'),
    icon: 'other',
    order: 991,
    role: ['user'],
    // keepAlive: true,
    // hidden: true,
  },
}

export default userManage
