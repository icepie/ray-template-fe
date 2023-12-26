import { t } from '@/hooks/web'
import type { AppRouteRecordRaw } from '@/router/type'

const UserManage: AppRouteRecordRaw = {
  path: '/manage',
  name: 'UserManage',
  component: () => import('@/views/user/manage/index'),
  meta: {
    i18nKey: t('menu.UserManage'),
    icon: 'other',
    role: ['admin'],
    keepAlive: true,
  },
}

export default UserManage
