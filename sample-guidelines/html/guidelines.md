# WordPress Development Guidelines

## Overview
These are the development guidelines for our internal WordPress projects. They cover coding standards, security practices, and performance optimization.

## Core Principles
1. **Security First**: Always prioritize security in development
2. **WordPress Standards**: Follow WordPress coding standards strictly
3. **Performance**: Write efficient, optimized code
4. **Maintainability**: Write clean, readable, and well-documented code

## Code Style Guidelines

### PHP Standards
- Use tabs for indentation, not spaces
- Follow WordPress PHP coding standards
- Use meaningful variable and function names
- Document all functions with proper DocBlocks

### JavaScript Standards
- Use jQuery for DOM manipulation in WordPress context
- Follow WordPress JavaScript coding standards
- Use wp_enqueue_script() for all JS files

### CSS Standards
- Follow WordPress CSS coding standards
- Use mobile-first approach
- Use wp_enqueue_style() for all CSS files

## Class Naming Convention
**IMPORTANT**: All custom classes must use prefixes that are not too small and should be unique to avoid conflicts.

❌ **Bad Examples:**
- `a_` (too short)
- `wp_` (reserved for WordPress core)
- `my_` (too short and too common)
- `ui_` (too short)

✅ **Good Examples:**
- `mycompany_` (company-specific prefix)
- `projectname_` (project-specific prefix)
- `customtheme_` (descriptive prefix)
- `plugin_` (descriptive prefix)

This prevents naming conflicts and improves code maintainability.

## Security Guidelines
- Always sanitize user input
- Escape output data
- Use WordPress nonces for form submissions
- Validate file uploads
- Use prepared statements for database queries

## Performance Guidelines
- Minimize database queries
- Use caching mechanisms
- Optimize images and assets
- Implement lazy loading where appropriate

## Testing Requirements
- Write unit tests for critical functions
- Test across multiple WordPress versions
- Validate on different browsers and devices

---

*Last updated: 2024*
*Version: 2.0.0* 