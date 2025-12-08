import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { colors } from "./Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useOrderWishStore } from "../store/indexWishStore";
import { mockVegetables, mockMeats, mockCheese, mockFish, Item, Topping } from "./MockData";
import { useOrderStore } from "../store";

export type ItemDetailScreenRouteParams = {
    item: Item,
    togglePizzaSize: (item: Item) => void
}

export type ItemDetailsProps = {
    route: { params: ItemDetailScreenRouteParams }
}

const parsePrice = (value?:string) => parseFloat((value || '0').replace('$', ''));
const formatPrice = (value:number) => `$${value.toFixed(2)}`;

export const ItemDetailScreen: React.FC<ItemDetailsProps> = ({ route }) => {
    const { item, togglePizzaSize } = route.params;
    const [selectedSize, setSelectedSize] = useState(item.selectedSize || 32);
    const [selectedCategory, setSelectedCategory] = useState<Topping[] | null>(null);
    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
    const [totalPrice, setTotalPrice] = useState<string>(() => {
        const basePrice = selectedSize === 42 ? item.size42 : item.newPrice;
        return basePrice || '$0';
    });

    const addOrder = useOrderStore((state) => state.setOrders);

    const updateTotalPrice = () => {
        const basePrice = selectedSize === 42 ? item.size42 : item.newPrice;
        const basePriceValue = parsePrice(basePrice);
        const toppingsPrice = selectedToppings.reduce((sum, topping) => sum + parsePrice(topping.price), 0);
        const newTotal = basePriceValue + toppingsPrice;
        setTotalPrice(formatPrice(newTotal));
    }

    const isLiked = useOrderWishStore((s) => s.isItemLiked({ ...item }));



    const onPressCategory = (category: Topping[]) => {
        setSelectedCategory(category);
    }

    const onPressProduct = (topping: Topping) => {
        const isSelected = selectedToppings.some((selected) => selected.id === topping.id);
        const updatedToppings = isSelected
            ? selectedToppings.filter((selected) => selected.id !== topping.id)
            : [...selectedToppings, topping];
        setSelectedToppings(updatedToppings);
        const basePrice = selectedSize === 42 ? item.size42 : item.newPrice;
        const basePriceValue = parsePrice(basePrice);
        const toppingsPrice = updatedToppings.reduce((sum, t) => sum + parsePrice(t.price), 0);
        const newTotal = basePriceValue + toppingsPrice;
        setTotalPrice(formatPrice(newTotal));
    }

    const renderProductList = (data: Topping[], key: string) => (
        <FlatList
            key={key}
            data={data}
            keyExtractor={(topping) => topping.id}
            numColumns={3}
            renderItem={({ item: topping }) => {
                const isSelected = selectedToppings.some((selected) => selected.id === topping.id);
                return (
                    <TouchableOpacity onPress={() => onPressProduct(topping)}>
                        <View style={styles.itemContainer}>
                            <Image source={topping.image} style={styles.itemImage} />
                            <Text style={styles.itemTitle}>{topping.title}</Text>
                            <View style={styles.itemTextContainer}>
                                <Text style={styles.itemSubtitle}>{topping.price}</Text>
                                <Text style={styles.itemSubtitle}>{topping.weight}</Text>
                            </View>
                            {isSelected && (
                                <Image source={require("../../assets/images/pizzaScreen/icon-check.png")}
                                    style={styles.checkMark}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    )

    const renderItem = () => {
        return (
            <View style={styles.item}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={item.image} />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.wrapTitle}>
                        <Text style={styles.title}>{item.title}</Text>
                        <TouchableOpacity onPress={() => { }} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Ionicons
                                name={isLiked ? 'heart' : 'heart-outline'}
                                size={22}
                                color={isLiked ? colors.red : colors.white}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.sizeRow}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setSelectedSize(32)}
                            style={[styles.sizeButton, selectedSize === 32 ? styles.sizeButtonActive : styles.sizeButtonInactive]}>
                            <MaterialCommunityIcons
                                name="diameter-outline"
                                size={16}
                                color={selectedSize === 32 ? colors.black : colors.red}
                                style={{ marginRight: 4 }}
                            />
                            <Text style={selectedSize === 32 ? styles.sizeTextActive : styles.sizeTextInactive}>32 cm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setSelectedSize(42)}
                            style={[styles.sizeButton, selectedSize === 42 ? styles.sizeButtonActive : styles.sizeButtonInactive]}>
                            <MaterialCommunityIcons
                                name="diameter-outline"
                                size={16}
                                color={selectedSize === 42 ? colors.black : colors.red}
                                style={{ marginRight: 4 }} />
                            <Text style={selectedSize === 42 ? styles.sizeTextActive : styles.sizeTextInactive}>42 cm</Text>
                        </TouchableOpacity>
                    </View>
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
                        {selectedCategory && renderProductList(selectedCategory, 'unique-key')}
                    </View>
                    <View style={styles.priceContainer}>
                        <View style={styles.priceText}>
                            <Text style={styles.titlePrice}>Price:</Text>
                            <Text style={styles.price}>{totalPrice}</Text>
                        </View>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <View style={styles.buttonContent}>
                                <Text style={styles.text}>Get</Text>
                                <Image source={require('../../assets/images/homeScreen/icon-basket.png')}
                                    style={styles.cartIcon}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[item]}
                renderItem={renderItem}
                keyExtractor={(pizza) => pizza.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.itemBackground,
        marginVertical: 30,
        marginHorizontal: 20,
        padding: 10,
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.shadowBorderColor,
    },
    textContainer: {
        flex: 1,
        width: 300,
        marginTop: 30,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginTop: 10,
    },
    wrapTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.title,
    },
    imageContainer: {

    },
    description: {
        fontSize: 16,
        color: colors.textColor,
        marginBottom: 20,

    },
    sizeRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 6,
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

    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    category: {
        fontSize: 16,
        color: colors.textColor,
        padding: 6,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.shadowBorderColor
    },
    selectedCategory: {
        fontSize: 16,
        backgroundColor: colors.green,
        color: colors.mainColor,
        padding: 6,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.shadowBorderColor,
        marginTop: 20
    },
    toppingContainer: {

    },
    toppingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.title,
        marginTop: 20
    },

    itemContainer: {
        width: 102,
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
    },

    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    itemTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginVertical: 5,
        color: colors.title,
    },
    itemTextContainer: {
        flexDirection: 'row',
    },
    itemSubtitle: {
        fontSize: 10,
        color: colors.textColor,
        marginRight: 5,
    },
    checkMark: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 20,
        height: 20,
    },
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    priceText: {
        flexDirection: 'row',
    },
    titlePrice: {
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: colors.textColor,
    },
    price: {
        fontSize: 24,
        color: colors.newPriceColor
    },
    buttonContainer: {
        width: 120,
        backgroundColor: colors.green,
        borderRadius: 10,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    text: {
        fontSize: 18,
        color: colors.white
    },
    cartIcon: {
        width: 24,
        height: 24,
        marginLeft: 6,
    },


});


