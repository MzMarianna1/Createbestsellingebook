// Canva Content Publisher Integration
// Publishes your 30-day content calendar to social media automatically

import type { ContentPublisherIntent } from "@canva/intents/content";

// Content Calendar - Day 1-30 posts from your strategy
const CONTENT_CALENDAR = [
  // WEEK 1: "The Homework Battle is Real"
  {
    day: 1,
    platform: ["instagram", "facebook", "tiktok"],
    format: "carousel",
    headline: "3 SIGNS HOMEWORK IS TRAUMATIZING YOUR CHILD",
    body: `If you see these 3 things, homework isn't just hard—it's harmful.

Sign #1: They say "I'm stupid" (Even when they're smart. Repeated failure creates shame.)

Sign #2: Physical symptoms (Stomach aches, headaches before homework time. Their body is in fight-or-flight.)

Sign #3: Complete avoidance (Hiding assignments, "forgetting," lying about homework. Protection mechanism.)

This isn't laziness. This is trauma response.

Take the quiz to discover which scaffold YOUR child needs.
→ www.MzMarianna.com/quiz`,
    cta: "Take the Quiz",
    ctaUrl: "https://www.MzMarianna.com/quiz",
    hashtags: ["homeworkbattles", "parentingtips", "ADHDparenting", "executivefunction"],
    designTemplate: "instagram_carousel_10slides"
  },
  {
    day: 2,
    platform: ["instagram", "tiktok"],
    format: "video",
    headline: "From 2 Hours to 30 Minutes in ONE NIGHT",
    body: `Last week a mom messaged me: "Homework went from 2 hours of screaming to 30 minutes with zero tears. That was NIGHT ONE."

What changed? She stopped trying to motivate her son and started scaffolding instead.

Chapter 4 in 'Stop Homework Battles' has the exact protocol she used.`,
    cta: "Get the Protocol",
    ctaUrl: "https://www.MzMarianna.com/quiz",
    hashtags: ["homeworkhelp", "parentingwin", "testimonial"],
    designTemplate: "instagram_story_video"
  },
  {
    day: 3,
    platform: ["facebook"],
    format: "text_post",
    headline: "Question for parents of struggling students",
    body: `Does your child shut down when you mention homework?

I'm talking about the blank stare, the "I don't have any," the sudden need to go to the bathroom, the tears before they even look at it.

That's not defiance. That's a nervous system protecting itself from re-living failure.

Here's what most parents don't realize: motivation doesn't fix this. Your child doesn't need to "try harder." They need scaffolding.

Here's the #1 shift:

❌ Don't ask "Do you have homework?" (their brain hears: "Are you ready to fail again?")

✅ Instead: "Let's take a look together and figure out what needs to happen first." (their brain hears: "I'm not alone in this.")

Anyone else dealing with this?`,
    cta: "Free Quiz",
    ctaUrl: "https://www.MzMarianna.com/quiz",
    hashtags: ["parenting", "homework", "homeworkhelp"],
    designTemplate: null // Text-only post
  },
  {
    day: 4,
    platform: ["instagram", "tiktok"],
    format: "reel",
    headline: "Homework Myths That Make It WORSE",
    body: `Myth #1: "They need to learn responsibility"
Reality: Can't build responsibility without competence first

Myth #2: "Sitting with them makes them dependent"
Reality: Scaffolding builds independence. Drowning doesn't.

Myth #3: "Natural consequences will teach them"
Reality: All they learn is "I'm a failure"

Myth #4: "Rewards will motivate them"
Reality: They don't need motivation. They need reduced barriers.

Your child isn't lazy. The system missed their wiring.`,
    cta: "Learn the Protocol",
    ctaUrl: "https://www.MzMarianna.com/quiz",
    hashtags: ["homeworkmyths", "parentingtips", "scaffolding"],
    designTemplate: "instagram_reel_quick_cuts"
  },
  {
    day: 5,
    platform: ["instagram", "facebook", "pinterest"],
    format: "static_image",
    headline: "FREE DOWNLOAD: The Homework Resistance Decoder",
    body: `Does your child:
□ Shut down when instructions are verbal?
□ Melt down after 10 minutes?
□ Refuse before even looking at it?
□ Get stuck between tasks?

Each pattern needs a DIFFERENT scaffold.

Free checklist tells you:
✓ Which resistance pattern your child has
✓ What's actually happening in their brain
✓ Exactly what scaffold to start with

Grab it free - no email required.`,
    cta: "Download Free Checklist",
    ctaUrl: "https://www.MzMarianna.com/quiz",
    hashtags: ["freeprintable", "homeworkhelp", "parentingresource"],
    designTemplate: "instagram_static_checklist"
  },
  {
    day: 6,
    platform: ["instagram"],
    format: "stories",
    headline: "Why I Wrote 'Stop Homework Battles'",
    body: `Behind the scenes story...
I've watched 500+ families fight this battle.
Same story: smart kid, nightly meltdown.
Rewards don't work. Consequences make it worse.
So I studied what DOES work.
Scaffolding. Not motivation.
Wrote this ebook in 6 weeks.
63 pages. Zero fluff. Just the protocol.`,
    cta: "Get the Book",
    ctaUrl: "https://www.MzMarianna.com/quiz",
    hashtags: ["behindthescenes", "authorsofinstagram"],
    designTemplate: "instagram_story_series"
  },
  {
    day: 7,
    platform: ["pinterest"],
    format: "pin",
    headline: "Stop Homework Battles in 48 Hours",
    body: "The scaffolding framework that ends nightly meltdowns—even if rewards, consequences, and 'just try' have failed.",
    cta: "Take the Free Quiz",
    ctaUrl: "https://www.MzMarianna.com/quiz",
    hashtags: ["homeworkhelp", "parentinghacks", "homeschool"],
    designTemplate: "pinterest_vertical_pin"
  },

  // WEEK 2: "Decode the Resistance"
  {
    day: 8,
    platform: ["instagram", "facebook"],
    format: "carousel",
    headline: "YOUR CHILD'S HOMEWORK RESISTANCE IS A CODE",
    body: `What they DO tells you what they NEED

If they shut down when instructions are verbal...
→ They need PROCESS scaffolding (visual checklists)

If they melt down after 10 minutes...
→ They need CAPACITY scaffolding (hard stops, breaks)

If they refuse before even looking...
→ They need EMOTIONAL scaffolding (start with easiest task)

If they can't transition between problems...
→ They need EXECUTIVE FUNCTION scaffolding (body doubling)

Stop treating the behavior. Address the need.`,
    cta: "Decode Your Child's Pattern",
    ctaUrl: "https://www.MzMarianna.com/quiz",
    hashtags: ["homeworkdecoder", "parentingframework"],
    designTemplate: "instagram_carousel_framework"
  },
  {
    day: 9,
    platform: ["tiktok", "instagram"],
    format: "reel",
    headline: "Homework Translation Guide",
    body: `THEY SAY: "I don't have homework"
THEY MEAN: I was overwhelmed in class and didn't process instructions

THEY SAY: "I'll do it later"
THEY MEAN: I need time to mentally prepare for how hard this is

THEY SAY: "This is stupid"
THEY MEAN: I don't understand it and feeling stupid makes me angry

THEY SAY: [silence, shutdown]
THEY MEAN: I've hit my limit and can't articulate what I need`,
    cta: "Learn the Protocol",
    ctaUrl: "https://www.MzMarianna.com/quiz",
    hashtags: ["parentingtranslation", "understandingyourchild"],
    designTemplate: "tiktok_translation_video"
  },
  {
    day: 10,
    platform: ["facebook", "instagram"],
    format: "long_form_story",
    headline: "CASE STUDY: From 2-Hour Battles to 30 Minutes",
    body: `Meet Jenna: 8-year-old son with ADHD
Before: 2-3 hours of homework every night, tears, yelling, shutdowns
Tried: rewards, consequences, timers - nothing worked

What changed: She discovered her son had EXECUTIVE FUNCTION resistance

ONE scaffold from Chapter 5: "Body doubling" - she sat in the same room doing her own work

Results:
• Night 1: 45 minutes, zero tears
• Night 2: 30 minutes
• Week 2: He started asking her to sit with him
• Month 1: Working independently for 15-20 min stretches

Jenna's words: "I thought I was enabling him. Turns out I was scaffolding."`,
    cta: "Get the Full Protocol",
    ctaUrl: "https://www.MzMarianna.com/quiz",
    hashtags: ["casestudy", "parentingwin", "realresults"],
    designTemplate: "instagram_carousel_case_study"
  },

  // Add more days 11-30 as needed...
];

