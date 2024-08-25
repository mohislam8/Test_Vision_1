from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class PatientInfo(BaseModel):
    id: str
    first_and_last_name: str
    age: str
    job: str
    medical_antidotes: str
    correction: str

class Test1(BaseModel):
    acuite_od_ch_box_2_12_1: str
    acuite_od_ch_box_1_7_1: str
    acuite_og_ch_box_2_12_2: str
    acuite_og_ch_box_1_7_2: str
    acuite_bino_ch_box_2_12_3: str
    acuite_bino_tab_ch_1: List[str]
    acuite_bino_tab_ch_2: List[str]
    duochrome_1: List[str]
    remark_1: str
    remark_2: str
    phories_tab_ch_1: List[str]
    phories_tab_ch_2: List[str]
    vision_colores_row_1: List[str]
    vision_colores_row_2: List[str]

class Test2(BaseModel):
    acuite_od_ch_box_2_12_1: str
    acuite_od_ch_box_1_7_1: str
    acuite_og_ch_box_2_12_2: str
    acuite_og_ch_box_1_7_2: str
    acuite_bino_ch_box_2_12_3: str
    acuite_bino_tab_ch_3: List[str]
    acuite_bino_tab_ch_4: List[str]
    duochrome_2: List[str]
    remark_3: str
    remark_4: str
    phories_tab_ch_3: List[str]
    phories_tab_ch_4: List[str]
    vision_colores_row_3: List[str]
    vision_colores_row_4: List[str]

class Test3(BaseModel):
    remark_5: str
    remark_6: str
    interpretation: str

class PatientData(BaseModel):
    patient_info: PatientInfo
    test_1: Test1
    test_2: Test2
    test_3: Test3

@app.post("/submit_data/")
async def submit_data(patient_data: List[PatientData]):
    # Here, you would typically save the data to a database or process it as needed
    # For demonstration, we'll just return the received data
    return {"received_data": patient_data}
