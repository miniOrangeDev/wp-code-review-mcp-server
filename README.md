# WordPress Code Review MCP Server v2.0

A lightweight, configurable MCP (Model Context Protocol) server for development teams. Fetches coding guidelines, security rules, and validation patterns from external sources or URL where you have hosted your custom guidelines.

<a href="https://glama.ai/mcp/servers/@miniOrangeDev/wp-code-review-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@miniOrangeDev/wp-code-review-mcp-server/badge" alt="WordPress Code Review Server MCP server" />
</a>

## 🚀 **Key Features**

- ✅ **No hardcoded rules** - Fetch guidelines from any URL
- ✅ **Dynamic configuration** - Specify source via environment variables
- ✅ **Custom validation** - Add your own coding standards and security rules
- ✅ **Lightweight** - External guidelines, minimal codebase

## 📋 **Available Tools**

- `get_guidelines` - Fetch development guidelines by category
- `validate_code` - Validate code against configured standards  
- `security_check` - Security vulnerability scanning

## 📋 **Prerequisites**
- Node.js installed (v18+)

## 🛠 **Installation & Setup**

### **Step 1: Clone Repository**
```bash
git clone https://github.com/miniOrangeDev/wp-code-review-mcp-server.git
cd wp-code-review-mcp
```

### **Step 2: Install Dependencies & Build**
```bash
npm install
npm run build
```

### **Step 3: Host Your Guidelines**
Host the files from `sample-guidelines/html/` on your web server and configure your base URL, for example: `https://yourdomain.com/guidelines/`

The MCP server will fetch:
- `https://yourdomain.com/guidelines/guidelines.md`
- `https://yourdomain.com/guidelines/validation-rules.md` 
- `https://yourdomain.com/guidelines/security-rules.md`

### **Step 4: Configure Cursor**

Add to your Cursor settings (`Ctrl+Shift+P` → "Preferences: Open User Settings (JSON)"):

```json
{
  "mcpServers": {
    "wp-code-review-mcp": {
      "command": "node",
      "args": ["/path/to/wp-code-review-mcp-server/build/index.js"],
      "env": {
        "GUIDELINES_URL": "https://yourdomain.com/guidelines"
      }
    }
  }
}
```

**Replace `/path/to/wp-code-review-mcp-server` with your actual path** (e.g., `/home/wp-code-review-mcp-server`)

> **Why the path?** Unlike published npm packages, this is a local MCP server. The path tells Cursor exactly where to find your built server file.

If you don't see MCP server connected, restart Cursor and the MCP server will be available.

### **Guidelines Format**
Your guidelines server should serve these files:
- `/guidelines.md` - Main development guidelines
- `/validation-rules.md` - Code validation rules
- `/security-rules.md` - Security scanning rules

### **Step 5: Test in Cursor**
1. Open any PHP file in Cursor
2. Ask the AI: "Check this code for security issues: `class mo_Test {}`"
3. The AI should detect the short prefix violation!

## 🔧 **Troubleshooting**

Having configuration issues? See the [Configuration Troubleshooting Guide](CONFIGURATION-TROUBLESHOOTING.md) for common mistakes and solutions.

## 📝 **Customizing Guidelines**

Edit the files in `sample-guidelines/html/` to add your own:
- Coding standards
- Validation rules
- Security patterns
- Company-specific guidelines

The MCP server automatically uses updated rules without restart.

## 📄 **License**

MIT License

---

**Built for Dynamic, Maintainable Development Guidelines** 🛡️ 