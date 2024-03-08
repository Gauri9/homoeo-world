import React, { useState } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { Container, Content, Card, CardItem, Body, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as auth from "HomoeoWorld/src/utils/auth.js";
const medicineImage = require("HomoeoWorld/assets/default-medicine.jpg");
import { theme } from "HomoeoWorld/src/utils/theme.js";

const SingleProduct = ({ product }) => {
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleBuyPress = async () => {
    console.log("handleBuyPress...");
    await handleAddToCartPress()
    navigation.navigate("Cart");
  };

  const handleAddToCartPress = async () => {
    console.log("handleAddtoCartPress...");
    let authToken;
    let updatedCart = [];

    const response = await auth.getAuthAndCartData();

    console.log("getAuthAndCartData response", response);

    if (response && response.authToken && response.cart) {
      authToken = response.authToken;
      const cart = response.cart;
      // setCartItems(response.cart);
      const existingItemIndex = cart.findIndex(
        (item) => item.title === product.title
      );

      if (existingItemIndex !== -1) {
        updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += 1;
        // setQuantity(updatedCart[existingItemIndex].quantity);
      } else {
        updatedCart = [
          ...cart,
          { title: product.title, quantity: 1, price: product.price },
        ];
      }
      // setCartItems(updatedCart);
    } else {
      console.log("response is null...");
      const storedToken = await AsyncStorage.getItem("authToken");
      authToken = JSON.parse(storedToken);
      updatedCart = [
        { title: product.title, price: product.price, quantity: 1 },
      ];
      // setCartItems(updatedCart);
      // setQuantity(updatedCart[0].quantity)
    }

    if (authToken !== null && updatedCart !== null) {
      await auth.storeAuthAndCartData(authToken, updatedCart);
      // console.log('Item added to cart:', updatedCart);
      // setAddedToCart(true);
    }
    setAddedToCart(true);
  };


  // temperoroy
  const imageUrl = 'https://drive.google.com/file/d/1aj7EOEAgTEG6MpnzDjDWW3Vrd4GJDR8m/view?usp=sharing'
  const file_id = imageUrl.split('/d/')[1].split('/')[0]
  console.log(file_id)
  const directImageLink = `https://drive.google.com/uc?export=view&id=${file_id}`
  const directImageLinks = [`https://drive.google.com/uc?export=view&id=${file_id}`, `https://drive.google.com/uc?export=view&id=${file_id}`]

  return (
    <View style={styles.productDetails}>
      <View>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productCompany}>{product.company}</Text>
      </View>

      {/* <View style={styles.line} /> */}
      {/* <Image source={medicineImage} style={styles.productImage} /> */}
      {/* <Image source={{ uri: directImageLink}} style={styles.productImage}/> */}
      {/* <View style={styles.line} /> */}

      <FlatList
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        data={directImageLinks} 
        renderItem={({ item }) => (
          <View style={styles.imageContainer}> 
            <Image source={{ uri: item }} style={styles.productImage} />
          </View>
        )}
      />

      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.productPrice}>{product.price}</Text>
        <Text style={styles.productMRP}>MRP 29.85</Text>
      </View> */}

      <View
        style={{ flexDirection: "row", justifyContent: "center", padding: 20 }}
      >
        <Button onPress={handleBuyPress} bordered style={styles.buyNow}>
          <Text style={{ color: theme.primaryColor }}>Buy Now</Text>
        </Button>

        {addedToCart ? (
          <Button style={styles.addtoCart}>
            <Text style={{ color: "white" }}>Added to Cart</Text>
          </Button>
        ) : (
          <Button onPress={handleAddToCartPress} style={styles.addtoCart}>
            <Text style={{ color: "white" }}>Add to Cart</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  productImage: {
    width: "99%",
    height: 300,
    resizeMode: "cover",
    marginRight: 16,
    //   borderWidth: 1,
    //   borderColor: '#ccc',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    color:'black',
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    paddingTop: 8,
    paddingLeft: 10,
  },
  productCompany: {
    fontSize: 15,
    fontWeight: "normal",
    marginBottom: 8,
    color: "grey",
    paddingLeft: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 10,
  },
  productMRP: {
    fontSize: 11,
    fontWeight: "100",
    color: "grey",
    textDecorationLine: "line-through",
    paddingLeft: 10,
  },
  buyNow: {
    width: 100,
    height: 40,
    backgroundColor: "white",
    borderColor: theme.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
  },
  addtoCart: {
    width: 150,
    height: 40,
    backgroundColor: theme.primaryColor,
    borderColor: theme.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
  },
  line: {
    width: "100%",
    height: 1, // Specify the height of the line
    backgroundColor: "lightgrey", // Specify the line color
    marginBottom: 8, // Adjust the margin as needed
  },

  imageContainer: {
    margin: 5, 
    width: 300, 
    height: 300, 
    borderRadius: 10, 
    overflow: 'hidden', 
  },

  // Add styles for other product details as needed
});

export default SingleProduct;
