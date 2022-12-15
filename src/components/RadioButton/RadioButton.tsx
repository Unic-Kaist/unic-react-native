import * as React from 'react'
import { View } from 'react-native'
import { RadioButton as Button } from 'react-native-paper'

const RadioButton = () => {
  const [checked, setChecked] = React.useState('first')

  return (
    <View>
      <Button
        value="first"
        status={checked === 'first' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('first')}
      />
      <Button
        value="second"
        status={checked === 'second' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('second')}
      />
    </View>
  )
}

export default RadioButton
