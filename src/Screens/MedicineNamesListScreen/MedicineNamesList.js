import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Text,
  Spinner,
  Heading,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
} from "native-base";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import AutocompleteSearchBar from "../../components/AutoCompleteSearchBar/AutocompleteSearchBar";
import {theme} from 'C:/Users/Gauri/FULL_STACK/HomoeoWorld/src/utils/theme.js'
import * as api from "HomoeoWorld/src/utils/api.js";
import styles from './styles'


function MedicineNamesList(){

    const [namesData, setNamesData] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [selectedOption, setSelectedOption] = useState('delivery');

    const navigation = useNavigation();
    const route = useRoute();
  
    console.log('routes', route)
    let header;
    if(route.params.header){
      header = route.params.header;
      console.log('header', header)  
    }  

    useEffect(()=>{

        async function fetchData(){
            setIsLoadingData(true);
            const response = await api.fetchMedicineNames(header);
            setIsLoadingData(false);
            setNamesData(response.data);
            console.log(namesData);
        }

        fetchData();

        // setting dynamic name of the screen based on the category selected
        navigation.setOptions({
            title: header,
            headerTitleStyle: { fontWeight: '900', color: theme.primaryColor }
        });
    },[])

    onMedicineNamePress = (medicineName, company) => {
        console.log('inside onMedicineNamePress...', medicineName)
        navigation.navigate("Product Details", {medicineName, company})
    }
    
    return(
        <View style={styles.container}>

              {/* Search bar */}
            <View style={{backgroundColor:'white'}}>
                <AutocompleteSearchBar />
            </View>

            <View style={styles.seperator}></View>

            {isLoadingData ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color= {theme.primaryColor} />
                </View>
            ) : (
                <FlatList
                data={namesData}
                numColumns={1}
                keyExtractor={(item)=> item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => onMedicineNamePress(item.title, item.company)}>
                        <Text style={styles.medicineName}>{item.title}</Text>
                        <Text style={styles.company}>{item.company}</Text>
                        <View style={styles.seperator}></View>
                    </TouchableOpacity>
                )}
            
            />
            )}             
        </View>
    )
}

export default () => {
    return(
        <NativeBaseProvider>
            <MedicineNamesList/>
        </NativeBaseProvider>
    )
} 
