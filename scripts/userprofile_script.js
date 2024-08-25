document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and display the last 10 patients
    async function fetchLast10Patients() {
        try {
            const response = await fetch('/patients/last10'); // Endpoint to fetch the last 10 patients
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const results = await response.json();
            const tableBody = document.querySelector('#patientTable tbody');
            tableBody.innerHTML = '';

            if (results.length === 0) {
                tableBody.innerHTML = '<td colspan="9" style="color: red; font-weight: bold;">No patients found</td>';
            } else {
                results.forEach((patient, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${patient.first_and_last_name}</td>
                        <td>${new Date(patient.created_at).toLocaleDateString()}</td>
                        <td>
                            <b style="color: ${patient.form_type === 'correction' ? 'red' : 'black'}">
                                ${patient.form_type }
                            </b>
                        </td>
                        <td>${patient.id}</td>
                        <td><button onclick="modifyPatient(${patient.id})" class="icon-btn edit-btn"><i class="fas fa-edit"></i></button></td>
                        <td><button onclick="viewDetails(${patient.id})" class="icon-btn view-btn"><i class="fas fa-eye"></i></button></td>
                        <td><button onclick="removePatient(${patient.id})" class="icon-btn remove-btn"><i class="fas fa-trash-alt"></i></button></td>
                        <td><button onclick="viewPDF(${patient.id})" class="icon-btn pdf-btn"><i class="fas fa-file-pdf"></i></button></td>
                    `;
                    tableBody.appendChild(row);
                });
                document.getElementById('patientTable').style.display = 'table';
            }
        } catch (error) {
            console.error('Error fetching patients:', error);
            //alert('An error occurred while fetching patient data.');
        }
    }

    // Function to view details of a patient
    window.viewDetails = async function (patientId) {
        try {
            const response = await fetch(`/api/patients/${patientId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const patient = await response.json();
            displayPatientDetails(patient);
        } catch (error) {
            console.error('Error fetching patient details:', error);
            alert('Failed to fetch patient details.');
        }
    };

    function displayPatientDetails(patient) {
        let modal = document.getElementById('patient-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'patient-modal';
            modal.style.position = 'fixed';
            modal.style.top = '50%';
            modal.style.left = '50%';
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.backgroundColor = '#fff';
            modal.style.padding = '20px';
            modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            modal.style.zIndex = '1000';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <h2>Patient Details</h2>
            <p><strong>ID:</strong> ${patient.id}</p>
            <p><strong>Name:</strong> ${patient.first_and_last_name}</p>
            <p><strong>Age:</strong> ${patient.age}</p>
            <p><strong>Job:</strong> ${patient.job}</p>
            <p><strong>Medical Antidotes:</strong> ${patient.medical_antidotes}</p>
            <div class="button-container">
                <button id="close-modal-btn">Close</button>
            </div>
        `;

        modal.style.display = 'block';
        const closeBtn = document.getElementById('close-modal-btn');
        closeBtn.addEventListener('click', closeModal);
    }

    function closeModal() {
        let modal = document.getElementById('patient-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Function to modify a patient
    window.modifyPatient = async function (patientId) {
        try {
            const response = await fetch(`/modify_patient?id=${patientId}`);
            if (response.ok) {
                const patientData = await response.json();
                const page1Data = {
                    id: patientData.id.toString(),
                    created_at: patientData.created_at,
                    first_and_last_name: patientData.first_and_last_name,
                    age: patientData.age,
                    job: patientData.job,
                    medical_antidotes: patientData.medical_antidotes,
                    correction: patientData.correction,
                };
                localStorage.setItem('page1Data', JSON.stringify(page1Data));
                window.location.href = '/addpatient_test1';
            } else {
                console.error('Failed to fetch patient data');
            }
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    }

    // Function to remove a patient
    window.removePatient = async function (patientId) {
        const confirmed = confirm('Are you sure you want to remove this patient?');
        if (!confirmed) return;

        try {
            const response = await fetch(`/remove_patient?id=${patientId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Patient removed successfully.');
            fetchLast10Patients(); // Refresh the table
        } catch (error) {
            console.error('Error removing patient:', error);
            alert('An error occurred while removing the patient.');
        }
    };

    // Function to view a PDF
    window.viewPDF = function(patientId) {
        window.location.href = `/view_pdf/?patient_id=${patientId}`;
    };

    // Fetch the last 10 patients on page load
    fetchLast10Patients();
});