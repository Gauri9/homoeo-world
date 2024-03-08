import React, { useEffect, useState } from "react";
import {View, FlatList, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { NativeBaseProvider, Card, Box, Row, Image, Button } from "native-base";
import Footer from '../../components/Footer/Footer';
import * as auth from "HomoeoWorld/src/utils/auth.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { borderLeft, flex, marginBottom } from "styled-system";
import { theme } from "HomoeoWorld/src/utils/theme.js";
import { useCart } from "../../Context/CartContext";
import styles from "./styles";

function Cart() {
  const navigation = useNavigation();
  const {cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity} = useCart()
  console.log('cart...', cart)

  const route = useRoute();
  // console.log("route: ", route);

  const [cartItems, setCartItems] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isAddressSelected, setIsAddressSelected] = useState(false);


  useEffect(() => {
    async function fetchData() {
      console.log("fetchData...");
      if (
        route.params !== undefined &&
        route.params.selectedAddress !== undefined
      ) {
        setSelectedAddress(route.params.selectedAddress);
        setIsAddressSelected(true);
        // console.log('selectedAddress: ', selectedAddress)
      }

      try {
        const response = await auth.getAuthAndCartData();

        if (response) {
          setAuthToken(response.authToken);
          setCartItems(response.cart);
        }
      } catch (error) {
        console.error("Cart Screen: Error fetching the cart data:", error);
      }
    }

    fetchData();
  }, [route]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const updateCartData = async () => {
      // console.log('cartItems changed:', cartItems);
      const response = await auth.storeAuthAndCartData(authToken, cartItems);
      // console.log('storeAuthAndCartData Response: ', response);
    };

    updateCartData();
  }, [cartItems]);

  const onAddItemsPress = () => {
     navigation.navigate('Product List');
  }

  const removeItemfromCart = async (productId) => {
    console.log("removeItemfromCart...");

    removeFromCart(productId)
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
    >
      <View style={styles.cartItem} key={index}>
        <View style={styles.cartItemInfo}>
          <Text style={styles.itemName}>{item.title}</Text>
          {/* <Text style={styles.itemPrice}>{item.MRP}</Text> */}
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => decrementQuantity(item._id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => incrementQuantity(item._id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.removeButtonContainer}>
        <TouchableOpacity onPress={() => removeItemfromCart(item._id)} style={styles.removeButton}>
           <Image source={require("HomoeoWorld/assets/icons/delete.png")} style={styles.icon}/>
            <Text style={{ color: theme.primaryColor }}>Remove</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </View>
  );

  const calculatecartTotal = () => {
    console.log('calculatecartTotal...')
    let cartTotal = 0;
    cartItems.forEach((item)=>{
      console.log(cartItems);
      // cartTotal = cartTotal + item.price.split(' ')[1] * item.quantity;
      cartTotal = 20
    })
    return cartTotal;
  }

  const cartTotal = calculatecartTotal();
  const medicineDiscount = 0;
  const couponDiscount = 0;
  // const orderTotal = cartTotal - medicineDiscount - couponDiscount;

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
                <Text style={{color:"black"}}>Cart Total:</Text>
                <Text style={{color:"black"}}>{cartTotal}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={{color:"black"}}>Medicine Discount:</Text>
                <Text style={{color:"black"}}>{medicineDiscount}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={{color:"black"}}>Coupon Discount:</Text>
                <Text style={{color:"black"}}>{couponDiscount}</Text>
              </View>

              <View style={styles.detailRow}>
              <Text style={[styles.orderTotalText, { color: 'black' }]}>Order Total:</Text>
                <Text style={[styles.orderTotal, {color:'green'}]}>{cartTotal - medicineDiscount - couponDiscount}</Text>
              </View>
            </Card>
          </>
        )}
        {cartItems.length === 0 && 
        <View style={{ justifyContent:'center', alignItems:'center', alignContent:'center'}}>
          <Text style={{color:"black"}}>No items in the Cart</Text>
          <Button onPress={onAddItemsPress} style={styles.button}>+ Start Shopping</Button>
        </View>
        }
      </ScrollView>

      {!isAddressSelected && (
        <TouchableOpacity
          onPress={onSelectAddressPress}
          disabled={cartItems.length === 0}
          style={[
            styles.checkoutButton,
            cartItems.length === 0 && styles.disabledButton,
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