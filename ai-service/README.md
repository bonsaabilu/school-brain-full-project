pip install -r requirements.txt
cd /home/fenet/Documents/school-brain/ai-service
source .venv/bin/activate
python src/main.py


cd /home/fenet/Documents/school-brain/ai-service
source .venv/bin/activate
uvicorn src.main:app --host 0.0.0.0 --port 8001 --reload
