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
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../Styles/ThemeContext";
import { Checkbox } from "react-native-paper";
import { signUp } from "../dataBase/SignUp";



// Constantes para obtener el ancho y alto de la pantalla
const { width, height } = Dimensions.get("window");

// verificar si nombre es valido o no esta vacio
// const validName = (name) => {
//  return name !== "";
// };

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};
const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const RegisterScreen = ({ navigation }) => {
  const { styles } = useTheme();

  const [checked, setChecked] = useState(false);
  const [shakeAnimation] = useState(new Animated.Value(0));
  const isDisabled = true; // Simulación de deshabilitado

  const scrollRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  // Estados para los inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados para los mensajes de error
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [ToSError, setToSError] = useState("");

  const handleRegister = async () => {
    let valid = true;

    // if (!validName(name)) {
    // setNameError("Nombre inválido");
    // valid = false;
    // } else {
    // setNameError("");
    // }

    if (!validateEmail(email)) {
      setEmailError("Correo inválido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Debe tener MINIMO 8 caracteres, 1 mayúscula, 1 número y 1 símbolo"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!validateConfirmPassword(password, confirmPassword)) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (checked === false) {
      setToSError("Acepta los términos y condiciones");
      valid = false;
    } else {
      setToSError("");
    }
    if (!valid) {
      Vibration.vibrate();
      shakeForm();
      return;
    }
    if (valid) {
      try {
        // Enviar los datos a Supabase
        const result = await signUp(email, password);

        if (!result.success) {
          alert(`Error: ${result.message}`);
          Vibration.vibrate();
          return;
        }

        alert("Registro exitoso. Revisa tu correo para confirmar la cuenta.");
        navigation.replace("Login");
      } catch (error) {
        alert(`Error: ${error.message}`);
        Vibration.vibrate();
      }
    }
  };
  const shakeForm = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.MainContainer}>
      <StatusBar barStyle="default" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              ref={scrollRef}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              <View>
                <Text style={styles.Titulo}>¡Regístrate!</Text>
              </View>
              <View>
                <Image
                  style={styles.Logo}
                  source={require("../../assets/logo.png")}
                />
              </View>
              <Animated.View
                style={[
                  styles.container,
                  { transform: [{ translateX: shakeAnimation }] },
                ]}
              >
                <View>
                  {nameError ? (
                    <Text style={styles.ErrorText}>{nameError}</Text>
                  ) : null}
                </View>
                <View style={styles.InputContainer}>
                  <Image
                    style={styles.iconos}
                    source={require("../../assets/icons8-correo-100.png")}
                  />
                  <TextInput
                    style={styles.TextOnInput}
                    placeholder="Correo Electrónico"
                    placeholderTextColor={
                      useTheme === "dark" ? "gray" : "#8b8b8b"
                    }
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                    returnKeyType="next"
                    autoCompleteType="email"
                  />
                </View>
                <View>
                  {emailError ? (
                    <Text style={styles.ErrorText}>{emailError}</Text>
                  ) : null}
                </View>
                <View style={styles.InputContainer}>
                  <Image
                    style={styles.iconos}
                    source={require("../../assets/icons8-candado-100.png")}
                  />
                  <TextInput
                    style={styles.TextOnInput}
                    placeholder="Contraseña"
                    placeholderTextColor={
                      useTheme === "dark" ? "gray" : "#8b8b8b"
                    }
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    value={password}
                    returnKeyType="next"
                  />
                </View>

                <View>
                  {passwordError ? (
                    <Text style={styles.ErrorText}>{passwordError}</Text>
                  ) : null}
                </View>
                <View style={styles.InputContainer}>
                  <Image
                    style={styles.iconos}
                    source={require("../../assets/icons8-candado-100.png")}
                  />
                  <TextInput
                    style={styles.TextOnInput}
                    placeholder="Confirma Contraseña"
                    placeholderTextColor={
                      useTheme === "dark" ? "gray" : "#8b8b8b"
                    }
                    secureTextEntry={!showPassword}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Image
                      style={styles.ShowNClose}
                      source={
                        showPassword
                          ? require("../../assets/icons8-ocultar-100.png") // Ojo abierto
                          : require("../../assets/icons8-eye-100.png") // Ojo cerrado
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  {!passwordError && (
                    <Text style={styles.PasswordRequirements}>
                      Debe incluir 8 caracteres, 1 mayúscula, 1 número y 1
                      símbolo
                    </Text>
                  )}
                </View>
                <View>
                  {confirmPasswordError ? (
                    <Text style={styles.ErrorText}>{confirmPasswordError}</Text>
                  ) : null}
                </View>
                <View style={styles.ToS}>
                  <Checkbox
                    status={
                      Platform.OS === "ios"
                        ? "checked"
                        : checked
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => setChecked(!checked)}
                    color={
                      Platform.OS === "ios"
                        ? checked
                          ? "#4B92B8"
                          : "gray"
                        : "#4B92B8"
                    }
                  />
                  <Text style={styles.ToSText}>He Leido y Acepto </Text>
                  <TouchableOpacity>
                    <Text style={styles.ToSLink}>Términos y Condiciones</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {ToSError ? (
                    <Text style={styles.ErrorText}>{ToSError}</Text>
                  ) : null}
                </View>
              </Animated.View>

              <View style={styles.Boton}>
                <TouchableOpacity onPress={handleRegister}>
                  <Text style={styles.CrearCuentaFont}>Crear Cuenta</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.GContainer}>
                <TouchableOpacity
                  style={styles.GButton}
                  onPress={() => alert("Registro con Google")}
                >
                  <Image
                    style={styles.GLogo}
                    source={require("../../assets/googleLogo.png")}
                  />
                  <Text style={styles.Gtext}>Continuar con Google</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: width * 0.06,
                  }}
                  onPress={() => navigation.replace("Login")}
                >
                  <Text style={styles.linkText}>¿Ya tienes una cuenta? </Text>
                  <Text style={styles.linkTextBold}>Inicia Sesión</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
