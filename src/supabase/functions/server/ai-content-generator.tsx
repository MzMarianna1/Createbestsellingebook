/**
 * AI Content Generator
 * Generates on-brand social media content using AI
 */

// Brand guidelines embedded directly
const brandGuidelines = {
  brand: {
    name: "Mz. Marianna's Learning Kingdom",
    founder: "Marianna Vitale",
    tagline: "Teaching differently. Built different.",
    mission: "Empower parents to end homework battles and create confident, independent learners without tears, fights, or frustration",
    voice: {
      primary: "Bold, authoritative, zero fluff, no apology",
      tone: ["Direct", "Empowering", "Real", "Unapologetic", "Manifesto-style"],
      avoid: ["Wishy-washy", "Apologetic", "Fluffy", "Corporate-speak", "Overly academic"]
    }
  },
  messaging: {
    content_pillars: {
      teaching: { percentage: 40, description: "Practical tips from ebook", examples: [] },
      motivational: { percentage: 25, description: "Empowering messages", examples: [] },
      educational: { percentage: 20, description: "Why methods fail", examples: [] },
      lifestyle: { percentage: 10, description: "Relatable moments", examples: [] },
      inspirational: { percentage: 5, description: "Success stories", examples: [] }
    },
    key_phrases: [
      "Stop homework battles",
      "Teaching differently. Built different.",
      "No more tears. No more fights.",
      "Confident, independent learners"
    ]
  },
  calls_to_action: {
    primary: ["Take the quiz: www.MzMarianna.com/quiz"],
    engagement: ["Drop a 🙋‍♀️ if this is you", "Save this for the next homework meltdown"],
    educational: ["Want the full framework? Link in bio"]
  },
  content_formats: {
    story: { description: "Quick tips (1080x1920)", best_for: ["Quick tips", "Quotes"] },
    reel: { description: "Short video (1080x1920)", best_for: ["Teaching", "How-tos"], hook_formulas: ["If your kid [problem], try this →"] },
    carousel: { description: "Multi-slide (1080x1080)", best_for: ["Step-by-step", "Lists"] },
    feed_post: { description: "Single image (1080x1080)", best_for: ["Quotes", "Single tips"] }
  },
  hashtag_strategy: {
    primary: ["#homeworkhelp", "#parentingtips", "#educationmatters", "#learningkingdom", "#teachingdifferently"]
  },
  best_practices: {
    reach_optimization: [
      "Lead with strong hooks",
      "Keep captions under 125 characters for readability",
      "Include CTA in first line"
    ]
  }
};

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface ContentRequest {
  day: number;
  contentType: 'teaching' | 'motivational' | 'educational' | 'lifestyle' | 'inspirational';
  format: 'story' | 'reel' | 'carousel' | 'feed_post';
  ebookContext?: string;
}

interface GeneratedContent {
  day: number;
  contentType: string;
  format: string;
  hook: string;
  caption: string;
  hashtags: string[];
  cta: string;
  visualPrompt: string;
  carouselSlides?: Array<{
    slideNumber: number;
    headline: string;
    bodyText: string;
    visualPrompt: string;
  }>;
  psychologicalTriggers: string[];
  emotionalHookType: string;
}

/**
 * Generate AI content based on brand guidelines
 */
export async function generateContent(request: ContentRequest): Promise<GeneratedContent> {
  const { day, contentType, format, ebookContext } = request;
  
  // Build system prompt with brand guidelines
  const systemPrompt = buildSystemPrompt();
  
  // Build user prompt for specific content
  const userPrompt = buildUserPrompt(day, contentType, format, ebookContext);
  
  // Call OpenAI API
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiKey) {
    throw new Error('OPENAI_API_KEY not configured');
  }
  
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    console.error('OpenAI API error:', data);
    throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
  }
  
  const content = JSON.parse(data.choices[0].message.content);
  
  return {
    day,
    contentType,
    format,
    ...content,
  };
}

/**
 * Build system prompt with complete brand guidelines
 */
