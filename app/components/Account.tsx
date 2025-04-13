'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export function AccountForm() {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [address, setAddress] = useState<string | null>(null)

    const getUser = useCallback(async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error);
        } else {
            setUser(user);
        }
    }, [supabase]);

    const getProfile = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true)
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`name, email, address`)
                .eq('user_id', user.id)
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
        getUser();
    }, [getUser]);

    useEffect(() => {
        if (user) getProfile();
    }, [user, getProfile]);

    async function updateProfile() {
        try {
            setLoading(true)
            const { error } = await supabase.from('profiles').upsert({
                user_id: user?.id as string,
                name,
                email: user?.email,
                address,
                updated_at: new Date().toISOString(),
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            console.error('Error updating the data:', error)
            alert('Error updating the data!')
        } finally {
            setLoading(false)
            redirect('/homepage')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Information</h2>
            <div className="w-full max-w-lg space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input id="email" type="text" value={email || ''} readOnly className="mt-1 block w-full border bg-gray-50 border-gray-300 text-black rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input id="fullName" type="text" value={name || ''} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border bg-gray-50 text-black border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <input id="address" type="text" value={address || ''} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full border bg-gray-50 text-black border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <button onClick={updateProfile} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-2 disabled:opacity-50">
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
                <form action="/signout" method="post">
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md mt-2">
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    )
};

export default AccountForm;
