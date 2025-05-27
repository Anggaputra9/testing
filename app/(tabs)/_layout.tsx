import { Tabs } from 'expo-router';
import { StyleSheet, useColorScheme } from 'react-native';
import { ChartBar as BarChart2, ShoppingBag, MessageCircle, BookOpen, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  const tabBarActiveTintColor = colorScheme === 'dark' ? '#4FD1C5' : '#00897B';
  const tabBarInactiveTintColor = colorScheme === 'dark' ? '#718096' : '#A0AEC0';
  const tabBarBackgroundColor = colorScheme === 'dark' ? '#1A202C' : '#FFFFFF';
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarStyle: { 
          backgroundColor: tabBarBackgroundColor,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colorScheme === 'dark' ? '#2D3748' : '#E2E8F0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="finance/index"
        options={{
          title: 'Keuangan',
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="marketplace/index"
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chatbot/index"
        options={{
          title: 'Chatbot',
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="education/index"
        options={{
          title: 'Edukasi',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Pengaturan',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}