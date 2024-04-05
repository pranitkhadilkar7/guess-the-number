import { ReactNode, memo } from 'react'
import { StyleSheet, Text } from 'react-native'
import { COLORS } from '../../constants/colors'

type Props = {
  children: ReactNode
}

export const InstructionText = memo(function InstructionText({
  children,
}: Props) {
  return <Text style={styles.instructionText}>{children}</Text>
})

const styles = StyleSheet.create({
  instructionText: {
    color: COLORS.accent500,
    fontSize: 24,
    fontWeight: 'bold',
  },
})
