import type { GlobalThemeOverrides } from 'naive-ui'
import type { Placement } from '@/types/modules/component'

export interface SettingState {
  drawerPlacement: Placement
  primaryColorOverride: GlobalThemeOverrides
  themeValue: boolean
  reloadRouteSwitch: boolean
  menuTagSwitch: boolean
  spinSwitch: boolean
  breadcrumbSwitch: boolean
  localeLanguage: string
  lockScreenSwitch: boolean
  lockScreenInputSwitch: boolean
  watermarkSwitch: boolean
  footerSwitch: boolean
  contentTransition: string
}
