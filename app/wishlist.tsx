import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from './components/Colors';
import { useOrderWishStore } from './store/indexWishStore';
import { useOrderStore } from './store/index';
import type { Item } from './components/MockData';

export default function WishListScreen() {
    const orders = useOrderWishStore((s) => s.orders);
    const removeOrderWishItem = useOrderWishStore((s) => s.removeOrderWishItem);
    const getPriceForSize = useOrderWishStore((s) => s.getPriceForSize);

    const addToCart = useOrderStore((s) => s.setOrders);
    const getOrderPriceForPizza = useOrderStore((s) => s.getPriceForPizza);

    const onRemove = (item: Item) => removeOrderWishItem(item);
    const onBuy = (item: Item) => {
        const priceForSize = getOrderPriceForPizza(item);
        addToCart({ ...item, price: priceForSize });
        removeOrderWishItem(item);
    };

    const renderRow = ({ item }: { item: Item }) => {
        const price = getPriceForSize(item);
        return (
            <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.price}>{price}</Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn, styles.buy]} onPress={() => onBuy(item)}>
                            <Text style={styles.btnText}>Buy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, styles.remove]} onPress={() => onRemove(item)}>
                            <Text style={styles.btnText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                {orders.length === 0 ? (
                    <View style={styles.empty}>
                        <Image source={require('../assets/images/header/icon-like.png')} style={styles.emptyIcon} />
                        <Text style={styles.emptyText}>Your wishlist is empty</Text>
                    </View>
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(i) => `${i.id}-${i.selectedSize}`}
                        renderItem={renderRow}
                        contentContainerStyle={{ padding: 16 }}
                    />
                )}
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        flexDirection: 'row',
        backgroundColor: colors.panel,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.shadowBorderColor,
        padding: 12,
        marginBottom: 12,
        gap: 12,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12
    },
    info: {
        flex: 1,
        gap: 6
    },
    row: {
        flexDirection: 'row',
        gap: 8
    },
    title: {
        color: colors.title,
        fontWeight: '700',
        fontSize: 16
    },
    price: {
        color: colors.newPriceColor,
        fontWeight: '700'
    },
    btn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
    },
    buy: {
        borderColor: colors.green
    },
    remove: {
        borderColor: colors.red
    },
    btnText: {
        color: colors.title,
        fontWeight: '700'
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
    emptyIcon: {
        width: 42,
        height: 42,
        tintColor: colors.red
    },
    emptyText: {
        color: colors.grey
    },
});
