// -------------------------------------------------------------------------------------------------- //
// ------------------------------------         Properti         ------------------------------------ //

const scriptURL = 'https://script.google.com/macros/s/AKfycbyzIE2e6J1KXWu-Uzs_1yx0JtmasuTXlir_8yerXn-dl13ZqEagoOxzpB2ZvB5X09zP1w/exec'; // URL Web App dari Google Apps Script

// Call the function when the page loads
window.onload = fetchSummaryData;

function showLoading(show) {
    Swal.fire({
        title: 'Mohon tunggu...',
        html: 'Sedang memproses permintaan Anda',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

// 'YYYY-MM-DD HH:MM:SS'
function formatLocalDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tambahkan leading zero jika perlu
    const day = String(date.getDate()).padStart(2, '0'); // Tambahkan leading zero jika perlu
    const hours = String(date.getHours()).padStart(2, '0'); // Tambahkan leading zero jika perlu
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Tambahkan leading zero jika perlu
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Tambahkan leading zero jika perlu
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 'YYYY-MM-DD'
function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 'HH:MM:SS'
function formatLocalTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// -------------------------------------------------------------------------------------------------- //
// ------------------------------------           #Home          ------------------------------------ //
document.addEventListener('DOMContentLoaded', () => {
    const totalTamuBulanIniElem = document.getElementById('totalTamuBulanIni');
    const rataRataPerHariElem = document.getElementById('rataRataPerHari');
    const tamuHariIniElem = document.getElementById('tamuHariIni');

    // Hanya jalankan fetchSummaryData jika elemen-elemen terkait ditemukan
    if (totalTamuBulanIniElem || rataRataPerHariElem || tamuHariIniElem) {
        fetchSummaryData();
    }
});

async function fetchSummaryData() {
    try {
        const response = await fetch(`${scriptURL}?type=summary`);
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);

        const data = await response.json();

        if (data.success) {
            console.log('Summary Data:', data);

            // Mengakses nilai di dalam data.message
            const message = data.message;
            if (!message) throw new Error('Invalid message format in response');

            // Isi elemen jika ditemukan, atau abaikan jika tidak ada
            if (document.getElementById('totalTamuBulanIni')) {
                document.getElementById('totalTamuBulanIni').innerText = message.totalTamuBulanIni ?? '0';
            }
            if (document.getElementById('rataRataPerHari')) {
                document.getElementById('rataRataPerHari').innerText = message.rataRataPerhari ?? '0';
            }
            if (document.getElementById('tamuHariIni')) {
                document.getElementById('tamuHariIni').innerText = message.tamuHariIni ?? '0';
            }
        } else {
            console.error('Error fetching summary data:', data.message);
        }
    } catch (error) {
        console.error('Error fetching summary data:', error.message);
    }
}



// Fungsi untuk memperbarui UI jika elemen-elemen ada
function updateSummaryUI(data) {
    const totalTamuBulanIni = document.getElementById('totalTamuBulanIni');
    const rataRataPerHari = document.getElementById('rataRataPerHari');
    const tamuHariIni = document.getElementById('tamuHariIni');

    if (totalTamuBulanIni) totalTamuBulanIni.innerText = data.totalTamuBulanIni;
    if (rataRataPerHari) rataRataPerHari.innerText = data.rataRataPerhari;
    if (tamuHariIni) tamuHariIni.innerText = data.tamuHariIni;
}



// -------------------------------------------------------------------------------------------------- //
// ------------------------------------           #About         ------------------------------------ //
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about-section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-section');
                entry.target.classList.remove('hidden-section');
                observer.unobserve(entry.target); // Hentikan observasi setelah animasi masuk pertama kali
            }
        });
    }, {
        threshold: 0.1 // 10% dari section terlihat sebelum animasi dimulai
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});


// -------------------------------------------------------------------------------------------------- //
// ------------------------------------           #Login         ------------------------------------ //

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('btn-login');

    // Jika tombol login tidak ditemukan, hentikan eksekusi
    if (!loginButton) {
        console.warn('Tombol login tidak ditemukan di halaman ini.');
        return;
    }

    // Tambahkan event listener hanya jika elemen ditemukan
    loginButton.addEventListener('click', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validasi input
        if (!username || !password) {
            Swal.fire('Error!', 'Username dan Password harus diisi!', 'error');
            return;
        }

        showLoading(true);

        const data = {
            type: 'user',
            action: 'login',
            username: username,
            password: password,
        };

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data),
            });

            const result = await response.json();
            Swal.close();

            if (result.success) {
                window.location.href = '/page/dashboard/dashboard.html';
                
            } else {
                Swal.fire('Login Gagal', result.message, 'error');
            }
        } catch (error) {
            Swal.close();
            console.error('Error:', error);
            Swal.fire('Error!', 'Terjadi kesalahan, coba lagi nanti.', 'error');
        }
    });
});

