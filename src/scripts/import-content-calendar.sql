-- Import 30-Day Content Calendar to Supabase
-- Run this in Supabase SQL Editor after creating the content_schedule table

-- Clear existing data (if re-importing)
TRUNCATE content_schedule;

-- WEEK 1: "The Homework Battle is Real"

-- Day 1: 3 Signs Homework is Traumatizing Your Child
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(1, ARRAY['instagram', 'facebook', 'tiktok'], 'carousel', '3 SIGNS HOMEWORK IS TRAUMATIZING YOUR CHILD', 
'If you see these 3 things, homework isn''t just hard—it''s harmful.

Sign #1: They say "I''m stupid" (Even when they''re smart. Repeated failure creates shame.)

Sign #2: Physical symptoms (Stomach aches, headaches before homework time. Their body is in fight-or-flight.)

Sign #3: Complete avoidance (Hiding assignments, "forgetting," lying about homework. Protection mechanism.)

This isn''t laziness. This is trauma response.

Take the quiz to discover which scaffold YOUR child needs.', 
'Take the Quiz', 'https://www.MzMarianna.com/quiz', 
ARRAY['homeworkbattles', 'parentingtips', 'ADHDparenting', 'executivefunction'], 
'instagram_carousel_10slides');

-- Day 2: Testimonial Video
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(2, ARRAY['instagram', 'tiktok'], 'video', 'From 2 Hours to 30 Minutes in ONE NIGHT',
'Last week a mom messaged me: "Homework went from 2 hours of screaming to 30 minutes with zero tears. That was NIGHT ONE."

What changed? She stopped trying to motivate her son and started scaffolding instead.

Chapter 4 in ''Stop Homework Battles'' has the exact protocol she used.',
'Get the Protocol', 'https://www.MzMarianna.com/quiz',
ARRAY['homeworkhelp', 'parentingwin', 'testimonial'],
'instagram_story_video');

-- Day 3: Facebook Group Post
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(3, ARRAY['facebook'], 'text_post', 'Question for parents of struggling students',
'Does your child shut down when you mention homework?

I''m talking about the blank stare, the "I don''t have any," the sudden need to go to the bathroom, the tears before they even look at it.

That''s not defiance. That''s a nervous system protecting itself from re-living failure.

Here''s what most parents don''t realize: motivation doesn''t fix this. Your child doesn''t need to "try harder." They need scaffolding.

Here''s the #1 shift:

❌ Don''t ask "Do you have homework?" (their brain hears: "Are you ready to fail again?")

✅ Instead: "Let''s take a look together and figure out what needs to happen first." (their brain hears: "I''m not alone in this.")

Anyone else dealing with this?',
'Free Quiz', 'https://www.MzMarianna.com/quiz',
ARRAY['parenting', 'homework', 'homeworkhelp'],
NULL);

-- Day 4: Homework Myths Reel
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(4, ARRAY['instagram', 'tiktok'], 'reel', 'Homework Myths That Make It WORSE',
'Myth #1: "They need to learn responsibility"
Reality: Can''t build responsibility without competence first

Myth #2: "Sitting with them makes them dependent"
Reality: Scaffolding builds independence. Drowning doesn''t.

Myth #3: "Natural consequences will teach them"
Reality: All they learn is "I''m a failure"

Myth #4: "Rewards will motivate them"
Reality: They don''t need motivation. They need reduced barriers.

Your child isn''t lazy. The system missed their wiring.',
'Learn the Protocol', 'https://www.MzMarianna.com/quiz',
ARRAY['homeworkmyths', 'parentingtips', 'scaffolding'],
'instagram_reel_quick_cuts');

-- Day 5: Free Download
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(5, ARRAY['instagram', 'facebook', 'pinterest'], 'static_image', 'FREE DOWNLOAD: The Homework Resistance Decoder',
'Does your child:
□ Shut down when instructions are verbal?
□ Melt down after 10 minutes?
□ Refuse before even looking at it?
□ Get stuck between tasks?

Each pattern needs a DIFFERENT scaffold.

Free checklist tells you:
✓ Which resistance pattern your child has
✓ What''s actually happening in their brain
✓ Exactly what scaffold to start with

Grab it free - no email required.',
'Download Free Checklist', 'https://www.MzMarianna.com/quiz',
ARRAY['freeprintable', 'homeworkhelp', 'parentingresource'],
'instagram_static_checklist');

