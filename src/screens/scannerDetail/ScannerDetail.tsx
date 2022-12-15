import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppHeader } from '@/components/AppHeader'
import React from 'react'
import { navigateGoBack } from '@/navigators/utils'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'

const ScannerDetail = ({ route }) => {
  const { t } = useTranslation()
  const { Layout, Common } = useTheme()

  const onPress = () => {
    route.params.onReturn({ isFlashOn: route.params.isFlashOn })
    navigateGoBack()
  }

  return (
    <View
      style={[
        Layout.fill,
        {
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <AppHeader title="ScannerDetail" back={true} onPressBack={onPress} />
      <ScrollView style={Layout.fill}>
        <Image
          style={{ width: '100%', height: 500 }}
          source={{ uri: route.params.nftData?.imageURL }}
        />
        <View
          style={[
            Common.container.base,
            { flexDirection: 'row', alignItems: 'center', marginTop: 22 },
          ]}
        >
          <Image
            style={styles.profileIcon}
            source={{ uri: route.params.userData?.profilePhoto }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#000000' }}>
              {`created by ${route.params.userData?.userTag}`}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#888888' }}>
              {`${route.params.nftData?.creatorAddress}`}
            </Text>
          </View>
        </View>
        <View style={styles.contentLine} />
        <View style={[Common.container.base, { flexDirection: 'row' }]}>
          <View style={{ flex: 1 }}>
            <Text
              style={styles.contentHeading}
            >{`${route.params.nftData?.name}`}</Text>
            <Text style={styles.contentDescription}>
              {`${route.params.nftData.description}`}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#AAAAAA',
                marginTop: 10,
              }}
            >
              {'3 minutes ago'}
            </Text>
          </View>
        </View>
        <View style={styles.contentLine} />
        <View
          style={[
            Common.container.base,
            { flexDirection: 'row', alignItems: 'center', marginBottom: 50 },
          ]}
        >
          <Image
            style={styles.profileIcon}
            source={{
              uri: 'https://unic-collections.s3.us-west-1.amazonaws.com/luckyg.png',
            }}
          />
          <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#000000' }}>
              {`owned by @luckyg`}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#888888' }}>
              {`0xa8f24a55dcE2826ced9851C02011256614d233c6`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
  },
  contentLine: {
    backgroundColor: '#DCDCDC',
    width: '100%',
    height: 1,
    marginVertical: 22,
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
  contentHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  contentDescription: {
    paddingTop: 4,
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  content__button: {
    paddingVertical: 15,

    width: '100%',

    backgroundColor: '#333',
    borderRadius: 6,
  },

  content__buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
})
export default ScannerDetail
