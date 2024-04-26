import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Input,
  NativeBaseProvider,
  Button,
  Box,
  Image,
  HStack,
  Spinner,
  Heading,
  theme,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "HomoeoWorld/src/utils/api.js";
import * as auth from "HomoeoWorld/src/utils/auth.js";
// import { theme } from "HomoeoWorld/src/utils/theme.js";
import styles from "./styles";

function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [canLogin, setCanLogin] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isCredentialsWrong, setIsCredentialsWrong] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  function checkDisable() {
    console.log(email.length <= 0 || password.length <= 0 || isCredentialsWrong)
    return email.length <= 0 || password.length <= 0 || isCredentialsWrong;
  }
  const disable = checkDisable();

  const handleEmailInputChange = (value) => {
    setIsCredentialsWrong(false);
    // Regular expression for validating email addresses
    const emailID = value.toLowerCase();
    setEmail(emailID);
    console.log('email', email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the input value matches the email format
    if (emailRegex.test(emailID)) {
      setEmail(emailID);
      setEmailValid(true);     
    } 
    else {
      setEmailValid(false)
    }
  };

  const handlePasswordInputChange = (value) => {
    setIsCredentialsWrong(false);
    setPassword(value);
    console.log(password);
  };

  const login = async () => {
    console.log("login button pressed");
    setIsLoggingIn(true);

    if (email !== "" && password !== "") {
      setCanLogin(true);
    } else {
      setCanLogin(false);
      console.log("Cannot Login! Enter all the details");
      return;
    }

    try {
      const creds = { username: email, password: password };
      const response = await api.validateCredentials(creds);
      console.log('response', response)

      //store the token in AsyncStorage
      const token = response.data.token;

      setEmail(""); 
      setPassword("");

      if (token != null) {
        await AsyncStorage.setItem("authToken", JSON.stringify(token));
        navigation.navigate("Home")
        setIsLoggingIn(false);
        console.log("Authentication is successful");
      } 
      else 
        console.log("token is null");

    } 
    catch (error) {
      if (error.response && error.response.status === 400) {
        // Unauthorized error
        setIsCredentialsWrong(true);
        setIsLoggingIn(false);
        console.error('Unauthorized:', error.response.data);
      } 
      else{
        console.error("Error logging in user:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        <View style={styles.header}>
          <Image
            source={require("HomoeoWorld/assets/icons/stethoscope-blue.png")}
            alt="No Image" 
            style={styles.logo}
          />
          <Text style={styles.WelcomeText}>Homoeo World!</Text>
        </View>
        <Text style={styles.LoginText}>Log in to your account</Text>
      </View>

      {/* Username or Email Input Field */}
      <View style={styles.buttonStyle}>
        <View style={styles.emailInput}>
          <Text style={styles.inputFieldText}>Email</Text>
          <Input
            value={email} 
            InputLeftElement={
              <Image
                source={require("HomoeoWorld/assets/icons/person.png")}
                alt="No Image" 
                style={styles.personIcon}
              />
            }
            variant="rounded"
            placeholder="Username"
            onChangeText={handleEmailInputChange}
          />
          {!emailValid && <Text style={styles.warningText}>Invalid email format</Text>}
        </View>
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Text style={styles.inputFieldText}>Password</Text>
          <Input
          value={password}
            InputLeftElement={
              <TouchableOpacity activeOpacity={1} onPress={handleTogglePasswordVisibility}>
                {!passwordVisible && (
                  <Image
                    source={require("HomoeoWorld/assets/icons/hideeye.png")}
                    alt="No Image" 
                    style={{ height: 16, width: 16, marginLeft: 10 }}
                  />
                )}
                {passwordVisible && (
                  <Image
                    source={require("HomoeoWorld/assets/icons/openeye.png")}
                    alt="No Image" 
                    style={{ height: 16, width: 16, marginLeft: 10 }}
                  />
                )}
              </TouchableOpacity>
            }
            variant="rounded"
            secureTextEntry={!passwordVisible}
            placeholder="Password"
            onChangeText={handlePasswordInputChange}
          />
        </View>
      </View>

      {/* Button */}
      {!isLoggingIn && (
        <View style={styles.buttonStyle}>
          <Button
            onPress={login}
            isDisabled={disable}
            style={[styles.buttonDesign]}
          >
            LOGIN
          </Button>
          {!canLogin && (
            <Text style={{ color: "red" }}>Please enter all the details</Text>
          )}
          {isCredentialsWrong && (
            <Text style={{ color: "red" }}>Wrong Credentials</Text>
          )}
        </View>
      )}

      {isLoggingIn && (
        <View style={styles.buttonStyle}>
          <Button isDisabled={true} style={[styles.buttonDesign]}>
           <HStack space={5} justifyContent="center">
              <Spinner accessibilityLabel="loading" />
            </HStack>
          </Button>
        </View>
      )}

      {/* Line */}
      <View style={styles.lineStyle}>
        <View>
          <Text style={styles.orText}>-or-</Text>
        </View>
      </View>

      <View style={styles.boxStyle}>
        <Box
          onPress={() => navigation.navigate("#")} // for navigation
          style={styles.loginBox}
          shadow={3}
          _light={{ backgroundColor: "gray.50" }}
          _dark={{ backgroundColor: "gray.700" }}
        >
          <Image
            source={{
              uri: "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png",
            }}
            alt="image"
            style={styles.googleLogo}
          />
          <HStack space={2} alignItems="center">
            <Text style={{color:'black'}}>Login with Google</Text>
          </HStack>
        </Box>
      </View>

      <View style={styles.text2}>
        <Text style={{color:'black'}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
};


