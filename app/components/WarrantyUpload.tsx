'use client'

import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { createWorker } from "tesseract.js"

const WarrantyUpload = ({ setActiveComponent }: { setActiveComponent: (component: string) => void }) => {
    const [files, setFiles] = useState<File[]>([])
    const [ocrResults, setOcrResults] = useState<string[]>([])
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

    // process the files and extract text from them
    const handleSubmit = async () => {
        if (!worker) return
        setIsProcessing(true)
        const results: string[] = []

        for (const file of files) {
            const imageUrl = URL.createObjectURL(file)

            try {
                const { data } = await worker.recognize(imageUrl)
                results.push(`File: ${file.name}\n${data.text}`)
                results.push("-----")
            } catch (error) {
                console.error("OCR Error:", error)
                results.push(`File: ${file.name}\nError processing file.`)
                results.push("-----")
            }
        }

        console.log(results)

        // temp: set the results to be displayed
        setOcrResults(results)
        setIsProcessing(false)
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

            {ocrResults.length > 0 && (
                <div className="mt-6 w-full p-4 border rounded-md bg-gray-100 max-h-96 overflow-y-auto">
                    <h2 className="font-bold mb-2 text-black">OCR Results:</h2>
                    {ocrResults.map((result, index) => (
                        <p key={index} className="text-black whitespace-pre-wrap">{result}</p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default WarrantyUpload
