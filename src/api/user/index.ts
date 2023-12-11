import { request } from '@/axios'

export const GetUserList = async (req: GetUserListReq) => {
  return request<BaseListResp<User>>({
    url: `/user/list`,
    needAuth: true,
    method: 'post',
    data: req,
  })
}