-- Day 6: Behind the Scenes
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(6, ARRAY['instagram'], 'stories', 'Why I Wrote Stop Homework Battles',
'Behind the scenes story...
I''ve watched 500+ families fight this battle.
Same story: smart kid, nightly meltdown.
Rewards don''t work. Consequences make it worse.
So I studied what DOES work.
Scaffolding. Not motivation.
Wrote this ebook in 6 weeks.
63 pages. Zero fluff. Just the protocol.',
'Get the Book', 'https://www.MzMarianna.com/quiz',
ARRAY['behindthescenes', 'authorsofinstagram'],
'instagram_story_series');

-- Day 7: Pinterest Pin
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(7, ARRAY['pinterest'], 'pin', 'Stop Homework Battles in 48 Hours',
'The scaffolding framework that ends nightly meltdowns—even if rewards, consequences, and ''just try'' have failed.',
'Take the Free Quiz', 'https://www.MzMarianna.com/quiz',
ARRAY['homeworkhelp', 'parentinghacks', 'homeschool'],
'pinterest_vertical_pin');

-- WEEK 2: "Decode the Resistance"

-- Day 8: Decoder Framework
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(8, ARRAY['instagram', 'facebook'], 'carousel', 'YOUR CHILD''S HOMEWORK RESISTANCE IS A CODE',
'What they DO tells you what they NEED

If they shut down when instructions are verbal...
→ They need PROCESS scaffolding (visual checklists)

If they melt down after 10 minutes...
→ They need CAPACITY scaffolding (hard stops, breaks)

If they refuse before even looking...
→ They need EMOTIONAL scaffolding (start with easiest task)

If they can''t transition between problems...
→ They need EXECUTIVE FUNCTION scaffolding (body doubling)

Stop treating the behavior. Address the need.',
'Decode Your Child''s Pattern', 'https://www.MzMarianna.com/quiz',
ARRAY['homeworkdecoder', 'parentingframework', 'scaffolding'],
'instagram_carousel_framework');

-- Day 9: Translation Guide
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(9, ARRAY['tiktok', 'instagram'], 'reel', 'Homework Translation Guide',
'THEY SAY: "I don''t have homework"
THEY MEAN: I was overwhelmed in class and didn''t process instructions

THEY SAY: "I''ll do it later"
THEY MEAN: I need time to mentally prepare for how hard this is

THEY SAY: "This is stupid"
THEY MEAN: I don''t understand it and feeling stupid makes me angry

THEY SAY: [silence, shutdown]
THEY MEAN: I''ve hit my limit and can''t articulate what I need',
'Learn the Protocol', 'https://www.MzMarianna.com/quiz',
ARRAY['parentingtranslation', 'understandingyourchild', 'homeworkhelp'],
'tiktok_translation_video');

-- Day 10: Case Study
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(10, ARRAY['facebook', 'instagram'], 'long_form_story', 'CASE STUDY: From 2-Hour Battles to 30 Minutes',
'Meet Jenna: 8-year-old son with ADHD
Before: 2-3 hours of homework every night, tears, yelling, shutdowns
Tried: rewards, consequences, timers - nothing worked

What changed: She discovered her son had EXECUTIVE FUNCTION resistance

ONE scaffold from Chapter 5: "Body doubling" - she sat in the same room doing her own work

Results:
• Night 1: 45 minutes, zero tears
• Night 2: 30 minutes
• Week 2: He started asking her to sit with him
• Month 1: Working independently for 15-20 min stretches

Jenna''s words: "I thought I was enabling him. Turns out I was scaffolding."',
'Get the Full Protocol', 'https://www.MzMarianna.com/quiz',
ARRAY['casestudy', 'parentingwin', 'realresults', 'ADHD'],
'instagram_carousel_case_study');

