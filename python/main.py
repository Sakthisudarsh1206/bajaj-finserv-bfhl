from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from typing import List, Dict, Any
import os
import re

app = FastAPI(title="BFHL API", description="Bajaj Finserv BFHL API - Python FastAPI Implementation")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class BFHLRequest(BaseModel):
    data: List[str]

# Response models
class BFHLResponse(BaseModel):
    is_success: bool
    user_id: str
    email: str
    roll_number: str
    odd_numbers: List[str]
    even_numbers: List[str]
    alphabets: List[str]
    special_characters: List[str]
    sum: str
    concat_string: str

class ErrorResponse(BaseModel):
    is_success: bool
    message: str

# Helper functions
def is_digits(s: str) -> bool:
    """Check if string is a valid integer (including negative)"""
    return bool(re.match(r'^[+-]?\d+$', s))

def is_letters(s: str) -> bool:
    """Check if string contains only letters"""
    return bool(re.match(r'^[A-Za-z]+$', s))

@app.post("/bfhl", response_model=BFHLResponse)
async def process_bfhl(request: BFHLRequest):
    """
    Process BFHL request according to Bajaj Finserv specification
    """
    try:
        data = request.data
        
        # Environment variables with defaults
        FULL_NAME = os.getenv("FULL_NAME", "sakthisudarsen j")
        DOB_DDMMYYYY = os.getenv("DOB_DDMMYYYY", "12062004")
        EMAIL = os.getenv("EMAIL", "SAKTHISUDHARSEN04@GMAIL.COM")
        ROLL_NUMBER = os.getenv("ROLL_NUMBER", "22BAI1122")
        
        # Generate user_id
        user_id = f"{FULL_NAME.strip().lower().replace(' ', '_')}_{DOB_DDMMYYYY}"
        
        # Initialize response arrays
        odd_numbers = []
        even_numbers = []
        alphabets = []
        special_characters = []
        letter_chars = []
        total_sum = 0
        
        # Process each token
        for token in data:
            token_str = str(token)
            
            if is_digits(token_str):
                num = int(token_str)
                total_sum += num
                
                if abs(num) % 2 == 0:
                    even_numbers.append(token_str)
                else:
                    odd_numbers.append(token_str)
            elif is_letters(token_str):
                alphabets.append(token_str.upper())
                # Collect individual letters for concat_string
                letter_chars.extend(list(token_str))
            else:
                special_characters.append(token_str)
        
        # Build concat_string: reverse letters, then apply alternating caps
        reversed_chars = list(reversed(letter_chars))
        concat_string = ""
        for i, char in enumerate(reversed_chars):
            if i % 2 == 0:
                concat_string += char.upper()
            else:
                concat_string += char.lower()
        
        # Build response
        response = BFHLResponse(
            is_success=True,
            user_id=user_id,
            email=EMAIL,
            roll_number=ROLL_NUMBER,
            odd_numbers=odd_numbers,
            even_numbers=even_numbers,
            alphabets=alphabets,
            special_characters=special_characters,
            sum=str(total_sum),
            concat_string=concat_string
        )
        
        return response
        
    except ValidationError as e:
        return ErrorResponse(
            is_success=False,
            message=f"Validation error: {str(e)}"
        )
    except Exception as e:
        return ErrorResponse(
            is_success=False,
            message=f"Processing error: {str(e)}"
        )

@app.api_route("/bfhl", methods=["GET", "PUT", "DELETE", "PATCH"])
async def method_not_allowed():
    """Handle non-POST requests to /bfhl"""
    raise HTTPException(
        status_code=405,
        detail={
            "error": "Method not allowed",
            "message": "Only POST requests are supported"
        }
    )

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "OK", "message": "BFHL API is running"}

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Bajaj Finserv BFHL API - Python FastAPI Implementation",
        "version": "1.0.0",
        "endpoints": {
            "POST /bfhl": "Main BFHL processing endpoint",
            "GET /health": "Health check endpoint",
            "GET /docs": "API documentation"
        }
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
