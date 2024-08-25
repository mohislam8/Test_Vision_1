document.getElementById('next-btn').addEventListener('click', function() {
    let currentPage = window.location.href;
    if (currentPage.includes('addpatient_info')) {
        //submitDataAndNavigate('/addpatient_test1');
        window.location.href = '/addpatient_test1';
    } else if (currentPage.includes('addpatient_test1')) {
        //submitDataAndNavigate('/addpatient_test2');
        window.location.href = '/addpatient_test2';
    } else if (currentPage.includes('addpatient_test2')) {
        //submitDataAndNavigate('/addpatient_test3');
        window.location.href = '/addpatient_test3';
    } else if (currentPage.includes('addpatient_test3')) {
        //submitDataAndNavigate('/addpatient_pdf');
        window.location.href = '/addpatient_pdf';
    } else if (currentPage.includes('addpatient_pdf')) {
        //submitDataAndNavigate('/addpatient_info');
        window.location.href = '/addpatient_info';
    }
});

document.getElementById('previous-btn').addEventListener('click', function() {
    let currentPage = window.location.href;
    if (currentPage.includes('addpatient_test1')) {
        window.location.href = '/addpatient_info';
    } else if (currentPage.includes('addpatient_test2')) {
        window.location.href = '/addpatient_test1';
    } else if (currentPage.includes('addpatient_test3')) {
        window.location.href = '/addpatient_test2';
    } else if (currentPage.includes('addpatient_pdf')) {
        window.location.href = '/addpatient_test3';
    } 
});