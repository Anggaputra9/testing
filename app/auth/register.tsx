import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? getDarkTheme() : getLightTheme();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleRegister = () => {
    // Simple validation
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Semua field harus diisi');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Password tidak sama');
      return;
    }
    
    // Reset error
    setError(null);
    
    // Call register function from context
    register(name, email, password, businessName)
      .then(() => {
        router.replace('/(tabs)/finance');
      })
      .catch((err) => {
        setError('Terjadi kesalahan saat mendaftar');
        console.error(err);
      });
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <Pressable 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ChevronLeft size={24} color={theme.text} />
      </Pressable>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Buat Akun Baru</Text>
          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
            Daftar untuk mengakses semua fitur Go-UMKM
          </Text>
        </View>
        
        <View style={styles.formContainer}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Nama Lengkap</Text>
            <View style={[styles.inputContainer, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Masukkan nama lengkap anda"
                placeholderTextColor={theme.secondaryText}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
          
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
            <Text style={[styles.inputLabel, { color: theme.text }]}>Nama Usaha (Opsional)</Text>
            <View style={[styles.inputContainer, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Masukkan nama usaha anda"
                placeholderTextColor={theme.secondaryText}
                value={businessName}
                onChangeText={setBusinessName}
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
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Konfirmasi Password</Text>
            <View style={[styles.inputContainer, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Masukkan password anda lagi"
                placeholderTextColor={theme.secondaryText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <Pressable onPress={toggleConfirmPasswordVisibility} style={styles.passwordToggle}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color={theme.secondaryText} />
                ) : (
                  <Eye size={20} color={theme.secondaryText} />
                )}
              </Pressable>
            </View>
          </View>
          
          <Pressable 
            style={[styles.registerButton, { backgroundColor: theme.primary }]}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Daftar</Text>
          </Pressable>
          
          <View style={styles.loginPrompt}>
            <Text style={[styles.loginPromptText, { color: theme.secondaryText }]}>
              Sudah punya akun?
            </Text>
            <Pressable onPress={() => router.push('/auth/login')}>
              <Text style={[styles.loginLink, { color: theme.primary }]}> Masuk</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
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
  registerButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  loginPromptText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});