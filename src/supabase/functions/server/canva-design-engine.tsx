/**
 * Canva Design Engine
 * Automatically creates on-brand graphics using Canva API
 */

import type { GeneratedContent } from './ai-content-generator.tsx';

const CANVA_API_BASE = 'https://api.canva.com/rest/v1';

interface CanvaDesignRequest {
  content: any; // GeneratedContent from AI
  format: 'story' | 'reel' | 'carousel' | 'feed_post';
}

interface CanvaDesignResponse {
  designId: string;
  exportUrl: string;
  format: string;
}

/**
 * Create design in Canva using API
 */
export async function createCanvaDesign(request: CanvaDesignRequest): Promise<CanvaDesignResponse> {
  const { content, format } = request;
  
  // Get Canva credentials
  const clientId = Deno.env.get('CANVA_CLIENT_ID');
  const clientSecret = Deno.env.get('CANVA_CLIENT_SECRET');
  
  if (!clientId || !clientSecret) {
    throw new Error('Canva credentials not configured');
  }
  
  // Get access token
  const accessToken = await getCanvaAccessToken(clientId, clientSecret);
  
  // Select template based on format
  const template = getTemplateForFormat(format);
  
  // Create design from template with content
  const design = await createDesignFromTemplate(accessToken, template, content);
  
  // Export design as PNG
  const exportUrl = await exportDesign(accessToken, design.id);
  
  return {
    designId: design.id,
    exportUrl,
    format,
  };
}

/**
 * Get Canva OAuth access token
 */
async function getCanvaAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const response = await fetch('https://api.canva.com/rest/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Canva OAuth error: ${JSON.stringify(error)}`);
  }
  
  const data = await response.json();
  return data.access_token;
}

/**
 * Get template configuration for format
 */
function getTemplateForFormat(format: string): any {
  const brand = {
    colors: {
      background: '#FFFFFF',
      text: '#111111',
      accent: '#0d9488',
    },
    fonts: {
      heading: 'bold, sans-serif',
      body: 'sans-serif',
    },
  };
  
  const templates: Record<string, any> = {
    story: {
      dimensions: { width: 1080, height: 1920 },
      layout: 'vertical',
      elements: [
        { type: 'background', color: brand.colors.background },
        { type: 'text', position: 'top', color: brand.colors.text, font: brand.fonts.heading, size: 72 },
        { type: 'text', position: 'center', color: brand.colors.text, font: brand.fonts.body, size: 48 },
        { type: 'accent', position: 'bottom', color: brand.colors.accent },
      ],
    },
    reel: {
      dimensions: { width: 1080, height: 1920 },
      layout: 'vertical',
      elements: [
        { type: 'background', color: brand.colors.background },
        { type: 'text', position: 'top', color: brand.colors.text, font: brand.fonts.heading, size: 64 },
        { type: 'text', position: 'center', color: brand.colors.text, font: brand.fonts.body, size: 42 },
        { type: 'cta', position: 'bottom', color: brand.colors.accent, font: brand.fonts.heading },
      ],
    },
    carousel: {
      dimensions: { width: 1080, height: 1080 },
      layout: 'square',
      slides: 'multiple',
      elements: [
        { type: 'background', color: brand.colors.background },
        { type: 'header', position: 'top', color: brand.colors.text, font: brand.fonts.heading, size: 56 },
        { type: 'body', position: 'center', color: brand.colors.text, font: brand.fonts.body, size: 36 },
        { type: 'accent_bar', position: 'bottom', color: brand.colors.accent, height: 20 },
      ],
    },
    feed_post: {
      dimensions: { width: 1080, height: 1080 },
      layout: 'square',
      elements: [
        { type: 'background', color: brand.colors.background },
        { type: 'quote', position: 'center', color: brand.colors.text, font: brand.fonts.heading, size: 64 },
        { type: 'author', position: 'bottom', color: brand.colors.accent, font: brand.fonts.body, size: 32 },
      ],
    },
  };
  
  return templates[format] || templates.feed_post;
}

/**
 * Create design from template with AI-generated content
 */
async function createDesignFromTemplate(
  accessToken: string,
  template: any,
  content: any
): Promise<{ id: string }> {
  // For carousel, create multiple pages
  if (template.slides === 'multiple' && content.carouselSlides) {
    return createCarouselDesign(accessToken, template, content);
  }
  
  // For single-page designs (story, reel, feed_post)
  return createSinglePageDesign(accessToken, template, content);
}

/**
 * Create single-page design
 */
async function createSinglePageDesign(
  accessToken: string,
  template: any,
  content: any
): Promise<{ id: string }> {
  const { dimensions } = template;
  
  // Build Canva design payload
  const payload = {
    asset_type: 'design',
    dimensions: {
      width: dimensions.width,
      height: dimensions.height,
      unit: 'px',
    },
    pages: [
      {
        elements: buildElementsFromContent(template, content),
      },
    ],
  };
  
  const response = await fetch(`${CANVA_API_BASE}/designs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Canva design creation error: ${JSON.stringify(error)}`);
  }
  
  const data = await response.json();
  return { id: data.design.id };
}

/**
 * Create multi-page carousel design
 */
