document.getElementById('next-btn').addEventListener('click', function() {

    const remark_5 = document.getElementById('remark_5').value;
    const remark_6 = document.getElementById('remark_6').value;
    const paragraphText = document.getElementById('paragraphText').value;


    const page4Data  = {

        "remark_5" : remark_5,
        "remark_6" : remark_6,
        "interpretation": paragraphText,
        // Add more fields as needed
    };

    localStorage.setItem('page4Data', JSON.stringify(page4Data ));

    // Navigate to the next page
    //window.location.href = '/addpatient_pdf';
});
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}

