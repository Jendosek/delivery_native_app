import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../components/Colors';

const PhoneRow = ({ phone }: { phone: string }) => (
  <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)} style={styles.row}>
    <Image source={require('../../assets/images/settingsScreen/icon-telephone.png')} style={styles.rowIcon} />
    <Text style={styles.rowText}>{phone}</Text>
  </TouchableOpacity>
);

const SocialIcon = ({ icon, url }: { icon: any; url: string }) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)}>
    <Image source={icon} style={styles.socialIcon} />
  </TouchableOpacity>
);

export default function ContactsScreen() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Contacts</Text>

          <Text style={styles.sectionTitle}>Phone numbers</Text>
          <View style={styles.block}>
            <PhoneRow phone={'+1 415-555-0101'} />
            <PhoneRow phone={'+1 415-555-0137'} />
          </View>

          <Text style={styles.sectionTitle}>We are on social media</Text>
          <View style={[styles.block, styles.socialRow]}>
            <SocialIcon icon={require('../../assets/images/settingsScreen/icon-instagram.png')} url={'https://instagram.com'} />
            <SocialIcon icon={require('../../assets/images/settingsScreen/icon-telegram.png')} url={'https://t.me'} />
            <SocialIcon icon={require('../../assets/images/settingsScreen/icon-viber.png')} url={'https://www.viber.com'} />
          </View>

          <Text style={styles.sectionTitle}>Pickup address</Text>
          <TouchableOpacity style={[styles.addressHeader, styles.block]} onPress={() => setShowDetails((v) => !v)}>
            <Image source={require('../../assets/images/settingsScreen/icon-location.png')} style={styles.rowIcon} />
            <Text style={[styles.rowText, { flex: 1 }]}>123 Market St, San Francisco, CA</Text>
            <Image
              source={require('../../assets/images/settingsScreen/icon-down-arrow.png')}
              style={[styles.arrow, showDetails ? styles.arrowUp : styles.arrowDown]}
            />
          </TouchableOpacity>

          {showDetails && (
            <View style={[styles.block, styles.details]}>
              <View style={styles.row}>
                <Image source={require('../../assets/images/settingsScreen/icon-email.png')} style={styles.rowIcon} />
                <Text style={styles.detailsText}>support@pronto.com</Text>
              </View>
              <View style={styles.row}>
                <Image source={require('../../assets/images/settingsScreen/icon-schedule.png')} style={styles.rowIcon} />
                <Text style={styles.detailsText}>Mon–Sun: 10:00 – 21:00</Text>
              </View>
              <TouchableOpacity onPress={() => Linking.openURL('https://maps.google.com/?q=123 Market St, San Francisco, CA')} style={styles.openMapRow}>
                <Text style={styles.openMapText}>Open in Google Maps</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  title: { color: colors.title, fontWeight: '900', fontSize: 22 },
  sectionTitle: { color: colors.title, fontWeight: '800', marginTop: 8 },
  block: {
    backgroundColor: colors.panel,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.shadowBorderColor,
    padding: 12,
    gap: 10,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowIcon: { width: 22, height: 22, tintColor: colors.title },
  rowText: { color: colors.title, fontWeight: '600' },
  socialRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  socialIcon: { width: 36, height: 36, tintColor: colors.title },
  addressHeader: { flexDirection: 'row', alignItems: 'center' },
  arrow: { width: 20, height: 20, tintColor: colors.title },
  arrowUp: { transform: [{ rotate: '180deg' }] },
  arrowDown: {},
  details: { gap: 10, borderTopWidth: 1, borderColor: colors.borderMuted },
  detailsText: { color: colors.grey },
  openMapRow: { paddingVertical: 8 },
  openMapText: { color: colors.green, fontWeight: '700' },
});