function buildSystemPrompt(): string {
  const { brand, messaging, calls_to_action, content_formats, hashtag_strategy, best_practices } = brandGuidelines;
  
  return `You are Marianna Vitale - a master storyteller, revolutionary educator, and expert social media content creator for "Mz. Marianna's Learning Kingdom."

🎯 YOUR MISSION: Create emotionally engaging, story-driven content that CONNECTS with exhausted parents on a deep level and positions you as the solution to their homework battles.

BRAND IDENTITY:
- Tagline: "${brand.tagline}"
- Mission: ${brand.mission}
- Voice: ${brand.voice.primary}
- Tone: ${brand.voice.tone.join(', ')}
- NEVER use: ${brand.voice.avoid.join(', ')}

🎭 STORYTELLING FRAMEWORK - USE THIS FOR EVERY POST:

THE VILLAIN (The enemy we're fighting):
Primary: The traditional homework system that fails neurodivergent learners
Secondary villains:
- One-size-fits-all teaching methods
- Compliance-based education designed for factory workers
- Shame and pressure from schools
- The myth that "good parents" make their kids finish homework
- Rewards/punishment cycles that kill intrinsic motivation

PAIN POINTS (Make them feel SEEN):
- The daily 5pm dread when homework time approaches
- Watching your bright child shut down and say "I'm stupid"
- Fighting over homework until everyone's in tears
- Missing family dinners because of 3-hour battles
- Child hiding backpack or "forgetting" assignments
- Teachers saying "Your child just needs to try harder" when you KNOW something's wrong
- Googling "Why does my child hate homework" at 11pm
- The guilt: "Am I a bad parent for letting them skip it?"
- Child's self-esteem crumbling
- Partners fighting about whose turn to "deal with homework"
- Being the homework enforcer instead of a parent

THE HERO (Your solution - The Scaffold Method):
Origin story: Marianna's journey from overwhelmed teacher watching bright students fail, to revolutionary educator who cracked the code
Core principles:
- Process Scaffolding: Break tasks into steps their brain can handle
- Capacity Scaffolding: Honor their energy and executive function limits
- Emotional Scaffolding: Create safety so learning can happen
- Intrinsic Motivation: Replace compliance with curiosity

Personal anecdotes to weave in:
- The night Marianna watched her own daughter say "I hate reading" after years of loving books - the moment everything changed
- The student who went from daily meltdowns to asking for extra challenges in 3 weeks
- The parent who texted: "He finished homework independently for the first time in 4 years. I cried."

TRANSFORMATION JOURNEY (Before → During → After):
Before: 2-3 hour homework battles, daily tears, child's self-esteem destroyed, parent feels like failure
During: First small wins, resistance decreases, confidence builds, parent shifts from enforcer to supporter
After: Homework done independently in 30 min, child asks for challenges, confident learner, relationship healed

📊 EMOTIONAL HOOKS - CHOOSE ONE TYPE PER POST:

Transformation: "From 'I hate myself' to 'I'm actually good at this'"
Pain Point: "You dread 5pm more than your kid does"
Villain: "The homework system is gaslighting you"
Relatability: "Your Pinterest-perfect homework station sits empty while you battle on the couch"
Identity: "You're not 'just a parent' - you're your child's fiercest advocate"
FOMO: "Parents who switched to this method 3 weeks ago are already seeing results"

🔥 PSYCHOLOGICAL TRIGGERS (Use ALL of these):
- FOMO: What other parents have discovered that you haven't yet
- Relatability: The exact scenario you lived through last Tuesday
- Dopamine: Quick wins, immediate validation, shareable moments
- Contrast: Before (chaos) vs After (peace)
- Social Proof: Real parent stories, "You're not the only one"
- Authority: Marianna's 15 years teaching, revolutionary methods
- Scarcity: "Most parents don't know this is possible. You do now."
- Curiosity: Cliffhangers, surprising stats, myth-busting

🎨 THREE-PART POST STRUCTURE (MANDATORY):

PART 1 - THE CHALLENGE (Make them feel SEEN):
- Open with a specific scenario they've lived
- Show the emotional impact
- Introduce the villain making it worse
- Validate: "You're not crazy. This IS hard."

Example opening: "It's 7pm. Homework that should take 20 minutes has turned into a 2-hour battle. Your kid is in tears. You're exhausted. The teacher's note says 'He just needs to focus more.' But you KNOW your bright, creative child isn't lazy. The system is gaslighting you both."

PART 2 - THE SOLUTION (Position yourself as the hero):
- Share the breakthrough moment
- Explain what makes this different from what they've tried
- Personal story: "Here's how I figured this out"
- The perspective shift that changes everything

Example: "I spent 15 years watching this happen. Bright kids labeled 'difficult.' Until I realized: they're not broken. The homework system is. So I built something different. The Scaffold Method doesn't force compliance - it builds capacity."

PART 3 - THE RESULTS (Create hope):
- Specific results (time reduced, tears stopped, confidence grew)
- Emotional transformation for both parent and child
- What life looks like now
- Future vision: "This is what's possible for you too"

Example: "Now? Homework done independently in 30 minutes. No tears. No fights. And last week he asked for EXTRA challenges. Because when you teach differently, everything shifts."

💬 PARENT LANGUAGE (Use these culturally connecting phrases):
- "The 5pm dread"
- "Googling parenting questions at midnight"
- "Crying in the school parking lot"
- "The Pinterest fail (reward charts that don't work)"
- "Texting other parents: 'Is homework like this for you?'"
- "The guilt spiral"
- "School pickup anxiety"
- "Teacher emails that make your stomach drop"
- "The look on your kid's face when they say 'I'm stupid'"

🎯 CLOSING IMPACT STATEMENTS (Pick one type):

Action-based:
"Take the quiz. Find out your parenting scaffold type. Start tonight."
"Save this for the next homework meltdown. You'll need it."
"Share this with a parent who's drowning. They need to see it."

Transformation-based:
"Your kid isn't broken. The system is. Let's fix it."
"The homework battles can end. I'll show you how."
"Your breakthrough is closer than you think. Start here."

Validation-based:
"You were right to trust your instincts. Now let's prove it."
"If this made you tear up, you're not alone. None of us are."
"Screenshot this. Read it when the teacher emails you again."

Revolutionary-based:
"Teaching differently IS built different. Join the revolution."
"We're rewriting the rules of homework. You in?"
"Your family doesn't have to play by their rules anymore."

🎯 REVOLUTIONARY EDUCATOR POSITIONING (Weave this in):
"I've spent 15 years watching the system fail bright kids. Then I built something that actually works."
"Traditional education was designed for factory workers. Your kid needs critical thinking, not compliance."
"I'm not here to make you a better homework enforcer. I'm here to make homework irrelevant."
"What if everything you were told about homework was wrong?"

PRIMARY CTA: www.MzMarianna.com/quiz

CRITICAL RULES:
1. NO marketing jargon - don't say "call to action" or "value proposition"
2. Tell stories, not sales pitches
3. Make them FEEL something (seen, validated, hopeful, angry at the system)
4. Use the 3-part structure: Challenge → Solution → Results
5. End with clear directive (what to do next) without being salesy
6. Cultural connection - speak like a fellow parent who's been there
7. Bold, direct, unapologetic voice
8. FOMO + relatability + dopamine + contrast in every post

OUTPUT FORMAT (JSON):
{
  "hook": "Emotion-based first line that stops the scroll",
  "caption": "Full caption with Challenge/Solution/Results structure, line breaks, emojis, cultural connection, and powerful closing",
  "hashtags": ["array", "of", "10-15", "hashtags"],
  "cta": "Clear action step (not labeled as CTA)",
  "visualPrompt": "Detailed design description for Canva (white background, charcoal text, teal accents)",
  "carouselSlides": [optional array for carousel: slideNumber, headline, bodyText, visualPrompt],
  "psychologicalTriggers": ["which triggers you used: fomo, relatability, etc"],
  "emotionalHookType": "transformation/pain_point/villain/relatability/identity/fomo"
}`;
}

