import 'react-native-gesture-handler'
import './translations'

import { QueryClient, QueryClientProvider } from 'react-query'
import React, { Suspense } from 'react'
import { persistor, store } from '@/store'

import { Amplify } from 'aws-amplify'
import ApplicationNavigator from '@/navigators/Application'
import { AxiosInterceptor } from './remotes/requester'
import GlobalModal from './components/modal/GlobalModal'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { Linking } from 'react-native'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import React from 'react'
import { RecoilRoot } from 'recoil'
import awsconfig from './aws-exports'
import { withSuspense } from '@/hocs/withSuspense'

async function urlOpener(url: string | string[], redirectUrl: string) {
  if (await InAppBrowser.isAvailable()) {
    if (!url.includes('logout')) {
      const { type, url: newUrl } = await InAppBrowser.openAuth(
        url,
        redirectUrl,
        {
          modalEnabled: false,
          showTitle: false,
          enableUrlBarHiding: false,
          enableDefaultShare: false,
          ephemeralWebSession: false,
        },
      )
      if (type === 'success') {
        Linking.openURL(newUrl)
      }
    }
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
})

const client = new QueryClient({
  defaultOptions: {
    queries: { refetchOnReconnect: false, refetchOnMount: false },
  },
})

const App = withSuspense(function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AxiosInterceptor>
              <GlobalModal />
              <ApplicationNavigator />
            </AxiosInterceptor>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </RecoilRoot>
  )
})

export default App
