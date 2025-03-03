'use client'
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import { useRouter } from 'next/navigation';
//import { createClient } from "@/utils/supabase/client";

// Import components for each section
import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import WarrantyDetails from "@/app/components/WarrantyDetails";
import WarrantyUploadForm from "@/app/components/WarrantyUploadForm";
import {EditWarrantyForm} from "@/app/components/EditWarrantyForm";
//import {createClient} from "@/utils/supabase/server";

export default function Home() {

    //Commented out for possible use in the future
    // const router = useRouter();
    //const supabase = createClient()

    const [activeComponent, setActiveComponent] = useState("dashboard");

    const renderComponent = () => {
        if(activeComponent.startsWith("warranty-details-")) {
            const warrantyID = activeComponent.replace("warranty-details-", "");
            return <WarrantyDetails warrantyId={warrantyID} setActiveComponent={setActiveComponent} />
        }

        if (activeComponent.startsWith("edit-warranty-")) {
            const warrantyId = activeComponent.replace("edit-warranty-", "");
            return <EditWarrantyForm warranty_id={warrantyId} setActiveComponent={setActiveComponent} />;
        }

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
            case "warranty-upload":
                return <WarrantyUploadForm setActiveComponent={setActiveComponent} />
            case "account":
                return <Account />
            case "dashboard":
            default:
                return <Dashboard setActiveComponent={setActiveComponent}/>;
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
