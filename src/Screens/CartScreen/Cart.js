import React, { useEffect, useState } from "react";
import {View, FlatList, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { NativeBaseProvider, Card, Box, Row, Image, Button } from "native-base";
import Footer from '../../components/Footer/Footer';
import * as auth from "HomoeoWorld/src/utils/auth.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme } from "HomoeoWorld/src/utils/theme.js";
import { useCart } from "../../Context/CartContext";
import styles from "./styles";
import OrderDetailsModal from '../../components/OrderDetailsModal/OrderDetailsModal';
import * as api from '../../utils/api.js'
// import AddressFormModal from "../../components/AddressForm/AddressFormModal.js";

function Cart() {
  const navigation = useNavigation();
  const route = useRoute();
  const {cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, emptyMyCart} = useCart()

  const [selectedAddress, setSelectedAddress] = useState("");
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState();
  

  // useEffect(() => {
  //   emptyMyCart();
  // },[])

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
     navigation.navigate('Home');
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
    setIsModalVisible(true);
    // navigation.navigate("Order Placed");
  };

  const onClose = async () => {
    setIsModalVisible(false);
      const orderData = {
        "user_id": "65dd8ffc3f33f89b5111f936",
        "order_items": [
            {"title": "testing-2",
            "company": "SBL",
            "package": "Tablets",
            "size": "6x 25g",
            "MRP": 105,
            "discountedPercentage": 10,
            "quantity": 2
            },
            {"title": "Calcarea Flurocia 3x",
            "company": "Schwabe",
            "package": "Tablets",
            "size": "6x 50g",
            "MRP": 105,
            "discountedPercentage": 10,
            "quantity": 3
            }
        ],
        "order_status": "PENDING",
        "shipping_address": "Vishal PG",
        "order_total": 210,
        "order_instruction": "keep it outside the door",
        "delivery_date": "2024-03-24",
        "order_timestamp": "2024-03-17"
      };   
      api.postOrderDetails(orderData)
    navigation.navigate("Order Placed");
  }


  const renderCartItem = (item, index) => (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "white",
        marginBottom: 20,
      }}
      key={index} 
    >
      {item && item.subcategories && item.subcategories.map((subcategory, subIndex) => (
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

            <View style = {{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>₹ {(subcategory.MRP - subcategory.MRP*subcategory['Discounted Percentage']*0.01)*subcategory.quantity}  </Text>
              <Text style={{ color: 'black', textDecorationLine:"line-through"}}>MRP: ₹{subcategory.MRP*subcategory.quantity}</Text>
            </View>
            
            {/* <Text style={{color: 'black'}}>₹{subcategory.MRP - subcategory.MRP*subcategory['Discounted Percentage']*0.01}</Text> */}
            {/* <Text style={{ color: 'black', textDecorationLine:"line-through"}}>Rs. {subcategory.MRP*subcategory.quantity}</Text> */}

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
        totalMRP = totalMRP + subcategory.MRP*subcategory.quantity
      })
    })
    console.log('totalMRP', totalMRP)
    return totalMRP;
  }

  const discountedPrice = () => {
    let dp = 0;
    cart.forEach(item => {
      item.subcategories.forEach(subcategory => {
        dp = dp + (subcategory.MRP - subcategory.MRP*subcategory['Discounted Percentage']*0.01)*subcategory.quantity;
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
                <Text style={{color:"black"}}>{totalMRP() - discountedPrice()}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={{color:"black"}}>Shipping Fee</Text>
                <Text style={{color:"black"}}>FREE</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.detailRow}>
              <Text style={styles.orderTotalText}>Total Amount</Text>
                <Text style={styles.orderTotalText}>{discountedPrice()}</Text>
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

      <OrderDetailsModal isVisible={isModalVisible} onClose={onClose} />
      {/* <AddressFormModal isVisible={isModalVisible} onSave={handleSaveAddress} onClose={toggleModal} /> */}

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