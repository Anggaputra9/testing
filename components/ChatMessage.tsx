import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? getDarkTheme() : getLightTheme();
  
  const isUser = message.sender === 'user';
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.botContainer
    ]}>
      <View style={[
        styles.bubble,
        isUser 
          ? [styles.userBubble, { backgroundColor: theme.primary }] 
          : [styles.botBubble, { backgroundColor: theme.cardBackground }]
      ]}>
        <Text style={[
          styles.messageText,
          isUser ? styles.userText : [styles.botText, { color: theme.text }]
        ]}>
          {message.text}
        </Text>
      </View>
      <Text style={[
        styles.timestamp,
        { color: theme.secondaryText }
      ]}>
        {formatTime(message.timestamp)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    maxWidth: '85%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  botContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 4,
  },
  userBubble: {
    backgroundColor: '#00897B',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#F1F5F9',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  userText: {
    color: 'white',
  },
  botText: {
    color: '#1E293B',
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
});