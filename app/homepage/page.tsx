'use client'
import { useState, useCallback, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatBot from "../components/ChatBot";
// import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";

// Import components for each section
import Dashboard from "../components/Dashboard";
import Account from "../components/Account";
import WarrantyDetails from "@/app/components/WarrantyDetails";
import WarrantyUpload from "@/app/components/WarrantyUpload";
import { EditWarrantyForm } from "@/app/components/EditWarrantyForm";
import UploadSelect from "@/app/components/UploadSelect";
import Calendar from "@/app/components/Calendar";
import Notifications from "@/app/components/Notifications";
import { User } from "@supabase/supabase-js";
import { CheckWarrantyForm } from "../components/CheckWarrantyForm";
import WarrantyInsertForm from "../components/WarrantyInsertForm";
import WarrantyDocuments from "../components/WarrantyDocuments";
//import {createClient} from "@/utils/supabase/server";

// Add this type definition
// type WarrantyFormData = {
//     // Define your warranty form fields here
//     product_name?: string;
//     product_type?: string;
//     warranty_period?: number;
//     purchase_date?: string;
//     expiration_date?: string;
//     product_manufacturer?: string;
//     product_serial_number?: string;
//     coverage?: string;
//     status?: string;
//     can_renew?: boolean;
//     notes?: string;
// };

export default function Home() {

    //Commented out for possible use in the future
    // const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient()

    const getUser = useCallback(async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error);
        } else {
            setUser(user);
        }
    }, [supabase]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const [activeComponent, setActiveComponent] = useState("dashboard");

    const renderComponent = () => {
        if (activeComponent.startsWith("warranty-details-")) {
            const warrantyId = activeComponent.replace("warranty-details-", "");
            return <WarrantyDetails warrantyId={warrantyId} setActiveComponent={setActiveComponent} />
        }

        if (activeComponent.startsWith("edit-warranty-")) {
            const warrantyId = activeComponent.replace("edit-warranty-", "");
            return <EditWarrantyForm warranty_id={warrantyId} setActiveComponent={setActiveComponent} />;
        }

        if (activeComponent.startsWith("warranty-check-")) {
            const filePath = activeComponent.replace("warranty-check-", "");
            return <CheckWarrantyForm filePath={filePath} setActiveComponent={setActiveComponent} />;
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
                return <WarrantyUpload user_id={user?.id || ""} setActiveComponent={setActiveComponent} />
            case "warranty-form-select":
                return <UploadSelect setActiveComponent={setActiveComponent} />
            case "warranty-documents":
                return <WarrantyDocuments user_id={user?.id || ""} setActiveComponent={setActiveComponent} />
            case "warranty-ai":
                return <ChatBot />
            case "account":
                return <Account />
            case "calendar":
                return <Calendar />
            case "notification":
                return <Notifications user={user} setActiveComponent={setActiveComponent} />
            case "dashboard":
            default:
                return <Dashboard setActiveComponent={setActiveComponent} />;
        }
    };

    return (
        <div className="h-screen flex">
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="flex flex-col flex-1">
                <Header setActiveComponent={setActiveComponent} />
                <main className="flex-1 p-6 overflow-auto bg-gray-100">
                    {renderComponent()}
                </main>
            </div>
        </div>
    );
}
