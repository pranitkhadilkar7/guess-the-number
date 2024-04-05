import { memo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Title } from '../components/ui/Title'
import { NumberContainer } from '../components/game/NumberContainer'

type Props = {
  userNumber: number
}

function generateRandomNumberBetween(
  min: number,
  max: number,
  exclude: number
) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) {
    return generateRandomNumberBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

export const GameScreen = memo(function GameScreen({ userNumber }: Props) {
  const initialGuess = generateRandomNumberBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  return (
    <View style={styles.screen}>
      <Title>Oponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
    </View>
  )
})

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
  },
})
