window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        try {
            // Fetch results from the FastAPI endpoint
            const response = await fetch(`/search_patient?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Patient not found');
            }

            const results = await response.json();
            const tableBody = document.querySelector('#search-results-table tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            results.forEach((result, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${result.first_and_last_name}</td>
                    <td>${result.created_at}</td>
                    <td>
                        <button onclick="viewPdf(${result.id})">View PDF</button>
                        <button onclick="editPatient(${result.id})">Edit</button>
                        <button onclick="removePatient(${result.id})">Remove</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            alert(error.message);
        }
    }
};

function viewPdf(patientId) {
    // Implement your logic to view the PDF for the patient
    alert(`Viewing PDF for patient ID: ${patientId}`);
}

function editPatient(patientId) {
    // Implement your logic to edit the patient's information
    alert(`Editing patient ID: ${patientId}`);
}

function removePatient(patientId) {
    // Implement your logic to remove the patient
    alert(`Removing patient ID: ${patientId}`);
}
