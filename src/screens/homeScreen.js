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
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const SignUpAnim = useScaleAnimation();
  const LinkTextAnim = useScaleAnimation();
  const scrollRef = useRef(null);

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView>
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={{ marginBottom: width * 0.1, marginTop: width * 0.1 }}>
            <Text style={styles.Titulo}>Welcome</Text>
          </View>

          <Image
            style={styles.HomeLogo}
            source={require("../../assets/HomeLogo.png")}
          ></Image>

          <View style={{ marginTop: width * 0.2 }}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
