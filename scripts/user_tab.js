document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#patientTable tbody');
    const addPatientBtn = document.getElementById('addPatientBtn');
    const modal = document.getElementById("patientModal");
    const span = document.getElementsByClassName("close")[0];
    const patientForm = document.getElementById('patientForm');

    // Function to fetch patients from the server
    function fetchPatients() {
        fetch('/patients')
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ''; // Clear current table
                data.forEach((patient, index) => {
                    addPatientRow(patient, index + 1);
                });
            })
            .catch(error => console.error('Error fetching patients:', error));
    }

    // Function to add a patient row to the table
    function addPatientRow(patient, index) {
        const row = document.createElement('tr');
        
        const cellN = document.createElement('td');
        cellN.textContent = index;
        row.appendChild(cellN);

        const cellName = document.createElement('td');
        cellName.textContent = patient.name;
        row.appendChild(cellName);

        const cellDate = document.createElement('td');
        cellDate.textContent = patient.date;
        row.appendChild(cellDate);

        const cellID = document.createElement('td');
        cellID.textContent = patient.identifier;
        row.appendChild(cellID);

        const cellActions = document.createElement('td');

        const modifyButton = document.createElement('button');
        modifyButton.classList.add('action-btn');
        modifyButton.innerHTML = '<i class="fas fa-edit"></i>';
        modifyButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the row click event
            modifyPatient(patient.id);
        });
        cellActions.appendChild(modifyButton);

        const removeButton = document.createElement('button');
        removeButton.classList.add('action-btn');
        removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        removeButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the row click event
            removePatient(row, patient.id);
        });
        cellActions.appendChild(removeButton);

        row.appendChild(cellActions);
        tableBody.appendChild(row);
    }

    // Fetch patients on page load
    fetchPatients();

    // Open the modal
    addPatientBtn.onclick = function() {
        modal.style.display = "block";
    }

    // Close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Add a new patient
    patientForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(patientForm);
        const name = formData.get('name');
        const date = formData.get('date');
        const identifier = formData.get('identifier');

        fetch('/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, date, identifier }),
        })
        .then(response => response.json())
        .then(patient => {
            addPatientRow(patient, tableBody.rows.length + 1);
            patientForm.reset();
            modal.style.display = "none";
        })
        .catch(error => console.error('Error adding patient:', error));
    });
});

function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-GB', { hour12: false });
    document.getElementById('datetime').textContent = dateTimeString;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display the date and time immediately when the page loads
updateDateTime();
