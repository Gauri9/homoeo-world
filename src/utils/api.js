import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

// const apiBaseUrl = Config.API_BASE_URL;
// const apiBaseUrl = 'https://medical-app-5gdu.onrender.com'
// const apiBaseUrl = 'http://192.168.1.102:5000'
const apiBaseUrl = 'https://gauri-try.df.r.appspot.com'

export const postCredentials = async (creds) => await axios.post(`${apiBaseUrl}/login`,creds);  //on signup page
export const validateCredentials = async (creds) => {
    console.log("--------inside validateCredentials----------", creds)
    const response = await axios.post(`${apiBaseUrl}/login/validate`, creds); //login page for authentication
    console.log('response', response)
    return response;
}

//product
export const getProducts = async (page, pageSize) => await axios.get(`${apiBaseUrl}/product/getproducts`, {
    params: {
        page: page,
        pageSize: pageSize,
    },
});
export const searchProducts = async (searchTerm) => await axios.get(`${apiBaseUrl}/medicine/getsearchresults`, {
    params: {
        searchTerm: searchTerm
    }
});
export const getProductByTitle = async (title) => await axios.get(`${apiBaseUrl}/product/getproductbytitle`, {
    params:{
        title: title
    }
});
export const fetchMedicineNames = async (category) => {
    console.log('inside fetchMedicineNames api.js')
    const response = await axios.get(`${apiBaseUrl}/medicine/getmedicinenames`,{
        params:{
            category:category
        }
    })
    return response
}
export const fetchMedicineDetail = async (title) => {
    console.log('fetchMedicineDetail', title)
    const response = await axios.get(`${apiBaseUrl}/medicine/getmedicinedetails`,{
        params:{
            title: title,
            // company: company
        }
    })
    return response.data;
}

//address
export const postNewAddress = async (newAddress) => {
    console.log('postNewAddress...')
    const jwtToken = await AsyncStorage.getItem('authToken');
    const authToken = JSON.parse(jwtToken); 
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      };
      
    const response = await axios.post(`${apiBaseUrl}/login/addnewaddress`,{newAddress: newAddress},{headers});
    // console.log('response: ', response);
    return response.data;
}
export const getAddressesbyUser = async () => {
    console.log('getAddressesbyUser...')
    const jwtToken = await AsyncStorage.getItem('authToken');
    const authToken = JSON.parse(jwtToken); 
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      };
    const response = await axios.get(`${apiBaseUrl}/login/getaddressesbyuser`,{headers});
    // console.log('response: ', response.data);
    return response.data;
}
