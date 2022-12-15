import { Response } from './Response'
import { requester } from './requester'

export async function fetchCollection(collectionId: string) {
  try {
    const res = await requester.get<Response<any>>(
      `query_collection/${collectionId}`,
    )
    return res.data.data
  } catch (e) {
    console.error(JSON.stringify(e.response))
    throw e
  }
}
