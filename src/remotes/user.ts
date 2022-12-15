import { Response } from './Response'
import { instance } from './requester'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user/userState'

export interface IUser {
  accessToken?: string
  refreshToken?: string
  userId?: string
  userTag?: string
  description?: string
  profilePhoto?: string
  coverPhoto?: string
}

export async function saveUser(user: IUser) {
  try {
    const res = await instance.post<Response<any>>(
      'save_user?API_KEY=2FXckCAsPXkvmdyN',
      {
        data: user,
        userId: user.userId,
        accessToken: user.accessToken,
      },
    )
    return res.data.data
  } catch (e) {
    console.error('error', e)
    throw e
  }
}

export async function queryUserById(userId: string) {
  try {
    const { data } = await instance.get(`query_user/${userId}`)
    if (data.success) {
      data.data.socialLinks = JSON.parse(data.data.socialLinks)
      return data.data
    } else {
      throw Error('server message error')
    }
  } catch (err) {
    console.log('failed queryUserById: ', err)
    throw Error()
  }
}
