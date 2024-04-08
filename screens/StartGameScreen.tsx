import {
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { memo, useCallback, useState } from 'react'
import { COLORS } from '../constants/colors'
import { Title } from '../components/ui/Title'
import { Card } from '../components/ui/Card'
import { InstructionText } from '../components/ui/InstructionText'

type Props = {
  onPickNumber: (enteredNumber: number) => void
}

export const StartGameScreen = memo(function StartGameScreen({
  onPickNumber,
}: Props) {
  const [enteredNumber, setEnteredNumber] = useState<string>()
  const { width, height } = useWindowDimensions()

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

  const marginTopDistance = width < 380 ? 30 : 100

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess The Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
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
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 50,
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
  inputInstruction: {
    color: COLORS.accent500,
    fontSize: 24,
    fontWeight: 'bold',
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
