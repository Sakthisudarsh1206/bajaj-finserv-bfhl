# Python FastAPI Implementation

Alternative Python FastAPI implementation of the BFHL API.

## Quick Start

1. **Create virtual environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Start server**:

   ```bash
   uvicorn main:app --reload
   # or
   python main.py
   ```

4. **Test the API**:
   ```bash
   curl -X POST http://localhost:8000/bfhl \
     -H "Content-Type: application/json" \
     -d '{"data":["a","1","334","4","R","$"]}'
   ```

## Features

- FastAPI with automatic OpenAPI documentation
- Type validation with Pydantic
- CORS enabled
- Health check endpoint at `/health`
- Interactive docs at `/docs`

## Environment Variables

Same as main implementation:

- `FULL_NAME`
- `DOB_DDMMYYYY`
- `EMAIL`
- `ROLL_NUMBER`
- `PORT` (default: 8000)

## API Documentation

Visit `/docs` for interactive Swagger documentation when the server is running.
