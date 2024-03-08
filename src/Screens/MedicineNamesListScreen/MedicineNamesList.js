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
import {theme} from 'C:/Users/Gauri/FULL_STACK/HomoeoWorld/src/utils/theme.js'
import * as api from "HomoeoWorld/src/utils/api.js";
import styles from './styles'


function MedicineNamesList(){

    const [namesData, setNamesData] = useState([]);

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
            const response = await api.fetchMedicineNames(header);
            setNamesData(response.data)
            console.log(namesData)
        }

        fetchData();

        // setting dynamic name of the screen based on the category selected
        navigation.setOptions({
            title: header,
            headerTitleStyle: { fontWeight: '900', color: theme.primaryColor }
        });
    },[])

    onMedicineNamePress = (medicineName) => {
        console.log('inside onMedicineNamePress...', medicineName)
        navigation.navigate("Product Details", {medicineName})
    }
    
    return(
        <View style={styles.container}>
            <FlatList
                data={namesData}
                numColumns={1}
                keyExtractor={(item)=> item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => onMedicineNamePress(item.title)}>
                        <Text style={styles.medicineName}>{item.title}</Text>
                        <View style={styles.seperator}></View>
                    </TouchableOpacity>
                )}
            
            />
                
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
 


// const dummyData =[
//     {id:1, name: 'Biocombination No. 1'},
//     {id:2, name: 'Biocombination No. 2'},
//     {id:3, name: 'Biocombination No. 3'},
//     {id:4, name: 'Biocombination No. 4'},
//     {id:5, name: 'Biocombination No. 5'},
//     {id:6, name: 'Biocombination No. 6'},
//     {id:7, name: 'Biocombination No. 7'},
//     {id:8, name: 'Biocombination No. 8'},
//     {id:9, name: 'Biocombination No. 9'},
//     {id:10, name: 'Biocombination No. 10'},
//     {id:11, name: 'Biocombination No. 11'},
//     {id:12, name: 'Biocombination No. 12'},
//     {id:13, name: 'Biocombination No. 13'},
//     {id:14, name: 'Biocombination No. 14'},
//     {id:15, name: 'Biocombination No. 15'},
//     {id:16, name: 'Biocombination No. 16'},
// ]