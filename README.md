# Voice Shopping Assistant — Flask backend + React frontend

This repository implements the Voice Command Shopping Assistant: voice input, NLP parsing, multilingual support, smart suggestions, shopping-list management, voice-activated search, and a minimalist UI.

## Structure
- backend/: Flask API and SQLite models
- frontend/: React frontend using browser SpeechRecognition API

## Run (development)
1. Start backend:
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    python app.py

2. Start frontend:
    cd frontend
    npm install
    npm run start

Open http://localhost:3000 (frontend) which talks to http://localhost:5000 (backend).
