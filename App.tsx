import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { StartGameScreen } from './screens/StartGameScreen'
import { LinearGradient } from 'expo-linear-gradient'
import { useCallback, useState } from 'react'
import { GameScreen } from './screens/GameScreen'
import { COLORS } from './constants/colors'

export default function App() {
  const [pickedNumber, setPickedNumber] = useState<number>()

  const pickNumberHandler = useCallback((choosenNumber: number) => {
    setPickedNumber(choosenNumber)
  }, [])

  let screen = <StartGameScreen onPickNumber={pickNumberHandler} />

  if (pickedNumber) {
    screen = <GameScreen userNumber={pickedNumber} />
  }

  return (
    <LinearGradient
      colors={[COLORS.primary700, COLORS.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/background.jpg')}
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
})
