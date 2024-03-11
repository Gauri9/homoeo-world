import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import {NativeBaseProvider, Button } from 'native-base';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import Footer from '../../components/Footer/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import { theme } from '../../utils/theme';
import * as api from 'C:/Users/Gauri/FULL_STACK/HomoeoWorld/src/utils/api.js'
import { useCart } from "../../Context/CartContext";


const ProductDetail = () => {
  const [medicineDetail, setMedicineDetail] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [selectedSubcategory, setSelectedSubcategory] = useState();
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartDetail, setCartDetail] = useState();
  const [uniquePackages, setUniquePackages] = useState();

  const {addToCart, incrementQuantity, decrementQuantity, cart} = useCart();

  const navigation = useNavigation();
  const route = useRoute();
  const { medicineName } = route.params;

  useEffect(() => {
    async function fetchData(){
      console.log('fetch data----------------')
      //api call to fetch medicine details based on medicine name and company
      const response = await api.fetchMedicineDetail(medicineName) 
      // console.log(response)
      setMedicineDetail(response)
    }
    fetchData();

  },[])

  useEffect(() => {
    // console.log('second use-effect',medicineDetail)
    if(medicineDetail!=null){
      setSelectedPackage(medicineDetail.subcategories[0].Package)
      setSelectedSize(medicineDetail.subcategories[0].Size)
      const selectedSubcategory = medicineDetail.subcategories.find(subcategory => 
        subcategory.Package === selectedPackage && subcategory.Size === selectedSize
      );
      setSelectedSubcategory(selectedSubcategory)

      setUniquePackages(new Set(medicineDetail.subcategories.map(subcategory => subcategory.Package)));
    }
    
  },[medicineDetail])

  useEffect(() => {

    updateSelectedSubcategory = () => {

      // subcategory array from medicine details
      const selectedSubcategory = medicineDetail.subcategories.find(subcategory => 
        subcategory.Package === selectedPackage && subcategory.Size === selectedSize
      );
      setSelectedSubcategory(selectedSubcategory)

      // overwrite subcategory array with cart's subcategory, if it exists in cart
      if(medicineDetail!==null && cart.length!=0){
        console.log('------------------------------')
        const cartDetail = cart.filter(item => item._id == medicineDetail._id)

        if(cartDetail.length!=0){
          console.log('inside if...')
          console.log('cartDetail', cartDetail[0])

          const selectedSubcategory_1 = cartDetail[0].subcategories.find(subcategory => 
            subcategory.Package === selectedPackage && subcategory.Size === selectedSize
          );
          if(selectedSubcategory_1){
            setCartDetail(cartDetail[0])
            setSelectedSubcategory(selectedSubcategory_1)
          }
            
        }
        
      }
    }

    if(medicineDetail){
      updateSelectedSubcategory();
    }
        
  },[selectedPackage, selectedSize, cart])


  const handlePackageChange = (packageName) => {
    setSelectedPackage(packageName);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    console.log('size', size)
  };

  const handleBuyPress = () => {
    console.log('inside handleBuyPress...')
    navigation.navigate("Cart")
  }

  const handleAddToCartPress = () => {
    console.log('inside handleAddToCartPress...');
    setAddedToCart(true);
    addToCart(medicineDetail, selectedSubcategory)
  }


  const imageUrl = 'https://drive.google.com/file/d/1aj7EOEAgTEG6MpnzDjDWW3Vrd4GJDR8m/view?usp=sharing'
  const file_id = imageUrl.split('/d/')[1].split('/')[0]
  // console.log(file_id)
  const directImageLink = `https://drive.google.com/uc?export=view&id=${file_id}`
  const directImageLinks = [`https://drive.google.com/uc?export=view&id=${file_id}`, `https://drive.google.com/uc?export=view&id=${file_id}`]

  return (
    <>
    {!medicineDetail && <Text>Loading...</Text>}
    {medicineDetail!=null && 
    <ScrollView style={styles.container}>

       <View style={styles.detailsContainer}>
        <Text style={styles.title}>{medicineDetail.title}</Text>
        <Text style={styles.company}>{medicineDetail.company}</Text>
        <FlatList
          horizontal={true} // Set horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide scroll indicator (optional)
          data={directImageLinks} //  array of image URLs
          renderItem={({ item }) => (
            <View style={styles.imageContainer}> 
              <Image source={{ uri: item }} style={styles.productImage} />
            </View>
          )}
        />
     
        
        {/* Package Section */}
        {uniquePackages && 
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Package:</Text>
        <View style={{flexDirection:'row'}}>
          {Array.from(uniquePackages).map((package_, index) => (
            <TouchableOpacity key={index} onPress={() => handlePackageChange(package_)} style={[styles.sectionButton, selectedPackage == package_ ? {backgroundColor:theme.primaryColor, opacity:0.5} : null]}>
              <Text style={styles.package}>
                {package_}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>}
        

        {/* Size Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size:</Text>
          <View style={{flexDirection:'row'}}>
            {medicineDetail.subcategories.map((subcategory, index) => (
              <TouchableOpacity key={index} onPress={() => handleSizeChange(subcategory.Size)} style={[styles.sectionButton, selectedSize==subcategory.Size ? {backgroundColor:theme.primaryColor, opacity:0.5} : null]}>
                <Text style={styles.size}>
                  {subcategory.Size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
       
        </View>

        {/* Price Section */}
        {selectedSubcategory!=null && 
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>₹{selectedSubcategory.MRP - selectedSubcategory.MRP*selectedSubcategory['Discounted Percentage']*0.01}</Text>
          <Text style={styles.mrp}>MRP: ₹{selectedSubcategory.MRP}</Text>
          <Text style={styles.discount}> {selectedSubcategory['Discounted Percentage']}% off</Text>
        </View>
      }
        
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "center", padding: 20 }}
      >
        <Button onPress={handleBuyPress} bordered style={styles.buyNow}>
          <Text style={{ color: theme.primaryColor }}>Buy Now</Text>
        </Button>

        {selectedSubcategory && selectedSubcategory.quantity>0 ? (
            <View style={styles.cartItem}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrementQuantity(cartDetail, selectedSubcategory)} style={styles.quantityButton}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>

                <View style={styles.quantityDisplay}>
                  <Text style={styles.quantityText}>{selectedSubcategory.quantity}</Text>
                </View>

                <TouchableOpacity onPress={() => incrementQuantity(cartDetail, selectedSubcategory)} style={styles.quantityButton}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
          <Button onPress={handleAddToCartPress} style={styles.addtoCart}>
            <Text style={{ color: "white" }}>Add to Cart</Text>
          </Button>
        )}
      </View>
    </ScrollView>
    } 
    </>
  );
}


export default () => {
  return (
    <NativeBaseProvider> 
        <ProductDetail/>      
    </NativeBaseProvider>
  )
}

