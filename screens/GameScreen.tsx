import { memo, useCallback, useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { Title } from '../components/ui/Title'
import { NumberContainer } from '../components/game/NumberContainer'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { Card } from '../components/ui/Card'
import { InstructionText } from '../components/ui/InstructionText'
import { FontAwesome } from '@expo/vector-icons'
import { GuessLogItem } from '../components/game/GuessLogItem'

type Props = {
  userNumber: number
  gameOver: (guessNumber: number) => void
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
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess])

  const { width } = useWindowDimensions()

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
      setGuessRounds((prev) => [rndNumber, ...prev])
    },
    [currentGuess, userNumber]
  )

  useEffect(() => {
    if (currentGuess === userNumber) {
      minBoundary = 1
      maxBoundry = 100
      gameOver(guessRounds.length)
    }
  }, [currentGuess, userNumber, gameOver])

  const marginTopDistance = width < 380 ? 100 : 30

  let content = (
    <>
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
    </>
  )

  if (width > 500) {
    content = (
      <View style={styles.buttonsContainerWide}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind({}, 'lower')}>
            <FontAwesome name="minus" size={24} color="white" />
          </PrimaryButton>
        </View>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind({}, 'higher')}>
            <FontAwesome name="plus" size={24} color="white" />
          </PrimaryButton>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.screen, { marginTop: marginTopDistance }]}>
      <Title>Oponent's Guess</Title>
      {content}
      <FlatList
        data={guessRounds}
        renderItem={(itemData) => (
          <GuessLogItem
            guessNumber={itemData.item}
            guessAttempt={guessRounds.length - itemData.index}
          />
        )}
        keyExtractor={(item) => `${item}`}
        style={{ marginTop: 16, width: '100%' }}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
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
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
