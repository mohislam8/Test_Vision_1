window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        // Send the query to your FastAPI backend
        const response = await fetch(`/search_patient?query=${encodeURIComponent(query)}`);
        const results = await response.json();

        const tableBody = document.querySelector('#userprofile-patientTableBody');
        tableBody.innerHTML = ''; // Clear existing rows

        results.forEach((result, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${patient.first_and_last_name}</td>
                <td>${patient.created_at || 'N/A'}</td>
                <td>${patient.id}</td>
                <td>
                    <button onclick="selectPatient(${result.id})">Select</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
};

function selectPatient(patientId) {
    // Implement what happens when you select a patient (e.g., redirect, load patient details, etc.)
    alert(`Patient selected: ${patientId}`);
}
