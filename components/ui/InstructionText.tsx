import { ReactNode, memo } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import { COLORS } from '../../constants/colors'

type Props = {
  children: ReactNode
  style?: StyleProp<TextStyle>
}

export const InstructionText = memo(function InstructionText({
  children,
  style,
}: Props) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>
})

const styles = StyleSheet.create({
  instructionText: {
    color: COLORS.accent500,
    fontSize: 24,
    fontFamily: 'open-sans',
  },
})
