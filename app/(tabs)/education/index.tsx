import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Play, ChevronRight, Trophy } from 'lucide-react-native';
import Header from '@/components/Header';
import { getDarkTheme, getLightTheme } from '@/constants/Colors';

// Mock data for educational modules
const modules = [
  {
    id: '1',
    title: 'Dasar-dasar Keuangan UMKM',
    description: 'Pelajari cara mengelola keuangan bisnis kecil dengan efektif',
    lessons: 12,
    progress: 0.25,
    image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
  },
  {
    id: '2',
    title: 'Strategi Pemasaran Digital',
    description: 'Teknik memasarkan produk UMKM di platform digital',
    lessons: 8,
    progress: 0.5,
    image: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg',
  },
  {
    id: '3',
    title: 'Kepatuhan Pajak & Perizinan',
    description: 'Panduan lengkap tentang pajak dan perizinan untuk UMKM',
    lessons: 6,
    progress: 0,
    image: 'https://images.pexels.com/photos/6863254/pexels-photo-6863254.jpeg',
  },
];

// Mock data for featured articles
const articles = [
  {
    id: '1',
    title: '10 Strategi Memulai UMKM dengan Modal Minim',
    category: 'Bisnis',
    readTime: '5 min',
    image: 'https://images.pexels.com/photos/6476264/pexels-photo-6476264.jpeg',
  },
  {
    id: '2',
    title: 'Cara Mengurus NPWP untuk Pelaku UMKM',
    category: 'Legal',
    readTime: '3 min',
    image: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg',
  },
  {
    id: '3',
    title: 'Meningkatkan Penjualan dengan Media Sosial',
    category: 'Marketing',
    readTime: '7 min',
    image: 'https://images.pexels.com/photos/5053732/pexels-photo-5053732.jpeg',
  },
];

// Mock data for videos
const videos = [
  {
    id: '1',
    title: 'Membuat Laporan Keuangan Sederhana',
    duration: '12:35',
    thumbnail: 'https://images.pexels.com/photos/7605892/pexels-photo-7605892.jpeg',
  },
  {
    id: '2',
    title: 'Tips Foto Produk yang Menarik',
    duration: '08:21',
    thumbnail: 'https://images.pexels.com/photos/7656527/pexels-photo-7656527.jpeg',
  },
];

