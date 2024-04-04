import { ReactNode, memo } from 'react'
import { StyleSheet, Text } from 'react-native'

type Props = {
  children: ReactNode
}

export const Title = memo(function Title({ children }: Props) {
  return <Text style={styles.title}>{children}</Text>
})

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ddb52f',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#ddb52f',
    padding: 12,
  },
})
