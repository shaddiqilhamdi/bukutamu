// SweetAlert on Form Submit
document.getElementById("guestForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission

    const submitBtn = document.getElementById('submitBtn');
    const loadingIcon = document.getElementById('loading'); // Mendeklarasikan loadingIcon
    const nama = document.getElementById('namaLengkap').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const instansi = document.getElementById('instansi').value;
    const alamat = document.getElementById('alamat').value;
    const tujuan = document.getElementById('tujuan').value;
    const keperluan = document.getElementById('keperluan').value;
    const tanggalMasuk = document.getElementById('tanggalMasuk').value;
    const jamMasuk = document.getElementById('jamMasuk').value;

    submitBtn.disabled = true;
    loadingIcon.style.display = 'block'; 

    // Mengirim data ke Google Apps Script Web App
    fetch('https://script.google.com/macros/s/AKfycbz_7Uz8puE52dLPiCNq2fsEWlfAKs2XOQeqIm802igK6Sr_ppL_2ES5EL--1zgZDxe4xg/exec', { // Ganti dengan URL Web App Anda
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'Nama Lengkap': nama,
            'WhatsApp': whatsapp,
            'Instansi': instansi,
            'Alamat': alamat,
            'Tujuan': tujuan,
            'Keperluan': keperluan,
            'Tanggal Masuk' : tanggalMasuk,
            'Jam Masuk' : jamMasuk
        })
    })
    .then(response => response.json()) 
    .then(data => {
        // Menampilkan respon dari server
        submitBtn.disabled = false;
        loadingIcon.style.display = 'none'; // Menyembunyikan loading spinner

        // Tutup form setelah submit berhasil
        closeGuestForm();

        if (data.result === 'success') {
            // Jika berhasil, tampilkan pesan berhasil
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data tamu berhasil disimpan!',
            }).then(() => {
                document.getElementById('guestForm').reset(); // Reset form setelah sukses
            });
        } else {
            // Jika gagal, tampilkan pesan gagal
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Terjadi kesalahan saat menyimpan data.'
            });
        }
    })
    .catch(error => {
        // Penanganan error jika fetch gagal
        closeGuestForm(); // Tutup form meskipun terjadi error
        console.error('Error:', error);
        loadingIcon.style.display = 'none'; // Menyembunyikan loading spinner
        submitBtn.disabled = false;

        // Tampilkan pesan error
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Terjadi kesalahan saat menyimpan data: ' + error.message
        });
    });

    // Trigger SweetAlert
    Swal.fire({
        title: 'Form Submitted!',
        text: 'Terima kasih sudah mengisi buku tamu.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});

// Open Modal when clicking "Buku Tamu" button
document.getElementById("openFormBtn").addEventListener("click", function() {
    var guestFormModal = new bootstrap.Modal(document.getElementById("guestForm"));
    guestFormModal.show();
});

// Function to open the form overlay and blur background
function openGuestForm() {
    document.getElementById('guestFormOverlay').classList.add('active');
    document.body.classList.add('modal-open');

    fetchTujuan(); // Panggil untuk mengisi dropdown

    // Mengambil tanggal dan jam saat form dibuka
    const today = new Date();
    
    // Format tanggal (YYYY-MM-DD)
    const tanggalMasuk = today.toISOString().split('T')[0];
    
    // Format jam (HH:MM)
    const jamMasuk = today.toTimeString().split(' ')[0];

    // Isi input tanggal dan jam secara otomatis
    document.getElementById('tanggalMasuk').value = tanggalMasuk;
    document.getElementById('jamMasuk').value = jamMasuk;
}

// Function to close the form overlay and remove blur
function closeGuestForm() {
    document.getElementById('guestFormOverlay').classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Placeholder function for form submission
function submitForm() {
    // Close the form overlay
    closeGuestForm();

    // Show success message using SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data tamu berhasil disimpan!',
    });
}
