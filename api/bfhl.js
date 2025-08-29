/**
 * Bajaj Finserv BFHL API - Vercel Serverless Function
 * POST /bfhl endpoint implementation
 */

// Helper functions
const isDigits = s => typeof s === 'string' && /^[+-]?\d+$/.test(s);
const isLetters = s => typeof s === 'string' && /^[A-Za-z]+$/.test(s);

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export default function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res
      .status(204)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type')
      .end();
    return;
  }

  // Only allow POST as specified in question paper
  if (req.method !== 'POST') {
    Object.keys(corsHeaders).forEach(key => res.setHeader(key, corsHeaders[key]));
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are supported',
    });
  }

  try {
    const { data } = req.body || {};

    // Validate input
    if (!Array.isArray(data)) {
      Object.keys(corsHeaders).forEach(key => res.setHeader(key, corsHeaders[key]));
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

    Object.keys(corsHeaders).forEach(key => res.setHeader(key, corsHeaders[key]));
    res.status(200).json(response);
  } catch (error) {
    Object.keys(corsHeaders).forEach(key => res.setHeader(key, corsHeaders[key]));
    res.status(200).json({
      is_success: false,
      message: `Processing error: ${error.message}`,
    });
  }
}
