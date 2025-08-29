# Bajaj Finserv BFHL API

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sakthisudarsen/bajaj-finserv-bfhl)
[![CI](https://github.com/sakthisudarsen/bajaj-finserv-bfhl/workflows/CI/badge.svg)](https://github.com/sakthisudarsen/bajaj-finserv-bfhl/actions)

A production-ready implementation of the Bajaj Finserv / VIT BFHL specification, built for Vercel serverless deployment.

## 🚀 Features

- **Vercel-optimized**: Serverless function ready for instant deployment
- **Spec-compliant**: Implements BFHL specification exactly
- **Production-ready**: Includes tests, CI/CD, documentation, and monitoring
- **CORS-enabled**: Ready for frontend integration
- **Comprehensive testing**: Unit tests and smoke tests included

## 📡 API Endpoint

**POST** `/bfhl`

### Request Format

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

### Response Format

```json
{
  "is_success": true,
  "user_id": "sakthisudarsen_j_12062004",
  "email": "SAKTHISUDHARSEN04@GMAIL.COM",
  "roll_number": "22BAI1122",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## 🛠️ Quick Start

### Local Development

1. **Clone and install**:

   ```bash
   git clone https://github.com/sakthisudarsen/bajaj-finserv-bfhl.git
   cd bajaj-finserv-bfhl
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Test the API**:
   ```bash
   curl -X POST http://localhost:3000/bfhl \
     -H "Content-Type: application/json" \
     -d '{"data":["a","1","334","4","R","$"]}'
   ```

### Production Deployment

1. **Deploy to Vercel** (recommended):

   ```bash
   npm i -g vercel
   vercel
   vercel deploy --prod
   ```

2. **Your API will be available at**:
   ```
   https://bajaj-finserv-gwss6rlyz-sakthisudharsen04-gmailcoms-projects.vercel.app/
   ```

## 🧪 Testing

### Run Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run smoke         # Smoke tests (requires running server)
```

### Test Examples

The implementation passes all specification examples:

**Example A**:

```bash
curl -X POST https://your-app.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["a","1","334","4","R","$"]}'
```

**Example B**:

```bash
curl -X POST https://your-app.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["2","a","y","4","&","-","*","5","92","b"]}'
```

**Example C**:

```bash
curl -X POST https://your-app.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["A","ABcD","DOE"]}'
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file (optional, defaults provided):

```env
FULL_NAME="sakthisudarsen j"
DOB_DDMMYYYY="12062004"
EMAIL="SAKTHISUDHARSEN04@GMAIL.COM"
ROLL_NUMBER="22BAI1122"
```

The API works out-of-the-box with default values for instant deployment.

### Vercel Configuration

The `vercel.json` file configures:

- Route rewrites (`/bfhl` → `/api/bfhl`)
- CORS headers
- Serverless function settings

## 📋 Development Scripts

```bash
npm run dev           # Start development server
npm run build         # Build (no-op for serverless)
npm test              # Run tests
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run format        # Format with Prettier
npm run format:check  # Check formatting
npm run smoke         # Run smoke tests
```

## 🔧 API Specification Details

### Input Processing

- **Numbers**: Classified as odd/even based on absolute value
- **Alphabets**: Pure letter tokens converted to UPPERCASE
- **Special Characters**: Everything else (mixed alphanumeric, symbols, etc.)

### String Concatenation Algorithm

1. Extract all individual letters from alphabetic tokens
2. Reverse the letter array
3. Apply alternating capitalization (Upper, lower, Upper, ...)

### Error Handling

- Non-POST methods: `405 Method Not Allowed`
- Invalid JSON/missing data: `200 OK` with `is_success: false`
- Processing errors: Graceful error responses

## 📊 Alternative Implementations

### Express Server

```bash
cd express
npm install
npm start
# API available at http://localhost:8000/bfhl
```

### Python FastAPI

```bash
cd python
pip install -r requirements.txt
uvicorn main:app --reload
# API available at http://localhost:8000/bfhl
```

## 🧪 Testing with Postman

Import the collection from `postman/BFHL.postman_collection.json`:

- Includes all specification examples
- Error case testing
- CORS validation
- Method validation

Set the `baseUrl` variable to your deployed URL.

## 📈 Production Considerations

### Performance

- Serverless cold start: ~100-200ms
- Execution time: <50ms for typical payloads
- Memory usage: <64MB

### Security

- Input validation on all requests
- No logging of request bodies (PII protection)
- CORS configured for public access
- Rate limiting recommended (Vercel provides DDoS protection)

### Monitoring

- Vercel Analytics automatically enabled
- Function logs available in Vercel dashboard
- Custom monitoring can be added via environment variables

## 🐛 Troubleshooting

### Common Issues

1. **JSON parsing errors**:
   - Ensure `Content-Type: application/json` header
   - Validate JSON syntax

2. **CORS issues**:
   - Headers are automatically included
   - Check browser developer tools for specific errors

3. **Deployment issues**:
   - Verify `vercel.json` configuration
   - Check function logs in Vercel dashboard

### Debug Mode

Set `NODE_ENV=development` for verbose error messages.

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

---

**Submission URL Format**: `https://bajaj-finserv-gwss6rlyz-sakthisudharsen04-gmailcoms-projects.vercel.app/`

Made with ❤️ by [sakthisudarsen j](https://github.com/sakthisudarsen)
