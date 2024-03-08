import {StyleSheet} from 'react-native';
import { theme } from "HomoeoWorld/src/utils/theme.js";

export default styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 8, 
        backgroundColor:'white'
    },
    productDescTitle: {
        fontWeight:'bold', 
        color: 'black', 
        fontSize: 15, 
        padding: 10
    },
    descriptionText:{
        color:'grey', 
        fontSize: 12, 
        paddingHorizontal: 10
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