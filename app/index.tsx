import { Redirect } from 'expo-router'

export default function Index() {
  // Redirect langsung ke halaman utama tabs
  return <Redirect href="/(tabs)" />
}