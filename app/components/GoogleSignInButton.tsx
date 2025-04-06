'use client'

import { createClient } from '@/utils/supabase/client'
import { Google } from '@mui/icons-material';

export const GoogleSignInButton = () => {
    const supabase = createClient()
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) console.error('Google Sign-In Error:', error.message)
  };

  return <button className="bg-black" onClick={handleSignIn}><Google /></button>
};
