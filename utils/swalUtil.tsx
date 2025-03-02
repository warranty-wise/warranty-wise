import Swal from 'sweetalert2'

/**
 * Show a SweetAlert2 confirmation modal for deletion.
 * @returns A promise resolving to true (confirmed) or false (canceled).
 */
export const confirmDelete = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  })

  return result.isConfirmed
}
