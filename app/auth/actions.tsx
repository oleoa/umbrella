"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { FormState } from "@/interfaces";

const authSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const authData = Object.fromEntries(formData);
  const validatedAuth = authSchema.safeParse(authData);
  if (!validatedAuth.success) {
    const formFieldErrors = validatedAuth.error.flatten().fieldErrors;
    const errors = Object.values(formFieldErrors || {})
      .filter((e): e is string[] => Boolean(e))
      .map((e) => e[0]);
    return {
      message: null,
      success: false,
      errors: errors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(validatedAuth.data);
  if (error) {
    return {
      message: null,
      success: false,
      errors: [error.message],
    };
  }

  revalidatePath("/auth");
  return {
    message: "Successfully logged in",
    success: true,
    errors: [],
  };
}

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const authData = Object.fromEntries(formData);
  const validatedAuth = authSchema.safeParse(authData);
  if (!validatedAuth.success) {
    const formFieldErrors = validatedAuth.error.flatten().fieldErrors;
    const errors = Object.values(formFieldErrors || {})
      .filter((e): e is string[] => Boolean(e))
      .map((e) => e[0]);
    return {
      message: null,
      success: false,
      errors: errors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(validatedAuth.data);
  if (error) {
    return {
      message: null,
      success: false,
      errors: [error.message],
    };
  }

  revalidatePath("/auth");
  return {
    message: "Successfully signed up",
    success: true,
    errors: [],
  };
}
