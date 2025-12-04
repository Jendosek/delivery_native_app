import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../components/Colors';

const advantages = [
  { id: '1', title: 'Guaranteed quality', description: 'We use premium ingredients, strict kitchen standards, and continuous quality checks to ensure your meal is always perfect.', image: require('../../assets/images/settingsScreen/quality.jpg') },
  { id: '2', title: 'Fast delivery', description: 'Our couriers deliver quickly and accurately, so you enjoy your food fresh and hot.', image: require('../../assets/images/settingsScreen/delivery.jpg') },
  { id: '3', title: 'Always tasty', description: 'Pizza, sushi, and more — prepared with care and delivered fresh.', image: require('../../assets/images/settingsScreen/pizza.jpg') },
  { id: '4', title: '24/7 support', description: 'Our support team is ready to help around the clock with any questions.', image: require('../../assets/images/settingsScreen/support.jpg') },
];

export default function AboutUsScreen() {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      const idx = viewableItems[0].index ?? 0;
      setActiveIndex(idx);
    }
  }).current;

  return (
    <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.aboutTitle}>About Us</Text>
          <Text style={styles.aboutText}>
            Pronto Pizza & Sushi is committed to delivering delicious food prepared with care. We believe in quality, speed, and friendly service. Our team works every day to make sure your experience is delightful — whether you order pizza, sushi, or any of our specials.
          </Text>
          <Text style={styles.subTitle}>Our advantages</Text>

          <FlatList
            data={advantages}
            keyExtractor={(i) => i.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            renderItem={({ item }) => (
              <View style={{ width }}>
                <View style={styles.slide}>
                  <Image source={item.image} style={styles.slideImage} />
                  <View style={styles.slideTextWrap}>
                    <Text style={styles.slideTitle}>{item.title}</Text>
                    <Text style={styles.slideDesc}>{item.description}</Text>
                  </View>
                </View>
              </View>
            )}
          />

          <View style={styles.pagination}>
            {advantages.map((_, index) => (
              <Image
                key={index}
                source={index === activeIndex ? require('../../assets/images/settingsScreen/icon-eye.png') : require('../../assets/images/settingsScreen/icon-arrowWight.png')}
                style={styles.dot}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  aboutTitle: { color: colors.title, fontWeight: '900', fontSize: 22 },
  aboutText: { color: colors.textColor, textAlign: 'justify', lineHeight: 20 },
  subTitle: { color: colors.title, fontWeight: '800', marginTop: 8 },
  slide: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.panel,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.shadowBorderColor,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  slideImage: { width: 80, height: 80, borderRadius: 12 },
  slideTextWrap: { flex: 1, gap: 6 },
  slideTitle: { color: colors.title, fontWeight: '700', textDecorationLine: 'underline' },
  slideDesc: { color: colors.textColor, textAlign: 'justify' },
  pagination: { flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  dot: { width: 14, height: 14, tintColor: colors.title },
});
