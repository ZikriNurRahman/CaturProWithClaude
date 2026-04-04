import { View, Text, StyleSheet } from 'react-native'

export default function ProfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profil</Text>
      <Text style={styles.subtitle}>Segera hadir...</Text>
    </View>
  )
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