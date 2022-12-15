import { Response } from './Response'
import { requester } from './requester'

export interface IUser {
  creatorAddress: string
  chain: string
}

export async function fetchUser(user: IUser) {
  try {
    const res = await requester.get<Response<any>>(
      `query_user_by_wallet_address/${user.creatorAddress}/${user.chain}`,
    )
    return res.data.data
  } catch (e) {
    console.error('eroror', JSON.stringify(e.response))
    throw e
  }
}
