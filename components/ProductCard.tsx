import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, useColorScheme } from 'react-native';
import { Star } from 'lucide-react-native';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  seller: string;
  location: string;
}

interface ProductCardProps {
  product: Product;
  formatCurrency: (amount: number) => string;
}

export default function ProductCard({ product, formatCurrency }: ProductCardProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? getDarkTheme() : getLightTheme();

  return (
    <Pressable style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={2}>
          {product.name}
        </Text>
        
        <Text style={[styles.price, { color: theme.text }]}>
          {formatCurrency(product.price)}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FFB800" fill="#FFB800" />
          <Text style={[styles.rating, { color: theme.secondaryText }]}>
            {product.rating} ({product.reviews})
          </Text>
        </View>
        
        <Text style={[styles.seller, { color: theme.secondaryText }]} numberOfLines={1}>
          {product.seller} • {product.location}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '46%',
    margin: '2%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  contentContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
    height: 40,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  seller: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});