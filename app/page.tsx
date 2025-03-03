'use client'
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import { useRouter } from 'next/navigation';
//import { createClient } from "@/utils/supabase/client";

// Import components for each section
import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
//import {createClient} from "@/utils/supabase/server";

export default function Home() {

    //Commented out for possible use in the future
    // const router = useRouter();
    //const supabase = createClient()

    const [activeComponent, setActiveComponent] = useState("dashboard");

    const renderComponent = () => {
        switch (activeComponent) {
            /*
            case "calendar":
                return <Calendar />;
            case "warranty-info":
                return <WarrantyInfo />;
            case "warranty-ai":
                return <WarrantyAI />;
            case "warranty-claim":
                return <WarrantyClaim />;

             */
            case "account":
                return <Account />
            case "dashboard":
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="h-screen flex">
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="flex flex-col flex-1">
                <Header setActiveComponent={setActiveComponent}/>
                <main className="flex-1 p-6 overflow-auto bg-gray-100">
                    {renderComponent()}
                </main>
            </div>
        </div>
    );
}
