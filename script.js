// SweetAlert on Form Submit
document.getElementById("bukuTamuForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Trigger SweetAlert
    Swal.fire({
        title: 'Form Submitted!',
        text: 'Terima kasih sudah mengisi buku tamu.',
        icon: 'success',
        confirmButtonText: 'OK'
    });

    // Close modal after submission
    var modal = bootstrap.Modal.getInstance(document.getElementById("guestForm"));
    modal.hide();
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