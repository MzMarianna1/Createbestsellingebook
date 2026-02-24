import { EbookPage, EbookTitle, SectionHeading, BodyText, AccentLine, Spacer, BulletList } from './EbookComponents';

// BONUS 1: Quick-Start Guide (1-Page Printable)
export function QuickStartGuide() {
  return (
    <EbookPage>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="text-sm tracking-[0.3em] uppercase text-[#0d9488] font-black">
            BONUS MATERIAL
          </div>
          <h1 className="text-[3.5rem] leading-tight tracking-tight text-[#111111] font-black">
            THE QUICK-START<br />GUIDE
          </h1>
          <AccentLine width="30%" />
        </div>

        <div className="text-lg text-[#333333] italic">
          Your 48-hour roadmap to stop homework battles—without changing your child.
        </div>

        <Spacer height="2rem" />

        <div className="space-y-6">
          <SectionHeading>Hour 1: The Observation</SectionHeading>
          <BodyText>
            Tonight, don't correct homework. Just watch. Notice: Where does resistance show up? Is it starting? Transitions? Writing? Reading instructions? Jot down 3 specific moments.
          </BodyText>

          <div className="pl-8 border-l-4 border-[#0d9488] bg-white">
            <div className="text-sm tracking-[0.2em] uppercase text-[#0d9488] font-black mb-3">
              WHAT TO LOOK FOR
            </div>
            <BulletList items={[
              "Body language (fidgeting, slumping, avoiding eye contact)",
              "What they say (\"I can't,\" \"This is stupid,\" or silence)",
              "What triggers shutdown (writing, reading, specific subjects)"
            ]} />
          </div>

          <SectionHeading>Day 2: The Decode</SectionHeading>
          <BodyText>
            Use the Homework Resistance Decoder (see bonus checklist). Match what you saw to one of the 4 scaffolds: Process, Capacity, Emotional, or Executive Function.
          </BodyText>

          <div className="pl-8 border-l-4 border-[#0d9488] bg-white">
            <div className="text-sm tracking-[0.2em] uppercase text-[#0d9488] font-black mb-3">
              QUICK DECODER
            </div>
            <div className="space-y-3 text-[1.25rem] leading-relaxed text-[#111111]">
              <div><span className="font-black text-[#0d9488]">Process:</span> Shuts down when instructions are verbal-only</div>
              <div><span className="font-black text-[#0d9488]">Capacity:</span> Melts down after 10 minutes or 3 problems</div>
              <div><span className="font-black text-[#0d9488]">Emotional:</span> Refuses before even looking at it</div>
              <div><span className="font-black text-[#0d9488]">Executive Function:</span> Can't get started or transitions between problems</div>
            </div>
          </div>

          <SectionHeading>Day 3-7: Test ONE Scaffold</SectionHeading>
          <BodyText>
            Pick ONE thing from the scaffold chapter that matches your child's pattern. Do it for 5 nights. Don't add anything else. Don't explain it to your child. Just do it.
          </BodyText>

          <div className="pl-8 border-l-4 border-[#0d9488] bg-white">
            <div className="text-sm tracking-[0.2em] uppercase text-[#0d9488] font-black mb-3">
              EXAMPLE FIRST MOVES
            </div>
            <BulletList items={[
              "Process: Break instructions into 3-step checklist",
              "Capacity: Hard stop after 15 minutes, no matter what",
              "Emotional: Start with easiest problem first",
              "Executive: You write, they dictate answers"
            ]} />
          </div>

          <SectionHeading>What Success Looks Like</SectionHeading>
          <BodyText>
            You're not looking for perfect homework. You're looking for less fight. If your child sits down 2 minutes faster, that's data. If they get through 4 problems instead of 2, that's progress. If you didn't yell, that's the win.
          </BodyText>

          <Spacer height="2rem" />

          <div className="text-center">
            <div className="text-xl text-[#0d9488] font-black tracking-wide">
              → Take the quiz: www.MzMarianna.com/quiz
            </div>
          </div>
        </div>
      </div>
    </EbookPage>
  );
}

