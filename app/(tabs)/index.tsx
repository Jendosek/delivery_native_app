import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../components/Colors';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate} from 'react-native-reanimated';
import React, { useState } from 'react';
import { mockItemData } from '../components/MockData';
import ItemList from '../components/ItemList';

export default function HomeScreen() {
  const [filteredData, setFilteredData] = useState(mockItemData);
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(scrollY.value, [0, 100], [0, 30]),
      marginBottom: interpolate(scrollY.value, [0, 100], [0, -100]),
      opacity: interpolate(scrollY.value, [0, 50], [1, 0]),
      transform: [{
        translateY: interpolate(scrollY.value, [0, 50], [0, -30])
      }]
    };
  });

  const onSearch = (text: string) => {
    const filteredItem = filteredData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredItem);
  }

  return (
    <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView
          style={styles.headerWrap}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <Animated.View style={animatedTextStyle}>
            <Header onSearch={onSearch} />
          </Animated.View>

          <ItemList />
        </Animated.ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerWrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
  }
});
