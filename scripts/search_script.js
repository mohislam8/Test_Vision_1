

function searchPatient() {
  const searchTerm = document.getElementById('patient-id').value.trim();
  
  // Check if search term is not empty
  if (!searchTerm) {
    alert('Please enter a search term');
    return;
  }

  // Redirect to search_page with search term as a query parameter
  window.location.href = `search_page?query=${encodeURIComponent(searchTerm)}`;
}