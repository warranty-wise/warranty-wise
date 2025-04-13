import { createClient } from "@/utils/supabase/server";

const supabase = await createClient();

export async function addNotification( send_to: string, message: string ) {
    try {
        // insert new notification
        const { error } = await supabase
            .from('notifications')
            .insert([
                {
                    send_to,
                    message,
                    created_at: new Date().toISOString(),
                },
            ])
        if (error) {
            console.error('Supabase Error:', error.code, error.message, error.details);
            alert(`Error: ${error.message}`);
            throw error
        }
        alert('Notification created successfully')
    } catch (error) {
        console.error('Error creating notification:', error)
    }
}

export async function deleteNotification( notification_id: string ) {
    try {
        // delete notification
        const { error } = await supabase
            .from('notifications')
            .delete()
            .eq('notification_id', notification_id)
        if (error) {
            console.error('Supabase Error:', error.code, error.message, error.details);
            alert(`Error: ${error.message}`);
            throw error
        }
        alert('Notification deleted successfully')
    } catch (error) {
        console.error('Error deleting notification:', error)
    }
}