-- Day 11: Controversial Take
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(11, ARRAY['tiktok', 'instagram'], 'reel', 'Controversial Homework Take',
'If homework causes more trauma than learning, STOP DOING IT.

I''m serious.

Your job is not to make your child finish homework.

Your job is to protect their relationship with learning.

If homework creates:
• Nightly meltdowns
• Self-hatred
• Family conflict
• Physical symptoms

STOP. Email the teacher. Set a time limit. Do what they CAN do, not what''s assigned.

Your child''s mental health > homework completion rate.

And before you panic: I have teacher email scripts for exactly this conversation.',
'Get the Email Scripts', 'https://www.MzMarianna.com/quiz',
ARRAY['controversialopinion', 'homeworkfree', 'mentalhealth'],
'tiktok_hot_take');

-- Day 12: Free Email Script
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(12, ARRAY['facebook', 'instagram', 'pinterest'], 'static_image', 'FREE TEACHER EMAIL SCRIPT',
'Copy/paste this if homework has become a crisis:

Subject: Homework Modification Request for [Child''s Name]

Hi [Teacher],

I wanted to reach out because homework has become a crisis point at our house. [Child''s Name] is melting down and it''s affecting their mental health.

I''m not looking to reduce expectations—I''m trying to figure out what support they need to access the work.

Could we try [specific modification] for the next two weeks?

I''ll track what''s working and report back. I''d love to partner on this.

Thank you,
[Your Name]

---

This script positions you as a partner, not a complainer.

Want 4 more scripts? They''re in the ebook.',
'Get All 5 Scripts', 'https://www.MzMarianna.com/quiz',
ARRAY['teacherscripts', 'parentingresource', 'freeprintable'],
'instagram_static_script');

-- Day 13: Video Testimonial
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(13, ARRAY['instagram', 'tiktok', 'facebook'], 'video', 'Parent Testimonial',
'Before: Homework battles every single night. Tears. Yelling. Complete shutdowns.

After reading Chapter 4 and implementing the protocol: Homework done in 30 minutes. Zero tears. That was NIGHT ONE.

I can''t believe it was that simple. We weren''t fighting about homework. We were fighting about executive function. Once I scaffolded that, everything changed.
- Sarah M., mom of 2',
'Get the Same Protocol', 'https://www.MzMarianna.com/quiz',
ARRAY['testimonial', 'parentingwin', 'realresults'],
'video_testimonial_template');

-- Day 14: Weekly Recap
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(14, ARRAY['facebook', 'instagram'], 'carousel', 'Week 2 Recap: What You Learned',
'This week we covered:
✓ The Homework Resistance Decoder (4 patterns)
✓ What they say vs what they mean (translation guide)
✓ Case study: 2 hours → 30 minutes in 48 hours
✓ Controversial take: Stop if it''s causing trauma
✓ FREE teacher email script

Missed any? They''re all saved in my highlights.

Next week: The exact scaffolding protocol (step-by-step)

Haven''t taken the quiz yet? Get your child''s resistance pattern + personalized Quick-Start Guide (takes 3 minutes)',
'Take the Quiz', 'https://www.MzMarianna.com/quiz',
ARRAY['weeklyrecap', 'homeworkhelp', 'parentingtips'],
'instagram_carousel_recap');

-- Days 15-30: Add remaining content here
-- (Continue with Week 3 "The Protocol That Works" and Week 4 "Transformation Stories")

-- Week 3 preview content
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(15, ARRAY['instagram', 'tiktok'], 'reel', 'The 60-Second Brain Boot',
'Before homework starts, do this:

1. Take 3 deep breaths
2. Do 10 jumping jacks
3. Name 3 things you can see

This activates the prefrontal cortex and creates a bridge between "off" and "work mode."

Sounds too simple? Try it tonight. Report back.

This is Step 2 in the Homework Battle Protocol (Chapter 4)',
'Get the Full Protocol', 'https://www.MzMarianna.com/quiz',
ARRAY['brainboot', 'homeworktips', 'executivefunction'],
'tiktok_demo_video');

-- Verification query
SELECT 
  day,
  platforms,
  format,
  headline,
  SUBSTRING(body, 1, 50) || '...' as body_preview
FROM content_schedule
ORDER BY day;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Content calendar imported successfully!';
  RAISE NOTICE 'Total posts: %', (SELECT COUNT(*) FROM content_schedule);
  RAISE NOTICE 'Platforms: Instagram, Facebook, TikTok, Pinterest';
  RAISE NOTICE '📅 Ready for automated publishing!';
END $$;
