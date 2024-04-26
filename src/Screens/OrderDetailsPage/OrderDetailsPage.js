import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
    Input,
    NativeBaseProvider,
    Button,
    Box,
    Image,
    HStack,
    Spinner,
    Heading,
  } from "native-base";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import {theme} from '../../utils/theme.js'

const OrderDetailsPage = () => {

  const [orderData, setOrdersData] = useState({});

  const route = useRoute();
  const item = route.params.item;
  console.log('item', item)

  useEffect(() => {
    const orderData = {
      "user_id": item._id,
      "order_items": item.order_items,
      "order_status": item.order_status,
      "shipping_address": item.shipping_address,
      "order_total": item.order_total,
      "order_instruction": item.order_instruction,
      "delivery_date": formatDate(item.delivery_date),
      "order_timestamp": formatDate(item.order_timestamp)
    };

    setOrdersData(orderData);

  },[])

  const formatDate = (unformatted_date) => {
    const date = new Date(unformatted_date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <View style={styles.orderInfoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Status:</Text>
            <Text style={styles.infoText}>{orderData.order_status}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Shipping Address:</Text>
            <Text style={styles.infoText}>{orderData.shipping_address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Total:</Text>
            <Text style={styles.infoText}>{orderData.order_total}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Delivery Date:</Text>
            <Text style={styles.infoText}>{orderData.delivery_date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Timestamp:</Text>
            <Text style={styles.infoText}>{orderData.order_timestamp}</Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {orderData && orderData.order_items && orderData.order_items.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemText}>Company: {item.company}</Text>
            <Text style={styles.itemText}>Package: {item.package}</Text>
            <Text style={styles.itemText}>Size: {item.size}</Text>
            <Text style={styles.itemText}>MRP: {item.MRP}</Text>
            <Text style={styles.itemText}>Discounted Percentage: {item.discountedPercentage}</Text>
            <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.primaryColor,
  },
  orderInfoContainer: {},
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    flex: 1,
    fontWeight: 'bold',
    color: '#555',
  },
  infoText: {
    flex: 2,
    color: '#333',
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  itemText: {
    marginBottom: 5,
    color: '#333',
  },


});


export default () => {
    return (
      <NativeBaseProvider>
        <OrderDetailsPage />
      </NativeBaseProvider>
    );
  };
  
  