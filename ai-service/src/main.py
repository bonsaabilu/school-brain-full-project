from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI(title="School Brain AI Service")

# Load the saved model pipeline
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "student_risk_model.joblib")
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Failed to load model: {e}")
    model = None

# Define the expected input schema (matching your dataset features)
class StudentData(BaseModel):
    school: str = 'GP'
    sex: str = 'F'
    age: int = 15
    address: str = 'U'
    famsize: str = 'GT3'
    Pstatus: str = 'T'
    Medu: int = 4
    Fedu: int = 4
    Mjob: str = 'at_home'
    Fjob: str = 'teacher'
    reason: str = 'course'
    guardian: str = 'mother'
    traveltime: int = 2
    studytime: int = 2
    failures: int = 0
    schoolsup: str = 'yes'
    famsup: str = 'no'
    paid: str = 'no'
    activities: str = 'no'
    nursery: str = 'yes'
    higher: str = 'yes'
    internet: str = 'yes'
    romantic: str = 'no'
    famrel: int = 4
    freetime: int = 3
    goout: int = 2
    Dalc: int = 1
    Walc: int = 2
    health: int = 3
    absences: int = 0

@app.post("/predict")
def predict_risk(data: StudentData):
    if not model:
        raise HTTPException(status_code=500, detail="Model is not loaded")
    
    # Convert input to DataFrame for the preprocessor
    df = pd.DataFrame([data.dict()])
    
    # Get the probability of the positive class (At_Risk = 1)
    probabilities = model.predict_proba(df)
    risk_prob = float(probabilities[0][1])
    
    # For HIGH PRECISION, we use a higher threshold (e.g., 0.65)
    HIGH_PRECISION_THRESHOLD = 0.65 
    
    needs_support = bool(risk_prob >= HIGH_PRECISION_THRESHOLD)
    
    return {
        "risk_probability": risk_prob,
        "needs_support": needs_support,
        "threshold_used": HIGH_PRECISION_THRESHOLD
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
