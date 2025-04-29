'use client'
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { FileObject } from '@supabase/storage-js'

export default function WarrantyDocuments({ user_id, setActiveComponent }: { user_id: string, setActiveComponent: (component: string) => void }) {
    const supabase = createClient()
    const [documents, setDocuments] = useState<FileObject[]>([])

    const fetchDocuments = async () => {
        try {
            const { data, error } = await supabase
                .storage
                .from('warranty-documents')
                .list(`public/${user_id}`, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'updated_at', order: 'asc' },
                })

            if (error) {
                console.error('Error fetching documents:', error)
                return
            }

            setDocuments(data)
        } catch (error) {
            console.error('Error fetching documents:', error)
        }
    }

    useEffect(() => {
        fetchDocuments()
    }, [user_id, supabase])
    return (
        <div className="display-flex max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <button onClick={() => setActiveComponent("dashboard")} className="mb-4 p-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-black text-center mb-6">Your Uploaded Documents</h1>
            <div className="text-black [&>p]:text-black [&>p>strong]:text-black">
                {documents.map((doc) => (
                    <div key={doc.id} className="columns-2 text-black [&>p]:text-black [&>p>strong]:text-black">
                        <p>{doc.name}</p>
                        <button className="mb-4 p-2 bg-gray-300 text-black rounded hover:bg-black-400">View/Download</button>
                    </div>
                ))}
            </div>
        </div>
    )
}