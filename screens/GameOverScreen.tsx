import { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Title } from '../components/ui/Title'
import { COLORS } from '../constants/colors'
import { PrimaryButton } from '../components/ui/PrimaryButton'

type Props = {
  userNumber: number
  roundsNumber: number
  onStartGame: () => void
}

export const GameOverScreen = memo(function GameOverScreen({
  userNumber,
  roundsNumber,
  onStartGame,
}: Props) {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/success.png')}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed{' '}
        <Text style={styles.highlightText}>{roundsNumber}</Text> rounds to guess
        the number <Text style={styles.highlightText}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onStartGame}>Start the Game</PrimaryButton>
    </View>
  )
})

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: COLORS.primary800,
    margin: 34,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlightText: {
    fontFamily: 'open-sans-bold',
    color: COLORS.primary500,
  },
})
