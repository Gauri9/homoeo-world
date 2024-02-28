import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NativeBaseProvider, Card, Box, Row, Image, Button} from 'native-base';
import Footer from '../../components/Footer/Footer';
import styles from './styles';

function Orders() {
  return (
    <View style={styles.container}>
      <Text style={{color:"black"}}>Orders Screen !!</Text>
  </View>
  )
  
}

export default () => {
  return (
    <NativeBaseProvider>
      <Orders />
      <Footer currentScreen="Orders" />
    </NativeBaseProvider>
  );
};
