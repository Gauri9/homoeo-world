import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import {NativeBaseProvider, Button } from 'native-base';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import Footer from '../../components/Footer/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';
// import styles from './styles';
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
    }
    
  },[selectedPackage, selectedSize, medicineDetail])


  const handlePackageChange = (packageName) => {
    setSelectedPackage(packageName);
  };

  const handleSizeChange = (sizeName) => {
    setSelectedSize(sizeName);
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
        data={directImageLinks} // Replace with array of image URLs
        renderItem={({ item }) => (
          <View style={styles.imageContainer}> 
            <Image source={{ uri: item }} style={styles.productImage} />
          </View>
        )}
      />
     
        
        {/* Package Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package:</Text>
          {medicineDetail.subcategories.map((subcategory, index) => (
            <TouchableOpacity key={index} onPress={() => handlePackageChange(subcategory.Package)}>
              <Text style={[styles.package, {fontWeight: selectedPackage === subcategory.Package ? 'bold' : 'normal'}]}>
                {subcategory.Package}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Size Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size:</Text>
          {medicineDetail.subcategories.map((subcategory, index) => (
            <TouchableOpacity key={index} onPress={() => handleSizeChange(subcategory.Size)}>
              <Text style={[styles.size, {fontWeight: selectedSize === subcategory.Size ? 'bold' : 'normal'}]}>
                {subcategory.Size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price Section */}
        {selectedSubcategory!=null && 
        <View style={styles.priceContainer}>
          <Text style={styles.mrp}>MRP: ₹{selectedSubcategory.MRP}</Text>
          <Text style={styles.discount}>Discount: {selectedSubcategory['Discounted Percentage']}%</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  company: {
    fontSize: 16,
    marginTop: 5,
    color:'black'
  },
  category: {
    fontSize: 16,
    marginTop: 5,
    color:'black'
  },
  tags: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  package: {
    fontSize: 16,
    marginTop: 5,
    color:'black'
  },
  size: {
    fontSize: 16,
    marginTop: 5,
    color:'black'
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  mrp: {
    fontSize: 16,
    marginRight: 10,
    color:'black'
  },
  discount: {
    fontSize: 16,
    color: 'green',
  },
  imageContainer: {
    margin: 5, 
    width: 300, 
    height: 300, 
    borderRadius: 10, 
    overflow: 'hidden', 
  },
  productImage: {
    width: "99%",
    height: 300,
    resizeMode: "cover",
    marginRight: 16,
    //   borderWidth: 1,
    //   borderColor: '#ccc',
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
  cartItem: {
    backgroundColor: "white",
    // padding: 10,
    // borderRadius: 5,

    flexDirection: "row",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.primaryColor,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: theme.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 5,
    // marginHorizontal: 5,
  },
  quantityDisplay: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 5,
  },
  quantityText: {
    fontSize: 14,
    color:'black'
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
});




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

