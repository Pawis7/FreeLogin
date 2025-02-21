import { supabase } from "./supabase";

export async function logIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

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
