import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { StartGameScreen } from './screens/StartGameScreen'
import { LinearGradient } from 'expo-linear-gradient'
import { useCallback, useState } from 'react'
import { GameScreen } from './screens/GameScreen'

export default function App() {
  const [pickedNumber, setPickedNumber] = useState<number>()

  const pickNumberHandler = useCallback((choosenNumber: number) => {
    setPickedNumber(choosenNumber)
  }, [])

  let screen = <StartGameScreen onPickNumber={pickNumberHandler} />

  if (pickedNumber) {
    screen = <GameScreen />
  }

  return (
    <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/images/background.jpg')}
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {screen}
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
