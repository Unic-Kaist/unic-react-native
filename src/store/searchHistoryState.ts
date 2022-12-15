import { selector } from 'recoil'
import { getStorageState, storageState } from './common'

export const searchHistoryState = selector<string[]>({
  key: 'search-history',
  get: ({ get }) => getStorageState(get, 'search-history') ?? [],
  set: ({ set }, value) =>
    set(storageState('search-history'), JSON.stringify(value)),
})
