import { piniaUserInfoStore } from '../modules/user-info'

export const useUserInfoGetters = () => {
  const variable = piniaUserInfoStore()

  /**
   *
   * @remark 获取用户信息
   */

  const getUserInfo = computed(() => variable.state.userInfo)

  const getToken = computed(() => variable.state.token)

  return {
    getUserInfo,
    getToken,
  }
}

export const useUserInfoActions = () => {
  const { setUserInfo, setToken, logout } = piniaUserInfoStore()

  return {
    setUserInfo,
    setToken,
    logout,
  }
}
