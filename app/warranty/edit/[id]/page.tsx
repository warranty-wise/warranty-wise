import EditWarrantyForm from "./edit-form"

const editWarrantyPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    return (
        <EditWarrantyForm warranty_id={id} />
    )
}

export default editWarrantyPage