/**
 * Build user prompt for specific content request
 */
function buildUserPrompt(
  day: number,
  contentType: string,
  format: string,
  ebookContext?: string
): string {
  const formatInfo = brandGuidelines.content_formats[format as keyof typeof brandGuidelines.content_formats];
  
  let prompt = `Create ${contentType} content in ${format} format for Day ${day} of our 30-day content calendar.

FORMAT: ${formatInfo?.description || format}
CONTENT TYPE: ${contentType}
`;

  if (format === 'carousel') {
    prompt += `
CREATE A CAROUSEL POST:
- Total slides: 7-10
- Slide 1: Bold hook that stops the scroll
- Slides 2-8: Valuable tips/steps/insights (one per slide)
- Slide 9: Summary
- Slide 10: Strong CTA with quiz link

For carouselSlides array, provide:
- slideNumber (1-10)
- headline (bold, all caps for slide 1, title case for others)
- bodyText (2-3 lines max per slide, use bullet points where helpful)
- visualPrompt (describe layout: text placement, accent colors, icons/emojis)
`;
  }

  if (format === 'reel') {
    prompt += `
CREATE A REEL CONCEPT:
- Hook in first 3 seconds
- Clear value delivered quickly
- 30-60 seconds total
- Include visual directions for scenes
- Use trending reel formulas: "${brandGuidelines.content_formats.reels.hook_formulas?.join('" | "')}"

Provide visualPrompt as a scene-by-scene breakdown.
`;
  }

  if (format === 'story') {
    prompt += `
CREATE A STORY:
- Quick, snackable content
- 15 seconds max
- Single powerful message
- Strong visual impact
- Encourage interaction (polls, questions, swipe-ups)
`;
  }

  if (ebookContext) {
    prompt += `
EBOOK CONTEXT TO REFERENCE:
${ebookContext}

Pull insights, quotes, or frameworks from this content. Make it feel authentic and valuable.
`;
  }

  prompt += `
REMEMBER:
- Voice: Bold, authoritative, zero fluff
- Always include value + engagement + CTA
- Use emojis strategically (not excessively)
- Line breaks for readability
- Primary CTA: www.MzMarianna.com/quiz

Return ONLY valid JSON with the structure specified in system prompt.`;

  return prompt;
}

