import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#1e293b' },
        tabBarActiveTintColor: '#60a5fa',
        tabBarInactiveTintColor: '#64748b',
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#f1f5f9',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Beranda', tabBarLabel: 'Beranda' }}
      />
      <Tabs.Screen
        name="kursus"
        options={{ title: 'Kursus', tabBarLabel: 'Kursus' }}
      />
      <Tabs.Screen
        name="latihan"
        options={{ title: 'Latihan', tabBarLabel: 'Latihan' }}
      />
      <Tabs.Screen
        name="profil"
        options={{ title: 'Profil', tabBarLabel: 'Profil' }}
      />
    </Tabs>
  )
}