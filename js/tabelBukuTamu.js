$(document).ready(function () {
    // Initialize DataTables with Bootstrap 5
    $('#tabelBukuTamu').DataTable({
        ajax: {
            url: 'https://script.google.com/macros/s/AKfycbyzIE2e6J1KXWu-Uzs_1yx0JtmasuTXlir_8yerXn-dl13ZqEagoOxzpB2ZvB5X09zP1w/exec?type=datatamu', // Replace with your actual Google Apps Script URL
            dataSrc: function(json) {
                console.log(json);  // Log to check the data
                return json.data;   // Ensure that 'data' is the right key for your data array
            }
        },
        columns: [
            { 
                title: "No.", 
                data: null, 
                render: function (data, type, row, meta) {
                    return meta.row + 1;  // Generate row number
                }, 
                width: "5%" 
            },
            { 	title: "Nama Tamu", 
                data: null,
                width :"15%",
                render: function(data, type, row) {
                    return `
                        <strong>${row.nama}</strong><br>
                        <small>${row.ponsel}</small>
                    `;
                } 
            },
            { 	title: "Instansi/Alamat", 
                data: null,
                
                render: function(data, type, row) {
                    return `
                        <strong>${row.instansi}</strong><br>
                        <small>${row.alamat}</small>
                    `;
                } 
            },
            
            { 	title: "Tujuan/ Keperluan", 
                data: null,
               
                render: function(data, type, row) {
                    return `
                        <strong>${row.tujuan}</strong><br>
                        <small>${row.keperluan}</small>
                    `;
                } 
            },
            

            { 	title: "Masuk", 
                data: null,
                width :"10%",
                render: function(data, type, row) {
                    const formattedDate = formatDate(row.tanggal_masuk);
                    const formattedTime = formatTime(row.jam_masuk);
                    return `
                        <strong>${formattedDate}</strong><br>
                        <small>${formattedTime}</small>
                    `;
                } 
            },

            { 	title: "Keluar", 
                data: null,
                width :"10%",
                render: function(data, type, row) {
                    
                        const formattedDate = formatDate(row.tanggal_keluar);
                        const formattedTime = formatTime(row.jam_keluar);
                        return `
                            <strong>${formattedDate}</strong><br>
                            <small>${formattedTime}</small>
                        `;
                    
                } 
            },
            {
                title : " ",
                data : null,
                width :"8%",
                className: "text-center",
                render : function (data, type, row) {
                    return `
                         <button class="btn btn-warning btn-sm edit-btn" data-id="${row.id}">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${row.id}" onclick="confirmDelete('${row.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    `;
                }
            },
           
            
        ],
        rowId: 'id',  // Set row ID based on 'id'
        responsive: true,
        scrollX: true,  // Enable horizontal scroll

        // Add the export buttons (including Excel)
        dom: 'Bfrtip',  // Define the layout structure
        buttons: [
            'excel',  // Export to Excel
            'print'  // Print table
        ]
    });

    // Function to handle "Keluar" action
function handleKeluar(id) {
    const now = new Date();
    const tanggalKeluar = now.toISOString().split('T')[0];
    const jamKeluar = now.toTimeString().split(' ')[0];

    fetch(`https://script.google.com/macros/s/AKfycbyzIE2e6J1KXWu-Uzs_1yx0JtmasuTXlir_8yerXn-dl13ZqEagoOxzpB2ZvB5X09zP1w/exec`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            type: 'datatamu',
            action: 'update',
            id: id,
            tanggal_keluar: tanggalKeluar,
            jam_keluar: jamKeluar,
            last_edited: new Date().toISOString()
        }).toString()
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            $('#tabelBukuTamu').DataTable().ajax.reload(); // Reload tabel setelah update
            Swal.fire('Success!', 'Tamu telah keluar.', 'success');
        } else {
            Swal.fire('Error!', 'Gagal memperbarui data tamu.', 'error');
        }
    })
    .catch(error => {
        Swal.fire('Error!', 'Terjadi kesalahan saat memperbarui data tamu.', 'error');
       console.error('Error saat memperbarui data tamu:', error);
    });
}

    // Function to format date
    function formatDate(dateStr) {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Function to format time
    function formatTime(timeStr) {
        if (!timeStr || timeStr.startsWith('1899')) return '-';
        try {
            const [hours, minutes] = timeStr.split(':');
            return `${hours}:${minutes}`;
        } catch (error) {
            return '-';
        }
    }
});

// Function for confirming delete action
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
            deleteData(id); // Panggil fungsi delete untuk menghapus data
        }
    });
}

// Function for deleting data
function deleteData(id) {
    // Contoh: Panggil Google Apps Script API untuk delete data
    fetch(`https://script.google.com/macros/s/AKfycbyzIE2e6J1KXWu-Uzs_1yx0JtmasuTXlir_8yerXn-dl13ZqEagoOxzpB2ZvB5X09zP1w/exec`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            type: 'datatamu',
            action: 'delete',
            id: id
        }).toString()
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
            $('#tabelBukuTamu').DataTable().ajax.reload(); // Reload tabel setelah penghapusan
        } else {
            Swal.fire('Error!', 'Data gagal dihapus.', 'error');
        }
    })
    .catch(error => {
        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus data.', 'error');
        console.error('Error saat menghapus data:', error);
    });
}
