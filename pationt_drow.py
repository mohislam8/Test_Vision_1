
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import BytesIO
from reportlab.lib.colors import red ,aliceblue,brown,blueviolet,blue



cord_1 = {"2":(131.8, 712.5),"4":(151.5, 712.5),"6":(171, 712.5),"8":(190.4, 712.5),"10":(209.4, 712.5),"12":(234, 712.5) , "N":(255, 712.5)}
cord_2 = {"2":(131.8, 665),"4":(151.5, 665),"6":(171, 665),"8":(190.4, 665),"10":(209.4, 665),"12":(234, 665), "N":(255, 665)}
cord_3 = {"2":(131.8, 628),"4":(151.5, 628),"6":(171, 628),"8":(190.4, 628),"10":(209.4, 628),"12":(234, 628), "N":(255, 628)}
cord_4 = {"2":(131.8, 430),"4":(151.5, 430),"6":(171, 430),"8":(190.4, 430),"10":(209.4, 430),"12":(234, 430), "N":(255, 430)}
cord_5 = {"2":(131.8, 380),"4":(151.5, 380),"6":(171, 380),"8":(190.4, 380),"10":(209.4, 380),"12":(234, 380), "N":(255, 380)}
cord_6 = {"2":(131.8, 344),"4":(151.5, 344),"6":(171, 344),"8":(190.4, 344),"10":(209.4, 344),"12":(234, 344), "N":(255, 344)}

#=============================================================================================================================
cord_rond_1 = {"1":(337,706 ),"2":(359, 718),"3":(378.5, 728),"4":(409, 736),"5":(446, 728),"6":(466, 718),"7":(486, 706),"N":(409, 710)}
cord_rond_2 = {"1":(336,660 ),"2":(358, 672.5),"3":(377.5, 681),"4":(408.5, 690),"5":(445, 681),"6":(464.5, 672.5),"7":(485.5, 661),"N":(409, 665)}
cord_rond_3 = {"1":(337,422 ),"2":(358.8, 434),"3":(378.5, 444),"4":(409.4, 453),"5":(445.7, 444.5),"6":(465.5, 434),"7":(486.4, 423),"N":(409, 426)}
cord_rond_4 = {"1":(336,376.4 ),"2":(358.3, 388.4),"3":(377.6, 398),"4":(408.4, 407),"5":(445, 398),"6":(464.7, 388.7),"7":(485.5, 377.5),"N":(409, 380)}
#============================================================================================================================================
rows_table_1 = {'1': 520.6,'2': 513,'3': 505.6,}
Tab_1 = {"A": 140.5,"B": 152.5,"C": 164.5,"D": 177.5,"E": 190.5,"F": 203.5,"G": 216.5,"H": 228.5,"I": 240.5,"J": 252.5,"K": 265.5,"L": 278.5,"M": 291.5,"N": 304.5,"O": 316.5,}
#===============================================================================================================================================================================
rows_table_3 = {'1': 236.5,'2': 229,'3': 221.5,}
Tab_2 = {  "A":467.5,"B":479.5, "C":491.5, "D":504, "E":517,"F":530,"G":543,"H":555,"I":567,}
#==================================================================================================================================================================
rows_table_2 = {'1': 520.6,'2': 513,'3': 505.6,}
Tab_3 = {"A": 140.5,"B": 152.5,"C": 164.5,"D": 177.5,"E": 190.5,"F": 203.5,"G": 216.5,"H": 228.5,"I": 240.5,"J": 252.5,"K": 265.5,"L": 278.5,"M": 291.5,"N": 304.5,"O": 316.5,}
#==================================================================================================================================================================
rows_table_4 = {'1': 237.5,'2': 230,'3': 222.5,}
Tab_4 = {  "A":467.5,"B":479.5, "C":491.5, "D":504, "E":517,"F":530,"G":543,"H":555,"I":567,}
#=================================================================================================================================================================================

def get_coordinates_alpha_tab(case):
    row_id = case[0]
    column_id = case[1]
    table_id = case[2]

    # Validate table_id and get the appropriate row and column dictionaries
    if table_id == '1':
        rows = rows_table_1
        columns = Tab_1
    elif table_id == '2':
        rows = rows_table_2
        columns = Tab_2
    elif table_id == '3':
        rows = rows_table_3
        columns = Tab_3
    elif table_id == '4':
        rows = rows_table_4
        columns = Tab_4
    else:
        return "Invalid table"

    # Check if the row_id and column_id are valid
    if row_id in rows and column_id in columns:
        row_value = rows[row_id]
        column_value = columns[column_id]
        return (column_value, row_value)
    else:
        return "Invalid case"


