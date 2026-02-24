// Canva API Integration
// Auto-generates social media graphics and marketing materials

import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const CANVA_API_KEY = Deno.env.get("CANVA_API_KEY");
const CANVA_BRAND_ID = Deno.env.get("CANVA_BRAND_ID"); // Your brand template ID

interface GenerateContentData {
  contentType: "social_post" | "ad_creative" | "quiz_result_graphic" | "testimonial";
  customerId?: string;
  data: {
    headline?: string;
    body?: string;
    imageUrl?: string;
    scaffoldType?: string;
    customerName?: string;
  };
}

// Canva Design Templates (create these in Canva, then use their IDs)
const DESIGN_TEMPLATES = {
  social_post_instagram: "DAGQx1234567", // Replace with actual template ID
  social_post_facebook: "DAGQx7654321",
  ad_creative_facebook: "DAGQx1111111",
  quiz_result_graphic: "DAGQx2222222",
  testimonial_card: "DAGQx3333333",
};

export async function generateContent(data: GenerateContentData) {
  if (!CANVA_API_KEY) {
    console.warn("CANVA_API_KEY not configured - skipping Canva generation");
    return null;
  }

  try {
    console.log("Generating Canva content:", data.contentType);

    // Get the appropriate template
    const templateId = getTemplateId(data.contentType);

    // Create design from template with auto-fill data
    const design = await createDesignFromTemplate(templateId, data.data);

    // Export the design
    const exportUrl = await exportDesign(design.id);

    // Save to database
    const { data: savedContent } = await supabase
      .from("generated_content")
      .insert({
        content_type: data.contentType,
        customer_id: data.customerId,
        canva_design_id: design.id,
        export_url: exportUrl,
        metadata: data.data,
      })
      .select()
      .single();

    console.log("Canva content generated:", savedContent?.id);

    return {
      designId: design.id,
      exportUrl: exportUrl,
      contentId: savedContent?.id,
    };
  } catch (error) {
    console.error("Error generating Canva content:", error);
    throw error;
  }
}

async function createDesignFromTemplate(templateId: string, data: any) {
  // Note: Canva API v1.0 - adjust based on actual API endpoints
  const response = await fetch("https://api.canva.com/v1/designs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CANVA_API_KEY}`,
    },
    body: JSON.stringify({
      design_type: "InstagramPost",
      asset_id: templateId,
      autofill: {
        title: data.headline || "",
        description: data.body || "",
        image: data.imageUrl || "",
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Canva API error: ${error}`);
  }

  return await response.json();
}

async function exportDesign(designId: string) {
  const response = await fetch(`https://api.canva.com/v1/designs/${designId}/export`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CANVA_API_KEY}`,
    },
    body: JSON.stringify({
      format: "png",
      quality: "high",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Canva export error: ${error}`);
  }

  const result = await response.json();
  return result.export_url;
}

function getTemplateId(contentType: string): string {
  // Map content types to Canva template IDs
  // You'll need to create these templates in Canva and replace with actual IDs
  switch (contentType) {
    case "social_post":
      return DESIGN_TEMPLATES.social_post_instagram;
    case "ad_creative":
      return DESIGN_TEMPLATES.ad_creative_facebook;
    case "quiz_result_graphic":
      return DESIGN_TEMPLATES.quiz_result_graphic;
    case "testimonial":
      return DESIGN_TEMPLATES.testimonial_card;
    default:
      return DESIGN_TEMPLATES.social_post_instagram;
  }
}

// Pre-built graphic generators for common use cases

export async function generateQuizResultGraphic(
  customerName: string,
  scaffoldType: string,
  customerId: string
) {
  const scaffoldInfo = getScaffoldInfo(scaffoldType);

  return await generateContent({
    contentType: "quiz_result_graphic",
    customerId: customerId,
    data: {
      headline: `${customerName}'s Child Needs:`,
      body: `${scaffoldInfo.title}\n\n${scaffoldInfo.description}`,
      scaffoldType: scaffoldType,
      customerName: customerName,
    },
  });
}

export async function generateSocialPost(headline: string, body: string) {
  return await generateContent({
    contentType: "social_post",
    data: {
      headline: headline,
      body: body,
    },
  });
}

export async function generateAdCreative(headline: string, body: string, imageUrl?: string) {
  return await generateContent({
    contentType: "ad_creative",
    data: {
      headline: headline,
      body: body,
      imageUrl: imageUrl,
    },
  });
}

function getScaffoldInfo(scaffoldType: string) {
  const scaffoldInfo = {
    process: {
      title: "PROCESS SCAFFOLDS",
      description: "Step-by-step instructions, worked examples, and visual checklists",
      emoji: "📋",
    },
    capacity: {
      title: "CAPACITY SCAFFOLDS",
      description: "Shorter assignments, strategic breaks, and hard stops",
      emoji: "⚡",
    },
    emotional: {
      title: "EMOTIONAL SCAFFOLDS",
      description: "Low-stakes entry points and permission to mess up",
      emoji: "💙",
    },
    executive_function: {
      title: "EXECUTIVE FUNCTION SCAFFOLDS",
      description: "Body doubling, timers, and external organization",
      emoji: "🧠",
    },
  };

  return scaffoldInfo[scaffoldType as keyof typeof scaffoldInfo] || scaffoldInfo.process;
}

// Batch content generation for social media campaigns
export async function generateSocialMediaCampaign(theme: string, postCount: number = 7) {
  const posts = [];

  const themes = {
    homework_battles: [
      {
        headline: "Your child isn't lazy",
        body: "The system missed them. Here's what actually works.",
      },
      {
        headline: "Stop trying to change your child",
        body: "Start changing the scaffolding. Here's how.",
      },
      {
        headline: "Homework battles aren't about defiance",
        body: "They're about missing scaffolds. Learn the 4 types.",
      },
      {
        headline: "Why rewards and consequences don't work",
        body: "You can't discipline your way out of a wiring mismatch.",
      },
      {
        headline: "The truth about homework resistance",
        body: "It's not motivation. It's missing support structures.",
      },
      {
        headline: "When your child says 'I can't'",
        body: "They might actually mean 'I don't know how.' Here's the difference.",
      },
      {
        headline: "Stop the nightly homework fight",
        body: "Without yelling, bribing, or breaking their spirit.",
      },
    ],
  };

  const selectedPosts = themes[theme as keyof typeof themes] || themes.homework_battles;

  for (let i = 0; i < Math.min(postCount, selectedPosts.length); i++) {
    const post = selectedPosts[i];
    const generated = await generateSocialPost(post.headline, post.body);
    posts.push(generated);
  }

  console.log(`Generated ${posts.length} social media posts for ${theme} campaign`);
  return posts;
}
