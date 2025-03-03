'use client';

import DeleteButton from "@/app/components/DeleteButton";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";

const WarrantyDetails = ({ warrantyId, setActiveComponent }: { warrantyId: string, setActiveComponent: (component: string) => void }) => {
    const supabase = createClient();
    const [warranty, setWarranty] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWarranty = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("warranties")
                .select("*")
                .eq("warranty_id", warrantyId)
                .single();

            if (!error && data) {
                setWarranty(data);
            }
            setLoading(false);
        };

        fetchWarranty();
    }, [warrantyId, supabase]);

    if (loading) {
        return <p className="text-black text-center">Loading...</p>;
    }

    if (!warranty) {
        return <p className="text-black text-center">Warranty not found.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <button onClick={() => setActiveComponent("dashboard")} className="mb-4 p-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-black text-center mb-6">Warranty Details</h1>
            <div className="grid grid-cols-2 gap-4 text-black [&>p]:text-black [&>p>strong]:text-black">
                <p><strong>ID:</strong> {warranty.warranty_id}</p>
                <p><strong>Product Name:</strong> {warranty.product_name}</p>
                <p><strong>Manufacturer:</strong> {warranty.product_manufacturer}</p>
                <p><strong>Type:</strong> {warranty.product_type}</p>
                <p><strong>Serial Number:</strong> {warranty.product_serial_number}</p>
                <p><strong>Warranty Period:</strong> {warranty.warranty_period} Months</p>
                <p><strong>Status:</strong> {warranty.status}</p>
                <p><strong>Purchase Date:</strong> {warranty.purchase_date}</p>
                <p><strong>Expiration Date:</strong> {warranty.expiration_date}</p>
            </div>
            <div className="flex justify-between mt-6">
                <button onClick={() => setActiveComponent(`edit-warranty-${warranty.warranty_id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Edit
                </button>
                <DeleteButton id={warranty.warranty_id} setActiveComponent={setActiveComponent}/>
            </div>
        </div>
    );
};

export default WarrantyDetails;
