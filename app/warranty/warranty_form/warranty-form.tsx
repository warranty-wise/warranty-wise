'use client'
import { createClient } from '@/utils/supabase/client'
import { useForm } from 'react-hook-form'

export default function WarrantyForm() {
    const supabase = createClient()
    const { register, handleSubmit, formState: { errors } } = useForm()

    interface WarrantyFormData {
        product_name: string;
        product_type: string;
        warranty_period: number;
        purchase_date: string;
        expiration_date: string;
        product_manufacturer: string;
        product_serial_number: string;
        coverage: string;
        status: string;
        can_renew?: boolean;
        notes?: string;
    }

    async function createWarranty(data: WarrantyFormData) {
        try {
            // get logged in user
            const { data: userData, error: userError } = await supabase.auth.getUser()
            if (userError || !userData?.user) {
                throw new Error('User not authenticated')
            }

            // store user id
            const user_id = userData.user.id 
            console.log('User ID:', user_id)

            // format date correctly
            const formattedPurchaseDate = new Date(data.purchase_date).toISOString().split('T')[0]
            const formattedExpirationDate = new Date(data.expiration_date).toISOString().split('T')[0]

            // insert new warranty
            const { error } = await supabase
                .from('warranties')
                .insert([
                    {
                        user_id,
                        product_name: data.product_name,
                        product_type: data.product_type,
                        warranty_period: Number(data.warranty_period),
                        purchase_date: formattedPurchaseDate,
                        expiration_date: formattedExpirationDate,
                        product_manufacturer: data.product_manufacturer,
                        product_serial_number: data.product_serial_number,
                        coverage: data.coverage,
                        status: data.status,
                        can_renew: data.can_renew,
                        uploaded_at: new Date().toISOString(),
                        notes: data.notes,
                    },
                ])        
            if (error) {
                console.error('Supabase Error:', error.code, error.message, error.details);
                alert(`Error: ${error.message}`);            
                throw error
            }
            alert('Warranty created')
        } catch (error) {
            console.error('Error creating warranty:', error)
        }
    }

    return (
        <div>
            <h1>Insert Warranty Form</h1>
            <form onSubmit={handleSubmit(createWarranty as any)}>
                <label>
                    Product Name:
                    <input type="text" {...register("product_name", { required: true })} />
                    {errors.product_name && <span>This field is required</span>}
                </label>
                <label>
                    Product Type:
                    <input type="text" {...register("product_type", { required: true })} />
                    {errors.product_name && <span>This field is required</span>}
                </label>
                <label>
                    Warranty Period:
                    <input type="number" {...register("warranty_period", { valueAsNumber: true, required: true })} />
                    {errors.product_name && <span>This field is required</span>}
                </label>
                <label>
                    Purchase Date:
                    <input type="date" {...register("purchase_date", { required: true })} />
                    {errors.product_name && <span>This field is required</span>}
                </label>
                <label>
                    Expiration Date:
                    <input type="date" {...register("expiration_date", { required: true })} />
                    {errors.product_name && <span>This field is required</span>}
                </label>
                <label>
                    Product Manufacturer:
                    <input type="text" {...register("product_manufacturer", { required: true })} />
                    {errors.product_name && <span>This field is required</span>}
                </label>
                <label>
                    Product Serial Number:
                    <input type="text" {...register("product_serial_number", { required: true })} />
                    {errors.product_name && <span>This field is required</span>}
                </label>
                <label>
                    Coverage:
                    <input type="text" {...register("coverage", { required: true })} />
                    {errors.product_name && <span>This field is required</span>}
                </label>
                <label>
                    Status:
                    <input type="text" {...register("status", { required: true })} />
                    {errors.product_name && <span>This field is required</span>}
                </label>
                <label>
                    Warranty is renewable:
                    <input type="checkbox" {...register("can_renew")} />
                </label>
                <label>
                    Extra Notes:
                    <input type="text" {...register("notes")} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
