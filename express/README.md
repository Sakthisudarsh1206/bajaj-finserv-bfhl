# Express.js Implementation

Alternative Express.js server implementation of the BFHL API.

## Quick Start

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start server**:

   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

3. **Test the API**:
   ```bash
   curl -X POST http://localhost:8000/bfhl \
     -H "Content-Type: application/json" \
     -d '{"data":["a","1","334","4","R","$"]}'
   ```

## Features

- Same BFHL logic as Vercel implementation
- CORS enabled
- Health check endpoint at `/health`
- Hot reload in development

## Environment Variables

Same as main implementation:

- `FULL_NAME`
- `DOB_DDMMYYYY`
- `EMAIL`
- `ROLL_NUMBER`
- `PORT` (default: 8000)
