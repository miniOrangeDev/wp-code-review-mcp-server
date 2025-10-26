# Security Rules for WordPress Plugin Development

## Input Validation & Sanitization
- Always sanitize user input with appropriate functions
- Validate data types (int, string, array)
- Use whitelist approach for allowed values
- Never trust client-side validation

## SQL Injection Prevention
- Use $wpdb->prepare() for all queries
- Avoid direct SQL concatenation
- Use placeholders for variables
- Validate table/column names

## XSS Prevention
- Escape output with esc_html(), esc_attr(), etc.
- Use wp_kses() for rich content
- Validate URLs with esc_url()
- Sanitize HTML with allowed tags

## CSRF Protection
- Implement nonces for all forms
- Check nonces on form submission
- Use wp_nonce_field() and wp_verify_nonce()
- AJAX requests must verify nonces

## Access Control
- Check user capabilities with current_user_can()
- Validate user permissions before actions
- Use roles and capabilities properly
- Avoid direct role checks

## File Upload Security
- Validate file types and extensions
- Check file size limits
- Store uploads in secure directories
- Rename uploaded files
- Scan for malicious content

## Data Exposure Prevention
- Never output sensitive information
- Use proper error messages
- Avoid debug information in production
- Sanitize database data before display

## Secure Coding Practices
- Avoid eval() and similar functions
- Use secure random functions
- Implement proper session handling
- Validate all external API calls
