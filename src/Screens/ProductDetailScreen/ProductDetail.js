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
  const [quantity, setQuantity] = useState(0);
  const [uniquePackages, setUniquePackages] = useState();

  const {addToCart, incrementQuantity, decrementQuantity, cart} = useCart();

  const navigation = useNavigation();
  const route = useRoute();
  const { medicineName } = route.params;

  console.log(route.params);
  console.log('medicineName.....');
  console.log(medicineName);

  useEffect(() => {
    async function fetchData(){
      console.log('fetch data----------------')
      //api call to fetch medicine details based on medicine name and company
      const response = await api.fetchMedicineDetail(medicineName)
      console.log(response)
      setMedicineDetail(response)
    }
    fetchData();

  },[])

  useEffect(()=>{
    if(medicineDetail!=null){
      const cartData = cart.filter(item => item._id === medicineDetail._id)
      console.log('cartData', cartData)
      if(cartData[0])
      setQuantity(cartData[0].quantity)
    }
  },[cart, medicineDetail])


  useEffect(() => {
    console.log('second use-effect',medicineDetail)
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
      const selectedSubcategory = medicineDetail.subcategories.find(subcategory => 
        subcategory.Package === selectedPackage && subcategory.Size === selectedSize
      );
      setSelectedSubcategory(selectedSubcategory)
    }

    if(medicineDetail){
      updateSelectedSubcategory();
    }
        
  },[selectedPackage, selectedSize])


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
    const newMedicineDetail = {...medicineDetail}
    delete newMedicineDetail.subcategories
    addToCart(newMedicineDetail,1);
  }


  const imageUrl = 'https://drive.google.com/file/d/1aj7EOEAgTEG6MpnzDjDWW3Vrd4GJDR8m/view?usp=sharing'
  const file_id = imageUrl.split('/d/')[1].split('/')[0]
  console.log(file_id)
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

        {addedToCart ? (
            <View style={styles.cartItem}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrementQuantity(medicineDetail._id)} style={styles.quantityButton}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>

                <View style={styles.quantityDisplay}>
                  <Text style={styles.quantityText}>{quantity}</Text>
                </View>

                <TouchableOpacity onPress={() => incrementQuantity(medicineDetail._id)} style={styles.quantityButton}>
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
};




  // function ProductDetail(){

  //   const [medicineDetail, setMedicineDetail] = useState({})

  //   const route = useRoute();
  //   const { medicineName } = route.params;

//   console.log(route.params);
//   console.log('medicineName.....');
//   console.log(medicineName);

//   useEffect(() => {
//     async function fetchData(){

//       //api call to fetch medicine details based on medicine name and company
//       const response = await api.fetchMedicineDetail(medicineName)
//       console.log(response)
//       setMedicineDetail(response)
//     }
//     fetchData();
//   },[])

//   // product = { id: 1, title: 'Lecope 5mg 10 Tablets', company: 'Mankind Pharma Private Ltd', quantity:'10pc', image: 'image_url', price: '₹ 19.39', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.' };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

//         <SingleProduct product={medicineDetail}/>

//         {/* <Text style={styles.productDescTitle}>Product Description</Text>

//         <View style={{marginBottom: 20}}>
//             <Text style={styles.descriptionText}>{product.description}</Text>
//             <Text></Text>
//             <Text style={styles.descriptionText}>{product.description}</Text>
//             <Text></Text>
//             <Text style={styles.descriptionText}>{product.description}</Text>
//             <Text></Text>
//             <Text style={styles.descriptionText}>{product.description}</Text>
//         </View> */}

//     </ScrollView>
//   );
// };


export default () => {
  return (
    <NativeBaseProvider> 
        <ProductDetail/>      
    </NativeBaseProvider>
  )
}

