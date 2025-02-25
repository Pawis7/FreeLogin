import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import styles from "../Styles/Styles";


export const MainScreen = ({ navigation }) => {
    const handleLogout = async () => {
        try {
          await supabase.auth.signOut(); 
          await AsyncStorage.removeItem("userData"); 
          
        } catch (error) {
          Alert.alert("Error", "No se pudo cerrar sesión.");
        }
      };

    return (
        <View>
           <TouchableOpacity style={styles.Boton} onPress={handleLogout}>
                     <Text style={styles.CrearCuentaFont}>Cerrar Sesión</Text>
            </TouchableOpacity>    
        </View>
    )
}
