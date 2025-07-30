# WordPress Plugin Development Rules

## General Code Style & Formatting
- Follow WordPress PHP Coding Standards strictly
- Use tabs (not spaces) for indentation
- Use single quotes for strings unless interpolation is needed
- Maximum line length: 100 characters (recommended, not enforced)
- Use Yoda conditions for comparisons (e.g., if ( true === $value ))
- Always use braces for control structures, even single-line statements

## Naming Conventions
- Use lowercase letters with hyphens for plugin folder and main file (e.g., my-awesome-plugin)
- Use snake_case for function names (e.g., my_plugin_init)
- Prefix all functions, classes, and global variables with unique plugin prefix
- Use PascalCase for class names (e.g., My_Plugin_Main_Class)
- Constants should be UPPERCASE with underscores (e.g., MY_PLUGIN_VERSION)

## Plugin Structure & Architecture
- Main plugin file must include standard header comment with Plugin Name, Version, Author, etc.
- Organize code into logical directories: /includes, /admin, /public, /assets
- Use class-based architecture for better organization
- Implement proper hooks system using add_action() and add_filter()
- Never use PHP short tags; always use <?php
- Always check if function/class exists before declaring (e.g., if ( ! function_exists() ))

## Security Best Practices
- Always validate and sanitize user input
- Use nonces for form submissions and AJAX requests
- Escape all output data appropriately (esc_html, esc_attr, esc_url, wp_kses)
- Check user capabilities before performing sensitive operations
- Use prepared statements for all database queries
- Never trust $_GET, $_POST, $_REQUEST directly

## WordPress Integration
- Use WordPress native functions instead of PHP alternatives when available
- Load text domains for internationalization (i18n)
- Register and enqueue scripts/styles properly using wp_enqueue_script/style
- Use WordPress database class ($wpdb) for custom queries
- Follow WordPress plugin API patterns
- Use register_activation_hook and register_deactivation_hook properly

## Documentation Standards
- Use PHPDoc blocks for all functions, classes, and methods
- Include @since, @param, @return tags appropriately
- Add file header DocBlocks with description and package info
- Document hooks with @action and @filter tags
- Write inline comments for complex logic

## Performance & Optimization
- Load resources only when needed (conditional loading)
- Minimize database queries and use object caching when possible
- Avoid loading entire plugin on every page load
- Use transients API for temporary data storage
- Defer non-critical JavaScript loading

## Error Handling
- Use wp_die() for fatal errors
- Implement proper error logging with error_log() or WP_DEBUG_LOG
- Check for WP_Error objects and handle them appropriately
- Never expose sensitive information in error messages

## Compatibility
- Maintain backward compatibility when updating
- Specify minimum WordPress version and PHP version requirements
- Test with WordPress Debug mode enabled (WP_DEBUG, WP_DEBUG_LOG)
- Use core WordPress APIs instead of deprecated functions

## File Organization
- Separate admin and public-facing functionality
- Keep template files in /templates or /views directory
- Store assets in /assets/css, /assets/js, /assets/images
- Use autoloading for classes when appropriate
