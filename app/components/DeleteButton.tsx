"use client"

import { confirmDelete } from "@/utils/swalUtil"
import { deleteWarranty } from "../warranty/actions"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

interface DeleteButtonProps {
    id: number
  }

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
    const router = useRouter()
    const handleDelete = async () => {
        const confirmed = await confirmDelete();
        if (!confirmed) return
    
        try {
          await deleteWarranty(id.toString())

          Swal.fire({
            title: "Deleted!",
            text: "The warranty has been successfully deleted.",
            icon: "success",
            timer: 2000, // Auto close after 2 seconds
            showConfirmButton: false,
          })
          router.push("/")
        } catch (error) {
          console.error("Error deleting item:", error)
        }
      }

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Delete
    </button>
  )
}

export default DeleteButton
