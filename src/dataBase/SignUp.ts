import { supabase } from "./supabase";

export async function signUp(email: string, password: string) {

  try {
    // 🔹 Registrar usuario en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return { success: false, message: error.message };
    }

    if (!data || !data.user) {
      return { success: false, message: "No se pudo registrar el usuario." };
    }

    return { success: true, user: data.user };

  } catch (err) {
    return { success: false, message: "Ocurrió un error inesperado." };
  }
}
