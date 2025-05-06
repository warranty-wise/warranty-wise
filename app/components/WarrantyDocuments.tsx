'use client'
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { FileObject } from '@supabase/storage-js'
import { Trash2 } from "lucide-react"
import { confirmDelete } from "@/utils/swalUtil"
import Swal from "sweetalert2"

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

    const handleViewDocument = async (filePath: string) => {
        try {
            const { data } = await supabase
                .storage
                .from('warranty-documents')
                .createSignedUrl(`public/${user_id}/`+filePath, 3600)

            if (data) {
                const url = data.signedUrl
                window.open(url, '_blank')
            } else {
                console.error('No URL returned for the document')
            }
        } catch (error) {
            console.error('Error fetching document URL:', error)
        }
    }

    const handleDeleteDocument = async (filePath: string) => {
        const confirmed = await confirmDelete()
        if (!confirmed) return
        try {
            const { error } = await supabase
                .storage
                .from('warranty-documents')
                .remove([`public/${user_id}/`+filePath])
            if (error) {
                console.error('Error deleting document:', error)
                return
            }
            fetchDocuments()
        } catch (error) {
            console.error('Error deleting document:', error)
        }
        Swal.fire({
            title: "Deleted!",
            text: "The document has been successfully deleted.",
            icon: "success",
            timer: 2000, // Auto close after 2 seconds
            showConfirmButton: false,
        })
    }

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
                        <button onClick={() => handleViewDocument(doc.name) } className="mb-4 p-2 bg-gray-300 text-black rounded hover:bg-black-400">View/Download</button>
                        <button onClick={() => handleDeleteDocument(doc.name)}>
                            <span>
                                <Trash2 className="invert"/>
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}