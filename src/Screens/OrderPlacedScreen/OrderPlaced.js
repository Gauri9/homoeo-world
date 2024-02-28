import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { theme } from "HomoeoWorld/src/utils/theme.js";
import styles from "./styles";

function OrderPlaced() {
  const navigation = useNavigation();

  const handleDonePress = () => {
    console.log("handleDonePress...");
    navigation.navigate("Product List");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require("HomoeoWorld/assets/approval-256.png")} 
        alt="No Image" 
        style={styles.image} />
        <Text style={styles.orderPlacedText}>Order Placed</Text>
        {/* Add your existing content here */}
      </View>

      {/* Footer with the "Done" button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => handleDonePress()}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         backgroundColor: '#7dd3fc'
//       },
//       content: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       image: {
//         width: 150,
//         height: 150,
//       },
//       footer: {
//         backgroundColor: theme.primaryColor,
//         paddingHorizontal: 20,
//         paddingVertical: 5,
//       },
//       doneButton: {
//         // backgroundColor: 'green',
//         paddingVertical: 5,
//         alignItems: 'center',
//         borderRadius: 10,
//         // borderWidth:1,
//         // borderColor:'white'
//       },
//       doneButtonText: {
//         color: 'white',
//         fontSize: 20,
//         fontWeight: 'bold',
//       },
// });

export default () => {
  return (
    <NativeBaseProvider>
      <OrderPlaced />
    </NativeBaseProvider>
  );
};
