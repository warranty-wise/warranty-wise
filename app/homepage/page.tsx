'use client'
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatBot from "../components/ChatBot";
// import { useRouter } from 'next/navigation';
//import { createClient } from "@/utils/supabase/client";

// Import components for each section
import Dashboard from "../components/Dashboard";
import Account from "../components/Account";
import WarrantyDetails from "@/app/components/WarrantyDetails";
import WarrantyInsertForm from "@/app/components/WarrantyInsertForm";
import WarrantyUpload from "@/app/components/WarrantyUpload";
import {EditWarrantyForm} from "@/app/components/EditWarrantyForm";
import UploadSelect from "@/app/components/UploadSelect";
import Calendar from "@/app/components/Calendar";
//import {createClient} from "@/utils/supabase/server";

export default function Home() {

    //Commented out for possible use in the future
    // const router = useRouter();
    //const supabase = createClient()

    const [activeComponent, setActiveComponent] = useState("dashboard");

    const renderComponent = () => {
        if(activeComponent.startsWith("warranty-details-")) {
            const warrantyId = activeComponent.replace("warranty-details-", "");
            return <WarrantyDetails warrantyId={warrantyId} setActiveComponent={setActiveComponent} />
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
            case "warranty-form":
                return <WarrantyInsertForm setActiveComponent={setActiveComponent} />
            case "warranty-upload":
                return <WarrantyUpload setActiveComponent={setActiveComponent} />
            case "warranty-form-select":
                return <UploadSelect setActiveComponent={setActiveComponent} />
            case "warranty-ai":
                return <ChatBot />
            case "account":
                return <Account />
            case "calendar":
                return <Calendar setActiveComponent={setActiveComponent}/>
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
