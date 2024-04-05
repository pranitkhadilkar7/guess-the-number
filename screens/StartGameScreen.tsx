import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { memo, useCallback, useState } from 'react'
import { COLORS } from '../constants/colors'

type Props = {
  onPickNumber: (enteredNumber: number) => void
}

export const StartGameScreen = memo(function StartGameScreen({
  onPickNumber,
}: Props) {
  const [enteredNumber, setEnteredNumber] = useState<string>()

  function numberInputHandler(enteredText: string) {
    setEnteredNumber(enteredText)
  }

  const confirmInputHandler = useCallback(() => {
    const choosenNumber = parseInt(enteredNumber ?? '')

    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be between 1 and 99', [
        {
          text: 'Okay',
          style: 'destructive',
          onPress: resetInputHandler,
        },
      ])
      return
    }
    onPickNumber(choosenNumber)
  }, [enteredNumber, onPickNumber])

  const resetInputHandler = useCallback(() => {
    setEnteredNumber('')
  }, [])

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        value={enteredNumber}
        onChangeText={numberInputHandler}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>Resetttt</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: COLORS.primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    width: 50,
    height: 50,
    fontSize: 32,
    color: COLORS.accent500,
    borderBottomColor: COLORS.accent500,
    borderBottomWidth: 2,
    marginVertical: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
})
