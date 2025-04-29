'use client'

import { createClient } from "@/utils/supabase/client";
import { addCalendarEvent } from "@/app/calendar/actions";

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

const allowedTableNames = ['warranties', 'warranties_check']
function isValidTableName(tableName: string): boolean {
    return allowedTableNames.includes(tableName);
}

const supabase = createClient()

export async function createWarranty(data: WarrantyFormData, tableName: string) {
    try {
        // get logged in user
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user) {
            throw new Error('User not authenticated')
        }

        // store user id
        const user_id = userData.user.id

        // validate table name
        if (!isValidTableName(tableName)) {
            throw new Error(`Invalid table name: ${tableName}.`)
        }

        // format date correctly
        const formattedPurchaseDate = new Date(data.purchase_date).toISOString().split('T')[0]
        const formattedExpirationDate = new Date(data.expiration_date).toISOString().split('T')[0]

        // insert new warranty
        const { data: insertedData, error } = await supabase
            .from(tableName)
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
            .select()
            .single()


        if (tableName == "warranties" && insertedData && insertedData.length > 0) {
            try {
                await addCalendarEvent(insertedData[0].warranty_id, user_id)
            } catch (eventError) {
                console.error('Error adding calendar event:', eventError)
            }
        }
        if (error) {
            console.error('Supabase Error:', error.code, error.message, error.details);
            alert(`Error: ${error.message}`);
            throw error
        }
        if (tableName === 'warranties') {
            alert('Warranty created successfully')
        }
    } catch (error) {
        console.error('Error creating warranty:', error)
    }
}

export async function updateWarranty(data: WarrantyFormData, warranty_id: string) {
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

export async function deleteWarranty(warranty_id: string, tableName: string) {
    try {
        // validate table name
        if (!isValidTableName(tableName)) {
            throw new Error(`Invalid table name: ${tableName}. Allowed table names are: ${allowedTableNames.join(', ')}`)
        }
        // delete warranty
        const { error } = await supabase
            .from(tableName)
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

export async function cleanUpWarranty(user_id: string) {
    const { error } = await supabase
        .from('warranties_check')
        .delete()
        .eq('user_id', user_id)
    if (error) {
        console.error('Error cleaning up warranty:', error)
        alert('Error cleaning up warranty!')
    }
}

export async function insertDocument(user_id: string, file: File) {
    const safeFileName = file.name.replace(/\s+/g, '-')
    const filePath = `public/${user_id}/${safeFileName}`
    console.log('File path:', filePath)
    try {
        const { error } = await supabase
            .storage
            .from('warranty-documents')
            .upload(filePath, file, {
                cacheControl: '3600',
            })
        if (error) {
            console.error(`Error: ${error.message}`)
            throw error
        }
    } catch (error) {
        console.error('Error uploading document:', error)
    }
}

export async function deleteDocument(user_id: string, fileName: string) {
    const safeFileName = fileName.replace(/\s+/g, '-')
    const filePath = `public/${user_id}/${safeFileName}`
    console.log('File path:', filePath)
    try {
        const { data, error } = await supabase
            .storage
            .from('warranty-documents')
            .remove([filePath])
        if (error) {
            console.error(`Error: ${error.message}`)
            throw error
        }
        console.log("deleted", data)
    } catch (error) {
        console.error('Error deleting document:', error)
    }
}