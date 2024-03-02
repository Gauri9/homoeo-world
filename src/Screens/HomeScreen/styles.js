import { StyleSheet } from "react-native";
import {theme} from "HomoeoWorld/src/utils/theme.js"


export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    marginBottom: 25
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
    marginTop: 20,
    color:'black',
    backgroundColor:'white',
    padding: 10,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignContent:'center',
    justifyContent:'center'
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 15, 
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.25,
    elevation: 5
  },
  categoryName: {
    fontSize: 13,
    fontWeight:'500',
    color:'black',
    padding:'20'
  },
  prescription:{
    borderRadius: 20,
    borderColor: theme.primaryColor,
    borderWidth: 1, 
    paddingVertical: 40,
    marginHorizontal: 20,
    paddingLeft: 20,
    flexDirection:'row',
    backgroundColor:'white'
  },
  prescriptionText:{
    color: theme.primaryColor,
    fontSize: 20,
  },
  uploadIcon: {
    height: 28,
    width: 28,
    marginLeft: 10,
  },
});