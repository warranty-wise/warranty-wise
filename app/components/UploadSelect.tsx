'use client'

const UploadSelect = ({ setActiveComponent }: { setActiveComponent: (component: string) => void }) => {

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-black">Select Upload Type</h1>
            <div className="grid grid-cols-2 gap-4 text-black">
                <button onClick={() => setActiveComponent("warranty-form")} className="p-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                    Manual Entry Form
                </button>
                <button onClick={() => setActiveComponent("warranty-upload")} className="p-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                    Upload Warranty Documents
                </button>
            </div>
        </div>
    )
}

export default UploadSelect