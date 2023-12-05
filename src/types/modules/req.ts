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

type BaseDataResp<T> = {
  code: number
  message: string
  data: T
}

type BaseResp = {
  code: number
  message: string
}
