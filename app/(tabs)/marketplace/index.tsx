import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TextInput, useColorScheme, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ShoppingBag, Filter, Star, ChevronRight } from 'lucide-react-native';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

// Mock data for categories
const categories = [
  { id: '1', name: 'Makanan', icon: '🍲' },
  { id: '2', name: 'Minuman', icon: '🥤' },
  { id: '3', name: 'Kerajinan', icon: '🧶' },
  { id: '4', name: 'Fashion', icon: '👕' },
  { id: '5', name: 'Pertanian', icon: '🌾' },
];

// Mock data for products
const products = [
  {
    id: '1',
    name: 'Keripik Singkong',
    price: 25000,
    rating: 4.8,
    reviews: 120,
    image: 'https://images.pexels.com/photos/5848696/pexels-photo-5848696.jpeg',
    seller: 'UMKM Sejahtera',
    location: 'Bandung',
  },
  {
    id: '2',
    name: 'Tas Anyaman Rotan',
    price: 175000,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.pexels.com/photos/5764055/pexels-photo-5764055.jpeg',
    seller: 'Kerajinan Asli',
    location: 'Yogyakarta',
  },
  {
    id: '3',
    name: 'Kopi Arabika',
    price: 45000,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.pexels.com/photos/373888/pexels-photo-373888.jpeg',
    seller: 'Tani Kopi',
    location: 'Aceh',
  },
  {
    id: '4',
    name: 'Batik Tulis',
    price: 350000,
    rating: 4.7,
    reviews: 56,
    image: 'https://images.pexels.com/photos/6195072/pexels-photo-6195072.jpeg',
    seller: 'Batik Nusantara',
    location: 'Solo',
  },
];

export default function MarketplaceScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? getDarkTheme() : getLightTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
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
      <Header title="Marketplace" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.cardBackground }]}>
            <Search size={20} color={theme.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Cari produk UMKM..."
              placeholderTextColor={theme.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <Pressable style={[styles.filterButton, { backgroundColor: theme.cardBackground }]}>
            <Filter size={20} color={theme.primary} />
          </Pressable>
        </View>
        
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Kategori</Text>
            <Pressable style={styles.viewAllButton}>
              <Text style={[styles.viewAllText, { color: theme.primary }]}>Lihat Semua</Text>
              <ChevronRight size={16} color={theme.primary} />
            </Pressable>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && [styles.categorySelected, { backgroundColor: theme.primaryLight }],
                  { backgroundColor: theme.cardBackground }
                ]}
                onPress={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text 
                  style={[
                    styles.categoryName, 
                    { color: selectedCategory === category.id ? theme.primary : theme.text }
                  ]}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        
        {/* Featured Products */}
        <View style={styles.featuredContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Produk Unggulan</Text>
            <Pressable style={styles.viewAllButton}>
              <Text style={[styles.viewAllText, { color: theme.primary }]}>Lihat Semua</Text>
              <ChevronRight size={16} color={theme.primary} />
            </Pressable>
          </View>
          
          <View style={styles.featuredImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/7262897/pexels-photo-7262897.jpeg' }}
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredTag}>Produk Lokal</Text>
              <Text style={styles.featuredTitle}>Produk UMKM Asli Indonesia</Text>
              <Text style={styles.featuredSubtitle}>Dukung produk lokal berkualitas</Text>
              <Pressable style={styles.shopNowButton}>
                <Text style={styles.shopNowText}>Beli Sekarang</Text>
              </Pressable>
            </View>
          </View>
        </View>
        
        {/* Product Grid */}
        <View style={styles.productsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Semua Produk</Text>
            <Pressable style={styles.viewAllButton}>
              <Text style={[styles.viewAllText, { color: theme.primary }]}>Filter</Text>
              <Filter size={16} color={theme.primary} />
            </Pressable>
          </View>
          
          <View style={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                formatCurrency={formatCurrency}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
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
  categoriesScroll: {
    paddingLeft: 16,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 100,
  },
  categorySelected: {
    backgroundColor: 'rgba(79, 209, 197, 0.1)',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  featuredContainer: {
    marginTop: 24,
  },
  featuredImageContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    height: 200,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  featuredTag: {
    backgroundColor: '#FF8A65',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  featuredSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  shopNowButton: {
    backgroundColor: '#00897B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  productsContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
});