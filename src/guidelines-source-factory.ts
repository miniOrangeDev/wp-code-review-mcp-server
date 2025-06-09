/**
 * Factory pattern for different guideline sources
 * Extensible to URL, Confluence, GitHub, etc.
 */

export interface GuidelineSource {
  fetchGuidelines(category?: string): Promise<string>;
  validateCode(code: string, language: string): Promise<{ issues: string[]; suggestions: string[] }>;
  performSecurityCheck(code: string): Promise<{ vulnerabilities: string[]; warnings: string[]; recommendations: string[] }>;
}

export interface SourceConfig {
  type: 'url' | 'confluence' | 'github';
  url?: string;
  apiKey?: string;
  username?: string;
  spaceKey?: string;
}

export class GuidelineSourceFactory {
  static createSource(config: SourceConfig): GuidelineSource {
    switch (config.type) {
      case 'url':
        return new UrlGuidelineSource(config.url!);
      case 'confluence':
        // Future implementation
        throw new Error('Confluence source not yet implemented');
      case 'github':
        // Future implementation  
        throw new Error('GitHub source not yet implemented');
      default:
        throw new Error(`Unknown source type: ${config.type}`);
    }
  }
}

export class UrlGuidelineSource implements GuidelineSource {
  constructor(private baseUrl: string) {}

  async fetchGuidelines(category?: string): Promise<string> {
    try {
      const url = category ? `${this.baseUrl}/${category}.md` : `${this.baseUrl}/guidelines.md`;
      
      // Use native fetch or http module for Node.js
      const response = await this.httpGet(url);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch guidelines from ${this.baseUrl}: ${error}`);
    }
  }

  async validateCode(code: string, language: string): Promise<{ issues: string[]; suggestions: string[] }> {
    const guidelines = await this.fetchGuidelines('validation-rules');
    return this.parseValidationRules(guidelines, code, language);
  }

  async performSecurityCheck(code: string): Promise<{ vulnerabilities: string[]; warnings: string[]; recommendations: string[] }> {
    const securityGuidelines = await this.fetchGuidelines('security-rules');
    return this.parseSecurityRules(securityGuidelines, code);
  }

  private async httpGet(url: string): Promise<string> {
    // For Node.js environment
    const https = await import('https');
    const http = await import('http');
    
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https:') ? https : http;
      
      client.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
          }
        });
      }).on('error', reject);
    });
  }

  private parseValidationRules(guidelines: string, code: string, language: string): { issues: string[]; suggestions: string[] } {
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Parse markdown format guidelines and apply to code
    const rules = this.extractRules(guidelines, 'VALIDATION_RULES');
    
    for (const rule of rules) {
      const result = this.applyRule(rule, code, language);
      if (result.violation) {
        issues.push(result.message);
      } else if (result.suggestion) {
        suggestions.push(result.message);
      }
    }

    return { issues, suggestions };
  }

  private parseSecurityRules(guidelines: string, code: string): { vulnerabilities: string[]; warnings: string[]; recommendations: string[] } {
    const vulnerabilities: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    const rules = this.extractRules(guidelines, 'SECURITY_RULES');
    
    for (const rule of rules) {
      const result = this.applySecurityRule(rule, code);
      
      if (result.level === 'CRITICAL' || result.level === 'HIGH') {
        vulnerabilities.push(`${result.level}: ${result.message}`);
      } else if (result.level === 'MEDIUM') {
        warnings.push(`${result.level}: ${result.message}`);
      } else if (result.level === 'INFO') {
        recommendations.push(result.message);
      }
    }

    return { vulnerabilities, warnings, recommendations };
  }

  private extractRules(content: string, section: string): Array<{ pattern: string; message: string; level?: string; language?: string }> {
    const rules: Array<{ pattern: string; message: string; level?: string; language?: string }> = [];
    
    // Look for rules in markdown format - simplified approach
    const sectionRegex = new RegExp(`## ${section}([\\s\\S]*)`, 'i');
    const sectionMatch = content.match(sectionRegex);
    
    if (sectionMatch) {
      // Split by lines and process each line that looks like a rule
      const lines = sectionMatch[1].split('\n');
      
      for (const line of lines) {
        // Look for lines that start with - **Pattern**:
        if (line.trim().startsWith('- **Pattern**:')) {
          // Extract pattern
          const patternMatch = line.match(/`([^`]+)`/);
          if (!patternMatch) continue;
          
          const pattern = patternMatch[1];
          
          // Extract message (everything between **Message**: and **Level**: or **Language**:)
          const messageMatch = line.match(/\*\*Message\*\*:\s*([^*]+?)(?:\s*\*\*(?:Level|Language)\*\*|$)/);
          const message = messageMatch ? messageMatch[1].trim() : 'No message';
          
          // Extract level
          const levelMatch = line.match(/\*\*Level\*\*:\s*(\w+)/);
          const level = levelMatch ? levelMatch[1] : 'INFO';
          
          // Extract language
          const languageMatch = line.match(/\*\*Language\*\*:\s*(\w+)/);
          const language = languageMatch ? languageMatch[1] : 'all';
          
          rules.push({
            pattern,
            message,
            level,
            language
          });
        }
      }
    }
    
    return rules;
  }

  private applyRule(rule: { pattern: string; message: string; language?: string }, code: string, language: string): { violation: boolean; suggestion: boolean; message: string } {
    // Skip if rule doesn't apply to this language
    if (rule.language && rule.language !== 'all' && rule.language !== language) {
      return { violation: false, suggestion: false, message: '' };
    }

    // Simple pattern matching - in production, use more sophisticated parsing
    const hasPattern = code.includes(rule.pattern);
    
    return {
      violation: hasPattern,
      suggestion: false,
      message: rule.message
    };
  }

  private applySecurityRule(rule: { pattern: string; message: string; level?: string }, code: string): { level: string; message: string } {
    const hasPattern = code.includes(rule.pattern);
    
    return {
      level: hasPattern ? (rule.level || 'INFO') : 'NONE',
      message: hasPattern ? rule.message : ''
    };
  }
} 