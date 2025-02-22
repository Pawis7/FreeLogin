import { supabase } from "./supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function logIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.session){
      const userData ={
        email: data.user.email,
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      };
      await AsyncStorage.setItem("userData", JSON.stringify(userData))
    }
    if (error) {
      return { success: false, message: error.message };
    }

    if (!data || !data.session) {
      return { success: false, message: "No se pudo iniciar sesión." };
    }

    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, message: "Ocurrió un error inesperado." };
  }
}
