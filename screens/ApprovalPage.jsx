import react from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, Image } from 'react-native';

export default function ApprovalPage({navigation}) {
return(
    <SafeAreaView>
        <View style={styles.header}>
            <Text style={styles.headerText}>Approval page</Text>
            <Pressable style={styles.headerButton} onPress={() => navigation.navigate("Homepage")}>
                <Text style={styles.headerButtonText}>Go back</Text>
            </Pressable>
        </View>
    </SafeAreaView>
)
}
const styles = StyleSheet.create({
    header: {
    height: 71,
    width: "100%",
    backgroundColor: "#70907C",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  headerButton: {
    position: "absolute",
    left: 15,
  },
  headerButtonText:{
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  }
})
