import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, ScrollView } from "react-native";
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
import ProductCard from "HomoeoWorld/src/components/ProductCard/ProductCard";
import AutocompleteSearchBar from "HomoeoWorld/src/components/AutoCompleteSearchBar/AutocompleteSearchBar.js";
import Footer from "../../components/Footer/Footer";
import * as api from "HomoeoWorld/src/utils/api.js";
import * as auth from "HomoeoWorld/src/utils/auth.js";
import { theme } from "HomoeoWorld/src/utils/theme.js";
import styles from "./styles";

function ProductList() {
  const [selected, setSelected] = React.useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  // console.log('routes', route)
  // let header;
  // if(route.params.header){
  //   header = route.params.header;
  //   console.log('header', header)  
  // }

  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [_cartItems, setCartItems] = useState([]);
  const [loadingMore, setLoadingMore] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dummyProducts = [
    // Array of product objects
    { title: 'Lecope 5mg 10 Tablets', company: 'Mankind Pharma Private Ltd.', quantity:'10pc', image: 'image_url', price: '₹ 19.39', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.' },
    { title: 'Rabvid DSR ', company: 'Dabur', quantity:'10pc', image: 'image_url', price: '₹ 19', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    { title: 'Cefaxone 500mg Injection Vial', company: 'Abott pvt. lmt', quantity:'10pc', image: 'image_url', price: '₹ 29', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    { title: 'omez 356 ', company: 'Mankind Pharma Private Ltd', quantity:'10pc', image: 'image_url', price: '₹ 19', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    { title: 'Moxikind CV 625', company: 'Jolly Healthcare', quantity:'10pc', image: 'image_url', price: '₹ 29', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    { title: 'Chymokem Forte', company: 'Mankind Pharma Private Ltd', quantity:'10pc', image: 'image_url', price: '₹ 19', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    { title: 'Limcee', company: 'IPCA Laboratories', quantity:'10pc', image: 'image_url', price: '₹ 29', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    { title: 'DyloKing-SP', company: 'Micor Gratia', quantity:'10pc', image: 'image_url', price: '₹ 19', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    { title: 'oxymoron', company: 'Company B', quantity:'10pc', image: 'image_url', price: '₹ 29', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    { title: 'Aspirin', company: 'Absolute Pharma', quantity:'10pc', image: 'image_url', price: '₹ 19', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    {  title: 'Epilisi', company: 'Oaknet Life Sciences', quantity:'10pc', image: 'image_url', price: '₹ 29', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    {  title: 'Crocin', company: 'Aristo Pharmaceuticals PVT LTD', quantity:'10pc', image: 'image_url', price: '₹ 19', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
    {  title: 'Betadine', company: 'Torrento Pharmaceuticals', quantity:'10pc', image: 'image_url', price: '₹ 29', description: 'In the PRINCE2 project management method, a product description is a structured format that presents information about a project product. It is a management product, usually created by the project manager during the process of initiating a project in the initial stage of the PRINCE2 project management method.'  },
  ];
  

  const pageSize = 10;

  useEffect(() => {
    async function fetchData() {
      if (page === 1) setIsLoading(true);
      try {
        const response = await api.getProducts(page, pageSize);
        console.log(response.data)
        setIsLoading(false);

        setProducts(dummyProducts);//temp

        // paginated response
        if (response.data.length !== 0) {
          setProducts((prevProducts) => [...prevProducts, ...response.data]);
        } else {
          setHasMore(false);
        }
        // setLoading(false);
        setLoadingMore(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setLoading(false);
        setLoadingMore(false);
      }
    }

    if (hasMore) {
      fetchData();
    }
    
    // setting dynamic name of the screen based on the category selected
    navigation.setOptions({
      // title: header,
      title:"Medicine List",
      headerTitleStyle: { fontWeight: '900', color: theme.primaryColor }
    });

    // console.log(products)
  }, [page, hasMore]);

  const loadMore = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <AutocompleteSearchBar />

      <View style={styles.flatlistContainer}>
        {isLoading && (
          <HStack space={10} alignItems="center" justifyContent="center">
            <Spinner size="lg" color={theme.primaryColor} accessibilityLabel="Loading posts" />
          </HStack>
        )}

        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ProductCard product={item} />}
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
        />

      {!isLoading && loadingMore && hasMore && (
          <View style={styles.spinnerContainer}>
            <Spinner size="small" color={theme.primaryColor} />
          </View>
        )}
      </View>

    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <ProductList />
      <Footer currentScreen="Product List" />
    </NativeBaseProvider>
  );
};

