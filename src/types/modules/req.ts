type LoginReq = {
  username: string
  password: string
}

type LoginResp = {
  token: string
  userInfo: userInfo
}

type userInfo = {
  name: string
  avatar: string
  role: 'admin' | 'user'
  username: string
}

type GetUserListReq = {
  page: number
  pageSize: number
  search?: string
}

type User = {
  id: number
  username: string
  name: string
  role: string
  avatar: string
  createdAt: Date
  updatedAt: Date
}

type ListResp<T> = {
  list: T[]
  total: number
}

// type BaseListResp<T> & BaseResp = {
//   data: ListResp<T>
// }

type BaseListResp<T> = {
  data: ListResp<T>
} & BaseResp

type BaseDataResp<T> = {
  code: number
  message: string
  data: T
}

type BaseResp = {
  code: number
  message: string
}
