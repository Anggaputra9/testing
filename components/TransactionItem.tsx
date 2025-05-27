import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { ArrowUp, ArrowDown, ChevronRight } from 'lucide-react-native';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  formatCurrency: (amount: number) => string;
}

export default function TransactionItem({ transaction, formatCurrency }: TransactionItemProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? getDarkTheme() : getLightTheme();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Pressable style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <View 
        style={[
          styles.iconContainer, 
          { 
            backgroundColor: transaction.type === 'income' 
              ? 'rgba(52, 211, 153, 0.1)' 
              : 'rgba(251, 113, 133, 0.1)' 
          }
        ]}
      >
        {transaction.type === 'income' ? (
          <ArrowDown size={20} color="#34D399" />
        ) : (
          <ArrowUp size={20} color="#FB7185" />
        )}
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, { color: theme.text }]}>{transaction.title}</Text>
        <Text style={[styles.date, { color: theme.secondaryText }]}>
          {formatDate(transaction.date)} • {transaction.category}
        </Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text 
          style={[
            styles.amount, 
            { 
              color: transaction.type === 'income' ? '#34D399' : '#FB7185' 
            }
          ]}
        >
          {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
        </Text>
        <ChevronRight size={16} color={theme.secondaryText} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    marginRight: 4,
  },
});