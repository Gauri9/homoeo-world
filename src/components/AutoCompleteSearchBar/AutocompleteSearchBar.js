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
  const [product, setProduct] = useState();

  const handleSearch = async (searchTerm) => {
    console.log(searchTerm)
    // setSearchTerm(searchTerm);
    try {
      console.log('searchTerm', searchTerm)
      const response = await api.searchProducts(searchTerm);
      console.log(response.data)
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const gotoProductDetails = async (title) => {
    console.log("gotoProductDetails");

    const response = await api.getProductByTitle(title);
    const productData = response.data;

    setProduct(productData);
    console.log(product);

    // const product = response.data;
    navigation.navigate("Product Details", { product: productData });
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
                onPress={() => gotoProductDetails(item.title)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#D3D3D3",
                  // borderBottomColor:theme.primaryColor
                }}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity> 
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
    margin: 10,
    backgroundColor:'white'
  },
  searchList: {
    backgroundColor: "#F5F5F5",
  },
  searchIcon: {
    marginLeft: 10,
  },
});

// searchResults
// [{"title": "Omez 365"}, {"title": "omez"}]
