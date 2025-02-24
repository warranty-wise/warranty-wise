'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ...

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      console.log('Fetching profile for user:', user);


      const { data, error, status } = await supabase
        .from('profiles')
        .select(`name, email, address`)
        .eq('user_id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setName(data.name)
        setEmail(data.email)
        setAddress(data.address)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    name,
    address,
  }: {
    email: string | null
    name: string | null
    address: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        user_id: user?.id as string,
        name: name,
        email: user?.email, 
        address,
        updated_at: new Date().toISOString(),
      })
      if (error) {
        throw error
      }
      alert('Profile updated!')
    } catch (error) {
      console.error('Error updating the data:', error)
      alert('Error updating the data!')
    } finally {
      setLoading(false)
      redirect('/')
    }
  }

  return (
    <div className="form-widget">

      {/* ... */}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">address</label>
        <input
          id="address"
          type="url"
          value={address || ''}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ name, email, address })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}