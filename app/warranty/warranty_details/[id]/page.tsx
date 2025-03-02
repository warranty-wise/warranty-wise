import DeleteButton from "@/app/components/DeleteButton"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { notFound } from "next/navigation"

const WarrantyDetailsPage = async ({ params }: { params: { id: string } }) => {
    const supabase = await createClient()
    const { id } = await params

    // fetch warranty data
    const { data: warranty, error } = await supabase
        .from("warranties")
        .select("*")
        .eq("warranty_id", id)
        .single()

    if (error || !warranty) {
        return notFound()
    }
    
    return (
        <div>
            <div>
                <h1 className="center">Warranty Details</h1>
                <p><strong>ID:</strong> {warranty.warranty_id}</p>
                <p><strong>Product Name:</strong> {warranty.product_name}</p>
                <p><strong>Product Manufacturer:</strong> {warranty.product_manufacturer}</p>
                <p><strong>Product Type:</strong> {warranty.product_type}</p>
                <p><strong>Product Serial Number:</strong> {warranty.product_serial_number}</p>
                <p><strong>Warranty Period:</strong> {warranty.warranty_period + " Months"}</p>
                <p><strong>Warranty Status:</strong> {warranty.status}</p>
                <p><strong>Purchase Date:</strong> {warranty.purchase_date}</p>
                <p><strong>Expiration Date:</strong> {warranty.expiration_date}</p>
            </div>
            <div>
                <Link href={`/warranty/edit/${warranty.warranty_id}`}>
                    <button>Edit</button>
                </Link>
                <DeleteButton id={warranty.warranty_id} />
            </div>
        </div>
    )
}

export default WarrantyDetailsPage
