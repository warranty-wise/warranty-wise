'use client'
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import SearchBar from "@/app/components/SearchBar";

const Dashboard = ({ setActiveComponent }: { setActiveComponent: (component: string) => void }) => {

    const supabase = createClient()
    interface Warranty {
        warranty_id: string
        product_name: string
        expiration_date: string
        product_manufacturer: string
    }

    const [data, setData] = useState<Warranty[]>([])
    const [searchResults, setSearchResults] = useState<Warranty[]>([])

    const getWarranty = useCallback(async () => {
        try {
            const { data: userData, error: userError } = await supabase.auth.getUser()
            if (userError || !userData?.user) {
                throw new Error('User not authenticated')
            }
            const user_id = userData.user.id
            const { data, error, status } = await supabase
                .from('warranties')
                .select('warranty_id, product_name, expiration_date, product_manufacturer')
                .eq('user_id', user_id as string)


            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setData(data)
            }
        } catch (error) {
            alert('Error loading warranty data!')
            return error
        }
    }, [supabase])

    useEffect(() => {
        getWarranty()
    }, [getWarranty]);

    const handleSearch = (query: string) => {
        if (query.trim() !== "") {
            const results = data.filter((item) =>
                item.product_name.toLowerCase().includes(query.toLowerCase()) ||
                item.product_manufacturer.toLowerCase().includes(query.toLowerCase())
            )
            setSearchResults(results)
        } else {
            setSearchResults(data)
        }
    }

    return (
        <>
            <div className="grid grid-cols-3">
                <h1 className="text-2xl font-bold text-gray-600 m-5">Your Warranties</h1>
                <div className="p-2 mb-4" style={{ display: "flex", flexFlow: "nowrap", justifyContent: "center", alignItems: "center" }}>
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div style={{ display: "flex", flexFlow: "nowrap", justifyContent: "right", alignItems: "right" }}>
                    <button className=" mt-3 mb-6 p-2 m-5 bg-blue-600" onClick={() => setActiveComponent("warranty-form-select")}>Insert Warranty</button>
                </div>
            </div>
            <ul className="bg-white shadow-md rounded-lg p-4">
                {searchResults.length > 0 ? searchResults.map((warranty) => (
                    <li key={warranty.warranty_id} className="p-2 border-b last:border-none">
                        <Card>
                            <CardActionArea onClick={() => setActiveComponent(`warranty-details-${warranty.warranty_id}`)}>
                                <CardContent>
                                    <h2 className="text-lg text-black font-bold">{warranty.product_name}</h2>
                                    <p className="text-gray-600">Manufacturer: {warranty.product_manufacturer}</p>
                                    <p className="text-gray-600">Expiration Date: {new Date(warranty.expiration_date).toLocaleDateString()}</p>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </li>
                )) : data.map((warranty) => (
                    <li key={warranty.warranty_id} className="p-2 border-b last:border-none">
                        <Card>
                            <CardActionArea onClick={() => setActiveComponent(`warranty-details-${warranty.warranty_id}`)}>
                                <CardContent>
                                    <h2 className="text-lg text-black font-bold">{warranty.product_name}</h2>
                                    <p className="text-gray-600">Manufacturer: {warranty.product_manufacturer}</p>
                                    <p className="text-gray-600">Expiration Date: {new Date(warranty.expiration_date).toLocaleDateString()}</p>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </li>
                ))}
            </ul>                
        </>
    )
};

export default Dashboard;