'use client'
import { createClient } from '@/utils/supabase/client'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { updateWarranty } from '../../actions';

interface EditWarrantyFormProps {
    warranty_id: string;
}

export default function EditWarrantyForm({ warranty_id }: EditWarrantyFormProps) {
    const supabase = createClient()
    const { register, handleSubmit, setValue, } = useForm<WarrantyData>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchWarranty() {
            const { data, error } = await supabase
                .from('warranties')
                .select('*')
                .eq('warranty_id', warranty_id)
                .single()

            if (error) {
                console.error('Error fetching warranty:', error)
                return
            }

            Object.keys(data).forEach((key) => {
                setValue(key as keyof WarrantyData, data[key])
            })
            setLoading(false)
        }

        fetchWarranty()
    }, [warranty_id, setValue, supabase])

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

    if (loading) return <p>Loading warranty details...</p>

    return (
        <div>
            <h1>Edit Warranty</h1>
            <form onSubmit={handleSubmit((data) => updateWarranty(data, warranty_id))}>
                <label>
                    Product Name:
                    <input type="text" {...register("product_name", { required: true })} />
                </label>
                <label>
                    Product Type:
                    <input type="text" {...register("product_type", { required: true })} />
                </label>
                <label>
                    Warranty Period:
                    <input type="number" {...register("warranty_period", { valueAsNumber: true, required: true })} />
                </label>
                <label>
                    Purchase Date:
                    <input type="date" {...register("purchase_date", { required: true })} />
                </label>
                <label>
                    Expiration Date:
                    <input type="date" {...register("expiration_date", { required: true })} />
                </label>
                <label>
                    Product Manufacturer:
                    <input type="text" {...register("product_manufacturer", { required: true })} />
                </label>
                <label>
                    Product Serial Number:
                    <input type="text" {...register("product_serial_number", { required: true })} />
                </label>
                <label>
                    Coverage:
                    <input type="text" {...register("coverage", { required: true })} />
                </label>
                <label>
                    Status:
                    <input type="text" {...register("status", { required: true })} />
                </label>
                <label>
                    Warranty is renewable:
                    <input type="checkbox" {...register("can_renew")} />
                </label>
                <label>
                    Extra Notes:
                    <input type="text" {...register("notes")} />
                </label>
                <button type="submit">Update Warranty</button>
            </form>
        </div>
    )
}
