import React, { useEffect, useState } from "react";
import {View, FlatList, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { NativeBaseProvider, Card, Box, Row, Image, Button } from "native-base";
import Footer from '../../components/Footer/Footer';
import * as auth from "HomoeoWorld/src/utils/auth.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme } from "HomoeoWorld/src/utils/theme.js";
import { useCart } from "../../Context/CartContext";
import styles from "./styles";

function Cart() {
  const navigation = useNavigation();
  const route = useRoute();
  const {cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, emptyMyCart} = useCart()

  const [selectedAddress, setSelectedAddress] = useState("");
  const [isAddressSelected, setIsAddressSelected] = useState(false);

   useEffect(() => {
    async function addressSelection() {
      console.log("Address Selection useEffect...");
      if (route.params !== undefined && route.params.selectedAddress !== undefined) {
        setSelectedAddress(route.params.selectedAddress);
        console.log('selectedAddress', selectedAddress)
        setIsAddressSelected(true);
      }
    }
    addressSelection();
  }, [route]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onAddItemsPress = () => {
     navigation.navigate('Product List');
  }

  const removeItemfromCart = async (productId, subcategory) => {
    console.log("removeItemfromCart...");
    removeFromCart(productId, subcategory)
  };

  const onSelectAddressPress = async () => {
    console.log("onSelectAddressPress...");
    navigation.navigate("Select Address");
  };

  const onChangeAddressPress = async () => {
    console.log("onChangeAddressPress...");
    navigation.navigate("Select Address");
  };

  const onConfirmOrderPress = async () => {
    console.log("onConfirmOrderPress...");
    navigation.navigate("Order Placed");
  };


  const renderCartItem = (item, index) => (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "white",
        marginBottom: 20,
      }}
      key={index} 
    >
      {item.subcategories.map((subcategory, subIndex) => (
        (subcategory.quantity > 0 && 
        <View style={styles.cartItem} key={subIndex}>
          <View style={styles.cartItemInfo}>
          <View style={styles.removeButtonContainer}>
            <Text style={styles.itemName}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeItemfromCart(item._id, subcategory)} style={styles.removeButton}>
              <Image source={require("HomoeoWorld/assets/icons/delete.png")} style={styles.icon} />
            </TouchableOpacity>
          </View>
            <Text style={{ color: 'black' }}>{item.company}</Text>
            <Text style={{ color: 'black' }}>{subcategory.Package} | {subcategory.Size}</Text>
          </View>
  
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decrementQuantity(item, subcategory)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
  
            <Text style={styles.quantity}>{subcategory.quantity}</Text>
  
            <TouchableOpacity
              onPress={() => incrementQuantity(item, subcategory)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.removeButtonContainer}>
            <TouchableOpacity onPress={() => removeItemfromCart(item._id, subcategory)} style={styles.removeButton}>
              <Image source={require("HomoeoWorld/assets/icons/delete.png")} style={styles.icon} />
              {/* <Text style={{ color: theme.primaryColor }}>Remove</Text> */}
            </TouchableOpacity>
          </View>
        <View style={styles.separator} />
        </View>)
      ))}
      
    </View>
  );
  

  const calculatecartTotal = () => {
    console.log('calculatecartTotal...')
    
  }

  const totalMRP = () => {
    let totalMRP = 0
    cart.forEach(item => {
      item.subcategories.forEach(subcategory => {
        totalMRP = totalMRP + subcategory.quantity*subcategory.MRP
      })
    })
    console.log('totalMRP', totalMRP)
    return totalMRP;
  }

  const discountedPrice = () => {
    let dp = 0;
    cart.forEach(item => {
      item.subcategories.forEach(subcategory => {
        dp = dp + (subcategory.MRP - subcategory.MRP*subcategory['Discounted Percentage']*0.01);
      })
    })
    return dp;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.cartList}>
        {cart.length !== 0 && (
          <>
            {cart.map((item, index) => renderCartItem(item, index))}
            {isAddressSelected && (
              <View style={{marginVertical: 15}}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.addressHeaderText}>
                    Deliver to this address
                  </Text>
                  <TouchableOpacity onPress={onChangeAddressPress} style={styles.changeButton}>
                    <Text style={{ color: theme.primaryColor, fontWeight: 'bold' }}>Change</Text>
                  </TouchableOpacity>
                </View>
                <Box shadow={1} style={styles.addressCard}>
                  <Text style={{ flex: 1, color:'black' }}>{selectedAddress}</Text>
                </Box>
              </View>
            )}
            <Text style={{ fontSize: 18, marginVertical: 12 }}>
              Payment Details
            </Text>
            <Card style={styles.paymentDetailsContainer}>
              <View style={styles.detailRow}>
                <Text style={{color:"black"}}>Total MRP</Text>
                <Text style={{color:"black"}}>{totalMRP()}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={{color:"black"}}>Discount on MRP</Text>
                <Text style={{color:"black"}}>{discountedPrice()}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={{color:"black"}}>Shipping Fee</Text>
                <Text style={{color:"black"}}>FREE</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.detailRow}>
              <Text style={styles.orderTotalText}>Total Amount</Text>
                <Text style={styles.orderTotalText}>{totalMRP()}</Text>
              </View>
            </Card>
          </>
        )}
        {cart.length === 0 && 
        <View style={{ justifyContent:'center', alignItems:'center', alignContent:'center'}}>
          <Text style={{color:"black"}}>No items in the Cart</Text>
          <Button onPress={onAddItemsPress} style={styles.button}>+ Start Shopping</Button>
        </View>
        }
      </ScrollView>

      {!isAddressSelected && (
        <TouchableOpacity
          onPress={onSelectAddressPress}
          disabled={cart.length === 0}
          style={[
            styles.checkoutButton,
            cart.length === 0 && styles.disabledButton,
          ]}
        >
          <Text style={styles.checkoutButtonText}>Select Address</Text>
        </TouchableOpacity>
      )}

      {isAddressSelected && (
        <TouchableOpacity
          onPress={onConfirmOrderPress}
          style={styles.checkoutButton}
        >
          <Text style={styles.checkoutButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}


export default () => {
  return (
    <NativeBaseProvider>
      <Cart />
      {/* <Footer currentScreen='Cart'/> */}
    </NativeBaseProvider>
  );
};``