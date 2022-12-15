import { FeedNFT } from '../types/FeedNFT'
import { Response } from './Response'
import { requester } from './requester'

export async function fetchNFTInfo(dotId: string) {
  try {
    const res = await requester.get<Response<any>>(
      `query_nft_by_dot_id/${dotId}`,
    )
    return res.data.data
  } catch (e) {
    console.error(JSON.stringify(e.response))
    throw e
  }
}
