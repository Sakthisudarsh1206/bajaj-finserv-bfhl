# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Considerations

### Input Validation

- All request bodies are validated before processing
- Only arrays are accepted for the `data` field
- Individual tokens are coerced to strings safely

### Data Protection

- **No sensitive data logging**: Request bodies are never logged to prevent PII exposure
- **No persistent storage**: All data processing happens in-memory
- **Stateless processing**: No user data is retained between requests

### Rate Limiting

While the API doesn't implement custom rate limiting, consider these recommendations for production:

- **Vercel Pro**: Includes DDoS protection and rate limiting
- **API Gateway**: Consider adding CloudFlare or similar for additional protection
- **Custom middleware**: Implement request rate limiting for high-traffic scenarios

### CORS Policy

- Currently configured for public access (`*`)
- For production applications, consider restricting to specific domains
- Update `vercel.json` and `api/bfhl.js` CORS headers as needed

### Environment Variables

- Sensitive configuration should use Vercel's environment variable system
- Never commit `.env` files to version control
- Use `.env.example` as a template

### Dependency Security

- Regular dependency updates via `npm audit`
- Automated security scanning via GitHub Dependabot
- Minimal dependency footprint to reduce attack surface

### Error Handling

- Errors are handled gracefully without exposing internal details
- Stack traces are not exposed in production responses
- Generic error messages for security-sensitive failures

## Reporting Security Issues

### Please DO NOT report security issues publicly

Instead, email security concerns to: SAKTHISUDHARSEN04@GMAIL.COM

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested mitigation (if any)

### Response Timeline

- **Initial response**: Within 48 hours
- **Status updates**: Every 72 hours until resolved
- **Resolution target**: 7-14 days for critical issues

## Security Best Practices for Deployment

### Vercel Deployment

1. **Environment Variables**: Use Vercel's environment variable dashboard
2. **Domain Security**: Consider custom domains with HTTPS enforcement
3. **Function Configuration**: Review timeout and memory settings
4. **Access Logs**: Monitor function invocation patterns

### Monitoring Recommendations

- Enable Vercel Analytics for traffic monitoring
- Set up alerts for unusual traffic patterns
- Monitor function execution times and error rates
- Regular security audits of dependencies

### Infrastructure Security

- **HTTPS Only**: Vercel enforces HTTPS automatically
- **Function Isolation**: Each request runs in an isolated environment
- **Automatic Scaling**: Built-in protection against traffic spikes
- **Geographic Distribution**: CDN-level DDoS protection

## Compliance Notes

### Data Processing

- This API processes but does not store user data
- No cookies or tracking mechanisms are implemented
- All processing happens server-side without client-side storage

### Privacy Considerations

- Input data is processed transiently and not persisted
- No analytics or tracking of request contents
- User identity information comes from environment variables only

---

For general questions about security practices, please see the main [README](README.md) or open a GitHub issue.
