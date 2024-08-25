from fastapi import FastAPI, HTTPException, Request, Form, Depends, File, UploadFile
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from database import get_db
from datetime import datetime

from sqlalchemy import create_engine, select
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker , Session

from models import Patient, BaseForm, CorrectionForm, Test1, Test2, Test3 
from schemas import PatientCreate, Test1Create, Test2Create, Test3Create, PatientData ,UserInfo
from database import Base, engine 
import os
import logging
from pationt_drow import drow
#======================================================================================================================
# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

#===================================================================================================================
app = FastAPI()
#============================== loaded the files ==============================================================================================
templates = Jinja2Templates(directory="templates")
app.mount("/styles", StaticFiles(directory="styles"), name="styles")
app.mount("/scripts", StaticFiles(directory="scripts"), name="scripts")
app.mount("/icons", StaticFiles(directory="icons"), name="icons")
#=====================================================================================================================
#========================================================================================================================
#=======================  LOgin Page ================================================================================
users: List[UserInfo] = [
    UserInfo(id=1, username="babziz mostafa", password="00000000"),
    UserInfo(id=2, username="mohammed islam ouahbi", password="11111111"),
]
#========================================================================================================================
#=================== Log in page ======================================================================================
@app.get('/')
def login_page(req: Request):
    return templates.TemplateResponse("login.html", {"request": req})
#======================================================================================================================
@app.post("/")
async def login(req: Request, username: str = Form(...), password: str = Form(...)):
    user_ = (user for user in users if user.username == username and user.password == password)
    if any(user_):
        # Render the profile page upon successful login
        return templates.TemplateResponse("userprofile.html", {"request": req, "username": username})
    else:
        # Return to the login page with an error message if login fails
        return templates.TemplateResponse("login.html", {"request": req, "error": "Invalid username or password"})
#==========================================================================================================================
#===================================== GET PAGES ==========================================================================    
#====================================== User Profile ======================================================================

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create all tables
Base.metadata.create_all(bind=engine)
#==========================================================================================================================
#================================ search page ================================================================================
#=========================================================================================================================
@app.get('/search_page')
def addpatient_info(req: Request):
    return templates.TemplateResponse("search_page.html", {"request": req})
#====================================================================================================================
#=============================================================  
class PatientTabResponse(BaseModel):
    id: int
    first_and_last_name: str
    created_at: str
    form_type: str
#==============================================================================================
class PatientInfo(BaseModel):
    created_at: datetime
    id: int
    first_and_last_name: str
    age: str
    job: str
    medical_antidotes: str
    correction: str
#=========================================================================================
class PatientData(BaseModel):
    patient_info: PatientInfo
    test_1: Test1Create
    test_2: Test2Create
    test_3: Test3Create   