// Meta Business Suite API Integration
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_PAGE_ID = process.env.META_PAGE_ID;
const META_INSTAGRAM_ACCOUNT_ID = process.env.META_INSTAGRAM_ACCOUNT_ID;

// Content Publisher Intent
const contentPublisher: ContentPublisherIntent = {
  async onPublish(opts) {
    const { designId, brandId } = opts;

    try {
      console.log("Publishing content from Canva design:", designId);

      // Get the current day from your content calendar
      const today = getCurrentContentDay();
      const contentItem = CONTENT_CALENDAR.find(item => item.day === today);

      if (!contentItem) {
        console.log("No content scheduled for today");
        return { state: "completed" };
      }

      // Export design from Canva
      const exportUrl = await exportCanvaDesign(designId);

      // Publish to each platform
      const results = await Promise.all(
        contentItem.platform.map(platform => 
          publishToPlatform(platform, contentItem, exportUrl)
        )
      );

      console.log("Published to platforms:", results);

      // Save to database for tracking
      await savePublishedContent({
        day: contentItem.day,
        platforms: contentItem.platform,
        designId: designId,
        exportUrl: exportUrl,
        results: results,
      });

      return {
        state: "completed",
        message: `Published to ${contentItem.platform.join(", ")}`,
      };

    } catch (error) {
      console.error("Publishing error:", error);
      return {
        state: "failed",
        message: error.message,
      };
    }
  },

  async canPublish(opts) {
    // Check if user has connected their social media accounts
    const hasMetaToken = !!META_ACCESS_TOKEN;
    const hasInstagram = !!META_INSTAGRAM_ACCOUNT_ID;

    if (!hasMetaToken) {
      return {
        canPublish: false,
        reason: "Please connect your Facebook/Instagram account in Settings",
      };
    }

    return { canPublish: true };
  },
};

