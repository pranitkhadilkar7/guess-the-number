import { ReactNode, memo } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { COLORS } from '../../constants/colors'

type Props = {
  children: ReactNode
}

export const NumberContainer = memo(function NumberContainer({
  children,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  )
})

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: COLORS.accent500,
    borderRadius: 8,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: COLORS.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontWeight: 'bold',
  },
})
