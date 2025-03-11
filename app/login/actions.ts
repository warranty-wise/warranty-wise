'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'


// Define validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate the form data
  const validation = loginSchema.safeParse(data)

  if (!validation.success) {
    const formattedErrors = validation.error.format();
    return {
      email: formattedErrors.email?._errors[0] || null,
      password: formattedErrors.password?._errors[0] || null,
    }
  }

  const { error } = await supabase.auth.signInWithPassword(validation.data)

  if (error) {
    console.error("Error logging in:", error.message)
    return { general: error.message }
  }

  revalidatePath("/homepage", "layout")
  redirect("/homepage")
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  // Validate the form data
  const validation = loginSchema.safeParse(data)

  if (!validation.success) {
    console.error("Validation failed:", validation.error.format())
    redirect('/error') // Redirect to an error page if validation fails
    return
  }

  const { error } = await supabase.auth.signUp(validation.data)

  console.log(error)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}