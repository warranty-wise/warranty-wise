'use client'

import { createClient } from '@/utils/supabase/client'
import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';

export const GoogleSignInButton = () => {
    const supabase = createClient()
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/homepage`,
      }
    })

    if (error) console.error('Google Sign-In Error:', error.message)
  };

  return <Button variant='contained' startIcon={<Google />} onClick={handleSignIn}>Sign in with Google</Button>
};
