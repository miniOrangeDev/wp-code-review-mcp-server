### 🛡️ WordPress Plugin Security Rules

---

#### 🔐 CSRF (Cross-Site Request Forgery)

* **Condition**: Missing `check_admin_referer()` or `check_ajax_referer()`.
* **Variants**:

  * Using `wp_verify_nonce()` without `current_user_can()`.
  * Nonce check is present but not validated correctly.
* **Fix**:

  * Always pair nonce validation with capability checks.
  * Use `check_admin_referer()` and `current_user_can()` together.

---

#### 🔐 SQL Injection

* **Condition**: Direct use of unsanitized user input in database queries.
* **Examples**: `SELECT * FROM table WHERE id = '$_GET[id]'`.
* **Fix**:

  * Use `$wpdb->prepare()`.
  * Sanitize and validate numeric parameters before database use.

---

#### 🔐 Blind SQL Injection

* **Condition**: Vulnerability with no visible error but inference through:

  * Response delays (SLEEP/BENCHMARK)
  * Content changes or redirect behaviors
  * HTTP status codes (200 vs 500)
* **Fix**:

  * Use parameterized queries
  * Validate inputs (e.g., ensure ID is numeric)
  * Suppress internal error output

---

#### 🔐 Cross-Site Scripting (Reflected & Stored)

* **Reflected**:

  * Input like `<script>alert(1)</script>` reflected without output escaping.
* **Stored**:

  * Unsanitized attributes in shortcodes or post meta saved to DB.
* **Fix**:

  * Sanitize using `sanitize_text_field()` or `wp_kses_post()`.
  * Escape output with `esc_html()`, `esc_attr()`, etc.

---

#### 🔐 Authentication Bypass (Multiple Variants)

* **Variant A – Static Key Trust**

  * Uses hardcoded/static encryption keys.
  * Accepts encrypted data without validating user identity.
* **Variant B – Missing OAuth `state` Validation**

  * No validation of OAuth `state` parameter.
  * Can result in session hijack.
* **Variant C – OTP Flow Bypass**

  * Token validated only in JavaScript, not in PHP.
* **Fix**:

  * Use dynamic encryption keys
  * Enforce state validation in OAuth
  * Revalidate all tokens server-side

---

#### 🔐 Arbitrary File Deletion

* **Condition**:

  * Uses `unlink()` or `delete()` on user-supplied path.
  * No `realpath()` or directory constraint.
* **Fix**:

  * Validate file path with `realpath()`.
  * Restrict to whitelisted or plugin-safe directories.

---

#### 🔐 File Upload Vulnerability

* **Condition**:

  * No file type/MIME validation
  * Allows upload of PHP/JS files renamed as images
* **Fix**:

  * Enforce allowed file extensions (e.g., `.jpg`, `.pdf`)
  * Validate MIME type on server side
  * Block double extensions like `image.php.jpg`

---

#### 🔐 Remote File Inclusion (RFI)

* **Condition**: Includes a remote file via user input.
* **Fix**:

  * Do not allow remote includes
  * Validate file paths strictly

---

#### 🔐 Local File Inclusion (LFI)

* **Condition**: Includes local file from user input.
* **Example**: `include($_GET['template'])`
* **Fix**:

  * Use `realpath()` and restrict to plugin directory
  * Disallow `..` path traversal

---

#### 🔐 Broken Access Control

* **Condition**:

  * Sensitive operations exposed via public endpoints
  * Missing capability, nonce, or user ID validation
* **Fix**:

  * Always use `current_user_can()`
  * Verify nonce and user ID context before action

---

#### 🔐 Privilege Escalation

* **Condition**:

  * Default role set to 'administrator'
  * Allows self-assigned roles during registration
* **Fix**:

  * Never use hardcoded roles
  * Sanitize and restrict user role assignment server-side

---

#### 🔐 Open Redirect

* **Condition**:

  * Redirects to URLs using `$_GET['redirect']` unchecked
* **Fix**:

  * Ensure destination is internal or validated against a whitelist

---

#### 🔐 LDAP Injection / Passback

* **LDAP Injection**:

  * Constructs LDAP filters with unescaped input
* **Passback**:

  * Admins can change LDAP host, allowing password theft
* **Fix**:

  * Escape all LDAP input
  * Restrict admin options for LDAP config

---

#### 🔐 IP Spoofing

* **Condition**:

  * Trusts `REMOTE_ADDR` or headers without validation
* **Fix**:

  * Use header validation logic to detect spoofed IPs
  * Avoid trusting IP headers blindly

---