#================================================================================================
#======================================== get dqtq using id =====================================
#================================================================================================
@app.post("/get_patient_data/")
def get_patient_data(patient_id: int, db: Session = Depends(get_db)):
    # Query the patient data by ID
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    
    # Check if patient exists
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Collect the patient data
    patient_data = {
        "id": str(patient.id),
        "first_and_last_name": patient.first_and_last_name,
        "age": patient.age,
        "job": patient.job,
        "medical_antidotes": patient.medical_antidotes,
        "created_at": patient.created_at,
        #"correction": patient.correction,
        "base_form": None,
        "correction_form": None 
    }

    # Get BaseForm data if it exists
    if patient.base_form:
        patient_data["base_form"] = {
            "id": patient.base_form.id,
            "test_1": None,
            "test_2": None,
            "test_3": None
        }

        # Get Test1 data
        if patient.base_form.test_1:
            patient_data["base_form"]["test_1"] = {
                "id": patient.base_form.test_1.id,
                "acuite_od_ch_box_2_12_1": patient.base_form.test_1.acuite_od_ch_box_2_12_1,
                "acuite_od_ch_box_1_7_1": patient.base_form.test_1.acuite_od_ch_box_1_7_1,
                "acuite_og_ch_box_2_12_2" : patient.base_form.test_1.acuite_og_ch_box_2_12_2,
                "acuite_og_ch_box_1_7_2" : patient.base_form.test_1.acuite_og_ch_box_1_7_2,
                "acuite_bino_ch_box_2_12_3" : patient.base_form.test_1.acuite_bino_ch_box_2_12_3,
                "acuite_bino_tab_ch_1" : patient.base_form.test_1.acuite_bino_tab_ch_1,
                "acuite_bino_tab_ch_2" : patient.base_form.test_1.acuite_bino_tab_ch_2,
                "duochrome_1" : patient.base_form.test_1.duochrome_1,
                "remark_1" : patient.base_form.test_1.remark_1,
                "remark_2" : patient.base_form.test_1.remark_2,
                "phories_tab_ch_1" : patient.base_form.test_1.phories_tab_ch_1,
                "phories_tab_ch_2" : patient.base_form.test_1.phories_tab_ch_2,
                "vision_colores_row_1" : patient.base_form.test_1.vision_colores_row_1,
                "vision_colores_row_2" : patient.base_form.test_1.vision_colores_row_2
            }

        # Get Test2 data
        if patient.base_form.test_2:
            patient_data["base_form"]["test_2"] = {
                "id": patient.base_form.test_2.id,
                "acuite_od_ch_box_2_12_1": patient.base_form.test_2.acuite_od_ch_box_2_12_1,
                "acuite_od_ch_box_1_7_1": patient.base_form.test_2.acuite_od_ch_box_1_7_1,
                "acuite_og_ch_box_2_12_2" : patient.base_form.test_2.acuite_og_ch_box_2_12_2,
                "acuite_og_ch_box_1_7_2" : patient.base_form.test_2.acuite_og_ch_box_1_7_2,
                "acuite_bino_ch_box_2_12_3" : patient.base_form.test_2.acuite_bino_ch_box_2_12_3,
                "acuite_bino_tab_ch_3" : patient.base_form.test_2.acuite_bino_tab_ch_3,
                "acuite_bino_tab_ch_4" : patient.base_form.test_2.acuite_bino_tab_ch_4,
                "duochrome_2" : patient.base_form.test_2.duochrome_2,
                "remark_3" : patient.base_form.test_2.remark_3,
                "remark_4" : patient.base_form.test_2.remark_4,
                "phories_tab_ch_3" : patient.base_form.test_2.phories_tab_ch_3,
                "phories_tab_ch_4" : patient.base_form.test_2.phories_tab_ch_4,
                "vision_colores_row_3" : patient.base_form.test_2.vision_colores_row_3,
                "vision_colores_row_4" : patient.base_form.test_2.vision_colores_row_4
                # Include other fields from Test2 as needed
            }

        # Get Test3 data
        if patient.base_form.test_3:
            patient_data["base_form"]["test_3"] = {
                "id": patient.base_form.test_3.id,
                "remark_5": patient.base_form.test_3.remark_5,
                "remark_6": patient.base_form.test_3.remark_6,
                "interpretation": patient.base_form.test_3.interpretation
            }

    # Get CorrectionForm data if it exists
    if patient.correction_form:
        patient_data["correction_form"] = {
            "id": patient.correction_form.id,
            "test_1": None,
            "test_2": None,
            "test_3": None
        }

        # Get Test1 data for CorrectionForm
        if patient.correction_form.test_1:
            patient_data["correction_form"]["test_1"] = {
                "id": patient.correction_form.test_1.id,
                "acuite_od_ch_box_2_12_1": patient.correction_form.test_1.acuite_od_ch_box_2_12_1,
                "acuite_od_ch_box_1_7_1": patient.correction_form.test_1.acuite_od_ch_box_1_7_1,
                "acuite_og_ch_box_2_12_2" : patient.correction_form.test_1.acuite_og_ch_box_2_12_2,
                "acuite_og_ch_box_1_7_2" : patient.correction_form.test_1.acuite_og_ch_box_1_7_2,
                "acuite_bino_ch_box_2_12_3" : patient.correction_form.test_1.acuite_bino_ch_box_2_12_3,
                "acuite_bino_tab_ch_1" : patient.correction_form.test_1.acuite_bino_tab_ch_1,
                "acuite_bino_tab_ch_2" : patient.correction_form.test_1.acuite_bino_tab_ch_2,
                "duochrome_1" : patient.correction_form.test_1.duochrome_1,
                "remark_1" : patient.correction_form.test_1.remark_1,
                "remark_2" : patient.correction_form.test_1.remark_2,
                "phories_tab_ch_1" : patient.correction_form.test_1.phories_tab_ch_1,
                "phories_tab_ch_2" : patient.correction_form.test_1.phories_tab_ch_2,
                "vision_colores_row_1" : patient.correction_form.test_1.vision_colores_row_1,
                "vision_colores_row_2" : patient.correction_form.test_1.vision_colores_row_2
                # Include other fields from Test1 as needed
            }

        # Get Test2 data for CorrectionForm
        if patient.correction_form.test_2:
            patient_data["correction_form"]["test_2"] = {
                "id": patient.correction_form.test_2.id,
                "acuite_od_ch_box_2_12_1": patient.correction_form.test_2.acuite_od_ch_box_2_12_1,
                "acuite_od_ch_box_1_7_1": patient.correction_form.test_2.acuite_od_ch_box_1_7_1,
                "acuite_og_ch_box_2_12_2" : patient.correction_form.test_2.acuite_og_ch_box_2_12_2,
                "acuite_og_ch_box_1_7_2" : patient.correction_form.test_2.acuite_og_ch_box_1_7_2,
                "acuite_bino_ch_box_2_12_3" : patient.correction_form.test_2.acuite_bino_ch_box_2_12_3,
                "acuite_bino_tab_ch_3" : patient.correction_form.test_2.acuite_bino_tab_ch_3,
                "acuite_bino_tab_ch_4" : patient.correction_form.test_2.acuite_bino_tab_ch_4,
                "duochrome_2" : patient.correction_form.test_2.duochrome_2,
                "remark_3" : patient.correction_form.test_2.remark_3,
                "remark_4" : patient.correction_form.test_2.remark_4,
                "phories_tab_ch_3" : patient.correction_form.test_2.phories_tab_ch_3,
                "phories_tab_ch_4" : patient.correction_form.test_2.phories_tab_ch_4,
                "vision_colores_row_3" : patient.correction_form.test_2.vision_colores_row_3,
                "vision_colores_row_4" : patient.correction_form.test_2.vision_colores_row_4
                # Include other fields from Test2 as needed
            }

        # Get Test3 data for CorrectionForm
        if patient.correction_form.test_3:
            patient_data["correction_form"]["test_3"] = {
                "id": patient.correction_form.test_3.id,
                "remark_5": patient.correction_form.test_3.remark_5,
                "remark_6": patient.correction_form.test_3.remark_6,
                "interpretation": patient.correction_form.test_3.interpretation
                # Include other fields from Test3 as needed
            }
    #==================================================================================    
    patient_info = {
        "id": str(patient.id),
        "first_and_last_name": patient.first_and_last_name,
        "age": patient.age,
        "job": patient.job,
        "medical_antidotes": patient.medical_antidotes,
        "created_at": patient.created_at,
        "correction": patient.correction
    }
        # Initialize test data
        
    
    # Create patient_cord dictionary
    patient_cord = {
            "test_3": patient_data["base_form"]["test_3"],
            "test_2": patient_data["base_form"]["test_2"],
            "test_1": patient_data["base_form"]["test_1"],
            "patient_info": patient_info
        }
    try:
    
        logger.info("Received request to process PDF")
        
        input_pdf_path = os.path.join(UPLOAD_DIR, "original w2.pdf")
        output_pdf_path = os.path.join(UPLOAD_DIR,"output.pdf")
        
        
        if not os.path.exists(input_pdf_path):
            raise HTTPException(status_code=400, detail="Input PDF file not found")
        
        logger.debug(f"Input PDF path: {input_pdf_path}")
        logger.debug(f"Output PDF path: {output_pdf_path}")
        
        logger.debug(f"Patient cord data: {patient_cord }")
        
        logger.debug(f"patient_info data: {patient_info }")

        # Your logic for generating the PDF
        logger.info("Generating PDF")
        
        drow(input_pdf_path, output_pdf_path, patient_cord )

        logger.info("PDF generated successfully")
        
        # Return the file

        return FileResponse(output_pdf_path, media_type='application/pdf', filename="output.pdf")
    except Exception as e:
        logger.exception(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    #return patient_data    
#==========================================================================================================================
#=============================== Search patient TABLE ==================================================================
#========================================================================================================================

@app.get("/search_patient", response_model=List[PatientTabResponse])
async def search_patient(query: str, db: Session = Depends(get_db)):
    stmt = select(Patient).where(
        (Patient.id == query) | (Patient.first_and_last_name.ilike(f'%{query}%'))
    )

    results = db.execute(stmt).scalars().all()
    #============================= = == = = = = == = 
    logger.debug(f"Patient results data: {results}")
    #=============================== = = = = == = = = = == = = = =       
    if not results:
        patients = []
        return patients

    # Prepare the results with form_type
    patients = []
    
    for patient in results:
 
        form_type = "base form"
        if patient.correction == "yes":
            form_type = "correction"
        
        patients.append({
            "id": patient.id,
            "first_and_last_name": patient.first_and_last_name,
            "created_at": patient.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "form_type": form_type
        })
    
    return patients
#===================================================================================================================

#===================================================================================================================
@app.get("/modify_patient")
async def modify_patient(id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient
#===================================================================================================================

#=======================================================================================================================
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
#=========================================================================================================================
class PatientResponse(BaseModel):
    id: int
    first_and_last_name: str
    age: int
    job: str
    medical_antidotes: str
#=============================================================================================================
@app.delete("/remove_patient")
async def remove_patient(id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    db.delete(patient)
    db.commit()
    return {"message": "Patient removed successfully"}
#==========================================================================================================   
@app.get("/api/patients/{patient_id}", response_model=PatientResponse)
async def get_patient(patient_id: int):
    db: Session = SessionLocal()
    try:
        patient = db.query(Patient).filter(Patient.id == patient_id).first()
        if patient is None:
            raise HTTPException(status_code=404, detail="Patient not found")
        return patient
    finally:
        db.close()
#=======================================================================================================================
@app.get('/userprofile')
def addpatient_info(req: Request):
    return templates.TemplateResponse("userprofile.html", {"request": req})
#====================================================================================================================
@app.get("/patients/last10")
def get_last_10_patients(db: Session = Depends(get_db)):
    # Query to get the last 10 patients ordered by creation date
    patients = db.query(Patient).order_by(Patient.created_at.desc()).limit(10).all()
    
    # Prepare the response with form_type
    patient_list = []
    for patient in patients:
        form_type = "base form"
        if patient.correction == "yes":
            form_type = "correction"

        patient_list.append({
            "id": patient.id,
            "first_and_last_name": patient.first_and_last_name,
            "created_at": patient.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "form_type": form_type
        })

    return patient_list

#========================================================================================================================
#======================================== add pationt  INFO ===================================================================
@app.get('/addpatient_info')
def addpatient_info(req: Request):
    return templates.TemplateResponse("/addpatient_info.html", {"request": req })
#========================================================================================================================
#======================================== add pationt TEST 1 ===================================================================

@app.get('/addpatient_test1')
def addpatient_test1(req: Request):
    return templates.TemplateResponse("addpatient_test1.html", {"request": req})
#========================================================================================================================
#======================================== add pationt TEST 2===================================================================

@app.get('/addpatient_test2')
def addpatient_test2(req: Request):
    return templates.TemplateResponse("addpatient_test2.html", {"request": req})
#========================================================================================================================
#======================================== add pationt  TEST 3============================================================

@app.get('/addpatient_test3')
def addpatient_test3(req: Request):
    return templates.TemplateResponse("addpatient_test3.html", {"request": req})
#========================================================================================================================
#======================================== add pationt PDF ===================================================================

@app.get('/addpatient_pdf')
def addpatient_pdf(req: Request):
    return templates.TemplateResponse("addpatient_pdf.html", {"request": req})
#=====================================================================================================================
@app.get('/view_pdf')
def addpatient_pdf(req: Request):
    return templates.TemplateResponse("view_pdf.html", {"request": req})
#======================================================================================================================
@app.get("/last-id/")
async def get_last_id(db: Session = Depends(get_db)):
    last_patient = db.query(Patient).order_by(Patient.id.desc()).first()
    if last_patient:
        return {"last_id": last_patient.id}
    else:
        raise HTTPException(status_code=404, detail="No records found")
    
#=========================================================================================================================

UPLOAD_DIR = "pdf_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/pdf_files", StaticFiles(directory=UPLOAD_DIR), name="pdf_files")

#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#=========================== process pdf ================================================================================

@app.post("/process-pdf/")
async def process_pdf(data: PatientData ):
    
    try:
    
        logger.info("Received request to process PDF")

        input_pdf_path = os.path.join(UPLOAD_DIR, "original w2.pdf")
        output_pdf_path = os.path.join(UPLOAD_DIR,"output.pdf")
        
        
        if not os.path.exists(input_pdf_path):
            raise HTTPException(status_code=400, detail="Input PDF file not found")
        
        logger.debug(f"Input PDF path: {input_pdf_path}")
        logger.debug(f"Output PDF path: {output_pdf_path}")

        test_1 = {
        "acuite_od_ch_box_2_12_1": data.test_1.acuite_od_ch_box_2_12_1,
        "acuite_od_ch_box_1_7_1": data.test_1.acuite_od_ch_box_1_7_1,
        "acuite_og_ch_box_2_12_2": data.test_1.acuite_og_ch_box_2_12_2,
        "acuite_og_ch_box_1_7_2": data.test_1.acuite_og_ch_box_1_7_2,
        "acuite_bino_ch_box_2_12_3":data.test_1.acuite_bino_ch_box_2_12_3,
        "acuite_bino_tab_ch_1": data.test_1.acuite_bino_tab_ch_1,
        "acuite_bino_tab_ch_2": data.test_1.acuite_bino_tab_ch_2,
        "duochrome_1":data.test_1.duochrome_1,
        "remark_1" : data.test_1.remark_1,
        "remark_2" : data.test_1.remark_2,
        "phories_tab_ch_1": data.test_1.phories_tab_ch_1,
        "phories_tab_ch_2": data.test_1.phories_tab_ch_2,
        "vision_colores_row_1": data.test_1.vision_colores_row_1,
        "vision_colores_row_2": data.test_1.vision_colores_row_2
        }
        test_2 = {
        "acuite_od_ch_box_2_12_1": data.test_2.acuite_od_ch_box_2_12_1,
        "acuite_od_ch_box_1_7_1": data.test_2.acuite_od_ch_box_1_7_1,
        "acuite_og_ch_box_2_12_2": data.test_2.acuite_og_ch_box_2_12_2,
        "acuite_og_ch_box_1_7_2": data.test_2.acuite_og_ch_box_1_7_2,
        "acuite_bino_ch_box_2_12_3": data.test_2.acuite_bino_ch_box_2_12_3,
        "acuite_bino_tab_ch_3": data.test_2.acuite_bino_tab_ch_3,
        "acuite_bino_tab_ch_4": data.test_2.acuite_bino_tab_ch_4,
        "duochrome_2":data.test_2.duochrome_2,
        "remark_3" : data.test_2.remark_3,
        "remark_4" : data.test_2.remark_4,
        "phories_tab_ch_3": data.test_2.phories_tab_ch_3,
        "phories_tab_ch_4": data.test_2.phories_tab_ch_4,
        "vision_colores_row_3": data.test_2.vision_colores_row_3,
        "vision_colores_row_4": data.test_2.vision_colores_row_4
        }         
        test_3 = {
        "remark_5" : data.test_3.remark_5,
        "remark_6" : data.test_3.remark_6,
        "interpretation": data.test_3.interpretation
        }        
        patient_info = {
            "created_at": data.patient_info.created_at,
            "id": str(data.patient_info.id),
            "first_and_last_name": data.patient_info.first_and_last_name,
            "age": data.patient_info.age,
            "job": data.patient_info.job,
            "medical_antidotes": data.patient_info.medical_antidotes,
            "correction": data.patient_info.correction
        }        
        pationt_cord = {"test_3" : test_3,
                        "test_2" : test_2 ,
                        "test_1" : test_1 ,
                        "patient_info":patient_info
                        }


        # Your logic for generating the PDF
        logger.info("Generating PDF")
        
        drow(input_pdf_path, output_pdf_path, pationt_cord )

        logger.info("PDF generated successfully")
        
        # Return the file
        return FileResponse(output_pdf_path, media_type='application/pdf', filename="output.pdf")
    except Exception as e:
        logger.exception(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
#==================================================================================================================
#==================================================================================================================
#============================== PDF FILE ==========================================================================
#==================================================================================================================   
# Directory where uploaded files will be stored
UPLOAD_DIR = "pdf_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)
#==================================================================================================================
@app.post("/files/")
async def upload_pdf(file: UploadFile = File(...)):
    # Save the uploaded file to a temporary location
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    return {"filename": file.filename}
#=================================================================================================================
#=================================================================================================================
@app.post("/generate_pdf/")
async def generate_pdf(patient_data: PatientData):
    input_pdf_path = "pdf_files/original_w2.pdf"
    output_pdf_path = "pdf_files/output.pdf"

    drow(input_pdf_path, output_pdf_path, patient_data.dict())

    return {"pdf_url": "/pdf_files/output.pdf"}
#===================================================================================================================
@app.get("/pdf_files/output.pdf") 
async def get_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error": "File not found"}
#==================================================================================================================
#==================================================================================================================

#==================================================================================================================
#============================== DATABASE  PART ====================================================================
#==================================================================================================================
@app.get("/pdf_files/output.pdf")
async def get_pdf(file_name: str): 
    file_path = f"pdf_files/{file_name}"
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error": "File not found"}
#========================================================================================================================
@app.get("/pdf_files/output.pdf")
async def get_output_pdf():
    output_pdf_path = os.path.join(UPLOAD_DIR, "output.pdf")
    if not os.path.exists(output_pdf_path):
        raise HTTPException(status_code=404, detail="Output PDF file not found")
    
    return FileResponse(output_pdf_path, media_type='application/pdf')
#===========================================================================================================================
#============================= SUBMIT DATA =========================================================================
#===========================================================================================================================
Base.metadata.create_all(bind=engine)
#=========================================================================================================================
@app.post("/submit_patient_data")
async def submit_patient_data(data: PatientCreate, db: Session = Depends(get_db)):
    
    try:
        
        # Create the patient
        patient = Patient(
            created_at = data.created_at,
            first_and_last_name=data.first_and_last_name,
            age=data.age,
            job=data.job,
            medical_antidotes=data.medical_antidotes,
            correction = data.correction
        )
        
        db.add(patient) 
        db.commit() 
        db.refresh(patient)

        # Create the base form
        base_form = BaseForm(patient_id=patient.id)
        db.add(base_form)   
        db.commit()
        db.refresh(base_form)

        # Create the tests for the base form
        test1 = Test1(base_form_id=base_form.id, **data.base_form.test_1.dict())
        test2 = Test2(base_form_id=base_form.id, **data.base_form.test_2.dict())
        test3 = Test3(base_form_id=base_form.id, **data.base_form.test_3.dict())

        db.add(test1)
        db.add(test2)
        db.add(test3)
        
        # Check if there is a correction form and create it if present
        if data.correction == "yes":
            correction_form = CorrectionForm(patient_id=patient.id)
            db.add(correction_form)
            db.commit()
            db.refresh(correction_form)

            correction_test1 = Test1(correction_form_id=correction_form.id, **data.correction_form.test_1.dict())
            correction_test2 = Test2(correction_form_id=correction_form.id, **data.correction_form.test_2.dict())
            correction_test3 = Test3(correction_form_id=correction_form.id, **data.correction_form.test_3.dict())

            db.add(correction_test1)
            db.add(correction_test2)
            db.add(correction_test3)

        db.commit()
        return {"message": "Data submitted successfully!", "patient_id": patient.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

#============================================================ m m m m m m m m m m m m m m m m m m m m m m
#============================================================ m m m m m m m m m m m m m m m m m m m m m m
#============================================================ m m m m m m m m m m m m m m m m m m m m m m

