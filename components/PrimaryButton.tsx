import { Children, ReactNode } from 'react'
import { Text, View } from 'react-native'

type Props = {
  children: ReactNode
}

export function PrimaryButton({ children }: Props) {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  )
}
