import Link from "next/link";

export default function signoutPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50">
            <div>
                <h1 className="text-black">You have been signed out </h1>
            </div>
            <div>
                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <Link href="/">Go to Home</Link>
                </button>
            </div>
        </div>
    );
}