#### 🔐 SSRF (Blind Server-Side Request Forgery)

* **Condition**:

  * User input is used to make server-side requests
* **Fix**:

  * Use allowlist of hostnames/IPs
  * Reject localhost/internal IPs

---

#### 🔐 Sensitive Information Exposure

* **Condition**:

  * Logs or debug messages visible to unauthenticated users
* **Fix**:

  * Restrict access to logs
  * Mask errors in production with generic messages

---

#### 🔐 Content Restriction Bypass

* **Condition**:

  * Protected posts appear via REST API or WP Search
* **Fix**:

  * Ensure content is filtered by capability before query output

---

#### 🔐 Missing Capability Checks

* **Condition**:

  * Allows critical operations without `current_user_can()`
* **Fix**:

  * Apply strict capability checks on all save/delete/update actions

---

#### 🔐 Direct File Access

* **Condition**:

  * No `ABSPATH` guard in plugin entry points
* **Fix**:

  * Add `if ( ! defined( 'ABSPATH' ) ) exit;` at top of executable files

---

#### 🔐 Generic Error Leaks (Impactful)

* **Condition**:

  * Stack trace, file path, or PHP error leaks on screen
* **Fix**:

  * Display generic errors for users
  * Log detailed errors securely for admins

---

#### 🔐 Log Exposure

* **Condition**:

  * Authentication or debug logs publicly accessible
* **Fix**:

  * Move logs to protected directory
  * Deny access with `.htaccess` or server config



#### 🔐 Remote Code Execution (RCE) / Deserialization
- **Condition**: User input passed into `unserialize()`, creating object injection pathways.
- **Fix**: Avoid `unserialize()`. Use JSON decoding or whitelist/gadget-free object structures.

---

#### 🔐 Insecure Direct Object Reference (IDOR)
- **Condition**: Raw identifiers (`user_id`, `post_id`) used in API or AJAX without rights check.
- **Fix**: Validate user permissions (`current_user_can()`) before accessing these resources

---


#### 🔐 Type Juggling / Loose Comparison
- **Condition**: Code like `if ( $_GET['admin'] == true )` where type is unchecked.
- **Fix**: Use strict comparison operators, cast parameter types strictly 

---
	
#### 🔐 Outdated Vulnerable Libraries  
- **Condition**: Use of known insecure library versions.  
- **Fix**: Use up-to-date library versions and monitor vulnerability advisories.

---

## 🧱 Code Style & Structure

* Use full PHP tags (`<?php`), never short tags (`<?`).
* Functions, classes, and constants should have a unique prefix to avoid naming collisions.
* Avoid echoing raw values; always escape output using `esc_html()`, `esc_attr()`, etc.
* Prefer `wp_send_json()` instead of `echo json_encode()` for AJAX responses.
* Do not include core files like `wp-load.php`, `wp-config.php`, or `wp-blog-header.php` directly.
* Use `__FILE__` and functions like `plugin_dir_path()` and `plugins_url()` instead of hardcoded paths.
* Avoid processing the entire `$_POST`, `$_GET`, or `$_REQUEST` arrays. Only access expected keys.

---

## 📦 File Access & Execution

* Include the line `if ( ! defined( 'ABSPATH' ) ) exit;` at the top of all PHP files to prevent direct access.
* Use WordPress hooks and filters instead of executing logic on file load.

---

## 🔃 Dependency Management

* Use WordPress-bundled libraries like jQuery, PHPMailer, and SimplePie when available.
* Host all assets (JS, CSS) locally within the plugin unless a CDN is justified and explicitly allowed.
* Do not include the entire library if only a single file is needed.
* Prefer stable, released versions of third-party libraries. Avoid beta or dev versions unless justified.

---

## 🧪 Script and Style Enqueuing

* Always enqueue scripts and styles using `wp_enqueue_script()` and `wp_enqueue_style()`.
* Use proper context: `admin_enqueue_scripts` for admin, `wp_enqueue_scripts` for frontend.
* Use `wp_add_inline_script()` to insert inline JS tied to a registered script handle.
* Use filters added in WP 5.7+ to control script attributes like `async`, `defer`, and `nonce`.

---

## 🛑 Plugin Behavior Restrictions

* Do not store or write data inside the plugin directory.
* Do not require users to manually edit plugin files to configure settings.
* Never include encrypted, obfuscated, or unreadable PHP code (e.g., base64\_decode, eval()).
* Avoid creating fake reviews or support forum threads (sockpuppeting is prohibited).
* Do not use SEO-driven usernames like "wordpress", "plugin", or "seo" in developer accounts.
