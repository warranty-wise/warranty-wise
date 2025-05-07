'use client'

import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { createWorker } from "tesseract.js"
import { createWarranty, insertDocument } from "../warranty/actions"

// Update the props to include setPreFilledData
interface WarrantyUploadProps {
    setActiveComponent: (component: string) => void
    user_id: string
}

const WarrantyUpload = ({ user_id,  setActiveComponent }: WarrantyUploadProps) => {
    const [files, setFiles] = useState<File[]>([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [worker, setWorker] = useState<Tesseract.Worker | null>(null)

    // create the tesseract worker when the page loads
    useEffect(() => {
        const initWorker = async () => {
            const tesseractWorker = await createWorker('eng')
            setWorker(tesseractWorker)
        };

        initWorker();

        // terminate/kill the worker once we exit the page
        return () => {
            if (worker) {
                worker.terminate()
            }
        }
    }, [])

    // set the files we need to scan through
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles([...files, ...Array.from(event.target.files)])
        }
    }

    const processWithOpenAI = async (text: string) => {
        try {
            const response = await fetch('/api/process-warranty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ text }),
            })

            if (!response.ok) {
                throw new Error('Failed to process with OpenAI')
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error processing with OpenAI:', error)
            return null
        }
    }

    const handleSubmit = async () => {
        if (!worker) return
        setIsProcessing(true)

        for (const file of files) {
            const imageUrl = URL.createObjectURL(file)

            try {
                const { data } = await worker.recognize(imageUrl)

                // Process with OpenAI
                const processedData = await processWithOpenAI(data.text)

                if (processedData) {
                    createWarranty(processedData, "warranties_check")
                    setIsProcessing(false)
                    insertDocument(user_id, file)
                    setActiveComponent("warranty-check-" + file.name)
                }
            } catch (error) {
                console.error('Error processing file:', error)
                return
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center mb-6 text-black">Upload Warranty Documents</h1>

            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                Upload Warranty Documents
                <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </Button>

            <ul className="mt-4 w-full text-black">
                {files.map((file, index) => (
                    <li key={index} className="border p-2 rounded-md shadow-sm mb-2 text-black">
                        {file.name}
                    </li>
                ))}
            </ul>

            <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4"
                disabled={isProcessing || !worker}
            >
                {isProcessing ? "Processing..." : "Submit"}
            </button>

            <button
                onClick={() => setActiveComponent("dashboard")}
                className="w-full bg-gray-300 text-black rounded p-2 hover:bg-gray-400 mt-2"
            >
                Cancel
            </button>
        </div>
    )
}

export default WarrantyUpload