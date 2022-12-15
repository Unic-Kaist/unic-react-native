import { IUser, fetchUser } from '@/remotes/fetchUser'
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  LayoutRectangle,
  NativeEventEmitter,
  NativeModules,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  findNodeHandle,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import Lottie from 'lottie-react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { ScannerView } from '@/components/scanner/ScannerView'
import SkeletonContent from 'react-native-skeleton-content-nonexpo'
import { fetchCollection } from '@/remotes/fetchCollection'
import { fetchNFTInfo } from '@/remotes/fetchNFTInfo'
import { navigate } from '@/navigators/utils'
import { useFocusEffect } from '@react-navigation/native'
import { useNFTInfo } from './hooks/useNFTInfo'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'

interface receiveDataProps {
  actionType: string
  contentType: string
  displayOrientation: string
  dotDesc: string
  dotId: string
  dotSeq: number
  dotSubTitle: string
  dotTitle: string
  fileConnectUri: string
  odroidSignalYn: string
  projectNm: string
  qrString: string
  readYn: string
  recogType: string
  sampleImgPath: string
  serviceTarget: string
  usePasswdYn: string
}

const Scanner = () => {
  const { t } = useTranslation()
  const { Common, Layout, Images } = useTheme()
  const modalizeRef = useRef<Modalize>(null)
  const { RNEventEmitter, RNScannerView, NativeMobileSDKBridge } = NativeModules
  const eventEmitter = new NativeEventEmitter(RNEventEmitter)
  const [receiveData, setReceiveData] = useState<receiveDataProps | undefined>()
  const [isFlashOn, setIsFlashOn] = useState(false)
  const [isZoomOn, setIsZoomOn] = useState(false)
  const [isLoadingVisible, setIsLoadingVisible] = useState(false)

  const [dotId, setDotId] = useState<string>('')
  const [collectionId, setCollectionId] = useState<string>('')
  const [requestUser, setRequestUser] = useState<IUser | null>(null)
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true)
  const {
    data: nftData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery(['nft-info', dotId], () => fetchNFTInfo(dotId), {
    enabled: !!dotId,
  })

  const {
    data: collectionData,
    isLoading: isCollectionLoading,
    isSuccess: isCollectionSuccess,
    isError: isCollectionError,
  } = useQuery(
    ['nft-info', collectionId],
    () => fetchCollection(collectionId),
    {
      enabled: !!collectionId,
    },
  )

  const {
    data: userData,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
    isError: isUserError,
  } = useQuery(['user-info', requestUser], () => fetchUser(requestUser), {
    enabled: !!requestUser,
  })

  useEffect(() => {
    const onScanSubscription = eventEmitter.addListener('onFinished', res => {
      if (Platform.OS === 'ios') {
        const obj = JSON.parse(res)
        setReceiveData(obj)
      } else {
        setReceiveData(res)
      }
    })

    return () => {
      onScanSubscription.remove()
    }
  }, [])

  useEffect(() => {
    const onScanSubscription = eventEmitter.addListener('onLoading', res => {
      if (Platform.OS === 'ios') {
        const obj = JSON.parse(res)
        if (obj) {
          setIsLoadingVisible(obj)
        }
      } else {
      }
    })

    return () => {
      onScanSubscription.remove()
    }
  }, [])

  useEffect(() => {
    if (isLoading && Platform.OS === 'android') {
      setIsLoadingVisible(true)
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      setIsLoadingVisible(false)
      modalizeRef.current?.open()
      setCollectionId(nftData?.collectionId)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isCollectionSuccess) {
      setRequestUser({
        creatorAddress: nftData?.creatorAddress,
        chain: collectionData?.chain,
      })
      // setIsSkeletonLoading(false)
    }
  }, [isCollectionSuccess])

  useEffect(() => {
    console.log('isUserError', isUserError)
  }, [isUserError])

  useEffect(() => {
    if (receiveData) {
      setDotId(receiveData?.dotId)
    }
  }, [receiveData])

  const onClick = () => {
    navigate('ScannerDetail', {
      onReturn: (item: any) => {
        setDotId('')
        setCollectionId('')
        setIsFlashOn(item.isFlashOn)
        setRequestUser(null)
        if (Platform.OS === 'ios') {
          RNScannerView.initCamera()
        } else {
          NativeMobileSDKBridge.initCamera()
        }
        setTimeout(function () {
          if (Platform.OS === 'ios') {
            RNScannerView.setFlashOn(item.isFlashOn)
            RNScannerView.setZoomOn(isZoomOn)
          } else {
            NativeMobileSDKBridge.setFlashOn(item.isFlashOn)
            NativeMobileSDKBridge.setZoomOn(isZoomOn)
          }
        }, 500)
      },
      nftData,
      collectionData,
      userData,
      isFlashOn,
      isZoomOn,
    })
    modalizeRef.current?.close()
  }

  const onClickFlash = () => {
    setIsFlashOn(!isFlashOn)
    if (Platform.OS === 'ios') {
      RNScannerView.setFlashOn(!isFlashOn)
    } else {
      NativeMobileSDKBridge.setFlashOn(!isFlashOn)
    }
  }

  const onClickZoom = () => {
    setIsZoomOn(!isZoomOn)
    if (Platform.OS === 'ios') {
      RNScannerView.setZoomOn(!isZoomOn)
    } else {
      NativeMobileSDKBridge.setZoomOn(!isZoomOn)
    }
  }

  const onCloseModal = () => {
    setDotId('')
    setCollectionId('')
    setRequestUser(null)
    if (Platform.OS === 'ios') {
      RNScannerView.initCamera()
    } else {
      NativeMobileSDKBridge.initCamera()
    }
    setTimeout(function () {
      if (Platform.OS === 'ios') {
        RNScannerView.setFlashOn(isFlashOn)
        RNScannerView.setZoomOn(isZoomOn)
      } else {
        NativeMobileSDKBridge.setFlashOn(isFlashOn)
        NativeMobileSDKBridge.setZoomOn(isZoomOn)
      }
    }, 500)
  }

  const maskingName = (strName: string) => {
    if (strName) {
      if (strName.length > 2) {
        const originName = strName.split('')
        let joinName: string[] = originName.filter((name, i) => {
          if (i < 6 || i > originName.length - 5) {
            return name
          }
        })
        joinName = joinName.join('')
        const b = '...'
        const position = 6
        const output = [
          joinName.slice(0, position),
          b,
          joinName.slice(position),
        ].join('')
        return output
      }
    }
  }

  const test = () => (
    <View style={styles.content}>
      <View
        style={[
          Common.container.base,
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
      >
        <SkeletonContent
          containerStyle={styles.profileIcon}
          isLoading={isSkeletonLoading}
          layout={[
            {
              key: 'someId',
              width: 48,
              height: 48,
              borderRadius: 48 / 2,
            },
          ]}
        >
          <Image
            style={styles.profileIcon}
            source={{ uri: userData?.profilePhoto }}
          />
        </SkeletonContent>
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: 'center',
          }}
        >
          <SkeletonContent
            containerStyle={{
              flex: 1,
              justifyContent: 'center',
            }}
            isLoading={isSkeletonLoading}
            layout={[
              {
                key: 'someId',
                width: 200,
                height: 25,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 25,
                color: '#000000',
              }}
            >
              {`created by ${userData?.userTag}`}
            </Text>
          </SkeletonContent>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '500',
              color: '#888888',
              lineHeight: 15,
            }}
          >
            {`${maskingName(nftData?.creatorAddress)}`}
          </Text>
        </View>
      </View>
      <View style={styles.contentLine} />
      <TouchableOpacity
        style={[Common.container.base, { flexDirection: 'row' }]}
        onPress={() => onClick()}
      >
        <Image style={styles.tinyLogo} source={{ uri: nftData?.imageURL }} />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.contentHeading}>{`${nftData?.name}`}</Text>
          <Text style={styles.contentDescription}>
            {`${nftData?.description}`}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.contentLine} />
      <View
        style={[
          Common.container.base,
          { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
        ]}
      >
        <SkeletonContent
          containerStyle={styles.profileIcon}
          isLoading={isSkeletonLoading}
          layout={[
            {
              key: 'someId',
              width: 48,
              height: 48,
              borderRadius: 48 / 2,
            },
          ]}
        >
          <Image
            style={styles.profileIcon}
            source={{ uri: userData?.profilePhoto }}
          />
        </SkeletonContent>
        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
          <SkeletonContent
            containerStyle={{
              flex: 1,
              justifyContent: 'center',
            }}
            isLoading={isSkeletonLoading}
            layout={[
              {
                key: 'someId',
                width: 200,
                height: 25,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 25,
                color: '#000000',
              }}
            >
              {'owned by @luckyg'}
            </Text>
          </SkeletonContent>

          <Text style={{ fontSize: 13, fontWeight: '500', color: '#888888' }}>
            {maskingName('0xa8f24a55dcE2826ced9851C02011256614d233c6')}
          </Text>
        </View>
      </View>
    </View>
  )

  const renderContent = () => (
    <View style={styles.content}>
      <View
        style={[
          Common.container.base,
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
      >
        <Image
          style={styles.profileIcon}
          source={{ uri: userData?.profilePhoto }}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              lineHeight: 25,
              color: '#000000',
            }}
          >
            {`created by ${userData?.userTag}`}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '500',
              color: '#888888',
              lineHeight: 15,
            }}
          >
            {`${maskingName(nftData?.creatorAddress)}`}
          </Text>
        </View>
      </View>
      <View style={styles.contentLine} />
      <TouchableOpacity
        style={[Common.container.base, { flexDirection: 'row' }]}
        onPress={() => onClick()}
      >
        <Image style={styles.tinyLogo} source={{ uri: nftData?.imageURL }} />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.contentHeading}>{`${nftData?.name}`}</Text>
          <Text style={styles.contentDescription}>
            {`${nftData?.description}`}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.contentLine} />
      <View
        style={[
          Common.container.base,
          { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
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
            {maskingName('0xa8f24a55dcE2826ced9851C02011256614d233c6')}
          </Text>
        </View>
      </View>
    </View>
  )

  return (
    <View style={Layout.fill}>
      <ScannerView style={Layout.fill} />
      {isLoadingVisible && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
          }}
        >
          <Lottie
            source={require('@/assets/animations/loading.json')}
            autoPlay
            loop
          />
        </View>
      )}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={require('@/assets/images/cameraFocus.png')}
        />
      </View>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          alignItems: 'flex-end',
          marginRight: 10,
        }}
      >
        <View
          style={{
            marginTop: 60,
            backgroundColor: 'rgba(49, 49, 49, 0.8)',
            width: 46,
            height: 98,
            borderRadius: 34,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 9,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 7,
            }}
            onPress={onClickFlash}
          >
            {isFlashOn ? (
              <Images.zap width={25} height={25} stroke={'#FFFFFF'} />
            ) : (
              <Images.zap
                width={25}
                height={25}
                opacity={0.2}
                stroke={'#FFFFFF'}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 7,
            }}
            onPress={onClickZoom}
          >
            {isZoomOn ? (
              <Images.zoom width={25} height={25} stroke={'#FFFFFF'} />
            ) : (
              <Images.zoom
                width={25}
                height={25}
                opacity={0.2}
                stroke={'#FFFFFF'}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight={true}
          onClose={() => onCloseModal()}
        >
          {test()}
        </Modalize>
      </Portal>
    </View>
  )
>>>>>>> develop
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingVertical: 20,
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
    borderRadius: 10,
  },
  contentHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.1,
  },
  contentDescription: {
    paddingTop: 4,
    marginRight: 4,
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
})

export default Scanner
