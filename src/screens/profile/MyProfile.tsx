import { IUser, saveUser } from '@/remotes/user'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { AppHeader } from '@/components/AppHeader'
import { Auth } from 'aws-amplify'
import { CTAButton } from '@/components/button'
import { Created } from './Created'
import { Favorited } from './Favorited'
import { Modalize } from 'react-native-modalize'
import { Owned } from './Owned'
import { Portal } from 'react-native-portalize'
import Screen from '@/components/Screen'
import { Spacing } from '@/components/Spacing'
import TwoSelectionBottomSheet from '@/components/bottomSheet/TwoSelectionBottomSheet'
import { Watchlist } from './Watchlist'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import getSize from '@/utils/getSize'
import { navigate } from '@/navigators/utils'
import useCognito from '@/hooks/useCognito'
import { useQuery } from 'react-query'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { userState } from '@/store/user/userState'

const MyProfile = () => {
  const user = useRecoilValue(userState)
  const userReset = useResetRecoilState(userState)
  const { cognitoRefreshSession } = useCognito()
  const { Layout, Images, Common } = useTheme()
  const { t } = useTranslation()
  const { heightPercentage, widthPercentage } = getSize()
  const selectModalizeRef = useRef<Modalize>(null)
  const settingModalizeRef = useRef<Modalize>(null)
  const Tab = createMaterialTopTabNavigator()

  const [dotId, setDotId] = useState<string>('')

  const [requestUser, setRequestUser] = useState<IUser | null>(null)

  const {
    data: userData,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
    isError: isUserError,
  } = useQuery(['user-info', requestUser], () => saveUser(requestUser), {
    enabled: !!requestUser,
  })

  const onConnectWallet = () => {
    cognitoRefreshSession()
    selectModalizeRef.current?.open()
  }

  const metamask = async () => {
    console.log('press metamask')
    selectModalizeRef.current?.close()
    const tempUser = {
      userId: user.userId,
      userTag: 'test',
      description: 'test',
      socialLinks: {},
      accessToken: 'test',
      refreshToken: user.refreshToken,
    }
    console.log('tempUser', tempUser)
    setRequestUser(tempUser)
  }

  const trustWallet = () => {
    console.log('trustWallet', user)
    selectModalizeRef.current?.close()
  }

  const onLogout = () => {
    userReset()
    Auth.signOut()
    settingModalizeRef.current?.close()
  }

  const onPerssSetting = () => {
    settingModalizeRef.current?.open()
  }
  const onPressFirst = () => {}

  const onPressSecond = () => {}

  return (
    <Screen>
      <AppHeader
        back={false}
        title={user?.userTag}
        right={
          <TouchableOpacity onPress={onPerssSetting}>
            <Images.dots width={24} height={24} />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Spacing height={144} backgroundColor={'#F5F5F5'} />
        <View style={[Common.container.base]}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://www.blockmedia.co.kr/wp-content/uploads/2022/01/%EC%A0%80%EC%8A%A4%ED%8B%B4-%EB%B9%84%EB%B2%84-nft-836x640.jpg',
            }}
          />
          <Spacing height={heightPercentage(70)} />
          <View>
            <Text style={styles.profileNameText}>{user?.userTag}</Text>
            <Text style={styles.profileDescriptionText}>
              Hi, i draw. Hi, i draw. Hi, i draw. Hi, i draw. Hi, i draw.
              awefaefwaef awefawefawe
            </Text>
            <Text style={styles.profileTagText}>@base_c</Text>
            <Text style={styles.profileUrlText}>www.basec.com</Text>
          </View>
          <Spacing height={heightPercentage(22)} />
          <View style={[Layout.row, Layout.rowCenter]}>
            {/* <Images.logo height={14} width={14} /> */}
            <Spacing width={heightPercentage(10)} />
            <Text style={styles.tokenText}>
              0xf7a9E17F81A9Dbcd21790Ada7159ABc40696112b
            </Text>
          </View>
          <Spacing height={heightPercentage(22)} />
          <View style={[Layout.row]}>
            {/* <Images.logo height={24} width={24} />
            <Spacing width={widthPercentage(14)} />
            <Images.logo height={24} width={24} />
            <Spacing width={widthPercentage(14)} />
            <Images.logo height={24} width={24} /> */}
          </View>
          <Spacing height={heightPercentage(24)} />
          <CTAButton
            onPress={() => onConnectWallet()}
            label="Connect a wallet"
            mode="contained"
            textColor="#FFFFFF"
            buttonColor="#00DF8F"
            style={styles.signInButton}
            labelStyle={styles.signInText}
            contentStyle={styles.signInContainerButton}
          />
          <Spacing height={15} />
          <View
            style={[Layout.alignItemsCenter, { justifyContent: 'flex-end' }]}
          >
            <View style={[Layout.row, Layout.alignItemsCenter]}>
              <Text style={styles.bottomText}>New to wallets?</Text>
              <Spacing width={widthPercentage(8)} />
              <Pressable hitSlop={30}>
                <Text style={styles.bottomButtonText}>Learn more</Text>
              </Pressable>
            </View>
          </View>
          <Spacing height={heightPercentage(15)} />
          <View style={{ height: 500, width: '100%' }}>
            <Tab.Navigator
              // screenOptions={{
              //   swipeEnabled: false,
              //   tabBarActiveTintColor: '#303030',
              //   tabBarInactiveTintColor: '#B7B7B7',
              //   tabBarIndicatorStyle: {
              //     backgroundColor: '#777777',
              //     justifyContent: 'center',
              //     alignItems: 'center',
              //   },
              //   tabBarLabelStyle: { fontSize: 16 },
              //   tabBarStyle: {
              //     // alignItems: 'center',
              //     height: 26,
              //     backgroundColor: 'red',
              //   },
              // }}
              screenOptions={{
                tabBarLabelStyle: { fontSize: 12 },
                tabBarItemStyle: { height: 40 },
                tabBarStyle: {
                  height: heightPercentage(50),
                },
              }}
            >
              <Tab.Screen name="Owned" component={Owned} />
              <Tab.Screen name="Created" component={Created} />
              <Tab.Screen name="Favorited" component={Favorited} />
              <Tab.Screen name="Watchlist" component={Watchlist} />
            </Tab.Navigator>
          </View>
        </View>
      </ScrollView>
      <TwoSelectionBottomSheet
        modalizeRef={selectModalizeRef}
        topText={'Metamask'}
        bottomText={'Trust Wallet'}
        topIconColor={'red'}
        bottomIconColor={'red'}
        TopIcon={Images.metamask}
        BottomIcon={Images.trustWallet}
        onPressTop={metamask}
        onPressBottom={trustWallet}
      />
      <Portal>
        <Modalize
          ref={settingModalizeRef}
          modalHeight={500}
          handlePosition={'outside'}
          disableScrollIfPossible={false}
        >
          <View style={[styles.wrapper]}>
            <Pressable
              style={[styles.pressableView, Layout.row]}
              onPress={onPressFirst}
            >
              <Images.dots width={40} height={40} />
              <View style={[styles.textView]}>
                <Text
                  style={{
                    fontFamily: 'Urbanist',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  1
                </Text>
              </View>
            </Pressable>
            <View style={[styles.verticalLineView]} />
            <Pressable
              style={[styles.pressableView, Layout.row]}
              onPress={onPressSecond}
            >
              <Images.dots width={40} height={40} />
              <View style={[styles.textView]}>
                <Text
                  style={{
                    fontFamily: 'Urbanist',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  2
                </Text>
              </View>
            </Pressable>
            <View style={[styles.verticalLineView]} />
            <Pressable
              style={[styles.pressableView, Layout.row]}
              onPress={onPressSecond}
            >
              <Images.dots width={40} height={40} />
              <View style={[styles.textView]}>
                <Text
                  style={{
                    fontFamily: 'Urbanist',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  3
                </Text>
              </View>
            </Pressable>
            <View style={[styles.verticalLineView]} />
            <Pressable
              style={[styles.pressableView, Layout.row]}
              onPress={onPressSecond}
            >
              <Images.dots width={40} height={40} />
              <View style={[styles.textView]}>
                <Text
                  style={{
                    fontFamily: 'Urbanist',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  4
                </Text>
              </View>
            </Pressable>
            <View style={[styles.verticalLineView]} />
            <Pressable
              style={[styles.pressableView, Layout.row]}
              onPress={onPressSecond}
            >
              <Images.dots width={40} height={40} />
              <View style={[styles.textView]}>
                <Text
                  style={{
                    fontFamily: 'Urbanist',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  5
                </Text>
              </View>
            </Pressable>
            <View style={[styles.verticalLineView]} />
            <Pressable
              style={[styles.pressableView, Layout.row]}
              onPress={onPressSecond}
            >
              <Images.dots width={40} height={40} />
              <View style={[styles.textView]}>
                <Text
                  style={{
                    fontFamily: 'Urbanist',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  6
                </Text>
              </View>
            </Pressable>
            <View style={{ height: 21 }} />
            <View style={{ borderColor: '#EEEEEE', borderWidth: 1 }} />
            <View style={{ height: 21 }} />
            <Pressable
              style={[styles.pressableView, Layout.row]}
              onPress={onLogout}
            >
              <Images.dots width={40} height={40} />
              <View style={[styles.textView]}>
                <Text
                  style={{
                    fontFamily: 'Urbanist',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  Logout {}
                </Text>
              </View>
            </Pressable>
            <View style={{ height: 40 }} />
          </View>
        </Modalize>
      </Portal>
    </Screen>
  )
}

const styles = StyleSheet.create({
  profileImage: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    top: -50,
    left: 21,
  },
  profileNameText: { fontFamily: 'Urbanist', fontWeight: '700', fontSize: 20 },
  profileDescriptionText: {
    fontFamily: 'Urbanist',
    fontWeight: '500',
    fontSize: 14,
    color: '#424242',
  },
  profileTagText: {
    fontFamily: 'Urbanist',
    fontWeight: '500',
    fontSize: 14,
    color: '#9E9E9E',
  },
  profileUrlText: {
    fontFamily: 'Urbanist',
    fontWeight: '500',
    fontSize: 14,
    color: '#4A85FE',
  },
  tokenText: {
    fontFamily: 'Urbanist',
    fontWeight: '600',
    fontSize: 15,
    color: '#808191',
  },
  snsContainerButton: {
    height: 64,
  },
  snsButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  snsText: { fontFamily: 'Urbanist', fontWeight: '600', fontSize: 20 },
  signInContainerButton: {
    height: 45,
  },
  signInButton: {
    borderRadius: 10,
  },
  signInText: { fontFamily: 'Urbanist', fontWeight: '700', fontSize: 18 },
  bottomText: {
    fontFamily: 'Urbanist',
    fontWeight: '400',
    fontSize: 14,
    color: '#9E9E9E',
  },
  bottomButtonText: {
    fontFamily: 'Urbanist',
    fontWeight: '600',
    fontSize: 14,
    color: '#24DC9A',
  },
  wrapper: {
    marginHorizontal: 16,
    paddingVertical: 32,
  },
  pressableView: {
    alignItems: 'center',
  },
  verticalLineView: {
    marginVertical: 10,
  },
  textView: {
    marginLeft: 18,
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
  },
})

export default MyProfile
