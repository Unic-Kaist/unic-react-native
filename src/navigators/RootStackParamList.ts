import { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  Main: undefined
  NFTGroup: ({ name: string } | { category: string }) & { title?: string }
  ScannerDetail: undefined
  Search: undefined
  Scanner: undefined
  Permission: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>
