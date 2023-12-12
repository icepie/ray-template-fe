import { t } from '@/hooks/web'
import type { AppRouteRecordRaw } from '@/router/type'

const userManage: AppRouteRecordRaw = {
  path: '/user/manage',
  name: 'UserManage',
  component: () => import('@/views/user/manage/index'),
  meta: {
    i18nKey: t('menu.UserManage'),
    icon: 'other',
    role: ['admin'],
  },
}

export default userManage
