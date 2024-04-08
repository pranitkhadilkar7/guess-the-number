import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native'
import { StartGameScreen } from './screens/StartGameScreen'
import { LinearGradient } from 'expo-linear-gradient'
import { useCallback, useEffect, useState } from 'react'
import { GameScreen } from './screens/GameScreen'
import { COLORS } from './constants/colors'
import { GameOverScreen } from './screens/GameOverScreen'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [pickedNumber, setPickedNumber] = useState<number>()
  const [gameIsOver, setGameIsOver] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [fontsLoaded, fontsError] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  const pickNumberHandler = useCallback((choosenNumber: number) => {
    setPickedNumber(choosenNumber)
  }, [])

  const gameOverHandler = useCallback((attempts: number) => {
    setAttemptsCount(attempts)
    setGameIsOver(true)
  }, [])

  const startGameHandler = useCallback(() => {
    setAttemptsCount(0)
    setPickedNumber(undefined)
    setGameIsOver(false)
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontsError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontsError])

  if (!fontsLoaded && !fontsError) {
    return null
  }

  let screen = <StartGameScreen onPickNumber={pickNumberHandler} />

  if (pickedNumber) {
    screen = <GameScreen userNumber={pickedNumber} gameOver={gameOverHandler} />
  }

  if (gameIsOver && pickedNumber) {
    screen = (
      <GameOverScreen
        userNumber={pickedNumber}
        roundsNumber={attemptsCount}
        onStartGame={startGameHandler}
      />
    )
  }

  return (
    <LinearGradient
      colors={[COLORS.primary700, COLORS.accent500]}
      style={styles.rootScreen}
      onLayout={onLayoutRootView}
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