#==================================================================================================================================================================================
row_ch_1 = {"A":605,"B":596.2,"C":587}
Tab_ch_1 = {"1":132.5, "2":147, "3":162, "4":177.5, "5":193, "6":208.5, "7":224, "8":239 }
#=====================================================
row_ch_2 = {"A":606,"B":596.7,"C":587.7}
Tab_ch_2 = {"1":462, "2":476, "3":490.5, "4":506, "5":521, "6":537, "7":552, "8":567 }
#=====================================================
row_ch_3 = {"A":321.5,"B":312.5,"C":303}
Tab_ch_3 = {"1":132.5, "2":147, "3":162, "4":177.5, "5":193, "6":208.5, "7":224, "8":239 }
#=====================================================
row_ch_4 = {"A":322,"B":313,"C":304}
Tab_ch_4 = {"1":462, "2":476, "3":490.5, "4":506, "5":521, "6":537, "7":552, "8":567 }
#======================================================================================================================================================================================
def get_coordinates_char_tab(case):
    # Extract row and column from the identifier
    column_id = case[0]
    row_id = case[1]
    table_id = case[2]

    # Validate table_id and get the appropriate row and column dictionaries
    if table_id == '1':
        rows = row_ch_1
        columns = Tab_ch_1
    elif table_id == '2':
        rows = row_ch_2
        columns = Tab_ch_2
    elif table_id == '3':
        rows = row_ch_3
        columns = Tab_ch_3
    elif table_id == '4':
        rows = row_ch_4
        columns = Tab_ch_4
    else:
        return "Invalid table"

    # Check if the row_id and column_id are valid
    if row_id in rows and column_id in columns:
        row_value = rows[row_id]
        column_value = columns[column_id]
        return (column_value, row_value)
    else:
        return "Invalid case"

#======================================================================================================================================================================================
Duochrome1 = {"V":(305,268+283+1),"V1":(335,280+283+1),"V2":(335,269+283+1),"V3":(335,259+283+1),"R":(396,268+283+1),"R1":(366,280+283+1),"R2":(366,269+283+1),"R3":(366, 259+283+1)         }
#==========================================================================================================================
Duochrome2 = {"V":(305,268),"V1":(335,280),"V2":(335,269),"V3":(335,259),"R":(396,268),"R1":(366,280),"R2":(366,269),"R3":(366,259)}
#========================================================================================================================================================================================================
Remarks = {"R1":(180, 268+283),"R2":(425, 268+283),"R3":(180, 268),"R4":(425, 268),"R5":(190, 140),"R6":(440, 140)        }
#=====================================================================================================================================================================================================
def get_coordinates_vis_color_tab(case):
    # Extract row and column from the identifier
    rows = {'1': 483, '2': 468, '3': 199, '4': 184, }
    columns = {"0": 136, "1": 179, "2": 217, "3": 262, "4": 300, "5": 337, "6": 385, "7": 439, "8": 486, "9": 533}
    column = case[0]
    row = case[1]

    # Check if the row_id and column_id are valid
    row_value = rows[str(row)]
    column_value = columns[str(column)]
    return (column_value, row_value)
#=======================================================================================================================================


#======================================================================================================================================================================
patient_info_cords = {
    "created_at_cord" : (435, 60),
    "first_and_last_name_cords" : (110, 776.5),
    "age_cords" : (317, 776.5),
    "job_cords" : (435, 776.5),
    "correction_cords" : (517, 763),
    "id_cords" : (374, 763),
    "medical_antidotes_cords" : (145, 763)
    }
#=================================================================================================
def cord_text(input_string, lengths=[100, 112, 327, 432],
              cords={"1": (105, 110), "2": (26, 97), "3": (26, 84), "4": (26, 71), "5": (26, 68)}):
    words = input_string.split()
    result = {}
    part = ""
    part_index = 1

    for word in words:
        # If adding the next word would exceed the length limit, save the current part and start a new one
        if part_index <= len(lengths) and len(part) + len(word) + 1 > lengths[part_index - 1]:
            result[str(part_index)] = {'cord': cords[str(part_index)], 'text': part.strip()}
            part = word
            part_index += 1
            if part_index > len(lengths):
                break
        else:
            part += " " + word

    # Add the last part
    if part_index <= len(lengths):
        result[str(part_index)] = {'cord': cords[str(part_index)], 'text': part.strip()}
        part_index += 1

    # Handle any remaining parts if there are still lengths left
    while part_index <= len(lengths):
        result[str(part_index)] = {'cord': cords[str(part_index)], 'text': ""}
        part_index += 1

    return result

