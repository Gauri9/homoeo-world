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
  // const [orderDetails, setOrderDetails] = useState();
  

  useEffect(() => {
    console.log('cart[0].subcategories', cart[0].subcategories)
    console.log('selectedAddress', selectedAddress)
    console.log(getUserId());
  },[isAddressSelected])

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

  const onCancel = async () => {
    setIsModalVisible(false);
  }

  const getUserId = async () => {
    const current_user = await api.getCurrentUser();
    console.log('current_user', current_user);
    const {user_id} = current_user;
    console.log('user_id', user_id);

    return user_id;
  }

  const getOrderItems = () => {

    var orderItems = [];

    for(let i=0;i<cart.length;i++){
      for(let j=0;j<cart[i].subcategories.length;j++){
        const orderItem = {
          "title": cart[i].title,
          "company": cart[i].company,
          "package": cart[i].subcategories[j]["Package"],
          "size": cart[i].subcategories[j]["Size"],
          "MRP": cart[i].subcategories[j]["MRP"],
          "discountedPercentage": cart[i].subcategories[j]["Discounted Percentage"],
          "quantity": 2
        }
        console.log("orderItem",orderItem);
        orderItems.push(orderItem)
      }
      
    }

    return orderItems;
  } 

  const onConfirm = async () => {
    console.log('inside onConfirm');
    setIsModalVisible(false);
      const orderData = {
        "user_id": await getUserId(),
        "order_items": getOrderItems(),
        "order_status": "PENDING",
        "shipping_address": selectedAddress,
        "order_total": calculatecartTotal(),
        "order_timestamp": (new Date()).toLocaleDateString('en-us', {day:'numeric', month:'long', year:'numeric'})
      };   
    console.log('order data', orderData);
    api.postOrderDetails(orderData)
    navigation.navigate("Order Placed");
  }


  const renderCartItem = (item, index) => (
    <View
      style={{flexDirection: "column"}}
      key={index} 
    >
      {item && item.subcategories && item.subcategories.map((subcategory, subIndex) => (
        (subcategory.quantity > 0 && 
          <View style={{flexDirection:"column", backgroundColor: "#fff", marginBottom: 10, padding: 10, borderRadius: 15, borderWidth: 0.5, borderColor: theme.primaryColor}}>

            {/* c1 */}
          <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"white"}}>
            <Text style={styles.itemName}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeItemfromCart(item._id, subcategory)} style={{}}>
              <Image source={require("HomoeoWorld/assets/icons/delete.png")} style={styles.icon} />
            </TouchableOpacity>
          </View>

           {/* c2 */}
          <View style={{flexDirection:"row"}}>
            {/* C3 */}
            <View style={styles.cartItemInfo}>
                <Text style={{ color: 'black' }}>{item.company}</Text>
                <Text style={{ color: 'black' }}>{subcategory.Package} | {subcategory.Size}</Text>

                <View style = {{display: 'flex', flexDirection: 'row'}}>
                  <Text style={{color: 'black'}}>₹ {(subcategory.MRP - subcategory.MRP*subcategory['Discounted Percentage']*0.01)*subcategory.quantity}  </Text>
                  <Text style={{ color: 'black', textDecorationLine:"line-through", color:'grey'}}>MRP: ₹{subcategory.MRP*subcategory.quantity}</Text>
                </View>
            
            </View>

            {/* C4 */}
            <View style={styles.quantityContainer}>

            <TouchableOpacity onPress={() => decrementQuantity(item, subcategory)} style={styles.quantityButton} >
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
          </View>
        </View>
        )
      ))}
      
    </View>
  );
  

  const calculatecartTotal = () => {
    console.log('calculatecartTotal...')
    return totalMRP() - discountedPrice();
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
                    Delivery Address
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
            <Text style={{color:'black', fontSize: 16, marginVertical: 12 }}>
              Payment Details
            </Text>
            <Card style={styles.paymentDetailsContainer}>
              <View style={styles.detailRow}>
                <Text style={{color:"black"}}>Total MRP</Text>
                <Text style={{color:"black"}}>₹ {totalMRP()}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={{color:"black"}}>Discount on MRP</Text>
                <Text style={{color:"black"}}>₹ {totalMRP() - discountedPrice()}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={{color:"black"}}>Shipping Fee</Text>
                <Text style={{color:"black"}}>FREE</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.detailRow}>
              <Text style={styles.orderTotalText}>Total Amount</Text>
                <Text style={styles.orderTotalText}>₹ {discountedPrice()}</Text>
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

      <OrderDetailsModal isVisible={isModalVisible} onConfirm={onConfirm} onCancel={onCancel}  />
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