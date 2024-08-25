document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pdfUrl = urlParams.get('pdf_url');

    if (pdfUrl) {
        const pdfContainer = document.getElementById('pdf-container');
        const pdfFrame = document.getElementById('pdf-frame');
        pdfFrame.src = pdfUrl;
        pdfContainer.style.display = 'block';
    }
});
