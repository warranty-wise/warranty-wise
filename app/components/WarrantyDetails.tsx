'use client';

import DeleteButton from "@/app/components/DeleteButton";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type WarrantyFormData = {
    warranty_id: string;
    product_name: string;
    product_type: string;
    warranty_period: number;
    purchase_date: string;
    expiration_date: string;
    product_manufacturer: string;
    product_serial_number: string;
    coverage: string;
    status: string;
    can_renew: boolean;
    notes?: string;
    uploaded_at: string;
};

const WarrantyDetails = ({ warrantyId, setActiveComponent }: { warrantyId: string, setActiveComponent: (component: string) => void }) => {
    const supabase = createClient();
    const [warranty, setWarranty] = useState<WarrantyFormData | null>(null);
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
        return <p className="text-center text-black">Loading...</p>;
    }

    if (!warranty) {
        return <p className="text-center text-red-500">Warranty not found.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-10 text-black">
            {/* Back Button */}
            <div className="flex items-center">
                <button
                    onClick={() => setActiveComponent("dashboard")}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition"
                >
                    ← Back
                </button>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-center text-blue-600">Warranty Details</h1>

            {/* Warranty Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 justify-items-center text-center">
                <div className="w-full">
                    <p className="font-semibold text-black">Product Name</p>
                    <p className="text-black">{warranty.product_name}</p>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-black">Manufacturer</p>
                    <p className="text-black">{warranty.product_manufacturer}</p>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-black">Type</p>
                    <p className="text-black">{warranty.product_type}</p>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-black">Serial Number</p>
                    <p className="text-black">{warranty.product_serial_number}</p>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-black">Warranty Period</p>
                    <p className="text-black">{warranty.warranty_period} Months</p>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-black">Status</p>
                    <p className="text-black">{warranty.status}</p>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-black">Renewable</p>
                    <p className="text-black">{warranty.can_renew ? "Yes" : "No"}</p>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-black">Coverage</p>
                    <p className="text-black">{warranty.coverage}</p>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-black">Purchase Date</p>
                    <p className="text-black">{new Date(warranty.purchase_date).toLocaleDateString()}</p>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-black">Expiration Date</p>
                    <p className="text-black">{new Date(warranty.expiration_date).toLocaleDateString()}</p>
                </div>
                {warranty.notes && (
                    <div className="w-full md:col-span-2">
                        <p className="font-semibold text-black">Notes</p>
                        <p className="text-black">{warranty.notes}</p>
                    </div>
                )}
                <div className="w-full md:col-span-2">
                    <p className="font-semibold text-black">Uploaded At</p>
                    <p className="text-black">{new Date(warranty.uploaded_at).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mt-10">
                <button
                    onClick={() => setActiveComponent(`edit-warranty-${warranty.warranty_id}`)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Edit Warranty
                </button>
                <DeleteButton id={warranty.warranty_id} setActiveComponent={setActiveComponent} />
            </div>
        </div>
    );
};

export default WarrantyDetails;
