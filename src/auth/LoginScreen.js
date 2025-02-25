import {
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
  Pressable,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../Styles/Styles";
import { logIn } from "../dataBase/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useBiometricAuth from "../Hooks/BiometricAuth";
import { Checkbox } from "react-native-paper";
import { useScaleAnimation } from "../Componentes/BotonesAnim";

const { width, height } = Dimensions.get("window");

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const LoginScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(false);

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const scrollRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  // Estados para los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para los mensajes de error
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    if (valid) {
      try {
        // Enviar los datos a Supabase
        const result = await logIn(email, password);

        if (!result.success) {
          alert(`Error: ${result.message}`);
          Vibration.vibrate();
          return;
        }
        if (checked === false) {
          await AsyncStorage.removeItem("userData");
        }
        navigation.replace("Main");
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

  const googleButtonAnim = useScaleAnimation();
  const loginButtonAnim = useScaleAnimation();
  const ForgotAnim = useScaleAnimation();
  const SignUpAnim = useScaleAnimation();
  const showAnim = useScaleAnimation();

  const { authenticateWithBiometrics, isAuthenticated } = useBiometricAuth();

  useEffect(() => {
    authenticateWithBiometrics();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("Main");
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.MainContainer}>
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
                <Text style={styles.Titulo}>Inicio de Sesión</Text>
              </View>
              <View>
                <Image
                  style={styles.Logo}
                  source={require("../../assets/logo.png")}
                />
              </View>

              {/*boton de google comentado porque es muy complicado dejar una simulacion para que se implemente, emepzar el inicio con google desde 0 o eliminar */}
              {/* <Animated.View
                style={[{ transform: [{ scale: googleButtonAnim.scaleAnim  }] }, styles.GContainer]}
              >
              
                <Pressable
                  style={styles.GButton}
                  onPress={() => alert("Registro con Google")}
                  onPressIn={googleButtonAnim.handlePressIn}
                  onPressOut={googleButtonAnim.handlePressOut}
                >
                  <Image
                    style={styles.GLogo}
                    source={require("../../assets/googleLogo.png")}
                  />
                  <Text style={styles.Gtext}>Continuar con Google</Text>
                </Pressable>
              </Animated.View> */}

              <Animated.View
                style={[
                  styles.container,
                  { transform: [{ translateX: shakeAnimation }] },
                ]}
              >
                <View style={styles.InputContainer}>
                  <Image
                    style={styles.iconos}
                    source={require("../../assets/icons8-correo-100.png")}
                  />
                  <TextInput
                    style={styles.TextOnInput}
                    placeholder="Correo Electrónico"
                    keyboardType="email-address"
                    placeholderTextColor="gray"
                    onChangeText={setEmail}
                    value={email}
                    returnKeyType="next"
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
                    placeholderTextColor="gray"
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    value={password}
                    returnKeyType="next"
                  />
                  <Animated.View
                    style={[{ transform: [{ scale: showAnim.scaleAnim }] }]}
                  >
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      onPressIn={showAnim.handlePressIn}
                      onPressOut={showAnim.handlePressOut}
                    >
                      <Image
                        style={styles.ShowNClose}
                        source={
                          showPassword
                            ? require("../../assets/icons8-ocultar-100.png") // Ojo abierto
                            : require("../../assets/icons8-eye-100.png") // Ojo cerrado
                        }
                      />
                    </Pressable>
                  </Animated.View>
                </View>

                <View>
                  {passwordError ? (
                    <Text style={styles.ErrorText}>{passwordError}</Text>
                  ) : null}
                </View>
              </Animated.View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",

                  width: "95%",
                  paddingHorizontal: 20,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Checkbox
                    status={checked ? "checked" : "unchecked"}
                    onPress={() => {
                      setChecked(!checked);
                      if (checked === false) {
                        alert(
                          "Esto Habilitara el Inicio de Sesión con Biometria"
                        );
                      }
                    }}
                    color={checked ? "#4B92B8" : "gray"}
                  />
                  <Text style={styles.ToSText}>Recuérdame</Text>
                </View>
                <Animated.View
                  style={[{ transform: [{ scale: ForgotAnim.scaleAnim }] }]}
                >
                  <Pressable
                    onPress={() => alert("Recuperar contraseña")}
                    onPressIn={ForgotAnim.handlePressIn}
                    onPressOut={ForgotAnim.handlePressOut}
                  >
                    <Text style={styles.forgotPass}>
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </Pressable>
                </Animated.View>
              </View>
              <Animated.View
                style={[
                  { transform: [{ scale: loginButtonAnim.scaleAnim }] },
                  styles.Boton,
                ]}
              >
                <Pressable
                  onPress={handleRegister}
                  onPressIn={loginButtonAnim.handlePressIn}
                  onPressOut={loginButtonAnim.handlePressOut}
                  activeOpacity={1}
                >
                  <Text style={styles.CrearCuentaFont}>Iniciar Sesión</Text>
                </Pressable>
              </Animated.View>
              <Animated.View
                style={[{ transform: [{ scale: SignUpAnim.scaleAnim }] }]}
              >
                <Pressable
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: width * 0.06,
                  }}
                  onPress={() => navigation.replace("Register")}
                  onPressIn={SignUpAnim.handlePressIn}
                  onPressOut={SignUpAnim.handlePressOut}
                >
                  <Text style={styles.linkText}>¿No tienes cuenta? </Text>
                  <Text style={styles.linkTextBold}>Registrate</Text>
                </Pressable>
              </Animated.View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