async function createCarouselDesign(
  accessToken: string,
  template: any,
  content: any
): Promise<{ id: string }> {
  const { dimensions } = template;
  const { carouselSlides } = content;
  
  // Build pages for each slide
  const pages = carouselSlides.map((slide: any) => ({
    elements: buildCarouselSlideElements(template, slide),
  }));
  
  const payload = {
    asset_type: 'design',
    dimensions: {
      width: dimensions.width,
      height: dimensions.height,
      unit: 'px',
    },
    pages,
  };
  
  const response = await fetch(`${CANVA_API_BASE}/designs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Canva carousel creation error: ${JSON.stringify(error)}`);
  }
  
  const data = await response.json();
  return { id: data.design.id };
}

/**
 * Build Canva elements from AI-generated content
 */
function buildElementsFromContent(template: any, content: any): any[] {
  const elements: any[] = [];
  
  // Background
  elements.push({
    type: 'SHAPE',
    top: 0,
    left: 0,
    width: template.dimensions.width,
    height: template.dimensions.height,
    fill: { color: template.elements.find((e: any) => e.type === 'background')?.color || '#FFFFFF' },
  });
  
  // Hook/Headline (top)
  if (content.hook) {
    elements.push({
      type: 'TEXT',
      top: 100,
      left: 60,
      width: template.dimensions.width - 120,
      text: content.hook.toUpperCase(),
      font_size: 72,
      font_weight: 'bold',
      color: '#111111',
      alignment: 'left',
    });
  }
  
  // Main content (center)
  if (content.caption) {
    // Extract first paragraph or key message
    const mainText = content.caption.split('\n\n')[0];
    elements.push({
      type: 'TEXT',
      top: template.dimensions.height / 2 - 100,
      left: 60,
      width: template.dimensions.width - 120,
      text: mainText,
      font_size: 42,
      color: '#111111',
      alignment: 'left',
      line_height: 1.4,
    });
  }
  
  // CTA/Accent (bottom)
  if (content.cta) {
    // Accent bar
    elements.push({
      type: 'SHAPE',
      top: template.dimensions.height - 150,
      left: 0,
      width: 200,
      height: 8,
      fill: { color: '#0d9488' },
    });
    
    // CTA text
    elements.push({
      type: 'TEXT',
      top: template.dimensions.height - 120,
      left: 60,
      width: template.dimensions.width - 120,
      text: content.cta,
      font_size: 36,
      font_weight: 'bold',
      color: '#0d9488',
      alignment: 'left',
    });
  }
  
  return elements;
}

/**
 * Build elements for carousel slide
 */
function buildCarouselSlideElements(template: any, slide: any): any[] {
  const elements: any[] = [];
  
  // Background
  elements.push({
    type: 'SHAPE',
    top: 0,
    left: 0,
    width: 1080,
    height: 1080,
    fill: { color: '#FFFFFF' },
  });
  
  // Slide number indicator
  elements.push({
    type: 'TEXT',
    top: 40,
    right: 60,
    text: `${slide.slideNumber}/10`,
    font_size: 24,
    color: '#0d9488',
    alignment: 'right',
  });
  
  // Headline
  elements.push({
    type: 'TEXT',
    top: 150,
    left: 60,
    width: 960,
    text: slide.headline,
    font_size: slide.slideNumber === 1 ? 64 : 48,
    font_weight: 'bold',
    color: '#111111',
    alignment: 'left',
  });
  
  // Body text
  elements.push({
    type: 'TEXT',
    top: 400,
    left: 60,
    width: 960,
    text: slide.bodyText,
    font_size: 36,
    color: '#333333',
    alignment: 'left',
    line_height: 1.5,
  });
  
  // Accent bar at bottom
  elements.push({
    type: 'SHAPE',
    bottom: 0,
    left: 0,
    width: 1080,
    height: 20,
    fill: { color: '#0d9488' },
  });
  
  return elements;
}

/**
 * Export design as PNG
 */
async function exportDesign(accessToken: string, designId: string): Promise<string> {
  const response = await fetch(`${CANVA_API_BASE}/designs/${designId}/export`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      format: 'png',
      quality: 'high',
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Canva export error: ${JSON.stringify(error)}`);
  }
  
  const data = await response.json();
  
  // Poll for export completion
  let exportUrl = null;
  let attempts = 0;
  
  while (!exportUrl && attempts < 30) {
    const statusResponse = await fetch(`${CANVA_API_BASE}/exports/${data.export.id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    const statusData = await statusResponse.json();
    
    if (statusData.export.status === 'success') {
      exportUrl = statusData.export.url;
      break;
    }
    
    if (statusData.export.status === 'failed') {
      throw new Error('Canva export failed');
    }
    
    // Wait 2 seconds before next poll
    await new Promise(resolve => setTimeout(resolve, 2000));
    attempts++;
  }
  
  if (!exportUrl) {
    throw new Error('Canva export timeout');
  }
  
  return exportUrl;
}

/**
 * Batch create designs for entire calendar
 */
export async function createDesignsForCalendar(calendar: any[]): Promise<any[]> {
  const designs = [];
  
  for (const content of calendar) {
    console.log(`Creating design for Day ${content.day}: ${content.format}`);
    
    try {
      const design = await createCanvaDesign({
        content,
        format: content.format,
      });
      
      designs.push({
        day: content.day,
        ...content,
        ...design,
      });
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`Error creating design for Day ${content.day}:`, error);
      // Continue with next design
    }
  }
  
  return designs;
}
