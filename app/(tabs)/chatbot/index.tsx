import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Mic, Image as ImageIcon, Paperclip, Bot } from 'lucide-react-native';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

// Mock chatbot responses
const INITIAL_MESSAGES = [
  {
    id: '1',
    text: 'Halo! Saya Go-UMKM Bot. Saya siap membantu bisnis Anda berkembang. Apa yang bisa saya bantu hari ini?',
    sender: 'bot',
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
];

// Quick replies
const QUICK_REPLIES = [
  { id: '1', text: 'Cara membuat laporan keuangan' },
  { id: '2', text: 'Tips memasarkan produk online' },
  { id: '3', text: 'Bagaimana cara menggunakan aplikasi ini?' },
  { id: '4', text: 'Apa itu UMKM?' },
];

export default function ChatbotScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? getDarkTheme() : getLightTheme();
  
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Send a message
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const newUserMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText('');
    
    // Simulate bot typing
    setTimeout(() => {
      let botResponse;
      
      // Simple rule-based responses
      if (text.toLowerCase().includes('laporan keuangan')) {
        botResponse = 'Untuk membuat laporan keuangan, kunjungi tab Keuangan dan tekan tombol "Buat Laporan". Anda dapat memilih jenis laporan seperti arus kas, laba rugi, atau neraca.';
      } else if (text.toLowerCase().includes('pemasaran') || text.toLowerCase().includes('marketing')) {
        botResponse = 'Tips pemasaran produk online: 1) Foto produk yang menarik, 2) Deskripsi yang detail, 3) Gunakan media sosial, 4) Berikan testimoni pelanggan, 5) Promosi berkala.';
      } else if (text.toLowerCase().includes('aplikasi')) {
        botResponse = 'Go-UMKM memiliki 4 fitur utama: 1) Keuangan untuk pencatatan transaksi, 2) Marketplace untuk menjual produk, 3) Chatbot (yang sedang Anda gunakan), dan 4) Edukasi untuk belajar tentang bisnis.';
      } else if (text.toLowerCase().includes('umkm')) {
        botResponse = 'UMKM adalah Usaha Mikro, Kecil, dan Menengah. Di Indonesia, UMKM menyumbang lebih dari 60% PDB dan menyerap 97% tenaga kerja.';
      } else {
        botResponse = 'Terima kasih atas pertanyaan Anda. Saya akan membantu memberikan informasi yang Anda butuhkan untuk mengembangkan bisnis UMKM Anda.';
      }
      
      const newBotMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    }, 1000);
  };
  
  // Handle quick reply selection
  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Go-UMKM Bot" />
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.chatContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {/* Bot Introduction */}
            <View style={styles.botIntroContainer}>
              <View style={[styles.botAvatarContainer, { backgroundColor: theme.primaryLight }]}>
                <Bot size={32} color={theme.primary} />
              </View>
              <Text style={[styles.botName, { color: theme.text }]}>Go-UMKM Bot</Text>
              <Text style={[styles.botDescription, { color: theme.secondaryText }]}>
                Asisten virtual siap membantu Anda mengelola bisnis dan menjawab pertanyaan seputar UMKM.
              </Text>
            </View>
            
            {/* Quick Replies */}
            <View style={styles.quickRepliesContainer}>
              <Text style={[styles.quickRepliesTitle, { color: theme.secondaryText }]}>
                Pertanyaan Populer
              </Text>
              <View style={styles.quickReplies}>
                {QUICK_REPLIES.map((reply) => (
                  <Pressable
                    key={reply.id}
                    style={[styles.quickReplyButton, { backgroundColor: theme.cardBackground }]}
                    onPress={() => handleQuickReply(reply.text)}
                  >
                    <Text style={[styles.quickReplyText, { color: theme.text }]}>
                      {reply.text}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            {/* Chat Messages */}
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}
          </ScrollView>
          
          {/* Input Area */}
          <View style={[styles.inputContainer, { backgroundColor: theme.cardBackground }]}>
            <Pressable style={styles.attachButton}>
              <Paperclip size={20} color={theme.secondaryText} />
            </Pressable>
            
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Ketik pesan..."
              placeholderTextColor={theme.secondaryText}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            
            <View style={styles.rightButtons}>
              <Pressable style={styles.micButton}>
                <Mic size={20} color={theme.secondaryText} />
              </Pressable>
              
              <Pressable 
                style={[
                  styles.sendButton, 
                  { backgroundColor: inputText.trim() ? theme.primary : theme.primaryLight }
                ]}
                onPress={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
              >
                <Send size={20} color={inputText.trim() ? 'white' : theme.primary} />
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  botIntroContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  botAvatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  botName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  botDescription: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginHorizontal: 24,
  },
  quickRepliesContainer: {
    marginBottom: 24,
  },
  quickRepliesTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
  },
  quickReplies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickReplyButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  quickReplyText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  micButton: {
    padding: 8,
    marginRight: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});