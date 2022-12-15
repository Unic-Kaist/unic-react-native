/* eslint-disable react/require-default-props */
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react'

import { Spacing } from '../Spacing'
import { TFunctionResult } from 'i18next'
import { useTheme } from '@/hooks'

interface Props {
  icon?: ReactNode
  label?: number | string | TFunctionResult
  placeholder: string
  style?: any
  inputType: 'placeholder' | 'focused' | 'typed' | 'error'
  unit?: number | string | Element
  width?: number | string
  height?: number | string
  errorMessage?: number | string
  inputText: string
  onChageInputType: (
    arg0: 'placeholder' | 'focused' | 'typed' | 'error',
  ) => void
  setText: (arg0: string) => void
  setCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
  setSecureText?: boolean | undefined
  setMaxLength?: number | undefined
  round?: number
  inputRef?: any
  isSecureMode?: boolean
  isShowPassword?: string
  setKeyboardType?: KeyboardTypeOptions | undefined
  onFocusCustom?: () => void
  mode: 'text' | 'outlined' | 'contained'
  secureIconPress?: () => void
}

const CommonTextInput = ({
  icon,
  placeholder,
  style,
  inputType,
  width,
  height,
  inputText,
  onChageInputType,
  setText,
  setCapitalize,
  setMaxLength,
  inputRef,
  isShowPassword = '',
  setKeyboardType = 'default',
  onFocusCustom,
  isSecureMode,
  mode,
  secureIconPress,
}: Props) => {
  const { Colors, Images } = useTheme()
  const [inputStyle, setInputStyle] = useState({})

  useEffect(() => {
    switch (inputType) {
      case 'placeholder':
        setInputStyle({
          backgroundColor: '#FFFFFF',
        })
        break
      case 'focused':
        setInputStyle({
          backgroundColor: '#FAFAFA',
        })
        break
      case 'typed':
        setInputStyle({
          backgroundColor: '#FAFAFA',
        })
        break
      case 'error':
        setInputStyle({
          backgroundColor: '#FAFAFA',
        })
        break
      default:
        break
    }
  }, [Colors.error, Colors.white, inputType])

  const onFocus = () => {
    if (inputType !== 'error') {
      onChageInputType('focused')
    }

    if (onFocusCustom) {
      onFocusCustom()
    }
  }

  const onBlur = () => {
    if (inputText.length > 0) {
      onChageInputType('typed')
    } else {
      if (inputType !== 'error') {
        onChageInputType('placeholder')
      }
    }
  }

  const hideTest = () => {
    console.log('hideTesthideTesthideTest')
  }

  return (
    <View>
      <View
        style={[
          styles.wrapper,
          inputStyle,
          style,
          { width: width, height: height },
        ]}
      >
        {icon}
        <Spacing width={13} />
        <TextInput
          style={styles.textInputText}
          placeholder={placeholder}
          placeholderTextColor={'#9E9E9E'}
          onFocus={onFocus}
          onBlur={onBlur}
          value={inputText}
          onChangeText={text => setText(text)}
          autoCapitalize={setCapitalize}
          maxLength={setMaxLength}
          underlineColorAndroid="transparent"
          ref={inputRef}
          secureTextEntry={
            isShowPassword === 'show'
              ? false
              : isShowPassword === 'hide'
              ? true
              : undefined
          }
          keyboardType={setKeyboardType}
        />
        <Spacing width={13} />
        {isSecureMode && (
          <TouchableOpacity
            onPress={() => secureIconPress()}
            style={{ padding: 8 }}
          >
            <Images.loginHideIcon width={20} height={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    paddingLeft: 18,
    paddingRight: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D2D3D4',
    borderWidth: 1,
  },
  unitView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errrorMessageView: {
    marginTop: 5,
  },
  textInputText: {
    fontFamily: 'Urbanist',
    color: '#9E9E9E',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
})

export default CommonTextInput
