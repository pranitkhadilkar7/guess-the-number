import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Title } from '../components/Title'

export const GameScreen = memo(function GameScreen() {
  return (
    <View style={styles.screen}>
      <Title>Oponent's Guess</Title>
    </View>
  )
})

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
  },
})
