document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('/patients');
    const patients = await response.json();
    
    const tableBody = document.querySelector("#patientTable tbody");
    
    patients.forEach((patient, index) => {
        const row = document.createElement("tr");
        
        const cellIndex = document.createElement("td");
        cellIndex.textContent = index + 1;
        row.appendChild(cellIndex);
        
        const cellName = document.createElement("td");
        cellName.textContent = patient.first_and_last_name;
        row.appendChild(cellName);
        
        const cellDate = document.createElement("td");
        cellDate.textContent = new Date(patient.date).toLocaleString();
        row.appendChild(cellDate);
        
        const cellId = document.createElement("td");
        cellId.textContent = patient.patient_id;
        row.appendChild(cellId);
        
        const cellActions = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deletePatient(patient.id);
        cellActions.appendChild(deleteButton);
        
        row.appendChild(cellActions);
        
        tableBody.appendChild(row);
    });
});

async function deletePatient(id) {
    const response = await fetch(`/patients/${id}`, {
        method: 'DELETE'
    });
    
    if (response.ok) {
        location.reload();
    } else {
        alert("Failed to delete patient");
    }
}