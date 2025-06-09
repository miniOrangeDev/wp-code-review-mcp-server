import { GuidelineSource } from './guidelines-source-factory.js';

export class GuidelinesManager {
  constructor(private guidelineSource: GuidelineSource) {}

  getTools() {
    return [
      {
        name: 'get_guidelines',
        description: 'Get development guidelines from the configured source',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Optional category of guidelines to retrieve (e.g., security-rules, validation-rules)',
            },
          },
        },
      },
      {
        name: 'validate_code',
        description: 'Validate code against configured coding standards',
        inputSchema: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'The code to validate',
            },
            language: {
              type: 'string',
              enum: ['php', 'javascript', 'css', 'html'],
              description: 'The programming language of the code',
            },
          },
          required: ['code', 'language'],
        },
      },
      {
        name: 'security_check',
        description: 'Perform security analysis on code using configured security rules',
        inputSchema: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'The code to check for security issues',
            },
          },
          required: ['code'],
        },
      },
    ];
  }

  getResources() {
    return [
      {
        uri: 'guidelines://main',
        name: 'Main Guidelines',
        description: 'Primary development guidelines',
        mimeType: 'text/markdown',
      },
      {
        uri: 'guidelines://security-rules',
        name: 'Security Rules',
        description: 'Security validation rules and patterns',
        mimeType: 'text/markdown',
      },
      {
        uri: 'guidelines://validation-rules',
        name: 'Validation Rules',
        description: 'Code validation rules and standards',
        mimeType: 'text/markdown',
      },
    ];
  }

  async handleTool(name: string, args: any) {
    try {
      switch (name) {
        case 'get_guidelines':
          return await this.getGuidelines(args.category);
        case 'validate_code':
          return await this.validateCode(args.code, args.language);
        case 'security_check':
          return await this.performSecurityCheck(args.code);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
          },
        ],
      };
    }
  }

  async handleResource(uri: string) {
    try {
      const category = uri.replace('guidelines://', '');
      const content = await this.guidelineSource.fetchGuidelines(category === 'main' ? undefined : category);
      
      return {
        contents: [
          {
            uri,
            mimeType: 'text/markdown',
            text: content,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to load resource ${uri}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async getGuidelines(category?: string) {
    try {
      const content = await this.guidelineSource.fetchGuidelines(category);
      
      return {
        content: [
          {
            type: 'text',
            text: content,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to fetch guidelines: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async validateCode(code: string, language: string) {
    try {
      const result = await this.guidelineSource.validateCode(code, language);
      
      const response = [];
      
      if (result.issues.length > 0) {
        response.push(`❌ **Issues Found:**\n${result.issues.map(issue => `- ${issue}`).join('\n')}`);
      }
      
      if (result.suggestions.length > 0) {
        response.push(`💡 **Suggestions:**\n${result.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}`);
      }
      
      if (response.length === 0) {
        response.push('✅ Code validation passed. No issues detected.');
      }
      
      return {
        content: [
          {
            type: 'text',
            text: response.join('\n\n'),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Code validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async performSecurityCheck(code: string) {
    try {
      const result = await this.guidelineSource.performSecurityCheck(code);
      
      const response = [];
      
      if (result.vulnerabilities.length > 0) {
        response.push(`🚨 **Vulnerabilities Found:**\n${result.vulnerabilities.map(vuln => `- ${vuln}`).join('\n')}`);
      }
      
      if (result.warnings.length > 0) {
        response.push(`⚠️ **Warnings:**\n${result.warnings.map(warning => `- ${warning}`).join('\n')}`);
      }
      
      if (result.recommendations.length > 0) {
        response.push(`💡 **Recommendations:**\n${result.recommendations.map(rec => `- ${rec}`).join('\n')}`);
      }
      
      if (response.length === 0) {
        response.push('✅ Security check passed. No obvious vulnerabilities detected.');
      }
      
      return {
        content: [
          {
            type: 'text',
            text: response.join('\n\n'),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Security check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 