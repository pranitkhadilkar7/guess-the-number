import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const GameScreen = memo(function GameScreen() {
  return (
    <View style={styles.screen}>
      <Text>Welcome to GameScreen</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
  },
})
