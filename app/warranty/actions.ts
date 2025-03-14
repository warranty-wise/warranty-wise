'use client'

import { createClient } from "@/utils/supabase/client";

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

export async function createWarranty(data: WarrantyFormData) {
    const supabase = createClient()
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

export async function updateWarranty(data: WarrantyFormData, warranty_id: string) {
    const supabase = createClient()
    try {
        // format date correctly
        const formattedPurchaseDate = new Date(data.purchase_date).toISOString().split('T')[0]
        const formattedExpirationDate = new Date(data.expiration_date).toISOString().split('T')[0]

        // update warranty
        const { error } = await supabase
            .from('warranties')
            .update({
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
                notes: data.notes,
                updated_at: new Date().toISOString(),
            })
            .eq('warranty_id', warranty_id)
        if (error) {
            console.error('Supabase Error:', error.code, error.message, error.details)
            alert(`Error: ${error.message}`)
            throw error
        }
        alert('Warranty updated successfully')
    } catch (error) {
        console.error('Error updating warranty:', error)
    }
}

export async function deleteWarranty(warranty_id: string) {
    const supabase = createClient()
    try {
        // delete warranty
        const { error } = await supabase
            .from('warranties')
            .delete()
            .eq('warranty_id', warranty_id)
        if (error) {
            console.error('Supabase Error:', error.code, error.message, error.details)
            alert(`Error: ${error.message}`)
            throw error
        }
    } catch (error) {
        console.error('Error deleting warranty:', error)
    }
}