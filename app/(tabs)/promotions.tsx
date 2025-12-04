import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, TouchableWithoutFeedback, Share } from "react-native";
import { colors } from '../components/Colors';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    id: '1',
    image: require('../../assets/images/header/food-story-1.jpg'),
    sharedLink: 'https://foodstory.com/promotion1',
  },
  {
    id: '2',
    image: require('../../assets/images/header/food-story-2.jpg'),
    sharedLink: 'https://foodstory.com/promotion2',
  },
  {
    id: '3',
    image: require('../../assets/images/header/food-story-3.jpg'),
    sharedLink: 'https://foodstory.com/promotion3',
  },
]
const { width, height } = Dimensions.get('screen');




const PromotionScreen = () => {
  const [selectedId, setSelectedId] = useState(0);
  const [circleColor, setCircleColor] = useState(['black', 'black', 'black']);
  const handleItemSelect = (id, sharedLink) => () => {
    setSelectedId(id);
    handleShare(sharedLink);
  }
  const handleShare = async (sharedLink) => {
    try {
      const result = await Share.share({
        message: `Check out this image: ${sharedLink}`,
      })
      if (result.action === Share.sharedAction) {
        console.log('Promotion shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Promotion share dismissed');
      }
    } catch (error) {
      console.error('Error sharing promotion:', error);
    }
  };


  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: width }}>
        <TouchableWithoutFeedback onPress={handleItemSelect(index, item.sharedLink)}>
          <View>
            <Image source={item.image} style={styles.itemImage} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  };

  const onFlatListScroll = (event) => {
    const {contentOffset}= event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / width);
    setSelectedId(currentIndex);
    updateCircleColors(currentIndex);
  }
  const updateCircleColors = (currentIndex) => {
    const newColors = circleColor.map((color, index) =>
      index === currentIndex ? 'grey' : 'red'
    );
    setCircleColor(newColors);
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={styles.wrapBackground}>
          <Text style={styles.title}>Sale</Text>
          <View style={styles.wrapContent}>
            <FlatList
              data={DATA}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              extraData={selectedId}
              onScroll={onFlatListScroll}
            />
            <View style={styles.circleContainer}>
              {circleColor.map((color, index) => (
                <View key={index}
                  style={[styles.circle, { backgroundColor: color }]} />
              ))}
            </View>
          </View>
        </View>

      </TouchableWithoutFeedback>
    </View>

  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1
  },
  wrapBackground: {
    flex: 1,
    backgroundColor: colors.itemBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.green,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  wrapContent: {
    height: '75%',
    overflow: 'scroll',
  },
  itemImage: {
    width: 300,
    height: 500,
    alignSelf: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  }
});

export default PromotionScreen;