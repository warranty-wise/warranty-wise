'use client'

import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

export async function addCalendarEvent(warranty_id: string, user_id: string) {
    try {
        // insert new calendar event
        const { error } = await supabase
            .from('events')
            .insert([
                {
                    user_id: user_id,
                    warranty_id: warranty_id,
                }
            ])
        if (error) {
            console.error('Error inserting calendar event:', error)
            throw error
        }
    } catch (error) {
        console.error('Error creating calendar event:', error)
        throw error
    }
}