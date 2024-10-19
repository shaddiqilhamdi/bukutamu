function confirmDelete(id) {
    Swal.fire({
        title: 'Apakah kamu yakin?',
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Lakukan aksi delete di sini, misalnya panggil API delete
            deleteData(id); // Gantikan ini dengan fungsi untuk menghapus data
            Swal.fire(
                'Deleted!',
                'Data berhasil dihapus.',
                'success'
            )
        }
    })
}

function deleteData(id) {
    // Contoh: Panggil API backend untuk menghapus data
    fetch(`https://api-kamu.com/delete/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        // Proses hasil dari API setelah penghapusan berhasil
        console.log('Data berhasil dihapus:', data);
    })
    .catch(error => {
        console.error('Error saat menghapus data:', error);
    });
}

