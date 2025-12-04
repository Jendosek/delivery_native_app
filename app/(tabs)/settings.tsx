import React, {useState} from "react";

import { colors } from "../components/Colors";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SupportModal from "../components/SupportModal";


export default function SettingsScreen() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const onPressSupport = () => {
    setShowModal(true);
  }

  const ListItem = (({ iconCard, title, iconArrow, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.wrap}>
        <View style={styles.listItem}>
          <Image source={iconCard} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
          <Image source={iconArrow} style={styles.icon} />
        </View>
      </TouchableOpacity>
    )
  })

  return (
    <View style={styles.container}>
      <ListItem
        iconCard={require('../../assets/images/settingsScreen/icon-team.png')}
        title='About Us'
        iconArrow={require('../../assets/images/settingsScreen/icon-right-arrow.png')}
        onPress={() => { }}
      />
      <ListItem
        iconCard={require('../../assets/images/settingsScreen/icon-pay.png')}
        title='Delivery and Payment'
        iconArrow={require('../../assets/images/settingsScreen/icon-right-arrow.png')}
        onPress={() => { }}
      />
      <ListItem
        iconCard={require('../../assets/images/settingsScreen/icon-contacts.png')}
        title='Contacts'
        iconArrow={require('../../assets/images/settingsScreen/icon-right-arrow.png')}
        onPress={() => { }}
      />
      <ListItem
        iconCard={require('../../assets/images/settingsScreen/icon-suport.png')}
        title='Support'
        iconArrow={require('../../assets/images/settingsScreen/icon-right-arrow.png')}
        onPress={onPressSupport}
      />
      {showModal && (
        <SupportModal onClose={() => setShowModal(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.itemBackground
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainBackground
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 8,
    padding: 10,
    margin: 5
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 5
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: colors.textColor
  }
});