/**
 * Generate 30-day content calendar with strategic mix
 */
export async function generate30DayCalendar(): Promise<GeneratedContent[]> {
  const calendar: GeneratedContent[] = [];
  
  // Strategic content mix based on percentages
  const contentMix = [
    // Week 1: Strong teaching foundation (40% teaching, 25% motivational, 20% educational, 10% lifestyle, 5% inspirational)
    { day: 1, type: 'teaching', format: 'carousel' }, // Big impact starter
    { day: 2, type: 'motivational', format: 'reel' },
    { day: 3, type: 'teaching', format: 'feed_post' },
    { day: 4, type: 'educational', format: 'carousel' },
    { day: 5, type: 'lifestyle', format: 'story' },
    { day: 6, type: 'teaching', format: 'reel' },
    { day: 7, type: 'motivational', format: 'feed_post' },
    
    // Week 2: Deepen engagement
    { day: 8, type: 'teaching', format: 'carousel' },
    { day: 9, type: 'educational', format: 'reel' },
    { day: 10, type: 'teaching', format: 'feed_post' },
    { day: 11, type: 'motivational', format: 'reel' },
    { day: 12, type: 'lifestyle', format: 'story' },
    { day: 13, type: 'teaching', format: 'carousel' },
    { day: 14, type: 'inspirational', format: 'feed_post' }, // Weekend inspiration
    
    // Week 3: Build authority
    { day: 15, type: 'teaching', format: 'reel' },
    { day: 16, type: 'educational', format: 'carousel' },
    { day: 17, type: 'teaching', format: 'feed_post' },
    { day: 18, type: 'motivational', format: 'reel' },
    { day: 19, type: 'lifestyle', format: 'story' },
    { day: 20, type: 'teaching', format: 'carousel' },
    { day: 21, type: 'educational', format: 'feed_post' },
    
    // Week 4: Drive conversions
    { day: 22, type: 'teaching', format: 'reel' },
    { day: 23, type: 'motivational', format: 'carousel' },
    { day: 24, type: 'teaching', format: 'feed_post' },
    { day: 25, type: 'educational', format: 'reel' },
    { day: 26, type: 'lifestyle', format: 'story' },
    { day: 27, type: 'teaching', format: 'carousel' },
    { day: 28, type: 'inspirational', format: 'reel' },
    
    // Final push
    { day: 29, type: 'motivational', format: 'feed_post' },
    { day: 30, type: 'teaching', format: 'carousel' }, // Strong closer with CTA
  ];
  
  // Generate content for each day
  for (const item of contentMix) {
    console.log(`Generating content for Day ${item.day}: ${item.type} - ${item.format}`);
    
    try {
      const content = await generateContent({
        day: item.day,
        contentType: item.type as any,
        format: item.format as any,
        ebookContext: getRelevantEbookContext(item.type, item.day),
      });
      
      calendar.push(content);
      
      // Rate limiting: Wait 1 second between API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Error generating content for Day ${item.day}:`, error);
      // Continue with next day instead of failing entirely
    }
  }
  
  return calendar;
}

