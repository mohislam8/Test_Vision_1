from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy import DateTime

Base = declarative_base()

# models.py

from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base

class Patient(Base):
    __tablename__ = "patients"

    created_at = Column(DateTime, default=datetime.utcnow)  # Add the creation timestamp
    id = Column(Integer, primary_key=True, index=True)
    first_and_last_name = Column(String, index=True)
    age = Column(String)
    job = Column(String)
    medical_antidotes = Column(String)
    correction = Column(String)
    

    base_form = relationship("BaseForm", uselist=False, back_populates="patient")
    correction_form = relationship("CorrectionForm", uselist=False, back_populates="patient")

class BaseForm(Base):
    __tablename__ = "base_forms"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    patient = relationship("Patient", back_populates="base_form")

    test_1 = relationship("Test1", uselist=False, back_populates="base_form")
    test_2 = relationship("Test2", uselist=False, back_populates="base_form")
    test_3 = relationship("Test3", uselist=False, back_populates="base_form")

class CorrectionForm(Base):
    __tablename__ = "correction_forms"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    patient = relationship("Patient", back_populates="correction_form")

    test_1 = relationship("Test1", uselist=False, back_populates="correction_form")
    test_2 = relationship("Test2", uselist=False, back_populates="correction_form")
    test_3 = relationship("Test3", uselist=False, back_populates="correction_form")

class Test1(Base):
    __tablename__ = "test1"

    id = Column(Integer, primary_key=True, index=True)
    base_form_id = Column(Integer, ForeignKey("base_forms.id"))
    correction_form_id = Column(Integer, ForeignKey("correction_forms.id"))

    acuite_od_ch_box_2_12_1 = Column(String)
    acuite_od_ch_box_1_7_1 = Column(String)
    acuite_og_ch_box_2_12_2 = Column(String)
    acuite_og_ch_box_1_7_2 = Column(String)
    acuite_bino_ch_box_2_12_3 = Column(String)
    acuite_bino_tab_ch_1 = Column(JSON)
    acuite_bino_tab_ch_2 = Column(JSON)
    duochrome_1 = Column(JSON)
    remark_1 = Column(String)
    remark_2 = Column(String)
    phories_tab_ch_1 = Column(JSON)
    phories_tab_ch_2 = Column(JSON)
    vision_colores_row_1 = Column(JSON)
    vision_colores_row_2 = Column(JSON)

    base_form = relationship("BaseForm", back_populates="test_1")
    correction_form = relationship("CorrectionForm", back_populates="test_1")

class Test2(Base):
    __tablename__ = "test2"

    id = Column(Integer, primary_key=True, index=True)
    base_form_id = Column(Integer, ForeignKey("base_forms.id"))
    correction_form_id = Column(Integer, ForeignKey("correction_forms.id"))

    acuite_od_ch_box_2_12_1 = Column(String)
    acuite_od_ch_box_1_7_1 = Column(String)
    acuite_og_ch_box_2_12_2 = Column(String)
    acuite_og_ch_box_1_7_2 = Column(String)
    acuite_bino_ch_box_2_12_3 = Column(String)
    acuite_bino_tab_ch_3 = Column(JSON)
    acuite_bino_tab_ch_4 = Column(JSON)
    duochrome_2 = Column(JSON)
    remark_3 = Column(String)
    remark_4 = Column(String)
    phories_tab_ch_3 = Column(JSON)
    phories_tab_ch_4 = Column(JSON)
    vision_colores_row_3 = Column(JSON)
    vision_colores_row_4 = Column(JSON)

    base_form = relationship("BaseForm", back_populates="test_2")
    correction_form = relationship("CorrectionForm", back_populates="test_2")

class Test3(Base):
    __tablename__ = "test3"

    id = Column(Integer, primary_key=True, index=True)
    base_form_id = Column(Integer, ForeignKey("base_forms.id"))
    correction_form_id = Column(Integer, ForeignKey("correction_forms.id"))

    remark_5 = Column(String)
    remark_6 = Column(String)
    interpretation = Column(String)

    base_form = relationship("BaseForm", back_populates="test_3")
    correction_form = relationship("CorrectionForm", back_populates="test_3")