export default function EducationScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? getDarkTheme() : getLightTheme();
  
  const [activeTab, setActiveTab] = useState('modules');
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Edukasi" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Course Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg' }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTag}>Kursus Terbaru</Text>
              <Text style={styles.bannerTitle}>Manajemen Bisnis UMKM di Era Digital</Text>
              <Text style={styles.bannerDescription}>
                Pelajari cara mengelola bisnis UMKM Anda dengan lebih efektif di era digital
              </Text>
              <Pressable style={styles.startButton}>
                <Text style={styles.startButtonText}>Mulai Belajar</Text>
              </Pressable>
            </View>
          </View>
        </View>
        
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[
              styles.tabButton,
              activeTab === 'modules' && [styles.activeTab, { borderBottomColor: theme.primary }]
            ]}
            onPress={() => setActiveTab('modules')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'modules' && [styles.activeTabText, { color: theme.primary }],
                { color: activeTab === 'modules' ? theme.primary : theme.secondaryText }
              ]}
            >
              Modul
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.tabButton,
              activeTab === 'articles' && [styles.activeTab, { borderBottomColor: theme.primary }]
            ]}
            onPress={() => setActiveTab('articles')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'articles' && [styles.activeTabText, { color: theme.primary }],
                { color: activeTab === 'articles' ? theme.primary : theme.secondaryText }
              ]}
            >
              Artikel
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.tabButton,
              activeTab === 'videos' && [styles.activeTab, { borderBottomColor: theme.primary }]
            ]}
            onPress={() => setActiveTab('videos')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'videos' && [styles.activeTabText, { color: theme.primary }],
                { color: activeTab === 'videos' ? theme.primary : theme.secondaryText }
              ]}
            >
              Video
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.tabButton,
              activeTab === 'quizzes' && [styles.activeTab, { borderBottomColor: theme.primary }]
            ]}
            onPress={() => setActiveTab('quizzes')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'quizzes' && [styles.activeTabText, { color: theme.primary }],
                { color: activeTab === 'quizzes' ? theme.primary : theme.secondaryText }
              ]}
            >
              Kuis
            </Text>
          </Pressable>
        </View>
        
        {/* Content based on active tab */}
        {activeTab === 'modules' && (
          <View style={styles.moduleContainer}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Modul Pembelajaran</Text>
              <Pressable style={styles.viewAllButton}>
                <Text style={[styles.viewAllText, { color: theme.primary }]}>Lihat Semua</Text>
                <ChevronRight size={16} color={theme.primary} />
              </Pressable>
            </View>
            
            {modules.map((module) => (
              <Pressable 
                key={module.id}
                style={[styles.moduleCard, { backgroundColor: theme.cardBackground }]}
              >
                <Image
                  source={{ uri: module.image }}
                  style={styles.moduleImage}
                  resizeMode="cover"
                />
                <View style={styles.moduleContent}>
                  <Text style={[styles.moduleTitle, { color: theme.text }]}>{module.title}</Text>
                  <Text style={[styles.moduleDescription, { color: theme.secondaryText }]} numberOfLines={2}>
                    {module.description}
                  </Text>
                  
                  <View style={styles.moduleMeta}>
                    <View style={styles.lessonCount}>
                      <BookOpen size={14} color={theme.secondaryText} />
                      <Text style={[styles.lessonCountText, { color: theme.secondaryText }]}>
                        {module.lessons} pelajaran
                      </Text>
                    </View>
                    
                    <View style={styles.moduleProgress}>
                      <View 
                        style={[
                          styles.progressBar,
                          { backgroundColor: theme.progressBackground }
                        ]}
                      >
                        <View 
                          style={[
                            styles.progressFill,
                            { 
                              backgroundColor: theme.primary,
                              width: `${module.progress * 100}%`
                            }
                          ]}
                        />
                      </View>
                      <Text style={[styles.progressText, { color: theme.secondaryText }]}>
                        {Math.round(module.progress * 100)}%
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
        
        {activeTab === 'articles' && (
          <View style={styles.articlesContainer}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Artikel Terbaru</Text>
              <Pressable style={styles.viewAllButton}>
                <Text style={[styles.viewAllText, { color: theme.primary }]}>Lihat Semua</Text>
                <ChevronRight size={16} color={theme.primary} />
              </Pressable>
            </View>
            
            {articles.map((article) => (
              <Pressable 
                key={article.id}
                style={[styles.articleCard, { backgroundColor: theme.cardBackground }]}
              >
                <Image
                  source={{ uri: article.image }}
                  style={styles.articleImage}
                  resizeMode="cover"
                />
                <View style={styles.articleContent}>
                  <View style={styles.articleMeta}>
                    <Text style={[styles.articleCategory, { backgroundColor: theme.primaryLight, color: theme.primary }]}>
                      {article.category}
                    </Text>
                    <Text style={[styles.articleReadTime, { color: theme.secondaryText }]}>
                      {article.readTime}
                    </Text>
                  </View>
                  <Text style={[styles.articleTitle, { color: theme.text }]}>{article.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
        
        {activeTab === 'videos' && (
          <View style={styles.videosContainer}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Video Tutorial</Text>
              <Pressable style={styles.viewAllButton}>
                <Text style={[styles.viewAllText, { color: theme.primary }]}>Lihat Semua</Text>
                <ChevronRight size={16} color={theme.primary} />
              </Pressable>
            </View>
            
            {videos.map((video) => (
              <Pressable 
                key={video.id}
                style={[styles.videoCard, { backgroundColor: theme.cardBackground }]}
              >
                <View style={styles.videoThumbnailContainer}>
                  <Image
                    source={{ uri: video.thumbnail }}
                    style={styles.videoThumbnail}
                    resizeMode="cover"
                  />
                  <View style={styles.playButtonOverlay}>
                    <View style={styles.playButton}>
                      <Play size={20} color="white" />
                    </View>
                  </View>
                  <View style={styles.videoDurationTag}>
                    <Text style={styles.videoDurationText}>{video.duration}</Text>
                  </View>
                </View>
                <View style={styles.videoContent}>
                  <Text style={[styles.videoTitle, { color: theme.text }]}>{video.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
        
        {activeTab === 'quizzes' && (
          <View style={styles.quizzesContainer}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Kuis Interaktif</Text>
              <Pressable style={styles.viewAllButton}>
                <Text style={[styles.viewAllText, { color: theme.primary }]}>Lihat Semua</Text>
                <ChevronRight size={16} color={theme.primary} />
              </Pressable>
            </View>
            
            <View style={[styles.quizCard, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.quizHeader}>
                <View style={styles.quizTrophyContainer}>
                  <Trophy size={24} color="#FFB800" />
                </View>
                <Text style={[styles.quizTitle, { color: theme.text }]}>Dasar-dasar Pembukuan</Text>
              </View>
              <Text style={[styles.quizDescription, { color: theme.secondaryText }]}>
                Uji pengetahuan Anda tentang pencatatan keuangan dasar dan pembukuan sederhana untuk UMKM.
              </Text>
              <View style={styles.quizMeta}>
                <Text style={[styles.quizMetaText, { color: theme.secondaryText }]}>10 pertanyaan</Text>
                <Text style={[styles.quizMetaText, { color: theme.secondaryText }]}>•</Text>
                <Text style={[styles.quizMetaText, { color: theme.secondaryText }]}>15 menit</Text>
              </View>
              <Pressable style={[styles.startQuizButton, { backgroundColor: theme.primary }]}>
                <Text style={styles.startQuizText}>Mulai Kuis</Text>
              </Pressable>
            </View>
            
            <View style={[styles.quizCard, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.quizHeader}>
                <View style={styles.quizTrophyContainer}>
                  <Trophy size={24} color="#FFB800" />
                </View>
                <Text style={[styles.quizTitle, { color: theme.text }]}>Perizinan UMKM</Text>
              </View>
              <Text style={[styles.quizDescription, { color: theme.secondaryText }]}>
                Kuis tentang berbagai jenis perizinan yang dibutuhkan untuk menjalankan bisnis UMKM di Indonesia.
              </Text>
              <View style={styles.quizMeta}>
                <Text style={[styles.quizMetaText, { color: theme.secondaryText }]}>8 pertanyaan</Text>
                <Text style={[styles.quizMetaText, { color: theme.secondaryText }]}>•</Text>
                <Text style={[styles.quizMetaText, { color: theme.secondaryText }]}>10 menit</Text>
              </View>
              <Pressable style={[styles.startQuizButton, { backgroundColor: theme.primary }]}>
                <Text style={styles.startQuizText}>Mulai Kuis</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    height: 200,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bannerContent: {
    padding: 16,
  },
  bannerTag: {
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
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  bannerDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#00897B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00897B',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  activeTabText: {
    color: '#00897B',
    fontFamily: 'Inter-Bold',
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
  moduleContainer: {
    marginBottom: 24,
  },
  moduleCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  moduleImage: {
    width: '100%',
    height: 120,
  },
  moduleContent: {
    padding: 16,
  },
  moduleTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  moduleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonCountText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  moduleProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00897B',
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  articlesContainer: {
    marginBottom: 24,
  },
  articleCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  articleImage: {
    width: '100%',
    height: 160,
  },
  articleContent: {
    padding: 16,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  articleCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    marginRight: 8,
  },
  articleReadTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  articleTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  videosContainer: {
    marginBottom: 24,
  },
  videoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  videoThumbnailContainer: {
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: 180,
  },
  playButtonOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoDurationTag: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoDurationText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  videoContent: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  quizzesContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  quizCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quizTrophyContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 184, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quizTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  quizDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  quizMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  quizMetaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginRight: 8,
  },
  startQuizButton: {
    backgroundColor: '#00897B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startQuizText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
});