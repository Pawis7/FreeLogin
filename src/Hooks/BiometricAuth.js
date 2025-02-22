import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { supabase } from "../dataBase/supabase";


const useBiometricAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    authenticateWithBiometrics();
  }, []);

  
  

 const authenticateWithBiometrics = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      
      if (!userData) {
        return;
      }

      const { refresh_token } = JSON.parse(userData);
      
      const { data, error } = await supabase.auth.refreshSession({ refresh_token });

        if (error) {
            await AsyncStorage.removeItem('userData'); 
            return false;
        }

        await AsyncStorage.setItem('userData', JSON.stringify({
            email: data.user.email,
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
        }));
      
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  
        if (!hasHardware || !isEnrolled) {
          return false;
        } 

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autenticación biométrica",
        cancelLabel: "Usar contraseña",
        disableDeviceFallback: false,
      });

      if (result.success) {
        setIsAuthenticated(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema con la autenticación biométrica.");
      return false;
    }
  };

  return { authenticateWithBiometrics, isAuthenticated };
};

export default useBiometricAuth;
