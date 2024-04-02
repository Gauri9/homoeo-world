import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Input,
    NativeBaseProvider,
    Button,
    Box,
    Image,
    HStack,
    Spinner,
    Heading,
    theme,
  } from "native-base";

const OrderDetailsPage = () => {
  const orderData = {
    "user_id": "65dd8ffc3f33f89b5111f936",
    "order_items": [
      {
        "title": "Calcarea phosphorica 6x",
        "company": "SBL",
        "package": "Tablets",
        "size": "6x 25g",
        "MRP": 105,
        "discountedPercentage": 10,
        "quantity": 2
      },
      {
        "title": "Calcarea Flurocia 3x",
        "company": "Schwabe",
        "package": "Tablets",
        "size": "6x 50g",
        "MRP": 105,
        "discountedPercentage": 10,
        "quantity": 3
      }
    ],
    "order_status": "PENDING",
    "shipping_address": "Sky home PG",
    "order_total": 210,
    "order_instruction": "keep it outside the door",
    "delivery_date": "2024-03-24",
    "order_timestamp": "2024-03-17"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Order Details</Text>
      <View style={styles.orderInfoContainer}>
        <Text style={{color:'black'}}>User ID: {orderData.user_id}</Text>
        <Text style={{color:'black'}}>Order Status: {orderData.order_status}</Text>
        <Text style={{color:'black'}}>Shipping Address: {orderData.shipping_address}</Text>
        <Text style={{color:'black'}}>Order Total: {orderData.order_total}</Text>
        <Text style={{color:'black'}}>Order Instruction: {orderData.order_instruction}</Text>
        <Text style={{color:'black'}}>Delivery Date: {orderData.delivery_date}</Text>
        <Text style={{color:'black'}}>Order Timestamp: {orderData.order_timestamp}</Text>
      </View>
      <Text style={styles.sectionTitle}>Order Items</Text>
      {orderData.order_items.map((item, index) => (
        <View key={index} style={styles.orderItem}>
          <Text style={{color:'black'}}>Title: {item.title}</Text>
          <Text style={{color:'black'}}>Company: {item.company}</Text>
          <Text style={{color:'black'}}>Package: {item.package}</Text>
          <Text style={{color:'black'}}>Size: {item.size}</Text>
          <Text style={{color:'black'}}>MRP: {item.MRP}</Text>
          <Text style={{color:'black'}}>Discounted Percentage: {item.discountedPercentage}</Text>
          <Text style={{color:'black'}}>Quantity: {item.quantity}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  orderInfoContainer: {
    marginBottom: 20,
    // backgroundColor:'white'
  },
  orderItem: {
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white'
  },
});


export default () => {
    return (
      <NativeBaseProvider>
        <OrderDetailsPage />
      </NativeBaseProvider>
    );
  };
  
  