 // Function to get query parameters
 function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to display the PDF
async function displayPDF(patientId) {
    try {
        // Fetch the PDF from the server
        const response = await fetch(`/get_patient_data/?patient_id=${patientId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patient_id: patientId })
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status code: ${response.status}`);
        }

        // Convert response to a blob
        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);

        // Update the iframe src to display the PDF
        const iframe = document.getElementById('pdf-frame');
        iframe.src = pdfUrl;
        iframe.style.display = 'block';  // Ensure iframe is visible

    } catch (error) {
        console.error('Error displaying PDF:', error);
        alert('An error occurred while displaying the PDF.');
    }
}

// On page load, get the patient ID from the query parameters and display the PDF
window.onload = function() {
    const patientId = getQueryParam('patient_id');
    if (patientId) {
        displayPDF(patientId);
    } else {
        alert('No patient ID provided.');
    }
};



