import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import styles from "../Styles/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScaleAnimation } from "../Componentes/BotonesAnim";
import React, { useRef, useState } from "react";

const { width, height } = Dimensions.get("window");


const HomeScreen = ({ navigation }) => {
  const SignUpAnim = useScaleAnimation();
  const LinkTextAnim = useScaleAnimation();

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView>
        <Image
          style={styles.HomeLogo}
          source={require("../../assets/HomeLogo.png")}
        ></Image>

        <Text style={styles.Titulo}>Welcome</Text>
        <Text style={styles.HomeContentText}>Welcome</Text>

        <Animated.View
          style={[
            { transform: [{ scale: SignUpAnim.scaleAnim }] },
            styles.Boton,
          ]}
        >
          <Pressable
            onPress={() => navigation.navigate("Register")}
            onPressIn={SignUpAnim.handlePressIn}
            onPressOut={SignUpAnim.handlePressOut}
          >
            <Text style={styles.CrearCuentaFont}>Crear Cuenta</Text>
          </Pressable>
        </Animated.View>
        <Animated.View
                style={[{ transform: [{ scale: LinkTextAnim.scaleAnim }] }]}
              >
                <Pressable
                  LinkTextAnim
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: width * 0.06,
                  }}
                  onPress={() => navigation.navigate("Login")}
                  onPressIn={LinkTextAnim.handlePressIn}
                  onPressOut={LinkTextAnim.handlePressOut}
                >
                  <Text style={styles.linkText}>¿Ya tienes una cuenta? </Text>
                  <Text style={styles.linkTextBold}>Inicia Sesión</Text>
                </Pressable>
              </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;