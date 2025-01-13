"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { type AuthError } from "@supabase/supabase-js";

interface SignUpParams {
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function signUp({ email, password }: SignUpParams) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async function login({ email, password }: LoginParams) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    router.refresh();
    router.push("/dashboard");
    return data;
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }

    // Clear any application state/context if needed
    
    // Force a router refresh to update the server component tree
    router.refresh();
    
    // Redirect to login page
    router.push("/auth/login");
  }

  return {
    signUp,
    login,
    logout,
  };
}
