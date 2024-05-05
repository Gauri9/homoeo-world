import {StyleSheet} from 'react-native';
import { theme } from "HomoeoWorld/src/utils/theme.js";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black',
    paddingLeft: 15,
    backgroundColor:'white',
    paddingTop: 10
  },
  company: {
    fontSize: 16,
    // marginTop: 5,
    paddingLeft: 15,
    color:'black',
    backgroundColor:'white',
    paddingBottom: 10
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
    // flexDirection: 'row', 
    marginTop: 10,
    paddingLeft: 15,
    paddingVertical:20,
    backgroundColor:'white'
  },
  sectionButton:{
    flexDirection: 'row', 
    marginLeft: 15,
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 16,
    color: 'black',
  },
  package: {
    fontSize: 16,
    marginTop: 5,
    color:'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  size: {
    fontSize: 16,
    marginTop: 5,
    color:'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor:'white',
    paddingVertical: 20
  },
  discountedPrice:{
    fontSize: 16,
    marginRight: 10,
    paddingLeft: 15,
    color:'black',
    fontWeight:'bold'
  },
  mrp: {
    fontSize: 16,
    marginRight: 10,
    // paddingLeft: 10,
    color:'grey',
    textDecorationLine: 'line-through'
    
  },
  discount: {
    fontSize: 16,
    color: theme.primaryColor,
  },
  imageContainer: {
    margin: 5, 
    width: 300, 
    height: 300, 
    borderRadius: 10, 
    overflow: 'hidden', 
    backgroundColor:'white'
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
    height: 1, 
    backgroundColor: "lightgrey", 
    marginBottom: 8, 
  },
  cartItem: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  quantityContainer: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.primaryColor,
    justifyContent: 'space-around'
  },
  quantityButton: {
    flex:1,
    backgroundColor: theme.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical:15,
    padding:10
  },
  quantityDisplay: {
    flex:1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical:15,
    padding:10
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
