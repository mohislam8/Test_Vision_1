document.getElementById('submit-btn').addEventListener('click', async function() {
    // Retrieve and parse data from localStorage
    const page1Data = JSON.parse(localStorage.getItem('page1Data')) || {};
    const page2Data = JSON.parse(localStorage.getItem('page2Data')) || {};
    const page3Data = JSON.parse(localStorage.getItem('page3Data')) || {};
    const page4Data = JSON.parse(localStorage.getItem('page4Data')) || {};

    // Log data to console for debugging
    console.log('Page 1 Data:', page1Data);
    console.log('Page 2 Data:', page2Data);
    console.log('Page 3 Data:', page3Data);
    console.log('Page 4 Data:', page4Data);



        // Construct final data object
const finalData = {
    id : page1Data.id || "",
    first_and_last_name: page1Data.first_and_last_name || '',
    created_at: page1Data.created_at || '',
    age: page1Data.age || '',
    job: page1Data.job || '',
    medical_antidotes: page1Data.medical_antidotes || '',
    correction: page1Data.correction || '',
    
    base_form: {
        test_1: {
            acuite_od_ch_box_2_12_1: page2Data.acuite_od_ch_box_2_12_1 || 'N',
            acuite_od_ch_box_1_7_1: page2Data.acuite_od_ch_box_1_7_1 || 'N',
            acuite_og_ch_box_2_12_2: page2Data.acuite_og_ch_box_2_12_2 || 'N',
            acuite_og_ch_box_1_7_2: page2Data.acuite_og_ch_box_1_7_2 || 'N',
            acuite_bino_ch_box_2_12_3: page2Data.acuite_bino_ch_box_2_12_3 || 'N',
            acuite_bino_tab_ch_1: page2Data.acuite_bino_tab_ch_1 || [],
            acuite_bino_tab_ch_2: page2Data.acuite_bino_tab_ch_2 || [],
            duochrome_1: page2Data.duochrome_1 || [],
            remark_1: page2Data.remark_1 || '',
            remark_2: page2Data.remark_2 || '',
            phories_tab_ch_1: page2Data.phories_tab_ch_1 || [],
            phories_tab_ch_2: page2Data.phories_tab_ch_2 || [],
            vision_colores_row_1: page2Data.vision_colores_row_1 || [],
            vision_colores_row_2: page2Data.vision_colores_row_2 || []
        },
        test_2: {
            acuite_od_ch_box_2_12_1: page3Data.acuite_od_ch_box_2_12_1 || 'N',
            acuite_od_ch_box_1_7_1: page3Data.acuite_od_ch_box_1_7_1 || 'N',
            acuite_og_ch_box_2_12_2: page3Data.acuite_og_ch_box_2_12_2 || 'N',
            acuite_og_ch_box_1_7_2: page3Data.acuite_og_ch_box_1_7_2 || 'N',
            acuite_bino_ch_box_2_12_3: page3Data.acuite_bino_ch_box_2_12_3 || 'N',
            acuite_bino_tab_ch_3: page3Data.acuite_bino_tab_ch_3 || [],
            acuite_bino_tab_ch_4: page3Data.acuite_bino_tab_ch_4 || [],
            duochrome_2: page3Data.duochrome_2 || [],
            remark_3: page3Data.remark_3 || '',
            remark_4: page3Data.remark_4 || '',
            phories_tab_ch_3: page3Data.phories_tab_ch_3 || [],
            phories_tab_ch_4: page3Data.phories_tab_ch_4 || [],
            vision_colores_row_3: page3Data.vision_colores_row_3 || [],
            vision_colores_row_4: page3Data.vision_colores_row_4 || []
        },
        test_3: {
            remark_5: page4Data.remark_5 || '',
            remark_6: page4Data.remark_6 || '',
            interpretation: page4Data.interpretation || ''
        }
    },
    correction_form: page1Data.correction ? {
        
        test_1:{
            acuite_od_ch_box_2_12_1: page2Data.acuite_od_ch_box_2_12_1 || 'N',
            acuite_od_ch_box_1_7_1: page2Data.acuite_od_ch_box_1_7_1 || 'N',
            acuite_og_ch_box_2_12_2: page2Data.acuite_og_ch_box_2_12_2 || 'N',
            acuite_og_ch_box_1_7_2: page2Data.acuite_og_ch_box_1_7_2 || 'N',
            acuite_bino_ch_box_2_12_3: page2Data.acuite_bino_ch_box_2_12_3 || 'N',
            acuite_bino_tab_ch_1: page2Data.acuite_bino_tab_ch_1 || [],
            acuite_bino_tab_ch_2: page2Data.acuite_bino_tab_ch_2 || [],
            duochrome_1: page2Data.duochrome_1 || [],
            remark_1: page2Data.remark_1 || '',
            remark_2: page2Data.remark_2 || '',
            phories_tab_ch_1: page2Data.phories_tab_ch_1 || [],
            phories_tab_ch_2: page2Data.phories_tab_ch_2 || [],
            vision_colores_row_1: page2Data.vision_colores_row_1 || [],
            vision_colores_row_2: page2Data.vision_colores_row_2 || []
        },
        test_2: {
            acuite_od_ch_box_2_12_1: page3Data.acuite_od_ch_box_2_12_1 || 'N',
            acuite_od_ch_box_1_7_1: page3Data.acuite_od_ch_box_1_7_1 || 'N',
            acuite_og_ch_box_2_12_2: page3Data.acuite_og_ch_box_2_12_2 || 'N',
            acuite_og_ch_box_1_7_2: page3Data.acuite_og_ch_box_1_7_2 || 'N',
            acuite_bino_ch_box_2_12_3: page3Data.acuite_bino_ch_box_2_12_3 || 'N',
            acuite_bino_tab_ch_3: page3Data.acuite_bino_tab_ch_3 || [],
            acuite_bino_tab_ch_4: page3Data.acuite_bino_tab_ch_4 || [],
            duochrome_2: page3Data.duochrome_2 || [],
            remark_3: page3Data.remark_3 || '',
            remark_4: page3Data.remark_4 || '',
            phories_tab_ch_3: page3Data.phories_tab_ch_3 || [],
            phories_tab_ch_4: page3Data.phories_tab_ch_4 || [],
            vision_colores_row_3: page3Data.vision_colores_row_3 || [],
            vision_colores_row_4: page3Data.vision_colores_row_4 || []
        },
        test_3: {
            remark_5: page4Data.remark_5 || '',
            remark_6: page4Data.remark_6 || '',
            interpretation: page4Data.interpretation || ''
        }
    } : null
};

    try {
        // Send the data to the FastAPI endpoint
        const response = await fetch('/submit_patient_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalData),
        });

        // Check the response
        if (response.ok) {
            alert('Data submitted successfully     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', );
            // Optionally, clear the local storage
            localStorage.clear();
            // Redirect or perform other actions
        } else {
            const errorData = await response.json();
            console.error('Response Error:', errorData); // Log detailed error
            alert('Failed to submit the form: ' + JSON.stringify(errorData)); // Show detailed error
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the formmmmm');
    }
});    

