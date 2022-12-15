import { fetchNewsFeed } from '@/remotes/fetchNewsFeed'
import { useQuery } from 'react-query'

export function useNewsFeed(category: string) {
  return useQuery(['news-feed', category], () => fetchNewsFeed(category))
}
