'use client'
import { useRouter } from "next/navigation";

export default function Landing() {

    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md p-4">
                <div className="container ml-auto mr-1 flex justify-between items-center" >
                    <h1 className="text-4xl font-bold left-auto text-blue-500">Warranty Wise</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            {/*
                            <li><a href="#features" className="text-gray-700 hover:text-black">Features</a></li>
                            <li><a href="#about" className="text-gray-700 hover:text-black">About</a></li>
                            <li><a href="#contact" className="text-gray-700 hover:text-black">Contact</a></li>
                            */}
                            <li>
                                <button
                                    type="button"
                                    onClick={() => router.push("/login")}
                                    className="w-full text-blue-600 bg-white border-gray-300 font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center"
                                >
                                    Sign in
                                </button>
                            </li>
                            <li>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center"
                                >
                                    Create Account
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 bg-blue-500 text-white">
                <h2 className="text-4xl font-bold mb-4">Effortlessly Track & Manage Your Warranties</h2>
                <p className="text-lg mb-6">Warranty Wise helps you keep track of your product warranties, ensuring you never miss a coverage period or expiration date.
                    Say goodbye to lost receipts and expired warranties!</p>
                <a href="#features" className="bg-white text-blue-500 px-6 py-2 rounded-lg font-medium">Explore Features</a>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto py-16 px-4 text-blue-500">
                <h3 className="text-2xl font-bold text-center mb-6 text-blue-500">Why Choose Warranty Wise?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h4 className="text-lg font-semibold mb-2 text-blue-500">Automatic Warranty Tracking</h4>
                        <p className="text-blue-500">Store and manage all your product warranties in one place with automated reminders for upcoming expirations.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h4 className="text-lg font-semibold mb-2 text-blue-500">Easy Receipt & Document Upload</h4>
                        <p className="text-blue-500">Upload receipts, invoices, and warranty cards for quick access whenever you need them.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h4 className="text-lg font-semibold mb-2 text-blue-500">Smart Notifications & Alerts</h4>
                        <p className="text-blue-500">Get notified before your warranties expire so you can take action in time.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h4 className="text-lg font-semibold mb-2 text-blue-500">Cloud-Synced for Access Anywhere</h4>
                        <p className="text-blue-500">Access your warranty details anytime, from any device, with secure cloud storage.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h4 className="text-lg font-semibold mb-2 text-blue-500">Hassle-Free Warranty Claims</h4>
                        <p className="text-blue-500">Quickly retrieve warranty details and initiate claims with one-click access to necessary documents.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h4 className="text-lg font-semibold mb-2 text-blue-500">User-Friendly Dashboard</h4>
                        <p className="text-blue-500">A simple and intuitive interface designed for ease of use, even for non-tech-savvy users.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
                <p>&copy; 2025 Warranty Wise. All rights reserved.</p>
            </footer>
        </div>
    );
}