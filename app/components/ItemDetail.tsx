import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "./Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useOrderWishStore } from "../store/indexWishStore";
import { mockVegetables, mockMeats, mockCheese, mockFish } from "./MockData";

const ItemDetailScreen = ({ route }) => {
    const { item, tooglePizzaSize } = route.params;
    const [selectedSize, setSelectedSize] = useState(item.selectedSize || 32);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [totalPrice, setTotalPrice] = useState();

    const isLiked = useOrderWishStore((s) => s.isItemLiked({ ...item }));

    const onPressCategory = (category) => {
        setSelectedCategory(category);
    }

    // const renderProductList = (data, key) => {
    //     return
    // }

    const renderItem = () => {
        function setSelectedSize(arg0: number): void {
            throw new Error("Function not implemented.");
        }

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
                            <TouchableOpacity>
                                <Text style={selectedCategory === mockVegetables ? styles.selectedCategory : styles.category}>Vegetables</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={selectedCategory === mockMeats ? styles.selectedCategory : styles.category}>Meats</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={selectedCategory === mockCheese ? styles.selectedCategory : styles.category}>Cheeses</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={selectedCategory === mockFish ? styles.selectedCategory : styles.category}>Fish</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
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
    }
});


