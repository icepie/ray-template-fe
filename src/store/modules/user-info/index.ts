import { getProfile } from '@/api/auth/login'
import { APP_CATCH_KEY } from '@/app-config/appConfig'
import { getStorage, removeStorage } from '@/utils/cache'
import { isEmpty } from 'lodash-es'
import { useTimeout } from '@vueuse/core'

export const piniaUserInfoStore = defineStore(
  'userInfo',
  () => {
    // const token =

    const state = reactive({
      userInfo:
        getStorage<userInfo>(APP_CATCH_KEY.userInfo, 'localStorage') ||
        ({} as userInfo),
      token: getStorage<string>(APP_CATCH_KEY.token, 'localStorage') || '',
    })

    const refreshUserInfo = async () => {
      if (isEmpty(state.token)) {
        return
      }

      try {
        const { data, code, message } = await getProfile()
        if (code === 0) {
          setUserInfo(data)
        } else {
          window.$message.error(message)
          setTimeout(() => logout(), 2000)
        }
      } catch (error) {
        window.$message.error((error as BaseResp).message)
        setTimeout(() => logout(), 2000)
        return
      }
    }

    const setUserInfo = (userInfo: userInfo) => {
      state.userInfo = userInfo
    }

    const setToken = (token: string) => {
      state.token = token
    }

    const logout = () => {
      state.token = ''

      state.userInfo = {} as userInfo

      // s.reset()

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
      refreshUserInfo,
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
