# MCP Configuration Troubleshooting Guide

## 🚨 **Common Configuration Mistakes**

### ❌ **Incorrect Configuration Examples**

**WRONG - Missing build path:**
```json
{
  "mcpServers": {
    "wp-code-review-mcp": {
      "command": "node",
      "args": ["index.js"],  // ❌ WRONG: Missing "build/" directory
      "env": {
        "GUIDELINES_URL": "https://yourdomain.com/guidelines"
      }
    }
  }
}
```

### ✅ **Correct Configuration Examples**

**Option 1: Absolute Path (Recommended):**
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

**Option 2: Relative Path (if working directory is set correctly):**
```json
{
  "mcpServers": {
    "wp-code-review-mcp": {
      "command": "node",
      "args": ["build/index.js"],
      "env": {
        "GUIDELINES_URL": "https://yourdomain.com/guidelines"
      },
      "cwd": "/path/to/wp-code-review-mcp"
    }
  }
}
```

## 🔧 **Configuration Validation Steps**

### **Step 1: Verify File Exists**
```bash
# Make sure the built file exists
ls -la /path/to/wp-code-review-mcp/build/index.js

# Should show something like:
# -rw-r--r-- 1 user user 12345 Date index.js
```

### **Step 2: Verify Guidelines URL**
```bash
# Test that guidelines are accessible
curl https://yourdomain.com/guidelines/guidelines.md

# Should return markdown content, not 404 error
```


## 🐛 **Common Error Messages & Solutions**

### Error: "GUIDELINES_URL environment variable is required"
**Cause:** Missing or empty `GUIDELINES_URL` in configuration
**Solution:** Add proper environment variable:
```json
"env": {
  "GUIDELINES_URL": "https://yourdomain.com/guidelines"
}
```

### Error: "Cannot find module"
**Cause:** Incorrect path in `args` array
**Solution:** 
1. Use absolute path: `["/full/path/to/wp-code-review-mcp/build/index.js"]`
2. Or ensure `cwd` is set correctly for relative paths

### Error: "Failed to fetch guidelines"
**Cause:** Guidelines URL not accessible
**Solution:** 
1. Check URL is correct and accessible
2. Verify web server is running
3. Test with `curl https://yourdomain.com/guidelines/guidelines.md`

### Error: "Server failed to start"
**Cause:** Various configuration issues
**Solution:**
1. Check Node.js version: `node --version` (needs v18+)
2. Rebuild project: `npm run build`
3. Check file permissions

## 📋 **Cursor-Specific Configuration**

### **For Cursor Settings.json:**
```json
{
  "mcp": {
    "servers": {
      "wp-code-review-mcp": {
        "command": "node",
        "args": ["/path/to/wp-code-review-mcp/build/index.js"],
        "env": {
          "GUIDELINES_URL": "https://yourdomain.com/guidelines"
        }
      }
    }
  }
}
```

### **Key Points for Cursor:**
- ✅ Use full absolute paths in `args`
- ✅ Include `GUIDELINES_URL` in `env`
- ✅ Enable MCP in AI settings
- ✅ Set reasonable timeout (30000ms)
- ✅ Restart Cursor after configuration changes

## 🎯 **Quick Validation Checklist**

- [ ] Built file exists at specified path
- [ ] GUIDELINES_URL is set and accessible
- [ ] Node.js version is 18+
- [ ] Server starts manually with `node build/index.js`
- [ ] Guidelines return content (not 404)
- [ ] Cursor settings JSON is valid syntax
- [ ] Cursor restarted after configuration changes

## 💡 **Pro Tips**

1. **Always use absolute paths** - they're more reliable than relative paths
2. **Test manually first** - before configuring Cursor, ensure the server works standalone
3. **Use localhost for testing** - start with `http://localhost/guidelines` before using remote URLs
4. **Check JSON syntax** - invalid JSON will break the entire configuration
5. **Monitor server logs** - check console output for error messages

---

🔧 **Still having issues?** Check the main [SETUP.md](SETUP.md) for step-by-step instructions. 
