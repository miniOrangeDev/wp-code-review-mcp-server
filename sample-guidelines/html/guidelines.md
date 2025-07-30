### 📘 WordPress Plugin Development Guidelines

These guidelines define the foundational standards for plugin development including file structure, naming, dependency handling, and WordPress compatibility. These complement the security and validation rules used in Cursor MCP.

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

---

## 📄 Documentation Standards

* Include a complete and properly formatted `readme.txt`.
* Ensure the `Stable tag` in the readme matches the plugin version declared in the main plugin file.
* Provide usage instructions, plugin purpose, and clearly list any external services used.

