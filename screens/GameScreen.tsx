import { memo, useCallback, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Title } from '../components/ui/Title'
import { NumberContainer } from '../components/game/NumberContainer'
import { PrimaryButton } from '../components/ui/PrimaryButton'

type Props = {
  userNumber: number
}

let minBoundary = 1
let maxBoundry = 100

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
  const initialGuess = generateRandomNumberBetween(
    minBoundary,
    maxBoundry,
    userNumber
  )
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  const nextGuessHandler = useCallback(
    (direction: string) => {
      if (
        (direction === 'lower' && currentGuess < userNumber) ||
        (direction === 'higher' && currentGuess > userNumber)
      ) {
        Alert.alert('Dont lie!', 'You know this is wrong', [
          { text: 'Sorry!', style: 'cancel' },
        ])
        return
      }

      if (direction === 'lower') {
        maxBoundry = currentGuess
      } else {
        minBoundary = currentGuess + 1
      }
      const rndNumber = generateRandomNumberBetween(
        minBoundary,
        maxBoundry,
        currentGuess
      )
      setCurrentGuess(rndNumber)
    },
    [currentGuess, userNumber]
  )

  return (
    <View style={styles.screen}>
      <Title>Oponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind({}, 'higher')}>
            +
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind({}, 'lower')}>
            -
          </PrimaryButton>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
  },
})
