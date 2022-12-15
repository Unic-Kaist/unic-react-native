import { DefaultValue, atom } from 'recoil'

import AsyncStorage from '@react-native-async-storage/async-storage'

const localForageEffect =
  (key: string) =>
  ({ setSelf, onSet }) => {
    setSelf(
      AsyncStorage.getItem(key).then(
        savedValue =>
          savedValue != null ? JSON.parse(savedValue) : new DefaultValue(), // Abort initialization if no value was stored
      ),
    )

    // Subscribe to state changes and persist them to localForage
    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? AsyncStorage.removeItem(key)
        : AsyncStorage.setItem(key, JSON.stringify(newValue))
    })
  }

export const userState = atom({
  key: 'userState',
  default: {},
  effects: [localForageEffect('current_user')],
})
