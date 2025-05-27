import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartBar as BarChart2, Wallet, CreditCard, ArrowDown, ArrowUp, Plus, ChevronRight } from 'lucide-react-native';
import Header from '@/components/Header';
import TransactionItem from '@/components/TransactionItem';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

// Mock data for financial summary
const financialSummary = {
  balance: 5000000,
  income: 2500000,
  expense: 1500000,
};

// Mock data for transactions
const recentTransactions = [
  { id: '1', title: 'Penjualan Produk', amount: 750000, type: 'income', date: '2023-09-01', category: 'Sales' },
  { id: '2', title: 'Pembelian Bahan', amount: 350000, type: 'expense', date: '2023-09-02', category: 'Supplies' },
  { id: '3', title: 'Pembayaran Vendor', amount: 500000, type: 'expense', date: '2023-09-03', category: 'Service' },
  { id: '4', title: 'Penjualan Online', amount: 650000, type: 'income', date: '2023-09-04', category: 'Sales' },
];

export default function FinanceScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? getDarkTheme() : getLightTheme();
  
  const [timeFrame, setTimeFrame] = useState('week');
  
  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Keuangan" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Financial Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.summaryIconContainer}>
              <Wallet size={24} color={theme.primary} />
            </View>
            <Text style={[styles.summaryLabel, { color: theme.secondaryText }]}>Saldo</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>{formatCurrency(financialSummary.balance)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCardSmall, { backgroundColor: theme.cardBackground }]}>
              <View style={[styles.summaryIconContainer, { backgroundColor: 'rgba(52, 211, 153, 0.1)' }]}>
                <ArrowDown size={20} color="#34D399" />
              </View>
              <Text style={[styles.summaryLabelSmall, { color: theme.secondaryText }]}>Pemasukan</Text>
              <Text style={[styles.summaryValueSmall, { color: theme.text }]}>{formatCurrency(financialSummary.income)}</Text>
            </View>
            
            <View style={[styles.summaryCardSmall, { backgroundColor: theme.cardBackground }]}>
              <View style={[styles.summaryIconContainer, { backgroundColor: 'rgba(251, 113, 133, 0.1)' }]}>
                <ArrowUp size={20} color="#FB7185" />
              </View>
              <Text style={[styles.summaryLabelSmall, { color: theme.secondaryText }]}>Pengeluaran</Text>
              <Text style={[styles.summaryValueSmall, { color: theme.text }]}>{formatCurrency(financialSummary.expense)}</Text>
            </View>
          </View>
        </View>
        
        {/* Time Frame Selector */}
        <View style={styles.timeFrameContainer}>
          <Pressable 
            style={[
              styles.timeFrameButton, 
              timeFrame === 'week' && [styles.timeFrameActive, { backgroundColor: theme.primaryLight }]
            ]}
            onPress={() => setTimeFrame('week')}
          >
            <Text style={[
              styles.timeFrameText, 
              timeFrame === 'week' && [styles.timeFrameTextActive, { color: theme.primary }]
            ]}>Minggu</Text>
          </Pressable>
          
          <Pressable 
            style={[
              styles.timeFrameButton, 
              timeFrame === 'month' && [styles.timeFrameActive, { backgroundColor: theme.primaryLight }]
            ]}
            onPress={() => setTimeFrame('month')}
          >
            <Text style={[
              styles.timeFrameText, 
              timeFrame === 'month' && [styles.timeFrameTextActive, { color: theme.primary }]
            ]}>Bulan</Text>
          </Pressable>
          
          <Pressable 
            style={[
              styles.timeFrameButton, 
              timeFrame === 'year' && [styles.timeFrameActive, { backgroundColor: theme.primaryLight }]
            ]}
            onPress={() => setTimeFrame('year')}
          >
            <Text style={[
              styles.timeFrameText, 
              timeFrame === 'year' && [styles.timeFrameTextActive, { color: theme.primary }]
            ]}>Tahun</Text>
          </Pressable>
        </View>
        
        {/* Chart Placeholder */}
        <View style={[styles.chartContainer, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.chartHeader}>
            <Text style={[styles.chartTitle, { color: theme.text }]}>Ringkasan Keuangan</Text>
            <BarChart2 size={24} color={theme.primary} />
          </View>
          <View style={styles.chartPlaceholder}>
            <Text style={{ color: theme.secondaryText }}>Grafik akan ditampilkan di sini</Text>
          </View>
        </View>
        
        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={[styles.transactionsTitle, { color: theme.text }]}>Transaksi Terbaru</Text>
            <Pressable style={styles.viewAllButton}>
              <Text style={[styles.viewAllText, { color: theme.primary }]}>Lihat Semua</Text>
              <ChevronRight size={16} color={theme.primary} />
            </Pressable>
          </View>
          
          {recentTransactions.map((transaction) => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction} 
              formatCurrency={formatCurrency}
            />
          ))}
        </View>
      </ScrollView>
      
      {/* Floating Action Button */}
      <Pressable style={[styles.fab, { backgroundColor: theme.primary }]}>
        <Plus size={24} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryContainer: {
    padding: 16,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCardSmall: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginRight: 6,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(79, 209, 197, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  summaryValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  summaryLabelSmall: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  summaryValueSmall: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  timeFrameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  timeFrameButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  timeFrameActive: {
    backgroundColor: 'rgba(79, 209, 197, 0.1)',
  },
  timeFrameText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  timeFrameTextActive: {
    color: '#00897B',
    fontFamily: 'Inter-Bold',
  },
  chartContainer: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  transactionsContainer: {
    marginHorizontal: 16,
    marginBottom: 80,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});