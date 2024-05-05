import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
// import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Input, List, Text, Image } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as api from "C:/Users/Gauri/FULL_STACK/HomoeoWorld/src/utils/api.js";
import {theme} from "C:/Users/Gauri/FULL_STACK/HomoeoWorld/src/utils/theme.js"

const AutocompleteSearchBar = () => {
  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] =   ("");
  const [searchResults, setSearchResults] = useState([]);
  // const [product, setProduct] = useState();

  const handleSearch = async (searchTerm) => {
    console.log(searchTerm)
    if(searchTerm == ""){
      setSearchResults([]);
      return;
    }
    // setSearchTerm(searchTerm);
    try {
      console.log('searchTerm', searchTerm)
      const response = await api.searchProducts(searchTerm);
      console.log('response.data', response.data)
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const gotoProductDetails = async (title, company) => {
    console.log("gotoProductDetails");
    navigation.navigate("Product Details", {medicineName: title, company: company})
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <Input
        size="sm"
        placeholder="Search from our medicines"
        // placeholderTextColor={theme.primaryColor}
        onChangeText={handleSearch}
        value={searchTerm}
        variant="rounded"
        borderColor= {theme.primaryColor}
        InputLeftElement={
          <Image
            source={require("HomoeoWorld/assets/icons/search-icon.png")}
            style={styles.searchIcon}
        />
        }
      />

      {/* Autocomplete Suggestions */}
      {searchResults.length > 0 && (
        <List style={styles.searchList}>
          {searchResults.map((item, index) => (
            <>
              <TouchableOpacity
                key={index}
                onPress={() => gotoProductDetails(item.title, item.company)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft:12
                }}
              >
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.companyText}>{item.company}</Text>
                </View>
              </TouchableOpacity> 
              <View style={styles.seperator}></View>
            </>
          ))}
        </List>
      )}
    </View>
  );
};

export default AutocompleteSearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white'
  },
  searchList: {
    backgroundColor: "#F5F5F5",
  },
  searchIcon: {
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 15, 
    fontWeight: 'bold', 
  },
  companyText: {
    fontSize: 10, 
    color: 'gray', 
  },
  seperator:{
    height:1,
    width:'100%',
    backgroundColor: '#A9A9A9'
},
});


