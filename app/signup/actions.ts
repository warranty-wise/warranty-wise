
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

// Define validation schema
const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})


export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    // Validate the form data
    const validation = signupSchema.safeParse(data)

    if (!validation.success) {
        const formattedErrors = validation.error.format();
        return {
            email: formattedErrors.email?._errors[0] || null,
            password: formattedErrors.password?._errors[0] || null,
        }
    }

    // Check if the email is already registered
    const { data: checkUser, error: fetchError } = await supabase
    .from('profiles')
    .select('email')
    .eq('email', validation.data.email)
    .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Error checking email:", fetchError.message)
        return { general: fetchError.message }
    }
    if (checkUser) {
        console.error("Email already registered")
        return { general: "Email already registered" }
    }

    // sign up the user if the email is not already registered
    const { error } = await supabase.auth.signUp(validation.data)

    console.log(error)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/account')
}