import { request } from '@/axios'

export const authLogin = async (req: LoginReq) => {
  return request<BaseDataResp<LoginResp>>({
    url: `/auth/login`,
    method: 'post',
    data: req,
  })
}

export const getProfile = async () => {
  return request<BaseDataResp<userInfo>>({
    url: `/auth/profile`,
    needAuth: true,
    method: 'get',
  })
}
