import React,{useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {Image} from 'native-base'
import { useNavigation } from "@react-navigation/native";
import { theme } from "HomoeoWorld/src/utils/theme.js";

const Footer = (props) => {
  const navigation = useNavigation();

  // const [currentScreen, setCurrentScreen] = useState('Home');
  const {currentScreen} = props;

  const onHomePress = () => {
    console.log("onHomePress...");
    // setCurrentScreen('Product List')
    navigation.navigate("Home");
  };

  const onCartPress = () => {
    console.log("onCartPress...");
    // setCurrentScreen('Cart')
    navigation.navigate("Cart");
  };

  const onOrdersPress = () => {
    console.log("onOrdersPress...");
    // setCurrentScreen('Orders')
    navigation.navigate('Orders')
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity activeOpacity={.7} onPress={onHomePress} style={[styles.footerButton, currentScreen==='Home'&& styles.footerButtonAlt]}>
        <Image source={require("HomoeoWorld/assets/icons/home-white.png")} 
        alt="No Image" 
        style={styles.icon}/>
        <Text style={styles.footerButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.7} onPress={onCartPress} style={[styles.footerButton, currentScreen==='Cart' && styles.footerButtonAlt]}>
        <Image source={require("HomoeoWorld/assets/icons/cart-white.png")} 
        alt="No Image" 
        style={styles.icon}/>
        <Text style={styles.footerButtonText}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.7} onPress={onOrdersPress} style={[styles.footerButton, currentScreen==='Orders' && styles.footerButtonAlt]}>
        <Image source={require("HomoeoWorld/assets/icons/order-history-white.png")}
        alt="No Image"  
        style={styles.icon}/>
        <Text style={styles.footerButtonText}>Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor:'white'
  },
  footerButton: {
    flex: 1,
    paddingVertical: 7,
    backgroundColor: "#0284c7",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "white",
  },
  footerButtonAlt: {
    flex: 1,
    paddingVertical: 7,
    backgroundColor: "#0ea5e9",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "white",
  },
  footerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  icon:{
      height: 16,
      width: 16
  }
});

export default Footer;
