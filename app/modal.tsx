import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from './components/Colors';
import { mockItemData, type Item, mockVegetables, mockMeats, mockCheese, mockFish, type Topping } from './components/MockData';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useOrderWishStore } from './store/indexWishStore';
import { useOrderStore } from './store';

export default function ModalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; size?: string }>();
  const selectedId = params.id;
  const initialSize = params.size ? parseInt(params.size, 10) : 32;

  const item: Item | undefined = useMemo(
    () => mockItemData.find((p) => p.id === selectedId),
    [selectedId]
  );

  const [selectedSize, setSelectedSize] = useState<number>(initialSize);
  const [selectedCategory, setSelectedCategory] = useState<Topping[] | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const parsePrice = (value?: string) => parseFloat((value || '0').replace('$', '')) || 0;
  const formatPrice = (value: number) => `$${value.toFixed(2)}`;

  const addOrder = useOrderStore((s) => s.setOrders);
  const getOrderPriceForPizza = useOrderStore((s) => s.getPriceForPizza);
  const isLiked = useOrderWishStore((s) => (item ? s.isItemLiked({ ...item, selectedSize }) : false));
  const addWish = useOrderWishStore((s) => s.setOrdersWish);
  const removeWish = useOrderWishStore((s) => s.removeOrderWishItem);

  if (!item) {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.errorText}>Item not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentPrice = selectedSize === 32 ? item.newPrice : item.size42;
  const currentWeight = selectedSize === 32 ? item.weight32 : item.weight42;
  const basePriceNumber = parsePrice(currentPrice);
  const toppingsPrice = selectedToppings.reduce((sum, t) => sum + parsePrice(t.price), 0);
  const totalPriceNumber = basePriceNumber + toppingsPrice;
  const totalPriceText = formatPrice(totalPriceNumber);

  const onToggleLike = () => {
    const payload = { ...item, selectedSize } as Item;
    if (isLiked) removeWish(payload);
    else addWish(payload);
  };

  const onItemBuy = () => {
    const priceForSize = getOrderPriceForPizza({ ...item, selectedSize });
    addOrder({
      ...item,
      selectedSize,
      selectTopping: selectedToppings,
      price: {
        pricePizza: priceForSize.pricePizza,
        price: totalPriceNumber,
        volume: priceForSize.volume,
      },
    });
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.imageWrap}>
        <Image source={item.image} style={styles.image} />
        <TouchableOpacity onPress={() => router.back()} style={styles.closeIcon}>
          <Ionicons name="close" size={24} color={colors.white} />
        </TouchableOpacity>
        {item.isNew ? (
          <View style={styles.badgeNew}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        ) : (
          <View style={[styles.badgeNew, styles.hitBadge]}>
            <Text style={styles.badgeText}>HIT</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity onPress={onToggleLike} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? colors.red : colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.sizeRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedSize(32)}
            style={[styles.sizeButton, selectedSize === 32 ? styles.sizeButtonActive : styles.sizeButtonInactive]}
          >
            <MaterialCommunityIcons name="diameter-outline" size={16} color={selectedSize === 32 ? colors.black : colors.red} style={{ marginRight: 4 }} />
            <Text style={selectedSize === 32 ? styles.sizeTextActive : styles.sizeTextInactive}>32 cm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedSize(42)}
            style={[styles.sizeButton, selectedSize === 42 ? styles.sizeButtonActive : styles.sizeButtonInactive]}
          >
            <MaterialCommunityIcons name="diameter-outline" size={16} color={selectedSize === 42 ? colors.black : colors.red} style={{ marginRight: 4 }} />
            <Text style={selectedSize === 42 ? styles.sizeTextActive : styles.sizeTextInactive}>42 cm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{totalPriceText}</Text>
          <TouchableOpacity style={styles.orderButton} onPress={onItemBuy}>
            <Text style={styles.orderButtonText}>Add to cart</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.weightText}>{currentWeight}</Text>

        <View style={styles.toppingContainer}>
          <Text style={styles.toppingTitle}>Add Topping</Text>
          <View style={styles.categoryContainer}>
            <TouchableOpacity onPress={() => setSelectedCategory(mockVegetables)}>
              <Text style={selectedCategory === mockVegetables ? styles.selectedCategory : styles.category}>Vegetables</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedCategory(mockMeats)}>
              <Text style={selectedCategory === mockMeats ? styles.selectedCategory : styles.category}>Meats</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedCategory(mockCheese)}>
              <Text style={selectedCategory === mockCheese ? styles.selectedCategory : styles.category}>Cheeses</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedCategory(mockFish)}>
              <Text style={selectedCategory === mockFish ? styles.selectedCategory : styles.category}>Fish</Text>
            </TouchableOpacity>
          </View>

          {selectedCategory && (
            <FlatList
              data={selectedCategory}
              keyExtractor={(topping) => topping.id}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={({ item: topping }) => {
                const isSelected = selectedToppings.some((t) => t.id === topping.id);
                const onPressTopping = () => {
                  const exists = selectedToppings.some((t) => t.id === topping.id);
                  const updated = exists
                    ? selectedToppings.filter((t) => t.id !== topping.id)
                    : [...selectedToppings, topping];
                  setSelectedToppings(updated);
                };
                return (
                  <TouchableOpacity onPress={onPressTopping} style={styles.toppingItemTouchable}>
                    <View style={styles.toppingItem}>
                      <Image source={topping.image} style={styles.toppingImage} />
                      <Text style={styles.toppingName}>{topping.title}</Text>
                      <View style={styles.toppingMeta}>
                        <Text style={styles.toppingPrice}>{topping.price}</Text>
                        <Text style={styles.toppingWeight}>{topping.weight}</Text>
                      </View>
                      {isSelected && (
                        <Image
                          source={require('../assets/images/pizzaScreen/icon-check.png')}
                          style={styles.checkMark}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  containerCenter: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: colors.textColor,
    marginBottom: 12,
    fontSize: 16,
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.red,
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  imageWrap: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
  },
  badgeNew: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.red,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 11,
  },
  hitBadge: {
    backgroundColor: colors.green,
  },
  content: {
    marginTop: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  description: {
    color: colors.textColor,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
    minWidth: 70,
    justifyContent: 'center',
  },
  sizeButtonActive: {
    backgroundColor: colors.green,
  },
  sizeButtonInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  sizeTextActive: {
    color: 'black',
    fontWeight: '600',
    fontSize: 12,
  },
  sizeTextInactive: {
    color: colors.white,
    fontSize: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  price: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderButton: {
    borderColor: colors.red,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  orderButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  weightText: {
    color: colors.grey,
    fontSize: 12,
  },
  toppingContainer: {
    marginTop: 16,
  },
  toppingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.title,
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  category: {
    fontSize: 14,
    color: colors.textColor,
    padding: 6,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.shadowBorderColor,
  },
  selectedCategory: {
    fontSize: 14,
    backgroundColor: colors.green,
    color: colors.white,
    padding: 6,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.shadowBorderColor,
  },
  toppingItemTouchable: {
    flex: 1,
    marginBottom: 12,
  },
  toppingItem: {
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  toppingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 6,
  },
  toppingName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.title,
  },
  toppingMeta: {
    flexDirection: 'row',
  },
  toppingPrice: {
    fontSize: 11,
    color: colors.textColor,
    marginRight: 6,
  },
  toppingWeight: {
    fontSize: 11,
    color: colors.textColor,
  },
  checkMark: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
  },
});
