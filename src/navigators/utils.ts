import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native'

import { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  Home: undefined
  Scanner: undefined
  ScannerDetail: undefined
  Main: undefined
  NFTGroup: ({ name: string } | { category: string }) & { title?: string }
  Search: undefined
  Profile: undefined
  SignUp: undefined
  SignIn: undefined
  ForgetPassword: { email: string }
  CreatePassword: undefined
  ChangePassword: { email: string }
  MyProfile: undefined
  ConfirmEmail: {
    email: string
  }
  Setting: undefined
  Permission: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export function navigateAndSimpleReset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}

export function navigateGoBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack()
  }
}
