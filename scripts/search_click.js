 // Function to run on page load
 document.addEventListener('DOMContentLoaded', function() {
    // Get the query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('query');

    // Check if searchTerm exists
    if (searchTerm) {
      // Set the search term to the input field
      document.getElementById('patient-id').value = decodeURIComponent(searchTerm);

      // Automatically trigger the search button click
      document.querySelector('.search-btn').click();
    }
  });