import { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Title } from '../components/ui/Title'
import { COLORS } from '../constants/colors'

export const GameOverScreen = memo(function GameOverScreen() {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/success.png')}
        />
      </View>
      <Text>Your phone needed X rounds to guess Y number</Text>
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
})
