import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression

def train_and_save_model():
    print("Loading data...")
    df = pd.read_csv("data/raw/student-por.csv", sep=",")
    
    # Create target column 'At_Risk' where G3 < 10
    df['At_Risk'] = (df['G3'] < 10).astype(int)
    
    # Drop grades columns to prevent data leakage (since we are predicting G3 essentially)
    X = df.drop(columns=['G1', 'G2', 'G3', 'At_Risk'])
    y = df['At_Risk']
    
    numerical_features = [
        'age', 'Medu', 'Fedu', 'traveltime', 'studytime', 
        'failures', 'famrel', 'freetime', 'goout', 'Dalc', 
        'Walc', 'health', 'absences'
    ]
    
    categorical_features = [
        'school', 'sex', 'address', 'famsize', 'Pstatus', 
        'Mjob', 'Fjob', 'reason', 'guardian', 'schoolsup', 
        'famsup', 'paid', 'activities', 'nursery', 'higher', 
        'internet', 'romantic'
    ]
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ]
    )
    
    # Model using class_weight='balanced' based on the GridSearchCV
    # and tuned C=0.01 based on notebook output
    model = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', LogisticRegression(class_weight='balanced', C=0.01, random_state=42, max_iter=1000))
    ])
    
    print("Training model...")
    model.fit(X, y)
    
    print("Saving model...")
    os.makedirs('models', exist_ok=True)
    joblib.dump(model, 'models/student_risk_model.joblib')
    print("Model saved to models/student_risk_model.joblib successfully!")

if __name__ == "__main__":
    train_and_save_model()
