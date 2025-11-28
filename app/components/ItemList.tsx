import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import type { Item } from "./MockData";
import { mockItemData } from "./MockData";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "./Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useOrderStore } from "../store/index";
import { useOrderWishStore } from "../store/indexWishStore";

type CardProps = {
    item: Item;
    index: number;
    tooglePizzaSize?: (item: Item) => void;
};


const Card = ({ item }: CardProps) => {
    const [selectedSize, setSelectedSize] = useState(item.selectedSize || 32);

    const currentPrice = selectedSize === 32 ? item.newPrice : item.size42;
    const currentWeight = selectedSize === 32 ? item.weight32 : item.weight42;

    const addOrder = useOrderStore((state) => state.setOrders);
    const getOrderPriceForPizza = useOrderStore((state) => state.getPriceForPizza);

    const isLiked = useOrderWishStore((s) => s.isItemLiked({ ...item, selectedSize }));
    const addWish = useOrderWishStore((s) => s.setOrdersWish);
    const removeWish = useOrderWishStore((s) => s.removeOrderWishItem);

    const onItemBuy = (pressedItem: Item) => {
        const priceForSize = getOrderPriceForPizza({ ...pressedItem, selectedSize });
        addOrder({
            ...pressedItem,
            selectedSize,
            price: priceForSize,
        });

        
    }

    const onToggleLike = () => {
        const payload = { ...item, selectedSize } as Item;
        if (isLiked) removeWish(payload);
        else addWish(payload);
    };

    return (
        <TouchableOpacity activeOpacity={0.9} style={{ marginBottom: 12 }}>
            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientCard}>
                <View style={styles.item}>
                    <View style={styles.imageContainer}>
                        <Image source={item.image} style={styles.image} />
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

                    <View style={styles.contentContainer}>
                        <View style={styles.headerRow}>
                            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                            <TouchableOpacity onPress={onToggleLike} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                                <Ionicons
                                    name={isLiked ? 'heart' : 'heart-outline'}
                                    size={22}
                                    color={isLiked ? colors.red : colors.white}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.priceRow}>
                            <Text style={styles.price}>{currentPrice}</Text>
                            <TouchableOpacity style={styles.orderButton} onPress={() => onItemBuy(item)}>
                                <Text style={styles.orderButtonText}>Order</Text>
                            </TouchableOpacity>
                        </View>

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

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.subTitle}>{item.title}</Text>
                            <Text style={styles.descriptionText} numberOfLines={2}>
                                {item.description}
                            </Text>
                            <Text style={styles.weightText}>
                                {currentWeight}
                            </Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default function ItemList() {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {mockItemData.map((item, index) => (
                <Card key={item.id} item={item} index={index} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    gradientCard: {
        marginTop: 10,
        borderRadius: 16,
        padding: 1,
    },
    item: {
        backgroundColor: colors.panel,
        padding: 12,
        gap: 12,
        minHeight: 120,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.shadowBorderColor,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 110,
        height: 110,
        resizeMode: "cover",
        borderRadius: 12,
    },
    badgeNew: {
        position: "absolute",
        top: 6,
        left: 6,
        backgroundColor: colors.red,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
    },
    badgeText: {
        color: colors.white,
        fontWeight: "700",
        fontSize: 11,
    },
    hitBadge: {
        backgroundColor: colors.green,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        gap: 6
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '700',
        flex: 1,
        marginRight: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
        gap: 12,
    },
    price: {
        color: colors.white,
        fontSize: 18,
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
    descriptionContainer: {
        gap: 4,
    },
    subTitle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    descriptionText: {
        color: colors.textColor,
        fontSize: 12,
        lineHeight: 16,
    },
    weightText: {
        color: colors.grey,
        fontSize: 12,
    }
});