'use client';

import {useForm} from 'react-hook-form';
import {createWarranty } from '@/app/warranty/actions';

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

const WarrantyInsertForm= ({ setActiveComponent }: { setActiveComponent: (component: string) => void }) => {
    const {register, handleSubmit, formState: {errors}} = useForm<WarrantyFormData>();

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-black">Insert Warranty Form</h1>
            <form onSubmit={handleSubmit((data) => {
                createWarranty(data);
                setActiveComponent("dashboard"); })} className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-black [&>label]:text-black">
                    <label className="block">
                        Product Name:
                        <input type="text" {...register("product_name", {required: true})}
                               className="w-full p-2 border border-gray-300 rounded bg-white text-black"/>
                        {errors.product_name && <span className="text-red-500">This field is required</span>}
                    </label>
                    <label className="block">
                        Product Type:
                        <input type="text" {...register("product_type", {required: true})}
                               className="w-full p-2 border border-gray-300 rounded bg-white text-black"/>
                        {errors.product_type && <span className="text-red-500">This field is required</span>}
                    </label>
                    <label className="block">
                        Warranty Period:
                        <input type="number" {...register("warranty_period", {valueAsNumber: true, required: true})}
                               className="w-full p-2 border border-gray-300 rounded bg-white text-black"/>
                        {errors.warranty_period && <span className="text-red-500">This field is required</span>}
                    </label>
                    <label className="block">
                        Purchase Date:
                        <input type="date" {...register("purchase_date", {required: true})}
                               className="w-full p-2 border border-gray-300 rounded bg-white text-black"/>
                        {errors.purchase_date && <span className="text-red-500">This field is required</span>}
                    </label>
                    <label className="block">
                        Expiration Date:
                        <input type="date" {...register("expiration_date", {required: true})}
                               className="w-full p-2 border border-gray-300 rounded bg-white text-black"/>
                        {errors.expiration_date && <span className="text-red-500">This field is required</span>}
                    </label>
                    <label className="block">
                        Product Manufacturer:
                        <input type="text" {...register("product_manufacturer", {required: true})}
                               className="w-full p-2 border border-gray-300 rounded bg-white text-black"/>
                        {errors.product_manufacturer && <span className="text-red-500">This field is required</span>}
                    </label>
                    <label className="block">
                        Product Serial Number:
                        <input type="text" {...register("product_serial_number", {required: true})}
                               className="w-full p-2 border border-gray-300 rounded bg-white text-black"/>
                        {errors.product_serial_number && <span className="text-red-500">This field is required</span>}
                    </label>
                    <label className="block">
                        Coverage:
                        <input type="text" {...register("coverage", {required: true})}
                               className="w-full p-2 border border-gray-300 rounded bg-white text-black"/>
                        {errors.coverage && <span className="text-red-500">This field is required</span>}
                    </label>
                    <label className="block">
                        Status:
                        <select {...register("status", { required: true })} className="w-full p-2 border border-gray-300 rounded bg-white text-black">
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Expired">Expired</option>
                        </select>
                        {errors.status && <span className="text-red-500">This field is required</span>}
                    </label>
                </div>
                <label className="block text-black">
                    Warranty is renewable:
                    <input type="checkbox" {...register("can_renew")} className="ml-2"/>
                </label>
                <label className="block text-black">
                    Extra Notes:
                    <textarea {...register("notes")}
                              className="w-full p-2 border border-gray-300 rounded bg-white text-black"></textarea>
                </label>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit
                </button>
                <button onClick={() => setActiveComponent("dashboard")}
                        className="w-full bg-gray-300 text-black rounded p-2 hover:bg-gray-400">
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default WarrantyInsertForm;
