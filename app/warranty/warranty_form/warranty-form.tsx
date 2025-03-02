'use client'
import { useForm } from 'react-hook-form'
import { createWarranty } from '../actions'

type WarrantyFormData = {
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
};

export default function WarrantyForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<WarrantyFormData>()

    return (
        <div>
            <h1>Insert Warranty Form</h1>
            <form onSubmit={handleSubmit(createWarranty)}>
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
