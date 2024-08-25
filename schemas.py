from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserInfo(BaseModel):
        id: int
        username: str 
        password: str
        
class Test1Create(BaseModel):
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

class Test2Create(BaseModel):
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

class Test3Create(BaseModel):
    remark_5: str
    remark_6: str
    interpretation: str

class BaseFormCreate(BaseModel):
    test_1: Test1Create
    test_2: Test2Create
    test_3: Test3Create

class CorrectionFormCreate(BaseModel):
    test_1: Test1Create
    test_2: Test2Create
    test_3: Test3Create

class PatientCreate(BaseModel):
    created_at: datetime
    first_and_last_name: str
    age: str
    job: str
    medical_antidotes: str
    correction: str 
    
    base_form: BaseFormCreate
    correction_form: Optional[CorrectionFormCreate] = None
    

class PatientInfo(BaseModel):
    created_at: datetime
    id: str
    first_and_last_name: str
    age: str
    job: str
    medical_antidotes: str
    correction: str    
    
class PatientData(BaseModel):
    patient_info: PatientInfo
    test_1: Test1Create
    test_2: Test2Create
    test_3: Test3Create    

class PatientOut(BaseModel):
    id: str
    created_at: datetime
    first_and_last_name: str
    age: str
    correction: str 
    job: str
    medical_antidotes: str
    

    
class PatientOutTab(BaseModel):
    id: str
    first_and_last_name: str
    age: str
    created_at: datetime
    correction: str 
    form_type: Optional[str]  # Assuming 'correction' is the form type
    



    

