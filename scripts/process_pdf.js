document.getElementById('next-btn').addEventListener('click', async function() {
        // Retrieve and parse data from localStorage
        const page1Data = JSON.parse(localStorage.getItem('page1Data')) || {};
        const page2Data = JSON.parse(localStorage.getItem('page2Data')) || {};
        const page3Data = JSON.parse(localStorage.getItem('page3Data')) || {};
        const page4Data = JSON.parse(localStorage.getItem('page4Data')) || {};
    
        const patient_info = {
            created_at :page1Data.created_at || '',
            id: page1Data.id || '',  // Ensure id is a valid string
            first_and_last_name: page1Data.first_and_last_name || '',
            age: page1Data.age || '',
            job: page1Data.job || '',
            medical_antidotes: page1Data.medical_antidotes || '',
            correction: page1Data.correction 
        };
    
        const pationt_cord = {
            patient_info: patient_info,
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
        };
    
        try {
            console.log('Sending data to the server:', pationt_cord); // Log data before sending
    
            // Send data to the server
            const response = await fetch('/process-pdf/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pationt_cord)
            });
    
            console.log('Server response:', response); // Log server response
    
            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Failed to process PDF procccc: ${response.statusText} - ${JSON.stringify(errorDetails.detail)}`);
            }
    

    
        } catch (error) {
            console.error('Error:', error);
            const o = " "
            //alert('An error occurred while submitting the form process pdf :::::  : ' + error.message);
        }
    });