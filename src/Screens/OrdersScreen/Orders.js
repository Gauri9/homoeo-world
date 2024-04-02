import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NativeBaseProvider, Card, Box, Heading, Divider, Row, Image, Button} from 'native-base';
import * as api from '../../utils/api.js'

import Footer from '../../components/Footer/Footer';
import {theme} from '../../utils/theme.js'

function Orders() {
  const [selectedOption, setSelectedOption] = useState('delivery');
  const [ordersData, setOrdersData] = useState([])

  useEffect(() => {
     fetchData = async () =>{
      const response = await api.getOrdersData();
      setOrdersData(response.data)
      console.log('ordersData', ordersData)
    }
    fetchData();
  }, [])

  
  const renderItem = ({item}) => (
    <Box
      bg="white"
      p={4}
      borderWidth={1}
      borderColor="gray.300"
      borderRadius={8}
      style= {styles.Box}
    >
      <Text style={{color:'black', fontWeight:"bold"}}>Order ID: {item._id}</Text>
      <Divider my={2} />
      <Text style={{color:'black'}}>Cart Total: Rs. {item.order_total}</Text>
      <Text style={{color:"black"}} >Shipping Address: {item.shipping_address}</Text>
      <Text style={{color:"black"}}>Order Placed: {item.order_timestamp}</Text>
      {item.order_status === "DELIVERED"  && 
        <Text>Delivery Date: {item.delivery_date}</Text> 
      }

      <Divider my={2}/>
      <Text style={{color:'green', fontWeight:'bold'}}>Order Status: {item.order_status}</Text>
    </Box>
  )

  return (
    <View style={styles.container}>
      <View style={styles.radioButtons}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            selectedOption === 'delivery' && styles.selected,
          ]}
          onPress={() => setSelectedOption('delivery')}
        >
        <Text style={[styles.radioButtonText, styles.radioText,selectedOption === 'delivery' && styles.radioTextSelected]}>Delivery Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            selectedOption === 'takeaway' && styles.selected,
          ]}
          onPress={() => setSelectedOption('takeaway')}
        >
          <Text style={[styles.radioButtonText, styles.radioText, selectedOption === 'takeaway' && styles.radioTextSelected]}>Takeaway Orders</Text>
        </TouchableOpacity>
      </View>
      {/* Rest of your content goes here */}
      <FlatList
      data={ordersData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Orders />
      <Footer currentScreen="Orders" />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  radioButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.primaryColor,
    backgroundColor: 'transparent',
  },
  radioButtonText: {
    fontSize: 16,
    color: theme.primaryColor,
  },
  selected: {
    backgroundColor: theme.primaryColor,
  },
  radioText: {
    color: 'black',
  },
  radioTextSelected:{
    color:'white'
  },
  Box:{
    margin: '5%',
    padding: '5%',
}
});
