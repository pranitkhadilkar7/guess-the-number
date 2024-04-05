import { ReactNode, memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { COLORS } from '../../constants/colors'

type Props = {
  children: ReactNode
}

export const Card = memo(function Card({ children }: Props) {
  return <View style={styles.card}>{children}</View>
})

const styles = StyleSheet.create({
  card: {
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
})
