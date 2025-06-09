# Code Validation Rules

## VALIDATION_RULES

### Class Name Prefix Rules
- **Pattern**: `mo_` **Message**: Class prefix 'mo_' is too short. Use at least 4-5 characters for better namespace protection. **Level**: HIGH **Language**: php
- **Pattern**: `js_` **Message**: Class prefix 'js_' is too short. Use at least 4-5 characters for better namespace protection. **Level**: HIGH **Language**: php
- **Pattern**: `wp_` **Message**: Prefix 'wp_' is reserved for WordPress core. Use a custom prefix instead. **Level**: CRITICAL **Language**: php

### Deprecated Function Rules  
- **Pattern**: `mysql_` **Message**: Deprecated MySQL functions detected. Use MySQLi or PDO instead. **Level**: HIGH **Language**: php
- **Pattern**: `create_function` **Message**: create_function() is deprecated. Use anonymous functions instead. **Level**: HIGH **Language**: php
- **Pattern**: `ereg` **Message**: POSIX regex functions are deprecated. Use PCRE functions instead. **Level**: MEDIUM **Language**: php

### WordPress Best Practices
- **Pattern**: `$_GET` **Message**: Direct superglobal access detected. Consider using sanitize_text_field() or similar. **Level**: MEDIUM **Language**: php
- **Pattern**: `$_POST` **Message**: Direct superglobal access detected. Consider using sanitize_text_field() or similar. **Level**: MEDIUM **Language**: php
- **Pattern**: `document.getElementById` **Message**: Consider using jQuery $() instead of direct DOM methods for WordPress compatibility. **Level**: INFO **Language**: javascript

### Code Quality Rules
- **Pattern**: `TODO` **Message**: TODO comment found. Consider creating a ticket or fixing immediately. **Level**: INFO **Language**: all
- **Pattern**: `FIXME` **Message**: FIXME comment found. This should be addressed before deployment. **Level**: MEDIUM **Language**: all
- **Pattern**: `console.log` **Message**: Console.log() found. Remove debug statements before production. **Level**: LOW **Language**: javascript

### WordPress Function Usage
- **Pattern**: `file_get_contents` **Message**: Consider using wp_remote_get() for external requests instead of file_get_contents(). **Level**: INFO **Language**: php
- **Pattern**: `curl_` **Message**: Consider using wp_remote_get()/wp_remote_post() instead of direct cURL functions. **Level**: INFO **Language**: php

---

*These rules are automatically applied during code validation.* 