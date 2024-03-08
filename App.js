import React from 'react';

import Login from './src/Screens/Login/Login';
import Signup from './src/Screens/SignUp/Signup';

import ImageRenderPOC from './src/Screens/POC/ImageRenderPOC'

// User Screens
import MedicineNamesList from './src/Screens/MedicineNamesListScreen/MedicineNamesList';
import ProductList from './src/Screens/ProductList/ProductList';
import ProductDetail from './src/Screens/ProductDetailScreen/ProductDetail';
import Cart from './src/Screens/CartScreen/Cart';
import AddressList from './src/Screens/AddressListScreen/AddressList';
import OrderPlaced from './src/Screens/OrderPlacedScreen/OrderPlaced';
import Orders from './src/Screens/OrdersScreen/Orders';
import Home from './src/Screens/HomeScreen/Home';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { FontAwesome5 } from '@expo/vector-icons';
import {TouchableOpacity, Text } from 'react-native';
import {Icon, Image, NativeBaseProvider} from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { CartProvider } from './src/Context/CartContext';

import { theme } from './src/utils/theme';

const Stack = createStackNavigator();

function App() {

  const navigation = useNavigation();

  return (
  <NativeBaseProvider>
    <CartProvider>
        <Stack.Navigator>
          {/* working on this screen -- temp*/}
          {/* <Stack.Screen name="POC" component={ImageRenderPOC}/> */}
          
          {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/> */}
          <Stack.Screen name="Home" component={Home} options={{title: 'Homoeo World', headerTitleStyle: {fontWeight: '900', color: theme.primaryColor },  headerStyle: {elevation: 5, shadowColor: 'black', shadowRadius: 5, },
            headerLeft: () => <Image source= {require('C:/Users/Gauri/FULL_STACK/HomoeoWorld/assets/icons/stethoscope-blue.png')} style={{height:40, width:32,marginLeft:10}} />
          }}/>
          <Stack.Screen name="Medicine Names" component={MedicineNamesList} options={{ headerStyle: {elevation: 5, shadowColor: 'black', shadowRadius: 5, }}}/>
          <Stack.Screen name="Product List" component={ProductList} options={{ headerStyle: {elevation: 5, shadowColor: 'black', shadowRadius: 5, }}}/> 
          <Stack.Screen name="Product Details" component={ProductDetail} options={{headerStyle: {borderBottomWidth: 1, borderBottomColor: '#ccc',elevation: 5, shadowColor: 'black', shadowRadius: 5, }}} />
          <Stack.Screen name="Cart" component={Cart} options={{title: 'My Cart', headerStyle: {elevation: 5, shadowColor: 'black', shadowRadius: 5, },}}/>
          <Stack.Screen name="Select Address" component={AddressList}/>
          <Stack.Screen name="Order Placed" component={OrderPlaced} options={{headerShown: false, headerStyle: {elevation: 5, shadowColor: 'black', shadowRadius: 5, },}}/>
          <Stack.Screen name="Orders" component={Orders}/>
        </Stack.Navigator>
    </CartProvider>
  </NativeBaseProvider>  
  );
}


export default () => {
  return (
    <NavigationContainer>
        <App/>
    </NavigationContainer>
  )
}