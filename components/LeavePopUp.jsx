import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Modal, Button } from 'react-native';
import { TextInput } from 'react-native-web';

export default function ViewModal({ visible, onClose }) {
    return (
        <Modal visible={visible} animationType='slide' transparent={true} onRequestClose={onClose}>
            <SafeAreaView style={styles.fill}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Leave Details</Text>

                    <View style={styles.leaveDetails}>
                        <Text style={styles.leaveDetailsText}>Leave Type: Sick Leave</Text>
                        <Text style={styles.leaveDetailsText}>From: 11/12/23</Text>
                        <Text style={styles.leaveDetailsText}>To: 13/12/23</Text>
                        <Text style={styles.leaveDetailsText}>Reason: I am sick</Text>
                        <View style={styles.file}>
                            <Text style={styles.leaveDetailsText}>File Attachment: </Text>
                            <Button title='filename.jpg' ></Button>
                        </View>
                    </View>  
                    <Pressable onPress={onClose} style={styles.button}>
                        <Text style ={styles.buttonText}>Go back</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    fill: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    modalContainer: {
        width: 300,
        height: 250,
        padding: 20,
        backgroundColor: '#FBFBFB',
        borderRadius: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 30,
        marginBottom: 10
    },
    button:{
        width: 100,
        height: 30,
        backgroundColor: '#32CD85',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20
    },
    buttonText:{
        fontSize: 12,
        color: 'white'
    },
    leaveDetails:{
        width: '100%',
        alignSelf: 'flex-start',
        paddingLeft: 10,
    },
    leaveDetailsText:{
        fontSize: 18,
        marginBottom: 2
    },
    file:{
        flexDirection: 'row',
        alignItems: 'center',
        
    }

});
