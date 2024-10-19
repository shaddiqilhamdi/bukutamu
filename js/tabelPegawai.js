$(document).ready(function () {
	// Initialize DataTables with Bootstrap 5
	$('#tabelPegawai').DataTable({
		ajax: {
			url: 'https://script.google.com/macros/s/AKfycbyzIE2e6J1KXWu-Uzs_1yx0JtmasuTXlir_8yerXn-dl13ZqEagoOxzpB2ZvB5X09zP1w/exec?type=pegawai', // Replace with your actual Google Apps Script URL
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
			{ title: "Nama", data: "nama" },
			{ title: "Jabatan", data: "jabatan" },
			{ title: "Bidang", data: "bidang" },
			{
				title: "Setting",
				data: null,
				width: "10%",
				className: "text-end", // Add a class to align text to the right
				render: function (data, type, row) {
					// Create edit, delete and refresh buttons as icons
					return `
						<button class="btn btn-warning btn-sm edit-btn" data-id="${row.id}">Edit</button>
						<button class="btn btn-danger btn-sm delete-btn" data-id="${row.id}">Delete</button>
					`;
				}
			}
		],
		rowId: 'id',  // Set row ID based on 'id'
		responsive: true
	});

	// Event listener for Edit button
	$('#tabelPegawai').on('click', '.edit-btn', function () {
		var id = $(this).data('id');
		// Call your edit function here, for example:
		alert('Edit ID: ' + id);
		// Implement the actual edit functionality based on the ID
	});

	// Event listener for Delete button
	$('#tabelPegawai').on('click', '.delete-btn', function () {
		var id = $(this).data('id');
		// Call your delete function here, for example:
		if (confirm('Are you sure you want to delete ID: ' + id + '?')) {
			alert('Delete ID: ' + id);
			// Implement the actual delete functionality based on the ID
		}
	});

	// Add Refresh button to reload data
	$('#refreshDataBtn').on('click', function () {
		$('#tabelPegawai').DataTable().ajax.reload();
	});
});