/**
 * Get relevant ebook context based on content type and day
 */
function getRelevantEbookContext(contentType: string, day: number): string {
  // Sample ebook insights - in production, this would pull from actual ebook content
  const ebookInsights: Record<string, string[]> = {
    teaching: [
      "The 5-Minute Rule: Start with just 5 minutes of focused work. Most resistance melts when the task feels manageable.",
      "Intrinsic Motivation Framework: Replace rewards with autonomy, mastery, and purpose. Kids who choose HOW to complete work develop ownership.",
      "The Question Method: Instead of 'Did you do your homework?' ask 'What's your plan for homework tonight?' Shifts from interrogation to collaboration.",
      "Energy Mapping: Identify your child's peak focus times. Honor their natural rhythms instead of fighting them.",
      "Break the Overwhelm Cycle: Teach them to break large assignments into micro-tasks. Momentum builds confidence.",
    ],
    motivational: [
      "You're not failing as a parent. The traditional homework system was designed for a different kind of learner - and your child is teaching YOU to evolve.",
      "Every homework battle is data. Your child is communicating something important. Listen.",
      "The fact that you're here, seeking better ways, proves you're exactly the parent your child needs.",
      "Progress isn't linear. Some days will feel like backsliding. That's not failure - it's part of the learning process.",
      "Your child's resistance isn't defiance. It's a signal that something in the approach needs to shift.",
    ],
    educational: [
      "Research shows homework has ZERO correlation with academic achievement in elementary school. The battles aren't worth it.",
      "Neuroscience reveals: A stressed brain cannot learn. Those tears during homework? That's cortisol blocking neural pathways.",
      "Traditional education was designed for factory workers - compliance and conformity. Your child needs critical thinking and creativity instead.",
      "The forgetting curve: Without application, kids forget 75% of what they 'learned' within 48 hours. Engagement > compliance.",
      "Executive function skills peak at different ages. What works for one child at 8 might not work for yours until 10. That's biology, not behavior.",
    ],
    lifestyle: [
      "Real talk: I've had nights where 'homework help' meant both of us crying over long division. You're not alone.",
      "Some days the win is getting through it without yelling. That counts.",
      "The moment when they finally GET it - and you see their face light up - that's why we keep showing up.",
      "Tea. Deep breaths. Noise-canceling headphones. Whatever gets you through homework time without losing your mind is valid.",
      "Behind every 'homework success story' are 47 nights that didn't go as planned. We only share the wins, but the struggles are universal.",
    ],
    inspirational: [
      "Last year she hid her backpack to avoid homework. This year she asks for extra challenges. This is what's possible.",
      "He went from 2-hour meltdowns to independent completion in 21 days. The transformation is real.",
      "She told me last week: 'Mom, I'm actually GOOD at this.' That's the power of teaching differently.",
      "Your breakthrough is closer than you think. Most families see shifts within the first week.",
      "This isn't about fixing your child. It's about honoring how they learn. And that changes everything.",
    ],
  };
  
  const insights = ebookInsights[contentType] || ebookInsights.teaching;
  const index = (day - 1) % insights.length;
  
  return insights[index];
}