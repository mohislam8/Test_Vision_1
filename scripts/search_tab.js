async function searchPatient(pageId) {
    const input = document.getElementById(`${pageId}-patient-id`).value;
    
    if (!input) {
        alert('Please enter an ID or name.');
        return;
    }

    try {
        const response = await fetch(`/search_patient?query=${encodeURIComponent(input)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayResults(pageId, data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayResults(pageId, patients) {
    const table = document.getElementById(`${pageId}-patientTable`);
    const tableBody = document.getElementById(`${pageId}-patientTableBody`);
    tableBody.innerHTML = ''; // Clear existing rows

    if (patients.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No results found</td></tr>';
    } else {
        patients.forEach((patient, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${patient.first_and_last_name}</td>
            <td>${patient.created_at || 'N/A'}</td>
            <td>${patient.id}</td>
            <td><button onclick="editPatient(${patient.id})">Edit</button></td>
            `;

            tableBody.appendChild(row);
        });
    }

    table.style.display = 'table'; // Show the table
}

function editPatient(id) {
    // Implement the edit functionality if needed
    console.log('Edit patient with ID:', id);
}



