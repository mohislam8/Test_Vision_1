document.getElementById('next-btn').addEventListener('click', function() {

    // Collect values from checkboxes in the form
    const checkboxes1 = document.querySelectorAll('.single-checkbox1');
    const checkboxes2 = document.querySelectorAll('.single-checkbox2');
    const checkboxes3 = document.querySelectorAll('.single-checkbox3');
    const checkboxes4 = document.querySelectorAll('.single-checkbox4');
    const checkboxes5 = document.querySelectorAll('.single-checkbox5');

    const doch1 = document.querySelectorAll('.doch1');

    const tab1_ = document.querySelectorAll('.tab1');
    const tab2_ = document.querySelectorAll('.tab2');
    const tab3_ = document.querySelectorAll('.tab3');
    const tab4_ = document.querySelectorAll('.tab4');

    const row1 = document.querySelectorAll('.r1');
    const row2 = document.querySelectorAll('.r2');

    const acuite_od_ch_box_2_12_1 = [];
    const acuite_od_ch_box_1_7_1 = [];
    const acuite_og_ch_box_2_12_2 = [];
    const acuite_og_ch_box_1_7_2 = [];
    const acuite_bino_ch_box_2_12_3 = [];

    const acuite_bino_tab_ch_1 = [];
    const acuite_bino_tab_ch_2 = [];

    const duochrome_1 = [];
    const remark_1 = document.getElementById('remark_1').value;
    const remark_2 = document.getElementById('remark_2').value;
    const phories_tab_ch_1 = [];
    const phories_tab_ch_2 = [];
    const vision_colores_row_1 = [];
    const vision_colores_row_2 = [];

    checkboxes1.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_od_ch_box_2_12_1.push(checkbox.getAttribute('data-chifer'));
        }
    });

    checkboxes2.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_od_ch_box_1_7_1.push(checkbox.getAttribute('data-chifer'));
        }
    });

    checkboxes3.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_og_ch_box_2_12_2.push(checkbox.getAttribute('data-chifer'));
        }
    });

    checkboxes4.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_og_ch_box_1_7_2.push(checkbox.getAttribute('data-chifer'));
        }
    });

    checkboxes5.forEach(checkbox => {
        if (checkbox.checked) {
            acuite_bino_ch_box_2_12_3.push(checkbox.getAttribute('data-chifer'));
        }
    });

    doch1.forEach(checkbox => {
        if (checkbox.checked) {
            duochrome_1.push(checkbox.getAttribute('data-chifer'));
        }
    });

    
//===========================================================================================
function collectDataChifer(tableId, arrayToPush) {
    const radios = document.querySelectorAll(`${tableId} input[type="radio"]:checked`);
    radios.forEach(radio => {
        arrayToPush.push(radio.getAttribute('data-chifer'));
    });
}
// Collect data-chifer values from the first table
collectDataChifer('#characterTable1', acuite_bino_tab_ch_1);
collectDataChifer('#characterTable2', acuite_bino_tab_ch_2);
collectDataChifer('#coordinateTable1', phories_tab_ch_1);
collectDataChifer('#coordinateTable2', phories_tab_ch_2);
//===========================================================================================
   

    row1.forEach(checkbox => {
        if (checkbox.checked) {
            vision_colores_row_1.push(checkbox.getAttribute('data-chifer'));
        }
    });

    row2.forEach(checkbox => {
        if (checkbox.checked) {
            vision_colores_row_2.push(checkbox.getAttribute('data-chifer'));
        }
    });

    // Log collected data
    console.log('acuite_od_ch_box_2_12_1:', acuite_od_ch_box_2_12_1);
    console.log('acuite_od_ch_box_1_7_1:', acuite_od_ch_box_1_7_1);
    console.log('acuite_og_ch_box_2_12_2:', acuite_og_ch_box_2_12_2);
    console.log('acuite_og_ch_box_1_7_2:', acuite_og_ch_box_1_7_2);
    console.log('acuite_bino_ch_box_2_12_3:', acuite_bino_ch_box_2_12_3);
    console.log('acuite_bino_tab_ch_1:', acuite_bino_tab_ch_1);
    console.log('acuite_bino_tab_ch_2:', acuite_bino_tab_ch_2);
    console.log('duochrome_1:', duochrome_1);
    console.log('remark_1:', remark_1);
    console.log('remark_2:', remark_2);
    console.log('phories_tab_ch_3:', phories_tab_ch_1);
    console.log('phories_tab_ch_4:', phories_tab_ch_2);
    console.log('vision_colores_row_1:', vision_colores_row_1);
    console.log('vision_colores_row_2:', vision_colores_row_2);

    // Prepare the data to be sent
    const page2Data = {
        "acuite_od_ch_box_2_12_1": acuite_od_ch_box_2_12_1.join(","),
        "acuite_od_ch_box_1_7_1": acuite_od_ch_box_1_7_1.join(","),
        "acuite_og_ch_box_2_12_2": acuite_og_ch_box_2_12_2.join(","),
        "acuite_og_ch_box_1_7_2": acuite_og_ch_box_1_7_2.join(","),
        "acuite_bino_ch_box_2_12_3": acuite_bino_ch_box_2_12_3.join(","),
        "acuite_bino_tab_ch_1": acuite_bino_tab_ch_1,
        "acuite_bino_tab_ch_2": acuite_bino_tab_ch_2,
        "duochrome_1": duochrome_1,
        "remark_1": remark_1,
        "remark_2": remark_2,
        "phories_tab_ch_1": phories_tab_ch_1,
        "phories_tab_ch_2": phories_tab_ch_2,
        "vision_colores_row_1": vision_colores_row_1,
        "vision_colores_row_2": vision_colores_row_2
    };

    localStorage.setItem('page2Data', JSON.stringify(page2Data));

    // Navigate to the next page
    window.location.href = '/addpatient_test2';
});

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}