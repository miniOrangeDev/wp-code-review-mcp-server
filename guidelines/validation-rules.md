# Validation Rules for WordPress Plugin Development

## Code Structure Validation
- All PHP files must start with <?php
- No closing PHP tags (?>) at end of files
- Proper indentation with tabs
- Maximum 100 characters per line
- No trailing whitespace

## Naming Validation
- Functions: snake_case with plugin prefix
- Classes: PascalCase with plugin prefix
- Constants: UPPERCASE with underscores and prefix
- Variables: lowercase with underscores
- Hooks: prefix_action_name or prefix_filter_name

## Security Validation
- All user inputs must be validated
- SQL queries must use prepared statements
- Output must be escaped appropriately
- Nonces required for forms and AJAX
- Capability checks before actions

## WordPress Standards Validation
- Use WordPress functions over PHP alternatives
- Proper hook implementation
- Correct enqueue methods for assets
- Database queries through $wpdb
- Proper error handling with WP_Error

## Documentation Validation
- PHPDoc for all public functions/classes
- Proper @param, @return, @since tags
- File headers with description
- Inline comments for complex logic
