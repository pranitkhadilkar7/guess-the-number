import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/colors'

type Props = {
  guessAttempt: number
  guessNumber: number
}

export function GuessLogItem({ guessAttempt, guessNumber }: Props) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{guessAttempt}</Text>
      <Text style={styles.itemText}>Oppnents Guess: {guessNumber}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 4,
    borderRadius: 40,
    borderColor: COLORS.primary800,
    backgroundColor: COLORS.accent500,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  itemText: {
    fontFamily: 'open-sans',
  },
})