// -------------------------------------------------------------------------------------------------- //
// ------------------------------------          #Logout         ------------------------------------ //

function setupLogout() {
    document.querySelector('.dropdown-item[href="#"]').addEventListener('click', () => {
        Swal.fire({
            title: 'Logout',
            text: "Apakah Anda yakin ingin logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Logout',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/login.html'; // Arahkan ke halaman login
            }
        });
    });
}


// -------------------------------------------------------------------------------------------------- //
// ------------------------------------    Formulir Buku Tamu    ------------------------------------ //
document.addEventListener('DOMContentLoaded', () => {
    const formTamu = document.getElementById('guestForm');
    
    // Jika form tidak ditemukan, hentikan eksekusi
    if (!formTamu) {
        return;
    }

    // Tambahkan event listener untuk submit form
    formTamu.addEventListener('submit', async function (e) {
        e.preventDefault();

        const now = new Date();
        console.log('Current Date:', now);

        if (isNaN(now.getTime())) {
            Swal.fire('Error!', 'Tanggal atau waktu tidak valid!', 'error');
            return;
        }

        const namaLengkap = document.getElementById('namaLengkap').value;
        const ponsel = document.getElementById('ponsel').value;
        const instansi = document.getElementById('instansi').value;
        const alamat = document.getElementById('alamat').value;
        const tujuan = document.getElementById('tujuan').value;
        const keperluan = document.getElementById('keperluan').value;
        const tanggalMasuk = formatLocalDate(now);
        const jamMasuk = formatLocalTime(now);
        const lastEdited = formatLocalDateTime(now);

        console.log('Formatted Time:', jamMasuk);

        // Validasi input
        if (!namaLengkap || !ponsel || !instansi || !alamat || !tujuan || !keperluan) {
            Swal.fire('Error!', 'Semua field wajib diisi!', 'error');
            return;
        }

        showLoading(true);

        // Siapkan data dalam format URL-encoded
        const data = new URLSearchParams({
            type: 'datatamu',
            action: 'create',
            nama: namaLengkap,
            ponsel: ponsel,
            instansi: instansi,
            alamat: alamat,
            tujuan: tujuan,
            keperluan: keperluan,
            tanggal_masuk: tanggalMasuk,
            jam_masuk: jamMasuk,
            last_edited: lastEdited
        });

        console.log('Data to be submitted:', data.toString());

        try {
            // Kirim request POST ke backend
            const response = await fetch(scriptURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: data.toString()
            });

            const textResult = await response.text();
            let result;

            try {
                result = JSON.parse(textResult);
            } catch (err) {
                Swal.close();
                console.error('Invalid JSON response:', textResult);
                Swal.fire('Error!', 'Respons dari server tidak valid.', 'error');
                return;
            }

            // Periksa respons dari server
            if (response.ok && result.success) {
                Swal.fire('Success!', result.message, 'success');
                clearForm();
                closeGuestForm();
                fetchSummaryData();
            } else {
                throw new Error(result.message || "Gagal memproses permintaan");
            }
        } catch (error) {
            Swal.close();
            console.error('Error submitting form:', error.message);
            Swal.fire('Error!', 'Terjadi kesalahan saat mengirim data: ' + error.message, 'error');
        }
    });
});


function openGuestForm() {
    document.getElementById('guestFormModal').style.display = "flex";
    document.body.classList.add('modal-open');
    populateTujuanDropdown();
    document.getElementById('namaLengkap').focus();
}

function closeGuestForm() {
    document.getElementById('guestFormModal').style.display = "none";
    document.body.classList.remove('modal-open');
}

function clearForm() {
    document.getElementById('guestForm').reset(); 
}

// -------------------------------------------------------------------------------------------------- //
// ------------------------------------    Poperti Formulir      ------------------------------------ //

async function fetchPegawaiData() {
    try {
        const response = await fetch(scriptURL + '?type=pegawai');
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
        const data = await response.json();
        if (!data.success || !Array.isArray(data.data)) {
            throw new Error("Invalid data format received from backend");
        }
        return data;

    } catch (error) {
        console.error('Error fetching pegawai data:', error.message);
        return null;
    }
}

async function populateTujuanDropdown() {
    const pegawaiData = await fetchPegawaiData();
    
    const tujuanDropdown = document.getElementById('tujuan');
    tujuanDropdown.innerHTML = '<option selected disabled>Pilih Tujuan Kunjungan</option>';

    if (pegawaiData && pegawaiData.success && Array.isArray(pegawaiData.data)) {
        pegawaiData.data.forEach(pegawai => {
            const option = document.createElement('option');
            option.value = pegawai.fetch_tujuan;
            option.textContent = pegawai.fetch_tujuan;
            tujuanDropdown.appendChild(option);
        });
    } else {
        console.error('Error populating tujuan dropdown');
        tujuanDropdown.innerHTML = '<option disabled>Tidak ada tujuan tersedia</option>';
    }
}