import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import {NativeBaseProvider} from 'native-base';
import AutocompleteSearchBar from "HomoeoWorld/src/components/AutoCompleteSearchBar/AutocompleteSearchBar.js";
import styles from './styles';
import {
  useNavigation,
} from "@react-navigation/native";

const HomeScreen = () => {
  // Dummy data for categories
  const categories = [
    { id: 1, name: '3X Dilutions', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    { id: 2, name: 'Biochemics', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    { id: 3, name: 'Centesimal Potency', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    { id: 4, name: 'LM Potency', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    { id: 5, name: 'Mother Tinctures', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    { id: 6, name: 'Trituration Tablets', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    // Add more categories as needed
  ];

  const concerns = [
    { id: 1, name: 'Acne', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    { id: 2, name: 'Dandruff', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    { id: 3, name: 'Pain Relief', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    { id: 4, name: 'Sexual Wellness', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    { id: 5, name: 'Urinary', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    { id: 6, name: 'Piles', image: require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/default-medicine.jpg') },
    // Add more categories as needed
  ];

  const navigation = useNavigation();

  uploadPrescriptionHandler = () => {
    console.log('upload prescription pressed...')
  }

  onCategoryPress = (item) => {
    console.log('on category press...', item)
    navigation.navigate("Medicine Names",{header:item.name})
  }

  onTagPress = (item) => {
    console.log('on tag press...', item)
    navigation.navigate("Medicine Names",{header: item.name})
  }

  return (
    <ScrollView style={styles.container}>

      {/* Search bar */}
      <View style={{backgroundColor:'white'}}>
        <AutocompleteSearchBar />
      </View>

      {/* Upload Prescription block */}
      <View style={styles.prescriptionContainer}>
        <View style={styles.prescriptionTextContainer}>
          <Text style={styles.prescriptionText}>Order with Prescription</Text>
          <Text style={styles.prescriptionDescText}>Upload a prescription and {'\n'}tell us what you need. {'\n'}We do the rest!</Text>
        </View>
        
        <TouchableOpacity style={styles.uploadContainer} activeOpacity={.7} onPress={uploadPrescriptionHandler}>
          <Text style={styles.uploadText}>Upload</Text>
          <Image
              source={require("HomoeoWorld/assets/icons/icons8-upload-24.png")}
              style={styles.uploadIcon}
            />
        </TouchableOpacity>
      </View>     

      {/* Title */}
      <Text style={styles.title}>Homoeopathic Product Range</Text>

      {/* Categories */}
      <View style={{marginHorizontal: 5, backgroundColor:'white',paddingBottom: 20}}>
        <FlatList
          data={categories}
          numColumns={3} // Display categories in 3 columns
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem} onPress={() => onCategoryPress(item)}>
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      

      {/* Title */}
      <Text style={styles.title}>Shop by Concern</Text>

        {/* Tags */}
        <View style={{marginHorizontal: 5, backgroundColor:'white', paddingBottom: 20}}>
        <FlatList
          data={concerns}
          numColumns={3} // Display concerns in 3 columns
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem} onPress={() => onTagPress(item)}>
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
         </View> 
    </ScrollView>
  );
};


export default () => {
    return (
      <NativeBaseProvider>
        <HomeScreen />
      </NativeBaseProvider>
    );
  };


  
