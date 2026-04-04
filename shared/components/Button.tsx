// shared/components/Button.tsx
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: ButtonVariant
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   'bg-brand-primary',
  secondary: 'bg-gray-100 border border-gray-300',
  danger:    'bg-brand-danger',
  ghost:     'bg-transparent',
}

const textStyles: Record<ButtonVariant, string> = {
  primary:   'text-white',
  secondary: 'text-gray-700',
  danger:    'text-white',
  ghost:     'text-brand-primary',
}

const spinnerColors: Record<ButtonVariant, string> = {
  primary:   'white',
  secondary: '#374151', // gray-700
  danger:    'white',
  ghost:     '#1B4F72', // brand-primary
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading,
  disabled,
  fullWidth,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={[
        variantStyles[variant],
        'rounded-xl py-3 px-6 items-center',
        fullWidth ? 'w-full' : '',
        (disabled || loading) ? 'opacity-50' : '',
      ].join(' ')}
    >
      {loading
        ? <ActivityIndicator color={spinnerColors[variant]} />
        : <Text className={`${textStyles[variant]} font-bold text-base`}>
            {title}
          </Text>
      }
    </TouchableOpacity>
  )
}