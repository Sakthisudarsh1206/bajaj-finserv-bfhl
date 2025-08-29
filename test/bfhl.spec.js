/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';

// Mock Vercel-like request and response objects for direct testing
const mockRequest = (method, body) => ({
  method,
  body,
});

const mockResponse = () => {
  let statusCode = 200;
  const headers = {};
  let responseBody = null;

  const mockRes = {
    status: code => {
      statusCode = code;
      return mockRes;
    },
    setHeader: (key, value) => {
      headers[key] = value;
      return mockRes;
    },
    json: data => {
      headers['Content-Type'] = 'application/json';
      responseBody = data;
    },
    end: data => {
      if (data && !responseBody) {
        responseBody = data;
      }
    },
    getStatus: () => statusCode,
    getHeaders: () => headers,
    getBody: () => responseBody,
  };

  return mockRes;
};

// Import the handler function
import handler from '../api/bfhl.js';

describe('BFHL API', () => {
  describe('Helper Functions', () => {
    it('should correctly identify digits', () => {
      const isDigits = s => typeof s === 'string' && /^[+-]?\d+$/.test(s);
      expect(isDigits('123')).toBe(true);
      expect(isDigits('-45')).toBe(true);
      expect(isDigits('+67')).toBe(true);
      expect(isDigits('1.23')).toBe(false);
      expect(isDigits('abc')).toBe(false);
      expect(isDigits('')).toBe(false);
    });

    it('should correctly identify letters', () => {
      const isLetters = s => typeof s === 'string' && /^[A-Za-z]+$/.test(s);
      expect(isLetters('abc')).toBe(true);
      expect(isLetters('ABC')).toBe(true);
      expect(isLetters('AbC')).toBe(true);
      expect(isLetters('ab1')).toBe(false);
      expect(isLetters('a-b')).toBe(false);
      expect(isLetters('')).toBe(false);
    });
  });

  describe('HTTP Methods', () => {
    it('should handle OPTIONS request for CORS', async () => {
      const req = mockRequest('OPTIONS');
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(204);
    });

    it('should return helpful info for GET requests', async () => {
      const req = mockRequest('GET');
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      const body = res.getBody();
      expect(body.operation_code).toBe(1);
      expect(body.info).toBeDefined();
      expect(body.info.message).toContain('BFHL API is working');
    });

    it('should return 405 for other methods', async () => {
      const req = mockRequest('DELETE');
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(405);
      expect(res.getBody()).toEqual({
        error: 'Method not allowed',
        message: 'Only POST and GET requests are supported',
      });
    });
  });

  describe('Input Validation', () => {
    it('should return error for missing data', async () => {
      const req = mockRequest('POST', {});
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getBody().is_success).toBe(false);
      expect(res.getBody().message).toContain('data must be an array');
    });

    it('should return error for non-array data', async () => {
      const req = mockRequest('POST', { data: 'not-an-array' });
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getBody().is_success).toBe(false);
      expect(res.getBody().message).toContain('data must be an array');
    });
  });

  describe('Spec Examples', () => {
    it('should handle Example A correctly', async () => {
      const req = mockRequest('POST', { data: ['a', '1', '334', '4', 'R', '$'] });
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getBody()).toEqual({
        is_success: true,
        user_id: 'sakthisudarsen_j_12062004',
        email: 'SAKTHISUDHARSEN04@GMAIL.COM',
        roll_number: '22BAI1122',
        odd_numbers: ['1'],
        even_numbers: ['334', '4'],
        alphabets: ['A', 'R'],
        special_characters: ['$'],
        sum: '339',
        concat_string: 'Ra',
      });
    });

    it('should handle Example B correctly', async () => {
      const req = mockRequest('POST', {
        data: ['2', 'a', 'y', '4', '&', '-', '*', '5', '92', 'b'],
      });
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getBody()).toEqual({
        is_success: true,
        user_id: 'sakthisudarsen_j_12062004',
        email: 'SAKTHISUDHARSEN04@GMAIL.COM',
        roll_number: '22BAI1122',
        odd_numbers: ['5'],
        even_numbers: ['2', '4', '92'],
        alphabets: ['A', 'Y', 'B'],
        special_characters: ['&', '-', '*'],
        sum: '103',
        concat_string: 'ByA',
      });
    });

    it('should handle Example C correctly', async () => {
      const req = mockRequest('POST', { data: ['A', 'ABcD', 'DOE'] });
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getBody()).toEqual({
        is_success: true,
        user_id: 'sakthisudarsen_j_12062004',
        email: 'SAKTHISUDHARSEN04@GMAIL.COM',
        roll_number: '22BAI1122',
        odd_numbers: [],
        even_numbers: [],
        alphabets: ['A', 'ABCD', 'DOE'],
        special_characters: [],
        sum: '0',
        concat_string: 'EoDdCbAa',
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle negative numbers correctly', async () => {
      const req = mockRequest('POST', { data: ['-2', '-3', '0'] });
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getBody().even_numbers).toEqual(['-2', '0']);
      expect(res.getBody().odd_numbers).toEqual(['-3']);
      expect(res.getBody().sum).toBe('-5');
    });

    it('should handle mixed alphanumeric as special characters', async () => {
      const req = mockRequest('POST', { data: ['ab1', '2cd', '!@#'] });
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getBody().special_characters).toEqual(['ab1', '2cd', '!@#']);
      expect(res.getBody().alphabets).toEqual([]);
      expect(res.getBody().odd_numbers).toEqual([]);
      expect(res.getBody().even_numbers).toEqual([]);
    });

    it('should handle empty array', async () => {
      const req = mockRequest('POST', { data: [] });
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getBody().is_success).toBe(true);
      expect(res.getBody().sum).toBe('0');
      expect(res.getBody().concat_string).toBe('');
    });

    it('should handle numbers with leading zeros', async () => {
      const req = mockRequest('POST', { data: ['007', '008'] });
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getBody().odd_numbers).toEqual(['007']);
      expect(res.getBody().even_numbers).toEqual(['008']);
      expect(res.getBody().sum).toBe('15');
    });
  });

  describe('CORS Headers', () => {
    it('should include CORS headers in successful response', async () => {
      const req = mockRequest('POST', { data: ['1'] });
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getHeaders()['Access-Control-Allow-Origin']).toBe('*');
    });

    it('should include CORS headers in error response', async () => {
      const req = mockRequest('POST', { data: 'invalid' });
      const res = mockResponse();

      await handler(req, res);

      expect(res.getStatus()).toBe(200);
      expect(res.getHeaders()['Access-Control-Allow-Origin']).toBe('*');
    });
  });
});
