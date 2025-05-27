import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? getDarkTheme() : getLightTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = () => {
    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError('Email dan password harus diisi');
      return;
    }
    
    // Reset error
    setError(null);
    
    // Call login function from context
    login(email, password)
      .then(() => {
        router.replace('/(tabs)/finance');
      })
      .catch((err) => {
        setError('Email atau password salah');
        console.error(err);
      });
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { color: theme.text }]}>Selamat Datang di</Text>
        <Text style={[styles.appName, { color: theme.primary }]}>Go-UMKM</Text>
        <Text style={[styles.tagline, { color: theme.secondaryText }]}>
          Platform terpadu untuk mendukung UMKM Indonesia
        </Text>
      </View>
      
      <View style={styles.formContainer}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.text }]}>Email</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Masukkan email anda"
              placeholderTextColor={theme.secondaryText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.text }]}>Password</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Masukkan password anda"
              placeholderTextColor={theme.secondaryText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <Pressable onPress={togglePasswordVisibility} style={styles.passwordToggle}>
              {showPassword ? (
                <EyeOff size={20} color={theme.secondaryText} />
              ) : (
                <Eye size={20} color={theme.secondaryText} />
              )}
            </Pressable>
          </View>
        </View>
        
        <Pressable style={styles.forgotPasswordContainer}>
          <Text style={[styles.forgotPasswordText, { color: theme.primary }]}>Lupa Password?</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.loginButton, { backgroundColor: theme.primary }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Masuk</Text>
        </Pressable>
        
        <View style={styles.dividerContainer}>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <Text style={[styles.dividerText, { color: theme.secondaryText }]}>atau</Text>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
        </View>
        
        <Pressable 
          style={[styles.registerButton, { borderColor: theme.border }]}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={[styles.registerButtonText, { color: theme.text }]}>Buat Akun Baru</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 64,
    marginBottom: 48,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  tagline: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: 'rgba(251, 113, 133, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#E11D48',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  passwordToggle: {
    padding: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  loginButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  registerButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});