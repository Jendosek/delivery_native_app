import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../components/Colors';
import MapView, { Marker } from 'react-native-maps';

const InfoCard = ({ icon, title, description }: { icon: any; title: string; description: string }) => (
  <View style={styles.card}>
    <Image source={icon} style={styles.icon} />
    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{description}</Text>
    </View>
  </View>
);

export default function DeliveryScreen() {
  const region = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Terms of delivery</Text>
          <Text style={styles.subtitle}>Delivery time from 10a.m – 21p.m</Text>

          <View style={styles.mapWrap}>
            <MapView style={styles.map} region={region}>
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="Delivery Location" />
            </MapView>
          </View>

          <Text style={styles.sectionTitle}>Payment options</Text>
          <InfoCard
            icon={require('../../assets/images/settingsScreen/icon-credit-card.png')}
            title="Card online"
            description="Secure card payments via your bank provider."
          />
          <InfoCard
            icon={require('../../assets/images/settingsScreen/icon-cash.png')}
            title="Cash"
            description="Pay with cash to the courier upon delivery."
          />
          <InfoCard
            icon={require('../../assets/images/settingsScreen/icon-wallet.png')}
            title="Digital wallet"
            description="Fast payment using your saved wallet apps."
          />

          <Text style={styles.sectionTitle}>Types of orders</Text>
          <InfoCard
            icon={require('../../assets/images/settingsScreen/icon-pizza-deliver.png')}
            title="Delivery"
            description="Courier brings the order to your address."
          />
          <InfoCard
            icon={require('../../assets/images/settingsScreen/icon-takeaway.png')}
            title="Pickup"
            description="Pick up the order from our store."
          />
          <InfoCard
            icon={require('../../assets/images/settingsScreen/icon-schedule.png')}
            title="Pre-order"
            description="Schedule your order for a specific time."
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  title: { color: colors.title, fontWeight: '900', fontSize: 22 },
  subtitle: { color: colors.grey, fontSize: 12 },
  sectionTitle: { color: colors.title, fontWeight: '800', marginTop: 8, marginBottom: 4 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.panel,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.shadowBorderColor,
    padding: 12,
  },
  icon: { width: 28, height: 28, tintColor: colors.title },
  cardTitle: { color: colors.title, fontWeight: '700' },
  cardDesc: { color: colors.grey, fontSize: 12 },
  mapWrap: { height: 200, borderRadius: 12, overflow: 'hidden', marginTop: 8 },
  map: { flex: 1 },
});
