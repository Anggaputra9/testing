import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Sun, Moon, Bell, Lock, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

export default function SettingsScreen() {
  const { isAuthenticated, logout, user } = useAuth();
  const { toggleTheme, theme: appTheme } = useTheme();
  const systemColorScheme = useColorScheme();
  const theme = systemColorScheme === 'dark' ? getDarkTheme() : getLightTheme();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const toggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Pengaturan" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={[styles.profileSection, { backgroundColor: theme.cardBackground }]}>
          <View style={[styles.profileImageContainer, { backgroundColor: theme.primaryLight }]}>
            <User size={32} color={theme.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.text }]}>
              {isAuthenticated ? user?.name || 'Pengguna UMKM' : 'Tamu'}
            </Text>
            <Text style={[styles.profileEmail, { color: theme.secondaryText }]}>
              {isAuthenticated ? user?.email || 'user@example.com' : 'Silakan masuk untuk mengakses semua fitur'}
            </Text>
          </View>
          <Pressable style={styles.editProfileButton}>
            <Text style={[styles.editProfileText, { color: theme.primary }]}>Edit</Text>
          </Pressable>
        </View>
        
        {/* General Settings */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: theme.secondaryText }]}>Umum</Text>
          
          <View style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: theme.primaryLight }]}>
              {appTheme === 'dark' ? (
                <Moon size={20} color={theme.primary} />
              ) : (
                <Sun size={20} color={theme.primary} />
              )}
            </View>
            <Text style={[styles.settingText, { color: theme.text }]}>Mode Gelap</Text>
            <Switch
              value={appTheme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#4FD1C5' }}
              thumbColor={'#f4f3f4'}
            />
          </View>
          
          <View style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: theme.primaryLight }]}>
              <Bell size={20} color={theme.primary} />
            </View>
            <Text style={[styles.settingText, { color: theme.text }]}>Notifikasi</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#767577', true: '#4FD1C5' }}
              thumbColor={'#f4f3f4'}
            />
          </View>
        </View>
        
        {/* Account Settings */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: theme.secondaryText }]}>Akun</Text>
          
          <Pressable style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: theme.primaryLight }]}>
              <Lock size={20} color={theme.primary} />
            </View>
            <Text style={[styles.settingText, { color: theme.text }]}>Keamanan Akun</Text>
            <ChevronRight size={20} color={theme.secondaryText} />
          </Pressable>
          
          <Pressable style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.settingIconContainer, { backgroundColor: theme.primaryLight }]}>
              <HelpCircle size={20} color={theme.primary} />
            </View>
            <Text style={[styles.settingText, { color: theme.text }]}>Bantuan</Text>
            <ChevronRight size={20} color={theme.secondaryText} />
          </Pressable>
          
          {isAuthenticated ? (
            <Pressable 
              style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}
              onPress={logout}
            >
              <View style={[styles.settingIconContainer, { backgroundColor: 'rgba(251, 113, 133, 0.1)' }]}>
                <LogOut size={20} color="#FB7185" />
              </View>
              <Text style={[styles.settingText, { color: '#FB7185' }]}>Keluar</Text>
              <ChevronRight size={20} color={theme.secondaryText} />
            </Pressable>
          ) : (
            <Pressable 
              style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}
              onPress={() => {/* Navigate to login */}}
            >
              <View style={[styles.settingIconContainer, { backgroundColor: theme.primaryLight }]}>
                <User size={20} color={theme.primary} />
              </View>
              <Text style={[styles.settingText, { color: theme.primary }]}>Masuk</Text>
              <ChevronRight size={20} color={theme.secondaryText} />
            </Pressable>
          )}
        </View>
        
        {/* App Info */}
        <View style={styles.appInfoContainer}>
          <Text style={[styles.appVersion, { color: theme.secondaryText }]}>Go-UMKM v1.0.0</Text>
          <Text style={[styles.appCopyright, { color: theme.secondaryText }]}>
            © 2023 Go-UMKM. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  editProfileButton: {
    padding: 8,
  },
  editProfileText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  settingsSection: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  appInfoContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});