# Step-by-Step Setup Guide

Follow these steps to set up the WordPress Code Review MCP server in Cursor.

## 📋 **Prerequisites**
- Node.js installed (v18+)

## 🚀 **Setup Steps**

### **Step 1: Clone and Build**
```bash
# Clone the repository
cd ~/projects  # or wherever you keep projects
git clone https://github.com/miniOrangeDev/wp-code-review-mcp-server.git wp-code-review-mcp-server
cd wp-code-review-mcp-server

# Install dependencies and build
npm install
npm run build
```

### **Step 2: Host Guidelines**
Host the files from `sample-guidelines/html/` on your web server and configure your base URL, for example: `https://yourdomain.com/guidelines/`

Verify guidelines are accessible:
```bash
curl https://yourdomain.com/guidelines/guidelines.md
```

### **Step 3: Get Your Project Path**
```bash
# Get the full path - you'll need this for Cursor
pwd
# Example output: /home/projects/wp-code-review-mcp-server
```

### **Step 4: Configure Cursor**

1. **Open Cursor Settings:**
   - Press `Ctrl+Shift+P`
   - Type "Preferences: Open User Settings (JSON)"
   - Click on it

2. **Add MCP Configuration:**
   Add this to your mcp.json (**replace the path with yours from Step 3**):

```json
{
  "mcpServers": {
    "wp-code-review-mcp": {
      "command": "node",
      "args": ["/path/to/wp-code-review-mcp/build/index.js"],
      "env": {
        "GUIDELINES_URL": "https://yourdomain.com/guidelines"
      }
    }
  }
} 
```

> **Why the full path?** Published MCPs (like from npm) are in the PATH. This is a local project, so Cursor needs the exact location of your built `index.js` file.


### **Step 5: Restart Cursor**
- Close Cursor completely
- Reopen Cursor
- The MCP server should now be available

### **Step 6: Test in Cursor**
1. Open any PHP file in Cursor
2. Ask the AI: "Check this code for security issues: `class mo_Test {}`"
3. The AI should detect the short prefix violation!

## 🧪 **Manual Testing**

Test the custom validation rule:
```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "validate_code", "arguments": {"code": "class mo_MyClass {}", "language": "php"}}}' | GUIDELINES_URL=https://yourdomain.com/guidelines node build/index.js
```

Expected output:
```json
{"result":{"content":[{"type":"text","text":"❌ **Issues Found:**\n- Class prefix 'mo_' is too short. Use at least 4-5 characters for better namespace protection."}]},"jsonrpc":"2.0","id":1}
```

## ❌ **Troubleshooting**

**📖 For detailed troubleshooting, see: [Configuration Troubleshooting Guide](CONFIGURATION-TROUBLESHOOTING.md)**

### Quick Fixes:

### Guidelines Not Found
```bash
# Check if guidelines are accessible
curl https://yourdomain.com/guidelines/validation-rules.md
```

### MCP Server Not Starting
```bash
# Check the path is correct
ls build/index.js

# Check Node.js version
node --version  # Should be v18+
```

### Cursor Not Detecting MCP
- Ensure JSON syntax is correct in settings
- Restart Cursor completely
- Check Cursor logs for errors

## ✅ **Success Indicators**

- ✅ Guidelines accessible at `https://yourdomain.com/guidelines/`
- ✅ Manual test returns validation error for `mo_` prefix
- ✅ Cursor shows MCP tools available
- ✅ AI can validate code using custom rules

You're all set! 🚀 
