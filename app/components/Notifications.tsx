import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

interface Notification {
    notification_id: string
    send_to: string
    message: string
    created_at: string
}


export default function Notifications({ user, setActiveComponent }: { user: User | null,  setActiveComponent: (component: string) => void }) {
    const supabase = createClient()
    const [notifications, setNotifications] = useState<Notification[]>([])

    useEffect(() => {
        async function getNotifications(user_id: string) {
            const { data, error } = await supabase
                .from('notification')
                .select('*')
                .eq('send_to', user_id)
                .order('created_at', { ascending: false })
    
            if (error) {
                console.error("Error fetching notifications:", error)
                return
            }
    
            setNotifications(data)
        }
    
        if (user) {
            getNotifications(user.id)
        }
    }, [user, supabase])    

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <button onClick={() => setActiveComponent("dashboard")} className="mb-4 p-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-black text-center mb-6">Notifications</h1>
            <div className="grid grid-cols-1 gap-4 text-black">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index} className="p-4 border rounded-md shadow-sm bg-gray-50">
                            <h2 className="text-lg font-semibold text-black">{notification.message}</h2>
                            <p className="text-sm text-gray-600">{new Date(notification.created_at).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No notifications available.</p>
                )}
            </div>
        </div>
    )
}