'use client';

import { createClient } from '@/utils/supabase/client';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { updateWarranty } from '@/app/warranty/actions';

interface EditWarrantyFormProps {
    warranty_id: string;
    setActiveComponent: (component: string) => void;
}

interface WarrantyData {
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
}

export function EditWarrantyForm({ warranty_id, setActiveComponent }: EditWarrantyFormProps) {
    const supabase = createClient();
    const { register, handleSubmit, setValue } = useForm<WarrantyData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWarranty() {
            const { data, error } = await supabase
                .from('warranties')
                .select('*')
                .eq('warranty_id', warranty_id)
                .single();

            if (error) {
                console.error('Error fetching warranty:', error);
                return;
            }

            Object.keys(data).forEach((key) => {
                setValue(key as keyof WarrantyData, data[key]);
            });
            setLoading(false);
        }

        fetchWarranty();
    }, [warranty_id, setValue, supabase]);

    if (loading) return <p className="text-black text-center">Loading warranty details...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md text-black">
            <h1 className="text-2xl font-bold text-center mb-6 text-black">Edit Warranty</h1>
            <form onSubmit={handleSubmit((data) => {
                updateWarranty(data, warranty_id);
                setActiveComponent(`warranty-details-${warranty_id}`);
            })} className="space-y-4">
                <div className="grid grid-cols-2 gap-4 [&>label]:text-black">
                    <label className="block">
                        Product Name:
                        <input type="text" {...register("product_name", { required: true })} className="w-full p-2 border border-gray-300 rounded bg-white text-black" />
                    </label>
                    <label className="block">
                        Product Type:
                        <input type="text" {...register("product_type", { required: true })} className="w-full p-2 border border-gray-300 rounded bg-white text-black" />
                    </label>
                    <label className="block">
                        Warranty Period:
                        <input type="number" {...register("warranty_period", { valueAsNumber: true, required: true })} className="w-full p-2 border border-gray-300 rounded bg-white text-black" />
                    </label>
                    <label className="block">
                        Purchase Date:
                        <input type="date" {...register("purchase_date", { required: true })} className="w-full p-2 border border-gray-300 rounded bg-white text-black" />
                    </label>
                    <label className="block">
                        Expiration Date:
                        <input type="date" {...register("expiration_date", { required: true })} className="w-full p-2 border border-gray-300 rounded bg-white text-black" />
                    </label>
                    <label className="block">
                        Product Manufacturer:
                        <input type="text" {...register("product_manufacturer", { required: true })} className="w-full p-2 border border-gray-300 rounded bg-white text-black" />
                    </label>
                    <label className="block">
                        Product Serial Number:
                        <input type="text" {...register("product_serial_number", { required: true })} className="w-full p-2 border border-gray-300 rounded bg-white text-black" />
                    </label>
                    <label className="block">
                        Coverage:
                        <input type="text" {...register("coverage", { required: true })} className="w-full p-2 border border-gray-300 rounded bg-white text-black" />
                    </label>
                    <label className="block">
                        Status:
                        <input type="text" {...register("status", { required: true })} className="w-full p-2 border border-gray-300 rounded bg-white text-black" />
                    </label>
                </div>
                <label className="block text-black">
                    Warranty is renewable:
                    <input type="checkbox" {...register("can_renew")} className="ml-2" />
                </label>
                <label className="block text-black">
                    Extra Notes:
                    <textarea {...register("notes")} className="w-full p-2 border border-gray-300 rounded bg-white text-black"></textarea>
                </label>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Update Warranty</button>
                <button onClick={() => setActiveComponent(`warranty-details-${warranty_id}`)}
                        className="w-full bg-gray-300 text-black rounded p-2 hover:bg-gray-400">
                    Cancel
                </button>
            </form>
        </div>
    );
}
