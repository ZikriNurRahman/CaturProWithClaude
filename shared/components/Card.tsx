// shared/components/Card.tsx
import { View, Text } from 'react-native'

interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <View className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 ${className}`}>
      {title && (
        <Text className="text-base font-semibold text-gray-900 mb-3">
          {title}
        </Text>
      )}
      {children}
    </View>
  )
}