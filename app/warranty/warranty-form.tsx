'use client'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

export default function WarrantyForm() {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        product_name: '',
        product_type: '',
        warranty_period: 0,
        purchase_date: '',
        expiration_date: '',
        product_manufacturer: '',
        product_serial_number: '',
        coverage: '',
        status: '',
        can_renew: false,
        notes: '',
    })

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value.trim(),
        }))
    }    

    // Handle checkbox changes
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }))
    }


    async function createWarranty() {
        try {
            setLoading(true)

            // Get authenticated user
            const { data: userData, error: userError } = await supabase.auth.getUser()
            if (userError || !userData?.user) {
                throw new Error('User not authenticated')
            }

            // Get user id
            const user_id = userData.user.id 

            // Formate date correctly
            const formattedPurchaseDate = new Date(formData.purchase_date).toISOString().split('T')[0]
            const formattedExpirationDate = new Date(formData.expiration_date).toISOString().split('T')[0]

            
            // Insert into table
            const { error } = await supabase
            .from('warranties')
            .insert([
                {
                    user_id: user_id as string,
                    product_name: formData.product_name,
                    product_type: formData.product_type,
                    warranty_period: formData.warranty_period,
                    purchase_date: formattedPurchaseDate,
                    expiration_date: formattedExpirationDate,
                    product_manufacturer: formData.product_manufacturer,
                    product_serial_number: formData.product_serial_number,
                    coverage: formData.coverage,
                    status: formData.status,
                    can_renew: formData.can_renew,
                    uploaded_at: new Date().toISOString(),
                    notes: formData.notes,
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
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Warranty Form</h1>
            <form>
                <label>
                    Product Name:
                    <input 
                    type="text" 
                    name="product_name"
                    onChange={handleChange} 
                    />
                </label>
                <label>
                    Product Type:
                    <input 
                    type="text" 
                    name="product_type"
                    onChange={handleChange} 
                    />
                </label>
                <label>
                    Warranty Period:
                    <input 
                    type="number" 
                    name="warranty_period"
                    onChange={handleChange} 
                    />
                </label>
                <label>
                    Purchase Date:
                    <input 
                    type="date" 
                    name="purchase_date"
                    onChange={handleChange} 
                    />
                </label>
                <label>
                    Expiration Date:
                    <input 
                    type="date" 
                    name="expiration_date"
                    onChange={handleChange} 
                    />
                </label>
                <label>
                    Product Manufacturer:
                    <input 
                    type="text" 
                    name="product_manufacturer"
                    onChange={handleChange} 
                    />
                </label>
                <label>
                    Product Serial Number:
                    <input 
                    type="text" 
                    name="product_serial_number"
                    onChange={handleChange} 
                    />
                </label>
                <label>
                    Coverage:
                    <input 
                    type="text" 
                    name="coverage"
                    onChange={handleChange} 
                    />
                </label>
                <label>
                    Status:
                    <input 
                    type="text" 
                    name="status"
                    onChange={handleChange} 
                    />
                </label>
                <label>
                    Warranty is renewable:
                    <input 
                    type="checkbox" 
                    name="can_renew"
                    onChange={handleCheckboxChange} 
                    />
                </label>
                <label>
                    Extra Notes:
                    <input 
                    type="text" 
                    name="notes"
                    onChange={handleChange}
                    />
                </label>
                <button type="submit" onClick={(e) => { 
                    e.preventDefault()
                    createWarranty()
                    }}>Submit</button>
            </form>
        </div>
    )
}