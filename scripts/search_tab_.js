document.addEventListener('DOMContentLoaded', function () {
    // Function to search for patients
    async function searchPatient() {
        const query = document.getElementById('patient-id').value.trim();
        if (!query) {
            alert('Please enter a search query.');
            return;
        }

        try {
            const response = await fetch(`/search_patient?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const results = await response.json();
            console.log("response" , results);
            
            const tableBody = document.querySelector('#search-results-table tbody');
            tableBody.innerHTML = '';

            if (results.length === 0) {
                tableBody.innerHTML = '<td colspan="9" style="color: red; font-weight: bold;">No patients found</td>';
            } else {
                results.forEach((patient, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${patient.first_and_last_name}</td>
                        <td>${patient.created_at}</td>
                        <td>
                            
                            <b style="color: ${patient.form_type === 'correction' ? 'red' : 'black'}">
                                ${patient.form_type}
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
                document.getElementById('search-results-table').style.display = 'table';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            //alert('An error occurred while fetching patient data.');
        }
    }
//=========================================== OK OK OK K O KO KO KO K ===========================================
    // Function to view details of a patient
    window.viewDetails = async function (patientId) {
        try {
            // Make a request to your FastAPI endpoint to get patient details
            const response = await fetch(`/api/patients/${patientId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const patient = await response.json();
    
            // Display patient details
            displayPatientDetails(patient);
        } catch (error) {
            console.error('Error fetching patient details:', error);
            alert('Failed to fetch patient details.');
        }
    };
    
    function displayPatientDetails(patient) {
        // Create or select a modal element
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
    
        // Populate the modal with patient details
        modal.innerHTML = `
            <h2>Patient Details</h2>
            <p><strong>ID:</strong> ${patient.id}</p>
            <p><strong>Name:</strong> ${patient.first_and_last_name}</p>
            <p><strong>Age:</strong> ${patient.age}</p>
            <p><strong>Job:</strong> ${patient.job}</p>
            <p><strong>Medical Antidotes:</strong> ${patient.medical_antidotes}</p>
            <div class="button-container">
                <button id="close-modal-btn"> Close </button>
            </div>
        `;
    
        // Show the modal
        modal.style.display = 'block';
        // Attach the event listener for closing the modal
        const closeBtn = document.getElementById('close-modal-btn');
        closeBtn.addEventListener('click', closeModal);
        
    }
    
    function closeModal() {
        let modal = document.getElementById('patient-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
//==============================================================================================      
//==============================================================================================
//================================================================================================
    // Function to modify a patient
    window.modifyPatient = async function (patientId) {
        try {
            // Fetch the patient data from the FastAPI backend
            const response = await fetch(`/modify_patient?id=${patientId}`);
            
            if (response.ok) {
                const patientData = await response.json();

                // Prepare the data to store in localStorage
                const page1Data = {
                    id: patientData.id.toString(),
                    created_at: patientData.created_at,
                    first_and_last_name: patientData.first_and_last_name,
                    age: patientData.age,
                    job: patientData.job,
                    medical_antidotes: patientData.medical_antidotes,
                    correction: patientData.correction,
                };

                // Store the data in localStorage
                localStorage.setItem('page1Data', JSON.stringify(page1Data));

                // Redirect to addpatient_test1 page
                window.location.href = '/addpatient_test1';
            } else {
                console.error('Failed to fetch patient data');
            }
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    }
//===================================================================================================
//============================ =============   ====================  ================================       
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
            searchPatient(); // Refresh the search results
        } catch (error) {
            console.error('Error removing patient:', error);
            alert('An error occurred while removing the patient.');
        }
    };
//=======================================================================================================
//=======================================================================================================
    // Function to view a PDF
    
    window.viewPDF = function(patientId) {
        // Redirect to the addpatient_pdf page with the patient ID as a query parameter
        window.location.href = `/view_pdf/?patient_id=${patientId}`;
    };
    
           
    // Bind search function to search button click
    document.querySelector('.search-btn').addEventListener('click', searchPatient);
});