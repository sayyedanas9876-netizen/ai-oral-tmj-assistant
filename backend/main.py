import os
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dotenv import load_dotenv
from google import genai


# ==========================================
# ENVIRONMENT
# ==========================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY not found. Please check your .env file."
    )


# ==========================================
# GEMINI CLIENT
# ==========================================

client = genai.Client(
    api_key=GEMINI_API_KEY
)


# ==========================================
# AI RESPONSE FUNCTION
# ==========================================

def generate_ai_response(prompt):

    models = [
    "gemini-3.5-flash-lite",
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash"
]
    for model in models:

        print(f"Trying Gemini model: {model}")

        for attempt in range(2):

            try:

                response = client.models.generate_content(
                    model=model,
                    contents=prompt
                )

                print(f"Success with model: {model}")

                return response.text

            except Exception as error:

                print(
                    f"{model} - attempt {attempt + 1} failed:"
                )

                print(error)

                if attempt < 1:
                    time.sleep(3)

        print(f"Moving to next model...")


    return (
        "AI service is temporarily unavailable. "
        "Please try again after a few moments."
    )


# ==========================================
# FASTAPI
# ==========================================

app = FastAPI(
    title="AI Oral & TMJ Assistant",
    description="Educational AI assistant for oral and TMJ health",
    version="1.0.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# HOME
# ==========================================

@app.get("/")
def home():

    return {
        "message": "AI Oral & TMJ Assistant Backend is running"
    }


# ==========================================
# HEALTH
# ==========================================

@app.get("/api/health")
def health():

    return {
        "status": "healthy",
        "message": "Backend is working"
    }


# ==========================================
# ASSESSMENT MODEL
# ==========================================

class AssessmentData(BaseModel):

    problem: str
    symptoms: str
    duration: str


# ==========================================
# ASSESSMENT
# ==========================================

@app.post("/api/assessment")
def assessment(data: AssessmentData):

    prompt = f"""
You are an educational oral and TMJ health assistant.

The user has provided:

Main concern:
{data.problem}

Symptoms:
{data.symptoms}

Duration:
{data.duration}

Give simple educational guidance.

Include:

1. What this type of concern can commonly relate to
2. Common possible causes
3. General self-care and oral-health guidance
4. When the user should consider seeing a dentist
5. Urgent warning signs if relevant

IMPORTANT:

- Do NOT diagnose the user.
- Do NOT say the user definitely has a disease.
- Do NOT prescribe medicines or medication doses.
- Use words such as "may", "can", or "sometimes".
- Keep the explanation simple.
- Persistent or concerning symptoms should be evaluated
  by a qualified dental or healthcare professional.
- If severe swelling, difficulty breathing or swallowing,
  uncontrolled bleeding, significant facial injury,
  or rapidly worsening symptoms are present,
  recommend urgent medical care.

End with a short disclaimer that this is educational
information and not a medical diagnosis.
"""

    ai_response = generate_ai_response(prompt)

    return {
        "ai_response": ai_response
    }


# ==========================================
# CHAT MODEL
# ==========================================

class ChatData(BaseModel):

    question: str


# ==========================================
# CHAT
# ==========================================

@app.post("/api/chat")
def chat(data: ChatData):

    prompt = f"""
You are an AI educational assistant focused on
oral health and TMJ/jaw health.

User question:

{data.question}

Answer the question in simple and clear language.

Guidelines:

- Provide general educational information.
- Do NOT diagnose the user.
- Do NOT claim certainty about a medical condition.
- Do NOT prescribe medicines.
- Explain possible common causes when appropriate.
- Give general oral-health or jaw-health guidance.
- Tell the user when they should consider seeing a dentist
  or qualified healthcare professional.
- Mention urgent care when serious warning signs are relevant.

Urgent warning signs can include:
severe swelling, difficulty breathing or swallowing,
uncontrolled bleeding, significant facial injury,
or rapidly worsening symptoms.

End with a short reminder that the response is
educational information and not a medical diagnosis.
"""

    ai_response = generate_ai_response(prompt)

    return {
        "answer": ai_response
    }