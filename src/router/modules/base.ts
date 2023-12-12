import { t } from '@/hooks/web'
import type { AppRouteRecordRaw } from '@/router/type'

const profile: AppRouteRecordRaw = {
  path: '/profile',
  name: 'BaseProfile',
  component: () => import('@/views/base/profile/index'),
  meta: {
    i18nKey: t('menu.Profile'),
    // icon: 'profile',
    hidden: true,
  },
}

export default profile