// BONUS 2: Email Scripts for Teachers
export function TeacherEmailScripts() {
  return (
    <EbookPage>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="text-sm tracking-[0.3em] uppercase text-[#0d9488] font-black">
            BONUS MATERIAL
          </div>
          <h1 className="text-[3.5rem] leading-tight tracking-tight text-[#111111] font-black">
            TEACHER EMAIL<br />SCRIPTS
          </h1>
          <AccentLine width="30%" />
        </div>

        <div className="text-lg text-[#333333] italic">
          Copy-paste templates that position you as a partner, not a complainer.
        </div>

        <Spacer height="2rem" />

        <div className="space-y-8">
          <div className="space-y-4">
            <SectionHeading>Script 1: The "I'm Noticing a Pattern" Email</SectionHeading>
            <div className="bg-[#f5f5f5] p-8 rounded-lg space-y-4 text-[1.125rem] leading-relaxed">
              <p className="font-bold text-[#111111]">Subject: Homework Support for [Child's Name]</p>
              <p className="text-[#111111]">
                Hi [Teacher Name],
              </p>
              <p className="text-[#111111]">
                I wanted to reach out because I'm noticing a pattern with [Child's Name] and homework. They're spending [X] minutes on assignments that should take [Y] minutes, and it's ending in frustration for both of us.
              </p>
              <p className="text-[#111111]">
                I'm not looking to reduce the workload—I'm trying to figure out what support they need to access it. Could we set up a quick call to talk through what you're seeing in class vs. what I'm seeing at home?
              </p>
              <p className="text-[#111111]">
                I'd love to partner on this.
              </p>
              <p className="text-[#111111]">
                Thanks,<br />
                [Your Name]
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <SectionHeading>Script 2: The "Can We Try This?" Email</SectionHeading>
            <div className="bg-[#f5f5f5] p-8 rounded-lg space-y-4 text-[1.125rem] leading-relaxed">
              <p className="font-bold text-[#111111]">Subject: Homework Modification Request for [Child's Name]</p>
              <p className="text-[#111111]">
                Hi [Teacher Name],
              </p>
              <p className="text-[#111111]">
                Thank you for being open to partnering on homework support for [Child's Name]. After observing them at home, I think [writing/reading/transitions] is where they're getting stuck.
              </p>
              <p className="text-[#111111]">
                Would you be open to trying [specific scaffold] for the next two weeks? For example:
              </p>
              <ul className="list-disc ml-8 space-y-2 text-[#111111]">
                <li>Reducing written responses to 2-3 sentences instead of a paragraph</li>
                <li>Allowing them to dictate answers to me to write down</li>
                <li>Completing odd-numbered problems only to show mastery</li>
              </ul>
              <p className="text-[#111111]">
                I'm happy to monitor and report back on what's working.
              </p>
              <p className="text-[#111111]">
                Thanks for considering this,<br />
                [Your Name]
              </p>
            </div>
          </div>
        </div>
      </div>
    </EbookPage>
  );
}

export function TeacherEmailScriptsPage2() {
  return (
    <EbookPage>
      <div className="space-y-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <SectionHeading>Script 3: The "We Need a 504/IEP Meeting" Email</SectionHeading>
            <div className="bg-[#f5f5f5] p-8 rounded-lg space-y-4 text-[1.125rem] leading-relaxed">
              <p className="font-bold text-[#111111]">Subject: Request for 504/IEP Evaluation</p>
              <p className="text-[#111111]">
                Hi [Teacher/Counselor Name],
              </p>
              <p className="text-[#111111]">
                I am formally requesting an evaluation for a 504 Plan [or IEP] for my child, [Child's Full Name], DOB [Date], currently in [Grade/Teacher Name]'s class.
              </p>
              <p className="text-[#111111]">
                I have concerns about [their ability to access grade-level work without accommodations / sustained focus / written expression / reading comprehension]. These challenges are impacting their academic progress and emotional well-being.
              </p>
              <p className="text-[#111111]">
                Please let me know the next steps and timeline for this evaluation. I understand I have the right to request this in writing and that the school has [30/60 days depending on your state] to respond.
              </p>
              <p className="text-[#111111]">
                I'm happy to provide additional documentation from [therapist/doctor/tutor] if helpful.
              </p>
              <p className="text-[#111111]">
                Thank you,<br />
                [Your Name]<br />
                [Your Phone Number]<br />
                [Your Email]
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <SectionHeading>Script 4: The "Homework is Causing Crisis" Email</SectionHeading>
            <div className="bg-[#f5f5f5] p-8 rounded-lg space-y-4 text-[1.125rem] leading-relaxed">
              <p className="font-bold text-[#111111]">Subject: Urgent: Homework Accommodations Needed</p>
              <p className="text-[#111111]">
                Hi [Teacher Name],
              </p>
              <p className="text-[#111111]">
                I need to be honest with you: homework has become a crisis point in our house. [Child's Name] is [melting down / refusing to eat / saying they hate themselves / crying for hours], and I need to hit pause on what's not working.
              </p>
              <p className="text-[#111111]">
                Starting this week, I'm going to [stop homework after 20 minutes / only complete problems they can do independently / focus on reading only]. I'm not looking to undermine your teaching—I'm trying to preserve my child's relationship with learning.
              </p>
              <p className="text-[#111111]">
                I'll send you a note each night with what we completed and where they got stuck. I'd love to meet to talk about longer-term solutions.
              </p>
              <p className="text-[#111111]">
                Thank you for understanding,<br />
                [Your Name]
              </p>
            </div>
          </div>

          <Spacer height="2rem" />

          <div className="pl-8 border-l-4 border-[#0d9488] bg-white">
            <div className="text-sm tracking-[0.2em] uppercase text-[#0d9488] font-black mb-3">
              PRO TIP
            </div>
            <div className="text-[1.25rem] leading-relaxed text-[#111111]">
              Always BCC yourself and save these emails. If you need to escalate to a 504/IEP, you'll have documentation of when you first raised concerns.
            </div>
          </div>
        </div>
      </div>
    </EbookPage>
  );
}

// BONUS 3: Homework Resistance Decoder Checklist
export function HomeworkResistanceDecoder() {
  return (
    <EbookPage>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="text-sm tracking-[0.3em] uppercase text-[#0d9488] font-black">
            BONUS MATERIAL
          </div>
          <h1 className="text-[3.5rem] leading-tight tracking-tight text-[#111111] font-black">
            HOMEWORK<br />RESISTANCE<br />DECODER
          </h1>
          <AccentLine width="30%" />
        </div>

        <div className="text-lg text-[#333333] italic">
          Check the boxes that match your child. The category with the most checks is where to start.
        </div>

        <Spacer height="2rem" />

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="text-2xl font-black text-[#111111] mb-4">
              □ PROCESS SCAFFOLD NEEDED
            </div>
            <div className="space-y-3 text-[1.25rem] leading-relaxed text-[#111111]">
              <div>□ Shuts down when instructions are given verbally</div>
              <div>□ Asks "What am I supposed to do?" repeatedly</div>
              <div>□ Can't get started without you sitting next to them</div>
              <div>□ Works better with examples or step-by-step checklists</div>
              <div>□ Completes work in class but not at home (process support is built into class)</div>
            </div>
            <div className="text-base text-[#0d9488] font-black mt-4">
              → START WITH: Chapter 2 (Process Scaffolds)
            </div>
          </div>

          <AccentLine width="100%" />

          <div className="space-y-4">
            <div className="text-2xl font-black text-[#111111] mb-4">
              □ CAPACITY SCAFFOLD NEEDED
            </div>
            <div className="space-y-3 text-[1.25rem] leading-relaxed text-[#111111]">
              <div>□ Starts strong, melts down after 10-15 minutes</div>
              <div>□ Can do 3 problems, falls apart by problem 5</div>
              <div>□ Says "I'm done" when they've clearly got more left</div>
              <div>□ Work quality drops drastically as assignment goes on</div>
              <div>□ Better after breaks but resists taking them</div>
            </div>
            <div className="text-base text-[#0d9488] font-black mt-4">
              → START WITH: Chapter 3 (Capacity Scaffolds)
            </div>
          </div>

          <AccentLine width="100%" />

          <div className="space-y-4">
            <div className="text-2xl font-black text-[#111111] mb-4">
              □ EMOTIONAL SCAFFOLD NEEDED
            </div>
            <div className="space-y-3 text-[1.25rem] leading-relaxed text-[#111111]">
              <div>□ Refuses before even looking at the assignment</div>
              <div>□ Says "I can't" or "I'm stupid" before trying</div>
              <div>□ Tantrums, cries, or rages when you mention homework</div>
              <div>□ Avoids, hides, or "forgets" homework</div>
              <div>□ Perfectionist who erases obsessively or won't start unless it's "right"</div>
            </div>
            <div className="text-base text-[#0d9488] font-black mt-4">
              → START WITH: Chapter 4 (Emotional Scaffolds)
            </div>
          </div>

          <AccentLine width="100%" />

          <div className="space-y-4">
            <div className="text-2xl font-black text-[#111111] mb-4">
              □ EXECUTIVE FUNCTION SCAFFOLD NEEDED
            </div>
            <div className="space-y-3 text-[1.25rem] leading-relaxed text-[#111111]">
              <div>□ Can't transition between problems or subjects</div>
              <div>□ Loses materials, forgets what's due, doesn't write in planner</div>
              <div>□ Knows the answers but can't organize thoughts on paper</div>
              <div>□ Easily distracted—takes 2 hours to do 20 minutes of work</div>
              <div>□ Struggles to plan multi-step projects or study for tests</div>
            </div>
            <div className="text-base text-[#0d9488] font-black mt-4">
              → START WITH: Chapter 5 (Executive Function Scaffolds)
            </div>
          </div>
        </div>
      </div>
    </EbookPage>
  );
}
