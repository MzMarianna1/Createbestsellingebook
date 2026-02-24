import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Printer, Gift, Smartphone } from 'lucide-react';
import { 
  EbookPage, 
  EbookTitle, 
  EbookSubtitle, 
  AccentLine,
  AuthorSignature,
  ChapterNumber,
  ChapterTitle,
  ChapterSubhead,
  BodyText,
  SectionHeading,
  ReflectionBox,
  MiniShiftBox,
  TryThisBox,
  Callout,
  Spacer,
  BulletList
} from './components/EbookComponents';

/**
 * STOP HOMEWORK BATTLES - Professional Ebook
 * 
 * PDF SPECIFICATIONS:
 * - Page Size: 800pt × 1280pt (11.11" × 17.78")
 * - Margins: 60pt top/bottom, 80pt left/right
 * - Format: PDF-ready with professional measurements
 * - Total Pages: 63 (main ebook) + 4 (bonus materials)
 * 
 * EXPORT INSTRUCTIONS:
 * See /PDF-EXPORT-GUIDE.md for detailed export instructions
 * 
 * AUTHOR: Marianna Vitale, Founder of Mz. Marianna's Learning Kingdom
 * COPYRIGHT: © 2026 - All rights reserved
 */

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [exportMode, setExportMode] = useState(false);

  const pages = [
    // COVER
    {
      type: 'cover',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-center space-y-12">
              <EbookTitle>
                STOP<br />
                HOMEWORK<br />
                BATTLES
              </EbookTitle>
              
              <div className="space-y-8">
                <EbookSubtitle>
                  How to Get Cooperation<br />
                  Without Yelling, Bribing, or<br />
                  Breaking Your Child's Spirit
                </EbookSubtitle>
                <AccentLine width="45%" />
              </div>
            </div>
            
            <AuthorSignature />
          </div>
        </EbookPage>
      )
    },

    // COPYRIGHT PAGE
    {
      type: 'copyright',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-8 pt-24">
              <div className="text-3xl font-black text-[#111111]">
                STOP HOMEWORK BATTLES
              </div>
              
              <AccentLine width="25%" />
              
              <div className="space-y-6 text-base text-[#333333] leading-relaxed max-w-xl">
                <p>
                  Copyright © 2026 Marianna Vitale<br />
                  All rights reserved.
                </p>
                
                <p>
                  No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the author, except for brief quotations in reviews and certain other noncommercial uses permitted by copyright law.
                </p>
                
                <p className="font-bold text-[#111111]">
                  Published by Mz. Marianna's Learning Kingdom
                </p>
                
                <p>
                  www.MzMarianna.com
                </p>
                
                <div className="pt-8 border-t border-[#333333]/20">
                  <p className="text-sm italic">
                    <strong>Disclaimer:</strong> This book is designed to provide helpful information on the subjects discussed. It is not meant to be used, nor should it be used, to diagnose or treat any medical or psychological condition. For diagnosis or treatment of any medical or psychological problem, consult your physician or mental health professional. The author is not responsible for any specific health needs that may require medical supervision and is not liable for any damages or negative consequences from any treatment, action, or application to any person reading or following the information in this book.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </EbookPage>
      )
    },

    // INTRO PAGE 1
    {
      type: 'intro',
      content: (
        <EbookPage>
          <div className="space-y-12">
            <Callout>
              Your child isn't lazy.<br />
              The system missed them.
            </Callout>
            
            <BodyText>
              You've tried everything. Rewards. Consequences. Sitting next to them. Walking away. Breaking homework into smaller chunks. Setting timers. You've read the books. You've asked the teacher. You've googled "why won't my kid do homework" at midnight more times than you can count.
            </BodyText>
            
            <BodyText>
              And still, every afternoon turns into a battle.
            </BodyText>
            
            <BodyText>
              Here's what no one tells you: this isn't about effort. It's not about laziness. It's not even about homework.
            </BodyText>
            
            <BodyText>
              It's about a mismatch between how schools teach and how your child's brain works.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // INTRO PAGE 2
    {
      type: 'intro',
      content: (
        <EbookPage>
          <div className="space-y-12">
            <SectionHeading>What This Book Is (And Isn't)</SectionHeading>
            
            <BodyText>
              This is not a gentle parenting manual. This is not a collection of tips that might work if your child is motivated enough. This is not theory.
            </BodyText>
            
            <BodyText>
              This is a protocol. A system. The exact framework I've used with hundreds of families where homework had become a nightly war zone.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              You'll learn:
            </BodyText>
            
            <BulletList items={[
              "Why standard homework advice fails (and what to do instead)",
              "The exact scaffolding protocol that removes resistance",
              "How to decode refusal and respond effectively",
              "What to do when they still won't cooperate",
              "How to work with teachers without sounding difficult",
              "The long-term strategy for building actual independence"
            ]} />
            
            <Spacer height="3rem" />
            
            <BodyText>
              No fluff. No theory you can't use. Just the shifts that work.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 1 OPENER
    {
      type: 'chapter-opener',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center">
            <ChapterNumber>CHAPTER 1</ChapterNumber>
            <ChapterTitle>
              Why Homework<br />
              Turns Into Battles
            </ChapterTitle>
            <Spacer height="3rem" />
            <ChapterSubhead>
              This isn't about effort. It's about readiness.
            </ChapterSubhead>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 1 - PAGE 1
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <BodyText>
              The homework battle starts the same way every time.
            </BodyText>
            
            <BodyText>
              You ask if they have homework. They say no. Or yes. Or maybe. You ask to see their planner. They can't find it. Or they didn't write it down. Or the teacher didn't assign anything (she did).
            </BodyText>
            
            <BodyText>
              You finally get them to sit down. They stare at the page. They sharpen a pencil. They need water. They need a snack. They need the bathroom. Thirty minutes later, nothing is done.
            </BodyText>
            
            <BodyText>
              You start to lose patience. They start to shut down. The tension builds. Someone raises their voice. Someone cries. The homework either gets done in a storm of frustration or it doesn't get done at all.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <SectionHeading>This is not a character flaw.</SectionHeading>
            
            <BodyText>
              Your child isn't manipulating you. They're not being difficult for fun. What looks like avoidance is often overwhelm. What looks like defiance is often protection.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 1 - PAGE 2
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>The Three Hidden Reasons Kids Avoid Homework</SectionHeading>
            
            <Spacer height="2rem" />
            
            <BodyText>
              <strong className="text-[#0d9488]">1. Executive Function Gap</strong><br />
              They can't hold the steps in their head. Starting feels impossible because they can't see the path from blank page to finished work.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">2. Processing Speed Mismatch</strong><br />
              School moves too fast. By the time they understand one concept, the class has moved to the next. Homework becomes a nightly reminder of what they missed.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">3. Shame Cycle</strong><br />
              They've failed so many times that sitting down to homework triggers a flood of "I'm stupid" feelings. Avoidance protects them from re-living that pain.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <ReflectionBox title="REFLECTION">
              Think about the last homework battle. What was your child actually saying through their behavior? "I don't know where to start"? "This makes me feel dumb"? "I'm too tired to think"?
            </ReflectionBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 1 - PAGE 3
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>What Makes It Worse</SectionHeading>
            
            <BodyText>
              Standard parenting advice tells you to:
            </BodyText>
            
            <BulletList items={[
              "Set up a homework station (they still won't use it)",
              "Use a reward chart (works for two days, then stops)",
              "Take away screen time (increases the power struggle)",
              "Let natural consequences teach them (they just fail)",
              "Make homework their responsibility (they're not ready)"
            ]} />
            
            <Spacer height="2rem" />
            
            <BodyText>
              None of this works because it doesn't address the actual problem. Your child doesn't need more motivation. They need less barrier to entry.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <MiniShiftBox>
              Instead of "Go do your homework," try: "Let's take a look together and figure out what needs to happen first."<br /><br />
              You're not doing it for them. You're lowering the activation energy.
            </MiniShiftBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 1 - PAGE 4 (NEW)
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>The Homework Resistance Decoder</SectionHeading>
            
            <BodyText>
              Your child's avoidance behavior is communication. Here's what they're actually saying:
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              <strong className="text-[#0d9488]">When they say: "I don't have any homework"</strong><br />
              They mean: "I don't know what the homework is because I was overwhelmed during class and didn't process the instructions."
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">When they say: "I'll do it later"</strong><br />
              They mean: "I need more time to mentally prepare for how hard this is going to be."
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">When they say: "This is stupid"</strong><br />
              They mean: "I don't understand this and feeling stupid makes me angry."
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">When they go silent and shut down:</strong><br />
              They mean: "I've hit my limit and I can't articulate what I need."
            </BodyText>
            
            <Spacer height="3rem" />
            
            <TryThisBox>
              Next time your child resists, pause and decode. Ask yourself: "What's the real message here?" Then respond to the need, not the behavior.
            </TryThisBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 2 OPENER
    {
      type: 'chapter-opener',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center">
            <ChapterNumber>CHAPTER 2</ChapterNumber>
            <ChapterTitle>
              The Real Reason<br />
              "Just Try" Doesn't Work
            </ChapterTitle>
            <Spacer height="3rem" />
            <ChapterSubhead>
              Effort without readiness is just suffering.
            </ChapterSubhead>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 2 - PAGE 1
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <BodyText>
              "Just try your best."
            </BodyText>
            
            <BodyText>
              You've said it a hundred times. It sounds reasonable. It sounds supportive. But to a struggling child, it sounds like:
            </BodyText>
            
            <BodyText>
              <em>"You're not trying hard enough."</em>
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              Here's the truth: they are trying. They're trying so hard it's exhausting to watch. What looks like resistance is actually cognitive overload dressed up as defiance.
            </BodyText>
            
            <BodyText>
              When a child's working memory is maxed out, their prefrontal cortex goes offline. They literally cannot access the part of their brain that plans, sequences, and self-regulates.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <Callout>
              Effort without readiness is just suffering.
            </Callout>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 2 - PAGE 2
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>What Readiness Actually Looks Like</SectionHeading>
            
            <BodyText>
              Before your child can "just try," they need:
            </BodyText>
            
            <BulletList items={[
              "A regulated nervous system (not stressed or shut down)",
              "Clear instructions broken into micro-steps",
              "A concrete starting point (not 'do your homework')",
              "Enough working memory space to hold the task",
              "A felt sense that they can succeed"
            ]} />
            
            <Spacer height="2rem" />
            
            <BodyText>
              Most kids are sent to do homework without any of these conditions met. Then we're surprised when they melt down.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <TryThisBox>
              Tonight, before homework starts, ask: "On a scale of 1-10, how full is your brain right now?"<br /><br />
              If they say 7 or higher, they need a reset before they can work. That's not avoidance. That's self-awareness.
            </TryThisBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 2 - PAGE 3
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Why "Just Start" Backfires</SectionHeading>
            
            <BodyText>
              You know the advice: "Just start with one problem. Just write one sentence. Just do five minutes."
            </BodyText>
            
            <BodyText>
              Sounds logical. Except starting is the hardest part.
            </BodyText>
            
            <BodyText>
              For a child with executive function challenges, "just start" is like telling someone with a broken leg to "just walk." The mechanism is broken. Willpower won't fix it.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              What they actually need is a pre-start routine. Something that gets their brain online before the demand hits.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <MiniShiftBox>
              Create a 60-second "brain boot" before homework:<br />
              • Take three deep breaths<br />
              • Do 10 jumping jacks<br />
              • Name three things they can see<br /><br />
              This activates the prefrontal cortex and creates a bridge between "off" and "on."
            </MiniShiftBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 3 OPENER
    {
      type: 'chapter-opener',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center">
            <ChapterNumber>CHAPTER 3</ChapterNumber>
            <ChapterTitle>
              Stop Managing<br />
              Start Scaffolding
            </ChapterTitle>
            <Spacer height="3rem" />
            <ChapterSubhead>
              Support is not the same as enabling.
            </ChapterSubhead>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 3 - PAGE 1
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <BodyText>
              You've been told that helping too much will make them dependent. That they need to learn responsibility. That struggle builds character.
            </BodyText>
            
            <BodyText>
              So you step back. You let them fail. You watch them drown.
            </BodyText>
            
            <BodyText>
              And nothing improves.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              Here's what that advice misses: you can't build independence without competence first. And you can't build competence without support.
            </BodyText>
            
            <BodyText>
              Scaffolding isn't doing the work for them. It's building the structure that lets them do the work themselves.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <Callout>
              Support is not the same as enabling.<br />
              One builds capacity. The other prevents it.
            </Callout>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 3 - PAGE 2
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>What Scaffolding Actually Looks Like</SectionHeading>
            
            <BodyText>
              <strong className="text-[#0d9488]">Level 1: Full Scaffolding</strong><br />
              You sit together. You read the instructions aloud. You talk through what needs to happen first, second, third. You break it into steps. You stay present.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">Level 2: Partial Scaffolding</strong><br />
              You help them start, then step back. You check in every 10 minutes. You're available, but not hovering.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">Level 3: Light Scaffolding</strong><br />
              They work independently, but you're in the same room. They know they can ask for help without judgment.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">Level 4: Independent</strong><br />
              They manage it themselves. You only get involved if they ask.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <ReflectionBox title="REFLECTION">
              Where is your child right now? Where do you wish they were? What's the gap? That gap is not laziness. It's the amount of scaffolding they still need.
            </ReflectionBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 3 - PAGE 3
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>The Scaffolding Mistake Everyone Makes</SectionHeading>
            
            <BodyText>
              Most parents try to jump from Level 1 to Level 4 overnight. They provide help for a week, then pull back completely, expecting independence.
            </BodyText>
            
            <BodyText>
              That's not scaffolding. That's whiplash.
            </BodyText>
            
            <BodyText>
              Real scaffolding fades slowly. You might stay at Level 1 for months. That's not failure. That's meeting your child where they are.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <TryThisBox>
              This week, commit to full scaffolding. Don't pull back. Don't test if they can do it alone. Just be present.<br /><br />
              Watch what happens to the emotional temperature in your house.
            </TryThisBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 4 OPENER
    {
      type: 'chapter-opener',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center">
            <ChapterNumber>CHAPTER 4</ChapterNumber>
            <ChapterTitle>
              The Homework<br />
              Battle Protocol
            </ChapterTitle>
            <Spacer height="3rem" />
            <ChapterSubhead>
              Step-by-step, no guessing.
            </ChapterSubhead>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 4 - PAGE 1
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <BodyText>
              You need a system. Not a vague routine. Not a "figure it out as you go" approach. A actual, repeatable protocol that removes decision fatigue for both of you.
            </BodyText>
            
            <BodyText>
              This is that system.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <SectionHeading>Step 1: The Arrival Window</SectionHeading>
            
            <BodyText>
              When your child gets home, they don't go straight to homework. They get 20-30 minutes of true downtime. No negotiations. No "just get it done first."
            </BodyText>
            
            <BodyText>
              Their nervous system has been in survival mode all day. They need to discharge that stress before they can think clearly.
            </BodyText>
            
            <MiniShiftBox>
              Let them: Move their body. Eat something. Zone out. Complain. This isn't procrastination. This is regulation.
            </MiniShiftBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 4 - PAGE 2
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Step 2: The Brain Boot</SectionHeading>
            
            <BodyText>
              Before homework starts, do the 60-second brain boot from Chapter 2. Non-negotiable. This is the bridge between "off" and "work mode."
            </BodyText>
            
            <Spacer height="3rem" />
            
            <SectionHeading>Step 3: The Inventory</SectionHeading>
            
            <BodyText>
              Sit together and list everything that needs to be done. Not in their head. On paper. Visible.
            </BodyText>
            
            <BodyText>
              Break big tasks into micro-tasks:
            </BodyText>
            
            <BulletList items={[
              "Not 'do math worksheet.' Instead: 'problems 1-5, then break.'",
              "Not 'write essay.' Instead: 'write topic sentence.'",
              "Not 'study for test.' Instead: 'read pages 12-15 out loud.'"
            ]} />
            
            <Spacer height="2rem" />
            
            <BodyText>
              The smaller the chunk, the lower the resistance.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 4 - PAGE 3
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Step 4: The First Task</SectionHeading>
            
            <BodyText>
              Pick the easiest thing. Not the most important. The easiest. Success creates momentum. Struggle creates shutdown.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <SectionHeading>Step 5: The Body Double</SectionHeading>
            
            <BodyText>
              You stay in the room. You don't teach. You don't correct. You just exist. Your presence is the scaffolding.
            </BodyText>
            
            <BodyText>
              If they get stuck, you ask: "What's the very next small thing?" You don't solve it. You shrink it.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <TryThisBox>
              Tonight, try this protocol exactly as written. Don't skip steps. Don't "improve" it. Just follow it. Notice what shifts.
            </TryThisBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 5 OPENER
    {
      type: 'chapter-opener',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center">
            <ChapterNumber>CHAPTER 5</ChapterNumber>
            <ChapterTitle>
              When They Still<br />
              Refuse
            </ChapterTitle>
            <Spacer height="3rem" />
            <ChapterSubhead>
              Refusal is information, not defiance.
            </ChapterSubhead>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 5 - PAGE 1
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <BodyText>
              You've done everything right. You scaffolded. You broke it down. You stayed calm. And they still won't do it.
            </BodyText>
            
            <BodyText>
              Now what?
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              First: pause. Refusal is not defiance. It's a nervous system saying "I can't" when the mouth says "I won't."
            </BodyText>
            
            <BodyText>
              When a child refuses, they're telling you one of three things:
            </BodyText>
            
            <BulletList items={[
              "The task is still too big (break it smaller)",
              "They're not regulated enough (they need more downtime)",
              "The shame is too loud (they need reassurance first)"
            ]} />
            
            <Spacer height="3rem" />
            
            <Callout>
              Refusal is information, not defiance.
            </Callout>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 5 - PAGE 2
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>The Refusal Decision Tree</SectionHeading>
            
            <BodyText>
              <strong className="text-[#0d9488]">If they're escalated (yelling, crying, throwing things):</strong><br />
              Stop. Do not push through. Their nervous system is offline. Homework is not happening right now. Get them regulated first, then reassess.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">If they're shut down (silent, staring, frozen):</strong><br />
              Same thing. This is also dysregulation. Pushing through will only deepen the shutdown. They need connection before compliance.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">If they're calm but resistant:</strong><br />
              Ask: "What's making this feel impossible right now?" Listen without fixing. Often just naming the barrier reduces it.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <ReflectionBox title="REFLECTION">
              Think about the last time your child refused. What was their nervous system state? What were they actually communicating?
            </ReflectionBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 5 - PAGE 3
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>What About Consequences?</SectionHeading>
            
            <BodyText>
              You've been told that if you don't enforce consequences, they'll never learn. That letting them skip homework sends the wrong message.
            </BodyText>
            
            <BodyText>
              Here's the truth: consequences don't teach skills. They teach fear.
            </BodyText>
            
            <BodyText>
              Your child already knows homework is important. What they don't know is how to do it when their brain won't cooperate.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              If the homework truly can't happen tonight, let it go. Email the teacher. Explain the situation. Protect the relationship over the assignment.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <MiniShiftBox>
              Try this email template:<br /><br />
              "Hi [Teacher], [Child] wasn't able to complete last night's homework. We're working on building executive function skills, and last night we prioritized regulation over completion. They'll try again tonight."
            </MiniShiftBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 6 OPENER
    {
      type: 'chapter-opener',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center">
            <ChapterNumber>CHAPTER 6</ChapterNumber>
            <ChapterTitle>
              The Long Game
            </ChapterTitle>
            <Spacer height="3rem" />
            <ChapterSubhead>
              You're not raising a homework-completer.<br />
              You're raising a human.
            </ChapterSubhead>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 6 - PAGE 1
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <BodyText>
              Here's what matters more than homework:
            </BodyText>
            
            <BulletList items={[
              "That your child trusts you",
              "That they believe they're capable",
              "That they know struggle doesn't mean failure",
              "That they can ask for help without shame",
              "That their worth isn't tied to productivity"
            ]} />
            
            <Spacer height="2rem" />
            
            <BodyText>
              Every night you fight about homework, you risk damaging these foundations. Every night you stay calm and scaffold, you strengthen them.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <Callout>
              You're not raising a homework-completer.<br />
              You're raising a human.
            </Callout>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 6 - PAGE 2
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>What Success Actually Looks Like</SectionHeading>
            
            <BodyText>
              Success is not straight A's. Success is not perfect homework completion. Success is:
            </BodyText>
            
            <BulletList items={[
              "Your child sitting down without a fight",
              "Them asking for help instead of melting down",
              "Getting through five problems instead of zero",
              "Ending the night without tears",
              "Your relationship staying intact"
            ]} />
            
            <Spacer height="2rem" />
            
            <BodyText>
              These are the metrics that matter. Track these. Celebrate these.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <ReflectionBox title="REFLECTION">
              What would change if you measured success by emotional safety instead of task completion? What pressure would lift?
            </ReflectionBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 6 - PAGE 3
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Permission to Let Go</SectionHeading>
            
            <BodyText>
              Some nights, homework won't happen. Some weeks, it will barely happen. That's not failure. That's triage.
            </BodyText>
            
            <BodyText>
              You're allowed to prioritize your child's mental health over their third-grade math worksheet. You're allowed to choose connection over compliance. You're allowed to protect their nervous system over their GPA.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              The system will tell you this is irresponsible. That you're setting them up to fail. That you're being too soft.
            </BodyText>
            
            <BodyText>
              The system is wrong.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <TryThisBox>
              Write this down and put it where you can see it:<br /><br />
              "My child is not broken. The system missed them. I will not sacrifice their spirit to satisfy a checklist."
            </TryThisBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 7 OPENER
    {
      type: 'chapter-opener',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center">
            <ChapterNumber>CHAPTER 7</ChapterNumber>
            <ChapterTitle>
              What to Do<br />
              Tomorrow
            </ChapterTitle>
            <Spacer height="3rem" />
            <ChapterSubhead>
              Small shifts. Real change.
            </ChapterSubhead>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 7 - PAGE 1
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <BodyText>
              You don't need to overhaul everything. You just need to start differently.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <SectionHeading>Tomorrow, Do This:</SectionHeading>
            
            <BulletList items={[
              "Give them 30 minutes of downtime after school. Non-negotiable.",
              "Do the 60-second brain boot before starting.",
              "Make the task list together. Out loud. On paper.",
              "Start with the easiest thing.",
              "Stay in the room. Be the body double.",
              "When they get stuck, shrink the task.",
              "If they refuse, get curious instead of firm.",
              "End before it becomes a battle."
            ]} />
            
            <Spacer height="3rem" />
            
            <BodyText>
              That's it. Don't add more. Don't optimize. Just do these eight things and see what shifts.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 7 - PAGE 2
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>What Will Change (And What Won't)</SectionHeading>
            
            <BodyText>
              <strong className="text-[#0d9488]">What will change:</strong><br />
              The emotional temperature. The power struggle. The nightly dread. Your relationship.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">What might not change (yet):</strong><br />
              How much homework gets done. How long it takes. Whether they become independent.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              That's okay. You're playing the long game now. Capacity builds slowly. Trust builds slower.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <MiniShiftBox>
              Set a reminder for one week from today. Check in: Did the battle lessen? Did your child ask for help instead of shutting down? Did you end the night without tears?<br /><br />
              These are wins.
            </MiniShiftBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 8 OPENER
    {
      type: 'chapter-opener',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center">
            <ChapterNumber>CHAPTER 8</ChapterNumber>
            <ChapterTitle>
              Working With<br />
              Teachers
            </ChapterTitle>
            <Spacer height="3rem" />
            <ChapterSubhead>
              How to advocate without becoming<br />
              "that parent."
            </ChapterSubhead>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 8 - PAGE 1
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <BodyText>
              You need the teacher on your side. But you're worried that if you push too hard, they'll label you difficult. If you don't push enough, your child suffers.
            </BodyText>
            
            <BodyText>
              Here's the line: you're not asking for special treatment. You're asking for necessary support.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <SectionHeading>What Teachers Need to Hear</SectionHeading>
            
            <BodyText>
              Teachers are overwhelmed. They have 25+ students, endless requirements, and no time. When you approach them, make it easy.
            </BodyText>
            
            <BulletList items={[
              "Be specific about what's happening (not vague complaints)",
              "Acknowledge their constraints (they're not the enemy)",
              "Propose solutions (don't just dump the problem)",
              "Follow up in writing (emails create accountability)"
            ]} />
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 8 - PAGE 2
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>The Email Template That Works</SectionHeading>
            
            <Spacer height="2rem" />
            
            <BodyText>
              <strong className="text-[#0d9488]">Subject:</strong> Support for [Child's Name] with Homework
            </BodyText>
            
            <Spacer height="1rem" />
            
            <BodyText>
              Hi [Teacher],
            </BodyText>
            
            <BodyText>
              I'm reaching out because homework has become a significant struggle for [Child]. I know they're capable, but I'm seeing [specific behavior: shutdowns, refusal, tears, etc.] when it's time to work.
            </BodyText>
            
            <BodyText>
              I'm wondering if we could try [specific accommodation: reducing the number of problems, providing step-by-step instructions, etc.] for the next two weeks to see if it reduces the barrier.
            </BodyText>
            
            <BodyText>
              I'm happy to keep you updated on how it's going. Let me know if this sounds workable.
            </BodyText>
            
            <BodyText>
              Thank you,<br />
              [Your Name]
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 8 - PAGE 3
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>When the Teacher Says No</SectionHeading>
            
            <BodyText>
              Sometimes they'll push back. "Other kids do it fine." "They just need to try harder." "This is what's expected at this grade level."
            </BodyText>
            
            <BodyText>
              Stay calm. Reframe.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <MiniShiftBox>
              Try: "I understand this is the standard expectation. What I'm seeing is that the current approach isn't working for my child. Can we experiment with [accommodation] for two weeks and reassess?"
            </MiniShiftBox>
            
            <Spacer height="2rem" />
            
            <BodyText>
              If they still refuse, escalate. Talk to the principal. Request a formal accommodation plan. Document everything.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              You are not being difficult. You are being your child's advocate.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 8 - PAGE 4
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Reasonable Accommodations to Request</SectionHeading>
            
            <BulletList items={[
              "Reduce the number of practice problems (if they show mastery)",
              "Provide written instructions (not just verbal)",
              "Allow breaks during long assignments",
              "Accept typed work instead of handwritten",
              "Extend deadlines when needed",
              "Provide a homework checklist or planner template",
              "Allow partial credit for effort, not just completion"
            ]} />
            
            <Spacer height="3rem" />
            
            <ReflectionBox title="REFLECTION">
              Which accommodation would make the biggest difference for your child right now? Start with that one.
            </ReflectionBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 9 OPENER
    {
      type: 'chapter-opener',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center">
            <ChapterNumber>CHAPTER 9</ChapterNumber>
            <ChapterTitle>
              Troubleshooting<br />
              Common Scenarios
            </ChapterTitle>
            <Spacer height="3rem" />
            <ChapterSubhead>
              Real problems. Real solutions.
            </ChapterSubhead>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 9 - PAGE 1
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Scenario 1: They Say It's Done (It's Not)</SectionHeading>
            
            <BodyText>
              Your child shows you the worksheet. Half the problems are blank. When you point this out, they insist it's finished.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              <strong className="text-[#0d9488]">What's actually happening:</strong><br />
              They've hit capacity. To them, it feels done because they can't do more.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">What to do:</strong><br />
              Don't argue. Ask: "What made you decide to stop here?" Listen. Then: "Let's pick one more to do together, then we're done for real."
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              One more problem with support beats zero problems and a fight.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 9 - PAGE 2
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Scenario 2: They're Crying Before They Even Start</SectionHeading>
            
            <BodyText>
              Homework isn't even open yet, and they're already melting down.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              <strong className="text-[#0d9488]">What's actually happening:</strong><br />
              The anticipation of the struggle is triggering their nervous system. They're flooding with anxiety.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">What to do:</strong><br />
              Stop. Do not proceed. Get them regulated first: breathing, movement, water, reassurance. Only when they're calm do you look at the homework together.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <TryThisBox>
              Say: "We're not starting until you feel ready. Let's get your body calm first." Then wait. Presence matters more than progress right now.
            </TryThisBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 9 - PAGE 3
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Scenario 3: It Takes HOURS</SectionHeading>
            
            <BodyText>
              What should take 20 minutes takes two hours. You're both exhausted.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              <strong className="text-[#0d9488]">What's actually happening:</strong><br />
              Either the task is too hard, they're not regulated enough, or you're pushing through resistance instead of pausing.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">What to do:</strong><br />
              Set a timer for 30 minutes. When it goes off, you're done. Even if the work isn't finished. Email the teacher. Explain.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              Protecting your child's mental health matters more than completing the assignment.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 9 - PAGE 4
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Scenario 4: They Work Fine at School, But Not at Home</SectionHeading>
            
            <BodyText>
              The teacher says they're fine. But at home, they fall apart.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              <strong className="text-[#0d9488]">What's actually happening:</strong><br />
              They're masking at school. Holding it together takes enormous effort. Home is where they finally feel safe enough to let go.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">What to do:</strong><br />
              Recognize this as a sign of trust, not manipulation. Give them extra downtime after school. Lower your expectations for homework. They're already working harder than you realize.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <MiniShiftBox>
              Reframe: "My child feels safe with me" instead of "My child only acts like this with me."
            </MiniShiftBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 9 - PAGE 5
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Scenario 5: They Lose or Forget the Assignment</SectionHeading>
            
            <BodyText>
              Every. Single. Day. They don't know what the homework is, or they left the book at school, or the worksheet is gone.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              <strong className="text-[#0d9488]">What's actually happening:</strong><br />
              Executive function breakdown. They can't track materials and remember instructions at the same time.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">What to do:</strong><br />
              Build a system. Ask the teacher to email you the homework. Take a photo of the board. Use the school's online portal. Stop relying on your child to be the go-between.
            </BodyText>
            
            <Spacer height="2rem" />
            
            <BodyText>
              This isn't babying them. This is scaffolding.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 10 OPENER
    {
      type: 'chapter-opener',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center">
            <ChapterNumber>CHAPTER 10</ChapterNumber>
            <ChapterTitle>
              The Quick-Start<br />
              Guide
            </ChapterTitle>
            <Spacer height="3rem" />
            <ChapterSubhead>
              Everything you need, nothing you don't.
            </ChapterSubhead>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 10 - PAGE 1
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <BodyText>
              If you only remember one thing from this book, remember this: homework battles aren't about homework. They're about a mismatch between what's expected and what your child can currently do.
            </BodyText>
            
            <BodyText>
              Your job isn't to make them try harder. It's to build the bridge between where they are and where they need to be.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <SectionHeading>The Non-Negotiables</SectionHeading>
            
            <BulletList items={[
              "20-30 minutes of downtime after school",
              "60-second brain boot before starting",
              "Break tasks into visible micro-steps",
              "Start with the easiest thing",
              "Stay present (body double)",
              "End before it becomes a battle"
            ]} />
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 10 - PAGE 2
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Your First Week Checklist</SectionHeading>
            
            <Spacer height="2rem" />
            
            <BodyText>
              <strong className="text-[#0d9488]">Day 1:</strong> Implement the arrival window. Let them decompress. Don't mention homework for 30 minutes.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">Day 2:</strong> Add the brain boot. Three breaths, 10 jumping jacks, name three things they see.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">Day 3:</strong> Practice making the task list together. Out loud. On paper.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">Day 4:</strong> Focus on starting with the easiest task. Track if this reduces resistance.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">Day 5:</strong> Full protocol. All steps. Notice what shifts.
            </BodyText>
            
            <BodyText>
              <strong className="text-[#0d9488]">Day 6-7:</strong> Repeat. Consistency builds trust.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 10 - PAGE 3
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>What to Track</SectionHeading>
            
            <BodyText>
              Forget grades. Forget completion rates. Track these instead:
            </BodyText>
            
            <BulletList items={[
              "Did we avoid a meltdown?",
              "Did they ask for help instead of shutting down?",
              "Did we end the night on good terms?",
              "Did they attempt something they usually avoid?",
              "Did I stay calm when they struggled?"
            ]} />
            
            <Spacer height="3rem" />
            
            <ReflectionBox title="REFLECTION">
              At the end of each week, ask yourself: Is our relationship stronger or weaker than it was seven days ago? That's the metric that matters.
            </ReflectionBox>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 10 - PAGE 4
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>When to Get Professional Help</SectionHeading>
            
            <BodyText>
              You don't have to do this alone. Consider professional support if:
            </BodyText>
            
            <BulletList items={[
              "Homework battles are affecting your child's self-esteem",
              "You're seeing signs of anxiety or depression",
              "The school is threatening retention or consequences",
              "Your child is significantly behind their peers",
              "You've tried everything and nothing is improving"
            ]} />
            
            <Spacer height="2rem" />
            
            <BodyText>
              A psychologist can do testing. An educational therapist can teach skills. A tutor can fill gaps. You are not failing if you ask for help.
            </BodyText>
          </div>
        </EbookPage>
      )
    },

    // CHAPTER 10 - PAGE 5
    {
      type: 'content',
      content: (
        <EbookPage>
          <div className="space-y-8">
            <SectionHeading>Final Reminder</SectionHeading>
            
            <Callout>
              You're not raising a homework-completer.<br />
              You're raising a human.
            </Callout>
            
            <Spacer height="3rem" />
            
            <BodyText>
              Ten years from now, your child won't remember the third-grade math worksheet. But they will remember whether you saw them. Whether you believed them. Whether you stayed.
            </BodyText>
            
            <BodyText>
              This is the work that matters.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <TryThisBox>
              Tonight, before homework starts, tell your child: "My job is to help you learn, not to make you perfect. We'll figure this out together."
            </TryThisBox>
          </div>
        </EbookPage>
      )
    },

    // FINAL PAGE - CONVERSION
    {
      type: 'final',
      content: (
        <EbookPage>
          <div className="h-full flex flex-col justify-center space-y-16">
            <Callout>
              Your child isn't broken.<br />
              The system missed them.
            </Callout>
            
            <Spacer height="2rem" />
            
            <BodyText>
              If you've read this far, you already know: something needs to shift. Not in your child. In how you support them.
            </BodyText>
            
            <BodyText>
              You don't need more advice. You need a clear path forward—one that fits your child's actual wiring, not some generic checklist.
            </BodyText>
            
            <Spacer height="3rem" />
            
            <div className="space-y-6">
              <SectionHeading>Ready to go deeper?</SectionHeading>
              
              <BodyText>
                Take the 2-minute Learning Style Quiz to discover exactly where your child needs support—and what scaffolding will actually work for their brain.
              </BodyText>
              
              <div className="pt-4">
                <a 
                  href="https://www.MzMarianna.com/quiz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block group"
                >
                  <div className="text-xl text-[#0d9488] font-black tracking-wide group-hover:underline transition-all">
                    → www.MzMarianna.com/quiz
                  </div>
                </a>
              </div>
            </div>
            
            <Spacer height="4rem" />
            
            <AuthorSignature />
          </div>
        </EbookPage>
      )
    }
  ];

  const totalPages = pages.length;

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportView = () => {
    setExportMode(!exportMode);
  };

  if (exportMode) {
    return (
      <div className="print:block">
        <style>{`
          @media print {
            @page { 
              size: 1600px 2560px;
              margin: 0;
            }
            html, body { 
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .page-break { 
              page-break-after: always;
              break-after: page;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
          @media screen {
            .export-container {
              background: #e5e5e5;
              padding: 2rem 0;
            }
          }
        `}</style>
        
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 print:hidden bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleExportView}
              className="px-6 py-3 bg-[#111111] text-white font-bold rounded-lg hover:bg-[#0d9488] transition-colors"
            >
              ← Back to Preview
            </button>
            <button
              onClick={handlePrint}
              className="px-8 py-3 bg-[#0d9488] text-white font-bold rounded-lg hover:bg-[#0d9488]/90 transition-colors flex items-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Print/Save as PDF
            </button>
            <div className="text-sm text-[#333333] ml-4 max-w-xs">
              <strong>Tip:</strong> Enable "Background graphics" in print settings
            </div>
          </div>
        </div>

        <div className="export-container bg-white">
          {pages.map((page, index) => (
            <div key={index} className="page-break">
              {page.content}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-sm font-black tracking-wider text-[#111111]">
              STOP HOMEWORK BATTLES
            </div>
            <div className="text-sm text-[#333333]">
              Page {currentPage + 1} of {totalPages}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="/PrintVersion.tsx"
              target="_blank"
              className="px-4 py-2 text-sm font-bold bg-[#0d9488] text-white hover:bg-[#0d9488]/90 border-2 border-[#0d9488] rounded transition-colors flex items-center gap-2"
              title="Mobile-friendly PDF export"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile PDF</span>
            </a>
            
            <a
              href="/BonusMaterials.tsx"
              target="_blank"
              className="px-4 py-2 text-sm font-bold text-[#0d9488] hover:text-[#111111] border-2 border-[#0d9488] hover:border-[#111111] rounded transition-colors flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">Bonus Materials</span>
            </a>
            
            <button
              onClick={handleExportView}
              className="px-4 py-2 text-sm font-bold text-[#111111] hover:text-[#0d9488] border-2 border-[#111111] hover:border-[#0d9488] rounded transition-colors flex items-center gap-2"
              title="Desktop PDF export (large format)"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
            
            <div className="w-px h-8 bg-[#333333]/20" />
            
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="p-3 text-[#111111] hover:text-[#0d9488] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Progress Bar */}
            <div className="w-48 h-2 bg-[#f5f5f5] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#0d9488] transition-all duration-300"
                style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
              />
            </div>
            
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="p-3 text-[#111111] hover:text-[#0d9488] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="flex justify-center">
          <div className="relative">
            {pages[currentPage].content}
          </div>
        </div>
      </div>

      {/* Page Numbers at Bottom */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
          // Show first 5, current page area, and last 5
          const showPage = i < 5 || 
                          i > totalPages - 6 || 
                          (i >= currentPage - 2 && i <= currentPage + 2);
          
          if (!showPage && i === 5) {
            return <div key={i} className="px-2 text-[#333333]">...</div>;
          }
          
          if (!showPage) return null;
          
          return (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentPage 
                  ? 'w-8 bg-[#0d9488]' 
                  : 'bg-[#333333]/20 hover:bg-[#0d9488]/50'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}