// Helper Functions

function getCurrentContentDay(): number {
  // Calculate which day of the 30-day calendar we're on
  // This could be based on launch date stored in database
  const launchDate = new Date(process.env.LAUNCH_DATE || Date.now());
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - launchDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return (diffDays % 30) + 1; // Loop through 30-day calendar
}

async function exportCanvaDesign(designId: string): Promise<string> {
  // Use Canva API to export the design
  const response = await fetch(`https://api.canva.com/v1/designs/${designId}/export`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.CANVA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      format: "png",
      quality: "high",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to export Canva design");
  }

  const data = await response.json();
  return data.export_url;
}

async function publishToPlatform(
  platform: string,
  content: typeof CONTENT_CALENDAR[0],
  imageUrl: string
): Promise<{ platform: string; success: boolean; postId?: string }> {
  
  switch (platform) {
    case "facebook":
      return await publishToFacebook(content, imageUrl);
    
    case "instagram":
      return await publishToInstagram(content, imageUrl);
    
    case "tiktok":
      return await publishToTikTok(content, imageUrl);
    
    case "pinterest":
      return await publishToPinterest(content, imageUrl);
    
    default:
      console.warn(`Platform ${platform} not implemented yet`);
      return { platform, success: false };
  }
}

async function publishToFacebook(
  content: typeof CONTENT_CALENDAR[0],
  imageUrl: string
): Promise<{ platform: string; success: boolean; postId?: string }> {
  
  if (!META_ACCESS_TOKEN || !META_PAGE_ID) {
    return { platform: "facebook", success: false };
  }

  try {
    // Upload photo to Facebook
    const uploadResponse = await fetch(
      `https://graph.facebook.com/v18.0/${META_PAGE_ID}/photos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: imageUrl,
          caption: `${content.body}\n\n${content.hashtags.map(h => `#${h}`).join(" ")}`,
          link: content.ctaUrl,
          access_token: META_ACCESS_TOKEN,
        }),
      }
    );

    const data = await uploadResponse.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return {
      platform: "facebook",
      success: true,
      postId: data.id,
    };
  } catch (error) {
    console.error("Facebook publish error:", error);
    return { platform: "facebook", success: false };
  }
}

async function publishToInstagram(
  content: typeof CONTENT_CALENDAR[0],
  imageUrl: string
): Promise<{ platform: string; success: boolean; postId?: string }> {
  
  if (!META_ACCESS_TOKEN || !META_INSTAGRAM_ACCOUNT_ID) {
    return { platform: "instagram", success: false };
  }

  try {
    // Create Instagram container
    const containerResponse = await fetch(
      `https://graph.facebook.com/v18.0/${META_INSTAGRAM_ACCOUNT_ID}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imageUrl,
          caption: `${content.body}\n\n${content.hashtags.map(h => `#${h}`).join(" ")}\n\n🔗 Link in bio`,
          access_token: META_ACCESS_TOKEN,
        }),
      }
    );

    const containerData = await containerResponse.json();

    if (containerData.error) {
      throw new Error(containerData.error.message);
    }

    // Publish the container
    const publishResponse = await fetch(
      `https://graph.facebook.com/v18.0/${META_INSTAGRAM_ACCOUNT_ID}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: containerData.id,
          access_token: META_ACCESS_TOKEN,
        }),
      }
    );

    const publishData = await publishResponse.json();

    return {
      platform: "instagram",
      success: true,
      postId: publishData.id,
    };
  } catch (error) {
    console.error("Instagram publish error:", error);
    return { platform: "instagram", success: false };
  }
}

async function publishToTikTok(
  content: typeof CONTENT_CALENDAR[0],
  imageUrl: string
): Promise<{ platform: string; success: boolean; postId?: string }> {
  // TikTok API integration
  // Note: TikTok requires OAuth and video content
  console.log("TikTok publishing not yet implemented");
  return { platform: "tiktok", success: false };
}

async function publishToPinterest(
  content: typeof CONTENT_CALENDAR[0],
  imageUrl: string
): Promise<{ platform: string; success: boolean; postId?: string }> {
  // Pinterest API integration
  const PINTEREST_ACCESS_TOKEN = process.env.PINTEREST_ACCESS_TOKEN;
  const PINTEREST_BOARD_ID = process.env.PINTEREST_BOARD_ID;

  if (!PINTEREST_ACCESS_TOKEN || !PINTEREST_BOARD_ID) {
    return { platform: "pinterest", success: false };
  }

  try {
    const response = await fetch("https://api.pinterest.com/v5/pins", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PINTEREST_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_id: PINTEREST_BOARD_ID,
        title: content.headline,
        description: content.body,
        link: content.ctaUrl,
        media_source: {
          source_type: "image_url",
          url: imageUrl,
        },
      }),
    });

    const data = await response.json();

    return {
      platform: "pinterest",
      success: true,
      postId: data.id,
    };
  } catch (error) {
    console.error("Pinterest publish error:", error);
    return { platform: "pinterest", success: false };
  }
}

async function savePublishedContent(data: any) {
  // Save to Supabase for tracking
  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/published_content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.SUPABASE_ANON_KEY!,
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        content_day: data.day,
        platforms: data.platforms,
        canva_design_id: data.designId,
        export_url: data.exportUrl,
        publish_results: data.results,
        published_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.warn("Failed to save published content to database");
    }
  } catch (error) {
    console.error("Database save error:", error);
  }
}

export default contentPublisher;
