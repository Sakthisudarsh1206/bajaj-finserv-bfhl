import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions (same as Vercel implementation)
const isDigits = s => typeof s === 'string' && /^[+-]?\d+$/.test(s);
const isLetters = s => typeof s === 'string' && /^[A-Za-z]+$/.test(s);

// BFHL endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body || {};

    // Validate input
    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        message: 'Invalid input: data must be an array',
      });
    }

    // Environment variables with defaults
    const FULL_NAME = process.env.FULL_NAME || 'sakthisudarsen j';
    const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || '12062004';
    const EMAIL = process.env.EMAIL || 'SAKTHISUDHARSEN04@GMAIL.COM';
    const ROLL_NUMBER = process.env.ROLL_NUMBER || '22BAI1122';

    // Generate user_id
    const user_id = `${FULL_NAME.trim().toLowerCase().replace(/\s+/g, '_')}_${DOB_DDMMYYYY}`;

    // Initialize response arrays
    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    const letterChars = [];
    let sum = 0;

    // Process each token
    data.forEach(token => {
      const tokenStr = String(token);

      if (isDigits(tokenStr)) {
        const num = parseInt(tokenStr, 10);
        sum += num;

        if (Math.abs(num) % 2 === 0) {
          even_numbers.push(tokenStr);
        } else {
          odd_numbers.push(tokenStr);
        }
      } else if (isLetters(tokenStr)) {
        alphabets.push(tokenStr.toUpperCase());
        // Collect individual letters for concat_string
        for (let i = 0; i < tokenStr.length; i++) {
          letterChars.push(tokenStr[i]);
        }
      } else {
        special_characters.push(tokenStr);
      }
    });

    // Build concat_string: reverse letters, then apply alternating caps
    const reversedChars = letterChars.reverse();
    const concat_string = reversedChars
      .map((char, index) => {
        const lowerChar = char.toLowerCase();
        return index % 2 === 0 ? lowerChar.toUpperCase() : lowerChar;
      })
      .join('');

    // Build response
    const response = {
      is_success: true,
      user_id,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({
      is_success: false,
      message: `Processing error: ${error.message}`,
    });
  }
});

// Handle all other methods for /bfhl
app.all('/bfhl', (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are supported',
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
  console.log(`📡 BFHL API available at http://localhost:${PORT}/bfhl`);
  console.log(`💓 Health check at http://localhost:${PORT}/health`);
});

export default app;
