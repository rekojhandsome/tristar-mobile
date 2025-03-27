import { View, Text, StyleSheet, SafeAreaView, Modal, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ApprovalPopup({ visible, onClose }) {
    const navigation = useNavigation(); 

    const leave = () => {
        onClose();
        navigation.navigate("LeavePage");
    };
    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <SafeAreaView style={styles.fill}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Waiting For Approval</Text>
                    <Image style={styles.image} source={require("../assets/images/person-sitting1.png")}/>
                    <Pressable onPress={leave} style={styles.button}>
                        <Text style={styles.buttonText}>Check Status</Text>
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
        width: 326,
        height: 350,
        padding: 20,
        backgroundColor: '#FBFBFB',
        borderRadiusBo: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 30,
        fontWeight: '400',
        marginBottom: 15,
        textAlign: 'center'
    },
    image:{
        width: 225,
        height: 190
    },
    button: {
        width: 197,
        height: 40,
        backgroundColor: '#32CD85',
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        position: 'absolute',
        top: 270,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
});
