import { searchHistoryState } from '@/store/searchHistoryState'
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

export function useSearchHistory() {
  const [data, update] = useRecoilState(searchHistoryState)
  const add = useCallback((item: string) => {
    update(prev => (prev.includes(item) ? prev : [...prev, item]))
  }, [])
  const remove = useCallback((item: string) => {
    update(prev => prev.filter(i => i !== item))
  }, [])
  return { data, add, remove }
}
