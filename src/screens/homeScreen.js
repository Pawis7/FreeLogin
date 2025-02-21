import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { useTheme } from "../Styles/ThemeContext";

const HomeScreen = ({ navigation }) => {
  const { styles, toggleTheme } = useTheme();
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
      <TouchableOpacity
        style={styles.Boton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.CrearCuentaFont}>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Boton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.CrearCuentaFont}>Go to Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Boton}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.CrearCuentaFont}>Go to Main</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Boton} onPress={toggleTheme}>
        <Text style={styles.CrearCuentaFont}>Cambiar Tema</Text>
      </TouchableOpacity>

      <View style={styles.InputContainer}>
        <TextInput
          style={styles.TextOnInput}
          placeholder="Nombre"
          returnKeyType="next"
        />
      </View>
      <View style={styles.Boton}>
        <TouchableOpacity>
          <Text style={styles.CrearCuentaFont}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>
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
});
