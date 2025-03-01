export default function Landing() {

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">MyWebsite</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#features" className="text-gray-700 hover:text-black">Features</a></li>
                            <li><a href="#about" className="text-gray-700 hover:text-black">About</a></li>
                            <li><a href="#contact" className="text-gray-700 hover:text-black">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 bg-blue-500 text-white">
                <h2 className="text-4xl font-bold mb-4">Welcome to MyWebsite</h2>
                <p className="text-lg mb-6">Discover amazing features and services.</p>
                <a href="#features" className="bg-white text-blue-500 px-6 py-2 rounded-lg font-medium">Learn More</a>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto py-16 px-4">
                <h3 className="text-2xl font-bold text-center mb-6">Our Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h4 className="text-lg font-semibold mb-2">Feature One</h4>
                        <p>Brief description of feature one.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h4 className="text-lg font-semibold mb-2">Feature Two</h4>
                        <p>Brief description of feature two.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h4 className="text-lg font-semibold mb-2">Feature Three</h4>
                        <p>Brief description of feature three.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
                <p>&copy; 2025 MyWebsite. All rights reserved.</p>
            </footer>
        </div>
    );
}