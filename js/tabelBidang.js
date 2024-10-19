$(document).ready(function () {
	// Initialize DataTables with Bootstrap 5
	$('#tabelBidang').DataTable({
		ajax: {
			url: 'https://script.google.com/macros/s/AKfycbyzIE2e6J1KXWu-Uzs_1yx0JtmasuTXlir_8yerXn-dl13ZqEagoOxzpB2ZvB5X09zP1w/exec?type=bidang', // Replace with your actual Google Apps Script URL
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
			{ title: "Bidang", data: "bidang" },
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
		responsive: true
	});

	// Event listener for Edit button
	$('#tabelBidang').on('click', '.edit-btn', function () {
		var id = $(this).data('id');
		// Call your edit function here, for example:
		alert('Edit ID: ' + id);
		// Implement the actual edit functionality based on the ID
	});

	// Event listener for Delete button
	$('#tabelBidang').on('click', '.delete-btn', function () {
		var id = $(this).data('id');
		// Call your delete function here, for example:
		if (confirm('Are you sure you want to delete ID: ' + id + '?')) {
			alert('Delete ID: ' + id);
			// Implement the actual delete functionality based on the ID
		}
	});

	// Add Refresh button to reload data
	$('#refreshDataBtn').on('click', function () {
		$('#tabelBidang').DataTable().ajax.reload();
	});
});