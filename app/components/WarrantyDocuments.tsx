'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { FileObject } from '@supabase/storage-js'
import { confirmDelete } from "@/utils/swalUtil"
import Swal from "sweetalert2"
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton, Button } from "@mui/material"

export default function WarrantyDocuments({
                                              user_id,
                                              setActiveComponent,
                                          }: {
    user_id: string
    setActiveComponent: (component: string) => void
}) {
    const supabase = createClient()
    const [documents, setDocuments] = useState<FileObject[]>([])

    const fetchDocuments = async () => {
        const { data, error } = await supabase
            .storage
            .from("warranty-documents")
            .list(`public/${user_id}`, {
                limit: 100,
                offset: 0,
                sortBy: { column: "updated_at", order: "asc" },
            })

        if (error) {
            console.error("Error fetching documents:", error)
        } else if (data) {
            setDocuments(data)
        }
    }

    useEffect(() => {
        fetchDocuments()
    }, [user_id])

    const handleViewDocument = async (filePath: string) => {
        const { data } = await supabase
            .storage
            .from("warranty-documents")
            .createSignedUrl(`public/${user_id}/` + filePath, 3600)

        if (data?.signedUrl) {
            window.open(data.signedUrl, "_blank")
        } else {
            console.error("No URL returned for the document")
        }
    }

    const handleDeleteDocument = async (filePath: string) => {
        const confirmed = await confirmDelete()
        if (!confirmed) return

        const { error } = await supabase
            .storage
            .from("warranty-documents")
            .remove([`public/${user_id}/` + filePath])

        if (error) {
            console.error("Error deleting document:", error)
            return
        }

        fetchDocuments()
        Swal.fire({
            title: "Deleted!",
            text: "The document has been successfully deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
        })
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
            <Button
                onClick={() => setActiveComponent("dashboard")}
                variant="outlined"
                sx={{ mb: 2 }}
            >
                Back to Dashboard
            </Button>

            <h1 className="text-2xl font-bold text-center text-black mb-6">Your Uploaded Documents</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {documents.length > 0 ? (
                    documents.map((doc) => (
                        <div
                            key={doc.id}
                            className="bg-white border border-black p-4 rounded-md shadow-sm flex flex-col justify-between h-full"
                        >
                            <p className="font-medium text-black truncate">{doc.name}</p>
                            <div className="mt-4 flex justify-between">
                                {/* Download Button (Black icon on transparent background) */}
                                <IconButton
                                    onClick={() => handleViewDocument(doc.name)}
                                    aria-label="download"
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'gray',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                        },
                                    }}
                                >
                                    <DownloadIcon />
                                </IconButton>

                                {/* Delete Button (Black icon on red background) */}
                                <IconButton
                                    onClick={() => handleDeleteDocument(doc.name)}
                                    aria-label="delete"
                                    sx={{
                                        color: 'black',
                                        backgroundColor: '#dc2626', // Tailwind red-600
                                        '&:hover': {
                                            backgroundColor: '#b91c1c', // Tailwind red-700
                                        },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-600">No documents uploaded yet.</p>
                )}
            </div>
        </div>
    )
}
