'use client'
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { redirect } from 'next/navigation'
import { createClient } from "@/utils/supabase/client";

export default function Home() {
    const supabase = createClient()
    interface Warranty {
        product_name: string;
        expiration_date: string;
        product_manufacturer: string;
    }

    const [data, setData] = useState<Warranty[]>([])

    const getWarranty = useCallback(async () => {
        try {
            const { data: userData, error: userError } = await supabase.auth.getUser()
            if (userError || !userData?.user) {
                throw new Error('User not authenticated')
            }
            const user_id = userData.user.id
            const { data, error, status } = await supabase
                .from('warranties')
                .select('product_name, expiration_date, product_manufacturer')
                .eq('user_id', user_id as string)


            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setData(data)
            }
        } catch (error) {
            alert('Error loading warranty data!')
        }
    }, [supabase])

    useEffect(() => {
        getWarranty()
    }, [getWarranty])



    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-6 overflow-auto bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4 text-gray-600">Data from Database</h1>
                    <ul className="bg-white shadow-md rounded-lg p-4">
                        {data.map((item, index) => (
                            <li key={index} className="p-2 border-b last:border-none">
                                <p className="text-black">Product Name: {item.product_name}</p>
                                <p className="text-black">Expiration Date: {item.expiration_date}</p>
                                <p className="text-black">Product Manufacturer: {item.product_manufacturer}</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => redirect('/warranty')}>upload warranty</button>
                </main>
            </div>
        </div>
    );
}