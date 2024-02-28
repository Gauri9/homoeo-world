import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {NativeBaseProvider, Card, Box, Row, Button} from 'native-base';


const ImageRenderPOC = () => {

    const imageUrl = 'https://drive.google.com/file/d/1H2XlWKkhx8AfWJsYzP0E46eBWJRKMvrW/view'
    const file_id = imageUrl.split('/d/')[1].split('/')[0]
    console.log(file_id)
    const directImageLink = `https://drive.google.com/uc?export=view&id=${file_id}`
    
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: directImageLink}}
        alt="No Image" 
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    image: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
  },
});

export default () => {
    return (
      <NativeBaseProvider>
        <ImageRenderPOC />
      </NativeBaseProvider>
    );
  };
