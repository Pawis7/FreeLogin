import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { useTheme } from "../Styles/ThemeContext";
import { supabase } from "../dataBase/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ IMPORTANTE: Importar AsyncStorage

const HomeScreen = ({ navigation }) => {
  const { styles, toggleTheme } = useTheme();

  // ✅ Mueve `handleLogout()` aquí dentro para acceder a `navigation`
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); 
      await AsyncStorage.removeItem("userData"); 
      
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión.");
    }
  };

  return (
    <View style={styles.MainContainer}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.Titulo}>HomeScreen</Text>

        <TouchableOpacity style={styles.Boton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.CrearCuentaFont}>Go to Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Boton} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.CrearCuentaFont}>Go to Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Boton} onPress={() => navigation.navigate("Main")}>
          <Text style={styles.CrearCuentaFont}>Go to Main</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Boton} onPress={toggleTheme}>
          <Text style={styles.CrearCuentaFont}>Cambiar Tema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Boton} onPress={handleLogout}>
          <Text style={styles.CrearCuentaFont}>Cerrar Sesión</Text>
        </TouchableOpacity>     
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Boton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
});
