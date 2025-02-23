'use client'
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/data")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-6 overflow-auto bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4 text-gray-600">Data from Database</h1>
                    <ul className="bg-white shadow-md rounded-lg p-4">
                        {data.map((item, index) => (
                            <li key={index} className="p-2 border-b last:border-none">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </div>
    );
}