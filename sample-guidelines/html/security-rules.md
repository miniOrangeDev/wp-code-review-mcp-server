# Security Validation Rules

## SECURITY_RULES

### Critical Security Issues
- **Pattern**: `eval(` **Message**: eval() usage detected - Remote Code Execution risk **Level**: CRITICAL
- **Pattern**: `exec(` **Message**: Command execution function detected - Command Injection risk **Level**: CRITICAL
- **Pattern**: `system(` **Message**: Command execution function detected - Command Injection risk **Level**: CRITICAL
- **Pattern**: `shell_exec(` **Message**: Command execution function detected - Command Injection risk **Level**: CRITICAL

### SQL Injection Prevention
- **Pattern**: `SELECT` **Message**: Direct SQL query detected. Use $wpdb->prepare() for prepared statements **Level**: HIGH
- **Pattern**: `INSERT INTO` **Message**: Direct SQL query detected. Use $wpdb->prepare() for prepared statements **Level**: HIGH
- **Pattern**: `UPDATE` **Message**: Direct SQL query detected. Use $wpdb->prepare() for prepared statements **Level**: HIGH
- **Pattern**: `DELETE FROM` **Message**: Direct SQL query detected. Use $wpdb->prepare() for prepared statements **Level**: HIGH

### Cross-Site Scripting (XSS) Prevention
- **Pattern**: `echo $_` **Message**: Potential XSS vulnerability - escape output data with esc_html() **Level**: HIGH
- **Pattern**: `print $_` **Message**: Potential XSS vulnerability - escape output data with esc_html() **Level**: HIGH
- **Pattern**: `<script` **Message**: Direct script tag usage detected - validate if this is intentional **Level**: MEDIUM

### Input Validation
- **Pattern**: `$_GET[` **Message**: Unsanitized GET data usage detected - use sanitize_text_field() **Level**: MEDIUM
- **Pattern**: `$_POST[` **Message**: Unsanitized POST data usage detected - use sanitize_text_field() **Level**: MEDIUM
- **Pattern**: `$_REQUEST[` **Message**: Unsanitized REQUEST data usage detected - use sanitize_text_field() **Level**: MEDIUM
- **Pattern**: `$_COOKIE[` **Message**: Unsanitized COOKIE data usage detected - validate and sanitize **Level**: MEDIUM

### File Security
- **Pattern**: `file_get_contents($_` **Message**: File inclusion with user input - Local/Remote File Inclusion risk **Level**: HIGH
- **Pattern**: `include $_` **Message**: Dynamic file inclusion detected - validate file paths **Level**: HIGH
- **Pattern**: `require $_` **Message**: Dynamic file inclusion detected - validate file paths **Level**: HIGH
- **Pattern**: `fopen($_` **Message**: File operation with user input - validate file paths **Level**: MEDIUM

### WordPress Security Best Practices
- **Pattern**: `current_user_can` **Message**: User capability check found - ensure proper implementation **Level**: INFO
- **Pattern**: `wp_nonce` **Message**: Nonce usage detected - good security practice **Level**: INFO

### Dangerous Functions
- **Pattern**: `unserialize($_` **Message**: Unsafe deserialization with user input - potential object injection **Level**: HIGH
- **Pattern**: `base64_decode($_` **Message**: Base64 decode with user input - validate decoded content **Level**: MEDIUM
- **Pattern**: `preg_replace.*e.*` **Message**: preg_replace with /e modifier is deprecated and dangerous **Level**: HIGH

---

*These security rules help identify common vulnerabilities in WordPress code.* 