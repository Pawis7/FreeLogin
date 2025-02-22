import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const useBiometricAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkForSavedUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
  
      if (!userData) {
        return;
      }
  
      authenticateWithBiometrics();
    } catch (error) {
        alert(`Error: ${error.message}, inicie con contraseña`);
        Vibration.vibrate();
    }
  };
  

  const authenticateWithBiometrics = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autenticación biométrica",
        fallbackLabel: "Usar contraseña",
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

  return { checkForSavedUser, isAuthenticated };
};

export default useBiometricAuth;
