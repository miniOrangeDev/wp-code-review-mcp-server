#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { GuidelineSourceFactory, type SourceConfig } from './guidelines-source-factory.js';
import { GuidelinesManager } from './guidelines-manager.js';

// Configuration - use environment variables only (like postgres MCP)
const getConfig = (): SourceConfig => {
  const guidelinesUrl = process.env.GUIDELINES_URL;
  const sourceType = process.env.GUIDELINES_SOURCE_TYPE || 'url';

  if (!guidelinesUrl) {
    throw new Error('GUIDELINES_URL environment variable is required');
  }

  return {
    type: sourceType as 'url' | 'confluence' | 'github',
    url: guidelinesUrl
  };
};

const server = new Server(
  {
    name: 'wp-code-review-mcp',
    version: '2.0.0',
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// Initialize guideline source and manager
const config = getConfig();
const guidelineSource = GuidelineSourceFactory.createSource(config);
const guidelinesManager = new GuidelinesManager(guidelineSource);

// Register tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: guidelinesManager.getTools(),
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  return await guidelinesManager.handleTool(name, args);
});

// Register resource handlers
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: guidelinesManager.getResources(),
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  return await guidelinesManager.handleResource(uri);
});

// Start server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`WordPress Code Review MCP Server v2.0.0 running on stdio`);
    console.error(`Guidelines source: ${config.type} -> ${config.url}`);
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
}); 