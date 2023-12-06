import { APP_CATCH_KEY } from '@/app-config/appConfig'
import { getStorage, removeStorage } from '@/utils/cache'

export const piniaUserInfoStore = defineStore(
  'userInfo',
  () => {
    const state = reactive({
      userInfo: {} as userInfo,
      token: getStorage<string>(APP_CATCH_KEY.token, 'localStorage') || '',
    })

    const setUserInfo = (userInfo: userInfo) => {
      state.userInfo = userInfo
    }

    const setToken = (token: string) => {
      state.token = token
    }

    const logout = () => {
      state.token = ''

      state.userInfo = {} as userInfo

      window.$message.info('账号退出中...')

      removeStorage('all-sessionStorage')
      removeStorage('all-localStorage')

      setTimeout(() => window.location.reload())
    }

    // const getUserInfo = computed(() => state.userInfo)

    return {
      state,
      setUserInfo,
      setToken,
      logout,
      //   setUserInfo,
      //   getUserInfo,
    }
  },
  {
    persist: {
      key: 'piniaUserInfoStore',
      paths: ['userInfo', 'token'],
      storage: sessionStorage,
    },
  },
)
