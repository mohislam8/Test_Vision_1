document.getElementById('next-btn').addEventListener('click', function() {
    
    // Collect values from checkboxes in the form
    const checkboxes6 = document.querySelectorAll('.single-checkbox6');
    const checkboxes7 = document.querySelectorAll('.single-checkbox7');
    const checkboxes8 = document.querySelectorAll('.single-checkbox8');
    const checkboxes9 = document.querySelectorAll('.single-checkbox9');
    const checkboxes10 = document.querySelectorAll('.single-checkbox10');

    const doch2 = document.querySelectorAll('.doch2');

    const acuite_bino_tab_ch3 = document.querySelectorAll('.acuite_bino_tab_ch_3');
    const acuite_bino_tab_ch4 = document.querySelectorAll('.acuite_bino_tab_ch_4');
    const phories_tab_ch3 = document.querySelectorAll('.phories_tab_ch_3');
    const phories_tab_ch4 = document.querySelectorAll('.phories_tab_ch_4');

    const row3 = document.querySelectorAll('.r3');
    const row4 = document.querySelectorAll('.r4');

    const acuite_od_ch_box_2_12_1 = [];
    const acuite_od_ch_box_1_7_1 = [];
    const acuite_og_ch_box_2_12_2 = [];
    const acuite_og_ch_box_1_7_2 = [];
    const acuite_bino_ch_box_2_12_3 = [];
    const acuite_bino_tab_ch_3 = [];
    const acuite_bino_tab_ch_4 = [];
    const duochrome_2 = [];
    const remark_3 = document.getElementById('remark_3').value;
    const remark_4 = document.getElementById('remark_4').value;
    const phories_tab_ch_3 = [];
    const phories_tab_ch_4 = [];
    const vision_colores_row_3 = [];
    const vision_colores_row_4 = [];

    checkboxes6.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_od_ch_box_2_12_1.push(checkbox.getAttribute('data-chifer'));
        }
    });

    checkboxes7.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_od_ch_box_1_7_1.push(checkbox.getAttribute('data-chifer'));
        }
    });

    checkboxes8.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_og_ch_box_2_12_2.push(checkbox.getAttribute('data-chifer'));
        }
    });

    checkboxes9.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_og_ch_box_1_7_2.push(checkbox.getAttribute('data-chifer'));
        }
    });

    checkboxes10.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_bino_ch_box_2_12_3.push(checkbox.getAttribute('data-chifer'));
        }
    });

    doch2.forEach(checkbox => {
        if (checkbox.checked) {
            duochrome_2.push(checkbox.getAttribute('data-chifer'));
        }
    });

    acuite_bino_tab_ch3.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_bino_tab_ch_3.push(checkbox.getAttribute('data-chifer'));
        }
    });

    acuite_bino_tab_ch4.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_bino_tab_ch_4.push(checkbox.getAttribute('data-chifer'));
        }
    });

    phories_tab_ch3.forEach(checkbox => {
        if (checkbox.checked) {
            phories_tab_ch_3.push(checkbox.getAttribute('data-chifer'));
        }
    });

    phories_tab_ch4.forEach(checkbox => {
        if (checkbox.checked) {
            phories_tab_ch_4.push(checkbox.getAttribute('data-chifer'));
        }
    });

    row3.forEach(checkbox => {
        if (checkbox.checked) {
            vision_colores_row_3.push(checkbox.getAttribute('data-chifer'));
        }
    });

    row4.forEach(checkbox => {
        if (checkbox.checked) {
            vision_colores_row_4.push(checkbox.getAttribute('data-chifer'));
        }
    });

    // Log collected data
    console.log('acuite_od_ch_box_2_12_1:', acuite_od_ch_box_2_12_1);
    console.log('acuite_od_ch_box_1_7_1:', acuite_od_ch_box_1_7_1);
    console.log('acuite_og_ch_box_2_12_2:', acuite_og_ch_box_2_12_2);
    console.log('acuite_og_ch_box_1_7_2:', acuite_og_ch_box_1_7_2);
    console.log('acuite_bino_ch_box_2_12_3:', acuite_bino_ch_box_2_12_3);
    console.log('acuite_bino_tab_ch_3:', acuite_bino_tab_ch_3);
    console.log('acuite_bino_tab_ch_4:', acuite_bino_tab_ch_4);
    console.log('duochrome_2:', duochrome_2);
    console.log('remark_3:', remark_3);
    console.log('remark_4:', remark_4);
    console.log('phories_tab_ch_3:', phories_tab_ch_3);
    console.log('phories_tab_ch_4:', phories_tab_ch_4);
    console.log('vision_colores_row_3:', vision_colores_row_3);
    console.log('vision_colores_row_4:', vision_colores_row_4);

    // Prepare the data to be sent
    const page3Data  = {
         "acuite_od_ch_box_2_12_1" : acuite_od_ch_box_2_12_1.join(","),
         "acuite_od_ch_box_1_7_1": acuite_od_ch_box_1_7_1.join(","),
         "acuite_og_ch_box_2_12_2": acuite_og_ch_box_2_12_2.join(","),
         "acuite_og_ch_box_1_7_2": acuite_og_ch_box_1_7_2.join(","),
         "acuite_bino_ch_box_2_12_3": acuite_bino_ch_box_2_12_3.join(","),
         "acuite_bino_tab_ch_3": acuite_bino_tab_ch_3,
         "acuite_bino_tab_ch_4": acuite_bino_tab_ch_4,
         "duochrome_2": duochrome_2,
         "remark_3": remark_3,
         "remark_4": remark_4,
         "phories_tab_ch_3": phories_tab_ch_3,
         "phories_tab_ch_4": phories_tab_ch_4,
         "vision_colores_row_3": vision_colores_row_3,
         "vision_colores_row_4": vision_colores_row_4,
    };

    localStorage.setItem('page3Data', JSON.stringify(page3Data));

    // Navigate to the next page
    window.location.href = '/addpatient_test3';
});

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}