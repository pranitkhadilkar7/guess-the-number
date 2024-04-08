import { memo, useCallback, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Title } from '../components/ui/Title'
import { NumberContainer } from '../components/game/NumberContainer'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { Card } from '../components/ui/Card'
import { InstructionText } from '../components/ui/InstructionText'
import { FontAwesome } from '@expo/vector-icons'

type Props = {
  userNumber: number
  gameOver: () => void
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

export const GameScreen = memo(function GameScreen({
  userNumber,
  gameOver,
}: Props) {
  const initialGuess = generateRandomNumberBetween(1, 100, userNumber)
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

  useEffect(() => {
    if (currentGuess === userNumber) {
      minBoundary = 1
      maxBoundry = 100
      gameOver()
    }
  }, [currentGuess, userNumber, gameOver])

  return (
    <View style={styles.screen}>
      <Title>Oponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind({}, 'lower')}>
              <FontAwesome name="minus" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind({}, 'higher')}>
              <FontAwesome name="plus" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  )
})

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
})
