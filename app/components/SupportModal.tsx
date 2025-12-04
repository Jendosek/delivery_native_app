import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, TextInput } from "react-native";
import { colors } from "../components/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const SupportModal = ({ onClose }) => {
    const [fistName, setFirstName] = useState('');
    const [number, setNumber] = useState('');
    const [text, setText] = useState('');

    const handleSand = () => {
        if (!fistName || !number || !text) {
            console.error('Please fill in all fields');
            return;
        }
        console.log('Support request sent:', { fistName, number, text });
        setFirstName('');
        setNumber('');
        setText('');
        onClose();
    }

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={true}
        >
            <View style={styles.modalOverlay}>
                <SafeAreaView style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close-circle" size={24} color={colors.title} />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        Write to us
                    </Text>
                    <View style={styles.wrap}>
                        <TextInput style={styles.input}
                            value={fistName}
                            placeholder="FirstName"
                            onChangeText={setFirstName}

                        />
                        <TextInput style={styles.input}
                            value={number}
                            placeholder="+380 XX XX XX XXX"
                            keyboardType="numeric"
                            onChangeText={setNumber}
                        />
                        <TextInput style={styles.input}
                            value={text}
                            placeholder="Text"
                            onChangeText={setText}
                        />
                        <TouchableOpacity style={styles.wrapButton}>
                            <Text style={styles.titleButton}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: colors.lightgrey,
        borderRadius: 10,
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    wrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: colors.green,
    },
    input: {
        height: 40,
        borderColor: colors.dark,
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        paddingRight: 16,
        width: 300,
        textAlign: 'center',
        color: colors.dark,
    },
    wrapButton: {
        backgroundColor: colors.green,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 10,
    },
    titleButton: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
    }
});

export default SupportModal;