import React from "react";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { ItemDetailScreen } from "../components/ItemDetail";
import type { Item } from "../components/MockData";

type ItemDetailsParams = { 
    'item-details': {
        item: Item;
        togglePizzaSize: (item: Item) => void;
    }
}
export default function ItemDetailsRoute() {
    const route = useRoute<RouteProp<ItemDetailsParams, 'item-details'>>();
    return <ItemDetailScreen route={route} />;
}