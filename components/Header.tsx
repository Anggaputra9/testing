import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, ChevronLeft } from 'lucide-react-native';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showNotificationButton?: boolean;
  onBackPress?: () => void;
}

export default function Header({
  title,
  showBackButton = false,
  showNotificationButton = true,
  onBackPress,
}: HeaderProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? getDarkTheme() : getLightTheme();
  
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <Pressable 
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <ChevronLeft size={24} color={theme.text} />
          </Pressable>
        )}
      </View>
      
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      
      <View style={styles.rightSection}>
        {showNotificationButton && (
          <Pressable 
            style={[styles.notificationButton, { backgroundColor: theme.cardBackground }]}
          >
            <Bell size={20} color={theme.text} />
            <View style={[styles.notificationBadge, { backgroundColor: theme.primary }]} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftSection: {
    width: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00897B',
  },
});