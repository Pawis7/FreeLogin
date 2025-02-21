import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Vibration,
  Alert,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../Styles/ThemeContext";
import { logIn } from "../dataBase/Login";
import * as LocalAuthentication from "expo-local-authentication"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export const LoginScreen = ({ navigation }) => {
  const { styles, theme } = useTheme();
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    checkForSavedUser();
  }, []);

  const loadSavedEmail = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const { email } = JSON.parse(userData);
      setEmail(email); 
    }
  };
  const checkForSavedUser = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      authenticateWithBiometrics();
    }
  };

  const authenticateWithBiometrics = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      
  
      if (!hasHardware) {
        Alert.alert("Error", "Este dispositivo no tiene hardware biométrico.");
        return;
      }
  
      if (!isEnrolled) {
        Alert.alert("Error", "No hay huellas o Face ID registrados en este dispositivo.");
        return;
      }
  
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autenticación biométrica",
        fallbackLabel: "Usar contraseña", 
        disableDeviceFallback: false, 
      });
  
      if (result.success) {
        navigation.replace("Main");
      } else {
        Alert.alert("Error", "Autenticación fallida. Usa tu contraseña.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema con la autenticación biométrica.");
    }
  };
  

  const handleRegister = async () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Correo inválido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Contraseña inválida o correo incorrecto");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      Vibration.vibrate();
      shakeForm();
      return;
    }

    try {
      const result = await logIn(email, password);

      if (!result.success) {
        Alert.alert("Error", result.message);
        Vibration.vibrate();
        return;
      }

      await AsyncStorage.setItem("userData", JSON.stringify({ email, password }));
      navigation.replace("Main");
    } catch (error) {
      Alert.alert("Error", error.message);
      Vibration.vibrate();
    }
  };


  return (
    <View style={styles.MainContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 0 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              ref={scrollRef}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              <View>
                <Text style={styles.Titulo}>Inicio de Sesión</Text>
              </View>
              <View>
                <Image style={styles.Logo} source={require("../../assets/logo.png")} />
              </View>
              <View style={styles.GContainer}>
                <TouchableOpacity style={styles.GButton} onPress={() => Alert.alert("Registro con Google")}>
                  <Image style={styles.GLogo} source={require("../../assets/googleLogo.png")} />
                  <Text style={styles.Gtext}>Continuar con Google</Text>
                </TouchableOpacity>
              </View>

              <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnimation }] }]}>
                <View style={styles.InputContainer}>
                  <Image style={styles.iconos} source={require("../../assets/icons8-correo-100.png")} />
                  <TextInput
                    style={styles.TextOnInput}
                    placeholder="Correo Electrónico"
                    keyboardType="email-address"
                    placeholderTextColor={theme === "dark" ? "gray" : "#8b8b8b"} 
                    onChangeText={setEmail}
                    value={email}
                    returnKeyType="next"
                  />
                </View>
                {emailError ? <Text style={styles.ErrorText}>{emailError}</Text> : null}

                <View style={styles.InputContainer}>
                  <Image style={styles.iconos} source={require("../../assets/icons8-candado-100.png")} />
                  <TextInput
                    style={styles.TextOnInput}
                    placeholder="Contraseña"
                    placeholderTextColor={theme === "dark" ? "gray" : "#8b8b8b"} 
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    value={password}
                    returnKeyType="next"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                      style={styles.ShowNClose}
                      source={showPassword ? require("../../assets/icons8-ocultar-100.png") : require("../../assets/icons8-eye-100.png")}
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.ErrorText}>{passwordError}</Text> : null}
              </Animated.View>

              <View style={styles.Boton}>
                <TouchableOpacity onPress={handleRegister}>
                  <Text style={styles.CrearCuentaFont}>Iniciar Sesión</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", marginTop: width * 0.06 }} onPress={() => Alert.alert("Recuperar contraseña")}>
                  <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", marginTop: width * 0.06 }} onPress={() => navigation.replace("Register")}>
                  <Text style={styles.linkText}>¿No tienes cuenta? </Text>
                  <Text style={styles.linkTextBold}>Registrate</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
