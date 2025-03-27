import { SafeAreaView, View, Text,StyleSheet, Pressable } from "react-native";
import { Modal } from "react-native";
import { useState } from "react";
import ApprovalPopup from "./ApprovalPopup";

export default function ConfirmLeaveModal({visible, onClose, navigation}){

    const [approvalVisible, setApprovalVisible] = useState(false);

    const handleProceed = () => {
        onClose();
        setApprovalVisible(true);
    }
    return(
        <>
        <Modal visible = {visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <SafeAreaView style={styles.fill}>
                <View style={styles.modalContainer}>
                    <Text style ={styles.modalText}>Confirm Leave Application?</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable onPress={onClose} style={[styles.button, styles.buttonCancel]}>
                                <Text style ={styles.buttonText}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={handleProceed} style={styles.button} >
                                <Text style ={styles.buttonText}>Proceed</Text>
                            </Pressable>
                        </View>
                </View>
            </SafeAreaView>
        </Modal>

        {/* Approval Popup */}
        <ApprovalPopup visible={approvalVisible} onClose={() => setApprovalVisible(false)}  navigation={navigation}/>
        </>
    );
}

const styles = StyleSheet.create({
    fill:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    modalContainer: {
        width: 250,
        height: 120,
        padding: 20,
        backgroundColor: '#FBFBFB',
        borderRadius: 20,
        alignItems: 'center',
    },
    modalText:{
        fontSize: 20,
        marginBottom: 15
    },
    buttonContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%',  // Ensures buttons take full container width
        marginTop: 10,  // A
    },
    button:{
        flex: 1,
        height: 30,
        backgroundColor: '#32CD85',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    buttonCancel: {
        backgroundColor: '#FF4C4C', // Red color for cancel button
    },
    buttonProceed: {
        backgroundColor: '#32CD85', // Green color for proceed button
    },
    buttonText:{
        fontSize: 12,
        color: 'white'
    },
})