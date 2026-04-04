import { View, Text, StyleSheet } from 'react-native'
import { Drill } from '@features/spaced-rep/components/Drill'

export default function LatihanScreen() {
  return <Drill />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 8,
  },
})