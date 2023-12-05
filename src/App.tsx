import { RouterView } from 'vue-router'
import AppNaiveGlobalProvider from '@/app-components/provider/AppNaiveGlobalProvider'
import AppStyleProvider from '@/app-components/provider/AppStyleProvider'
import AppLockScreen from '@/app-components/app/AppLockScreen'
import AppWatermarkProvider from '@/app-components/provider/AppWatermarkProvider'
import AppGlobalSpin from '@/spin'
import { getStorage } from '@/utils/cache'
import { APP_CATCH_KEY } from './app-config/appConfig'

export default defineComponent({
  name: 'App',
  render() {
    return (
      <AppNaiveGlobalProvider>
        <AppLockScreen />
        <AppStyleProvider />
        <AppWatermarkProvider />
        <AppGlobalSpin>
          {{
            default: () => <RouterView />,
            description: () => 'loading...',
          }}
        </AppGlobalSpin>
      </AppNaiveGlobalProvider>
    )
  },
})
