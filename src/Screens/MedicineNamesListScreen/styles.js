import { StyleSheet } from "react-native";
import {theme} from "HomoeoWorld/src/utils/theme.js"


export default styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    medicineName:{
        color: 'black',
        fontSize: 16,
        marginLeft:16,
        paddingHorizontal: 5,
        paddingTop: 10
    },
    company:{
        color: 'grey',
        marginLeft: 16,
        paddingHorizontal: 5,
        fontSize: 12,
        paddingBottom: 10
    },
    seperator:{
        height:1,
        width:'100%',
        backgroundColor: '#A9A9A9'
    },
    radioButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
      },
      radioButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: theme.primaryColor,
        backgroundColor: 'transparent',
      },
      radioButtonText: {
        fontSize: 16,
        color: theme.primaryColor,
      },
      selected: {
        backgroundColor: theme.primaryColor,
      },
      radioText: {
        color: 'black',
      },
      radioTextSelected:{
        color:'white'
      },
})