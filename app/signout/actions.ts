'use server'
import { createClient } from '@/utils/supabase/server'

export async function signout() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error("Error signing out:", error.message)
        return { error: error.message }
    }
}