import os 
#=================================================================================================

def drow(input_pdf_path, output_pdf_path, pationt_cord):
    # ===========================================================================================


    
    test_1 = pationt_cord["test_1"]
    test_2 = pationt_cord["test_2"]
    test_3 = pationt_cord["test_3"]
    patient_info = pationt_cord["patient_info"]
    
    
    
    #print("Patient Info:", patient_info)
    print("Test 1 Data:", test_1)
    print("Test 2 Data:", test_2)
    print("Test 3 Data:", test_3)


    # Read the existing PDF
    pdf_reader = PdfReader(input_pdf_path)
    pdf_writer = PdfWriter()

    # Create a new PDF with the checkbox checked
    packet = BytesIO()
    can = canvas.Canvas(packet, pagesize=letter)

    font_size_text = 10  # Example font size for text
    can.setFont("Helvetica-Bold", font_size_text)
    can.setFillColor(blue)
    # ===============================================================================================
    # ==============  test_1 ========================================================================
    # ===============================================================================================

    x, y = cord_1[test_1["acuite_od_ch_box_2_12_1"]]
    can.drawString(x, y, '✖')
    # =======================================================
    x, y = cord_rond_1[test_1["acuite_od_ch_box_1_7_1"]]
    can.drawString(x, y, '✖')
    # =======================================================
    x, y = cord_2[test_1["acuite_og_ch_box_2_12_2"]]
    can.drawString(x, y, '✖')
    # =======================================================
    x, y = cord_rond_2[test_1["acuite_og_ch_box_1_7_2"]]
    can.drawString(x, y, '✖')
    # =======================================================
    x, y = cord_3[test_1["acuite_bino_ch_box_2_12_3"]]
    can.drawString(x, y, '✖')
    # =======================================================
    radius = 3.5

    for i in test_1["acuite_bino_tab_ch_1"]:
        x, y = get_coordinates_char_tab(str(i))
        can.circle(x, y, radius)
    # =======================================================

    for i in test_1["acuite_bino_tab_ch_2"]:
        x, y = get_coordinates_char_tab(str(i))
        can.circle(x, y, radius)
    # =======================================================
    for i in test_1["duochrome_1"]:
        x, y = Duochrome1[i]
        can.drawString(x, y, '✖')
    # =======================================================
    radius = 2
    for i in test_1["phories_tab_ch_1"]:
        x, y = get_coordinates_alpha_tab(str(i))
        can.circle(x, y, radius, fill=1)
    # =======================================================
    for i in test_1["phories_tab_ch_2"]:
        x, y = get_coordinates_alpha_tab(str(i))
        can.circle(x, y, radius, fill=1)
        # =======================================================
    for i in test_1["vision_colores_row_1"]:
        x, y = get_coordinates_vis_color_tab(str(i))
        can.drawString(x, y, '✖')
    # =======================================================
    for i in test_1["vision_colores_row_2"]:
        x, y = get_coordinates_vis_color_tab(str(i))
        can.drawString(x, y, '✖')

    # ===============================================================================================
    # ==============  test_2 ========================================================================
    # ===============================================================================================

    x, y = cord_4[test_2["acuite_od_ch_box_2_12_1"]]
    can.drawString(x, y, '✖')
    # =======================================================
    x, y = cord_rond_3[test_2["acuite_od_ch_box_1_7_1"]]
    can.drawString(x, y, '✖')
    # =======================================================
    x, y = cord_5[test_2["acuite_og_ch_box_2_12_2"]]
    can.drawString(x, y, '✖')
    # =======================================================
    x, y = cord_rond_4[test_2["acuite_og_ch_box_1_7_2"]]
    can.drawString(x, y, '✖')
    # =======================================================
    x, y = cord_6[test_2["acuite_bino_ch_box_2_12_3"]]
    can.drawString(x, y, '✖')
    # =======================================================
    radius = 3.5

    for i in test_2["acuite_bino_tab_ch_3"]:
        x, y = get_coordinates_char_tab(str(i))
        can.circle(x, y, radius)
    # =======================================================

    for i in test_2["acuite_bino_tab_ch_4"]:
        x, y = get_coordinates_char_tab(str(i))
        can.circle(x, y, radius)
    # =======================================================
    for i in test_2["duochrome_2"]:
        x, y = Duochrome2[i]
        can.drawString(x, y, '✖')
    # =======================================================
    radius = 2
    for i in test_2["phories_tab_ch_3"]:
        x, y = get_coordinates_alpha_tab(str(i))
        can.circle(x, y, radius, fill=1)
        
    # =======================================================
    for i in test_2["phories_tab_ch_4"]:
        x, y = get_coordinates_alpha_tab(str(i))
        can.circle(x, y, radius, fill=1)

    # =======================================================
    for i in test_2["vision_colores_row_3"]:
        x, y = get_coordinates_vis_color_tab(str(i))
        can.drawString(x, y, '✖')
        
    # =======================================================
    for i in test_2["vision_colores_row_4"]:
        x, y = get_coordinates_vis_color_tab(str(i))
        can.drawString(x, y, '✖')

    # ===============================================================================================
    # ==============  pationt interpretation and remarks  =====================================================
    # ===============================================================================================

    # =======================================================
    x, y = Remarks["R1"]
    can.drawString(x, y, test_1["remark_1"])
    # =======================================================
    x, y = Remarks["R2"]
    can.drawString(x, y, test_1["remark_2"])
    # =======================================================
    x, y = Remarks["R3"]
    can.drawString(x, y, test_2["remark_3"])
    # ======================================================
    x, y = Remarks["R4"]
    can.drawString(x, y, test_2["remark_4"])
    # =======================================================
    x, y = Remarks["R5"]
    can.drawString(x, y, test_3["remark_5"])
    # =======================================================
    x, y = Remarks["R6"]
    can.drawString(x, y, test_3["remark_6"])
    # =======================================================
    interpretation = cord_text(test_3["interpretation"])
    x, y = interpretation["1"]["cord"]
    can.drawString(x, y, interpretation["1"]["text"])
    x, y = interpretation["2"]["cord"]
    can.drawString(x, y, interpretation["2"]["text"])
    x, y = interpretation["3"]["cord"]
    can.drawString(x, y, interpretation["3"]["text"])
    # ===============================================================================================
    # =======================================================
    # =======Pationt info ===================================
    # =======================================================
    

    x, y = patient_info_cords["created_at_cord"]
    can.drawString(x, y,  "Créé à  : " + patient_info["created_at"].strftime('%Y-%m-%d %H:%M:%S'))
    #========================================================
    x, y = patient_info_cords["id_cords"]
    can.drawString(x, y, patient_info["id"])
    # =======================================================
    x, y = patient_info_cords["first_and_last_name_cords"]
    can.drawString(x, y, patient_info["first_and_last_name"])
    # =======================================================
    x, y = patient_info_cords["age_cords"]
    can.drawString(x, y, patient_info["age"])
    # =======================================================
    x, y = patient_info_cords["medical_antidotes_cords"]
    can.drawString(x, y, patient_info["medical_antidotes"])
    # =======================================================
    x, y = patient_info_cords["job_cords"]
    can.drawString(x, y, patient_info["job"])
    # =======================================================
    # ======== Correction ===================================
    # =======================================================
    print('=========== ==== = == = = = = = = = ======== ===== ',patient_info["correction"])
    if patient_info["correction"] == "yes":
        can.setFillColor(red)
        x, y = patient_info_cords["correction_cords"]
        can.drawString(x, y, "Correction")
    # =======================================================
    can.save()

    # Move to the beginning of the StringIO buffer
    packet.seek(0)
    new_pdf = PdfReader(packet)

    # Add the "watermark" (which is the new pdf) on the existing page
    for page_number in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_number]
        if page_number == 0:  # Assuming the checkbox is on the first page
            page.merge_page(new_pdf.pages[0])
        pdf_writer.add_page(page)
        
    output_dir = os.path.dirname(output_pdf_path)
    os.makedirs(output_dir, exist_ok=True)
    # Finally, write the new PDF to disk
   
    with open(output_pdf_path, "wb") as output_stream:
        pdf_writer.write(output_stream)
    

# Example usage================================================================================================
