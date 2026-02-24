// Resend Email API Integration
// Handles all email sending via Resend API

import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = "Marianna@mzmarianna.com"; // Update this to your verified domain

interface EmailData {
  to: string;
  subject: string;
  html: string;
  customerId?: string;
  sequenceType?: string;
  emailNumber?: number;
}

export async function sendEmail(data: EmailData) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not configured");
  }

  try {
    // Send email via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: data.to,
        subject: data.subject,
        html: data.html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Resend API error: ${error}`);
    }

    const result = await response.json();
    console.log("Email sent via Resend:", result);

    // Log email in database
    if (data.customerId) {
      await supabase.from("email_sequences").insert({
        customer_id: data.customerId,
        sequence_type: data.sequenceType || "broadcast",
        email_number: data.emailNumber || 1,
        status: "sent",
        sent_at: new Date().toISOString(),
        resend_email_id: result.id,
      });
    }

    return result;
  } catch (error) {
    console.error("Error sending email via Resend:", error);
    throw error;
  }
}

// Email Templates
export const EMAIL_TEMPLATES = {
  // Quiz Result Email
  quiz_result: (name: string, scaffoldType: string, quizLink: string) => ({
    subject: `${name}, here's what your child needs (and what to do about it)`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #111111; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .accent { color: #0d9488; font-weight: bold; }
            .cta-button { display: inline-block; padding: 16px 32px; background: #0d9488; color: white; text-decoration: none; font-weight: bold; border-radius: 8px; margin: 20px 0; }
            .signature { margin-top: 40px; padding-top: 20px; border-top: 2px solid #0d9488; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hey ${name},</h1>
            
            <p>Your quiz results are in, and here's what they're telling me:</p>
            
            <p class="accent">Your child needs ${scaffoldType} scaffolds.</p>
            
            <p>That means the reason homework is a battle isn't defiance or laziness. It's because they're missing specific support structures that make learning accessible.</p>
            
            <p><strong>Here's what's actually happening:</strong></p>
            
            ${getScaffoldExplanation(scaffoldType)}
            
            <p>The good news? Once you know what scaffold is missing, you can fix it fast.</p>
            
            <p>I've written an entire guide on exactly how to provide ${scaffoldType} scaffolds—with specific scripts, tools, and strategies that work.</p>
            
            <a href="${quizLink}" class="cta-button">Get the Complete Guide ($47)</a>
            
            <p>Inside "Stop Homework Battles," you'll learn:</p>
            <ul>
              <li>The exact scaffolding your child needs (based on quiz results)</li>
              <li>Word-for-word scripts to use tonight</li>
              <li>How to work with teachers without sounding difficult</li>
              <li>When to push vs. when to pull back</li>
            </ul>
            
            <p>No more guessing. No more fighting. Just clear moves that work.</p>
            
            <div class="signature">
              <p><strong>Marianna Vitale</strong><br>
              Founder, Mz. Marianna's Learning Kingdom<br>
              <em>Teaching differently. Built different.</em></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Welcome Email (Post-Purchase)
  welcome: (name: string, downloadLink: string) => ({
    subject: "Welcome! Here's your ebook (+ bonus materials)",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #111111; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .accent { color: #0d9488; font-weight: bold; }
            .download-box { background: #f5f5f5; padding: 24px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #0d9488; }
            .cta-button { display: inline-block; padding: 16px 32px; background: #0d9488; color: white; text-decoration: none; font-weight: bold; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome, ${name}!</h1>
            
            <p>Your copy of <strong>"Stop Homework Battles"</strong> is ready.</p>
            
            <div class="download-box">
              <h3>📚 Your Downloads:</h3>
              <a href="${downloadLink}" class="cta-button">Access Your Ebook + Bonuses</a>
              
              <p><strong>What's included:</strong></p>
              <ul>
                <li>Stop Homework Battles (63-page ebook)</li>
                <li>Quick-Start Guide</li>
                <li>Teacher Email Scripts</li>
                <li>Homework Resistance Decoder</li>
              </ul>
            </div>
            
            <p><strong>Start here:</strong></p>
            <p>Go straight to Chapter 10 (The Quick-Start Guide) if you need relief tonight. It has the immediate-use strategies.</p>
            
            <p>Then circle back to chapters 1-9 to understand the why behind what works.</p>
            
            <p><strong>Questions? Hit reply.</strong> I read every email.</p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #0d9488;">
              <p><strong>Marianna Vitale</strong><br>
              Founder, Mz. Marianna's Learning Kingdom<br>
              <em>Teaching differently. Built different.</em></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Abandoned Cart Email
  abandoned_cart: (name: string, checkoutLink: string) => ({
    subject: `${name}, still fighting about homework?`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #111111; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .accent { color: #0d9488; font-weight: bold; }
            .cta-button { display: inline-block; padding: 16px 32px; background: #0d9488; color: white; text-decoration: none; font-weight: bold; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hey ${name},</h1>
            
            <p>I noticed you started checking out but didn't finish.</p>
            
            <p>I get it—buying another parenting resource when nothing else has worked feels risky.</p>
            
            <p>But here's what makes this different:</p>
            
            <p class="accent">This isn't about changing your child. It's about changing the scaffolding.</p>
            
            <p>The reason rewards, consequences, and "just try harder" don't work is because they're trying to fix behavior—when the actual problem is a mismatch between how homework is designed and how your child's brain works.</p>
            
            <p>Inside this guide, you'll get:</p>
            <ul>
              <li>The exact scaffold your child needs (from your quiz)</li>
              <li>What to do tonight (Chapter 10 Quick-Start)</li>
              <li>Scripts for talking to teachers</li>
              <li>When to push vs. when to accommodate</li>
            </ul>
            
            <p><strong>One question to ask yourself:</strong></p>
            <p><em>What will tomorrow night's homework battle cost you in stress, time, and your relationship with your child?</em></p>
            
            <a href="${checkoutLink}" class="cta-button">Get the Guide Now ($47)</a>
            
            <p>30-day money-back guarantee. If this doesn't reduce the homework stress, I'll refund you—no questions asked.</p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #0d9488;">
              <p><strong>Marianna Vitale</strong><br>
              Founder, Mz. Marianna's Learning Kingdom</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Upsell Email (3 days after purchase)
  upsell_coaching: (name: string, coachingLink: string) => ({
    subject: `${name}, ready for personalized help?`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #111111; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .accent { color: #0d9488; font-weight: bold; }
            .cta-button { display: inline-block; padding: 16px 32px; background: #0d9488; color: white; text-decoration: none; font-weight: bold; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hey ${name},</h1>
            
            <p>How's it going with the ebook strategies?</p>
            
            <p>Some parents implement the scaffolds and see immediate results. Others hit unique situations that need personalized troubleshooting.</p>
            
            <p>If you're in the second camp, I'm opening up <strong>5 spots for 1-on-1 strategy sessions</strong> this month.</p>
            
            <p><strong>In 60 minutes, we'll:</strong></p>
            <ul>
              <li>Analyze your specific homework situation</li>
              <li>Identify the exact scaffolds missing</li>
              <li>Create a custom implementation plan</li>
              <li>Script the conversation with your child's teacher</li>
              <li>Troubleshoot what's not working</li>
            </ul>
            
            <p>This is for parents who want the strategies tailored to their child's exact wiring—not generic advice.</p>
            
            <p class="accent">Investment: $297 (as an ebook buyer, you get $50 off)</p>
            
            <a href="${coachingLink}" class="cta-button">Book Your Strategy Session</a>
            
            <p><small>Only 5 spots available this month.</small></p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #0d9488;">
              <p><strong>Marianna Vitale</strong><br>
              Founder, Mz. Marianna's Learning Kingdom</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};

function getScaffoldExplanation(scaffoldType: string): string {
  const explanations = {
    process: `
      <p><strong>PROCESS scaffolds</strong> mean they don't know <em>how</em> to do the work—even when they understand the content.</p>
      <p>They need: step-by-step instructions, worked examples, visual checklists, and breaking tasks into smaller visible chunks.</p>
    `,
    capacity: `
      <p><strong>CAPACITY scaffolds</strong> mean their working memory, attention, or stamina runs out faster than the assignment does.</p>
      <p>They need: shorter assignments, strategic breaks, hard stops, and respecting their actual processing limits.</p>
    `,
    emotional: `
      <p><strong>EMOTIONAL scaffolds</strong> mean perfectionism, shame, or fear of failure is blocking them from even starting.</p>
      <p>They need: low-stakes entry points, permission to mess up, and separation of effort from outcome.</p>
    `,
    executive_function: `
      <p><strong>EXECUTIVE FUNCTION scaffolds</strong> mean they can't organize, prioritize, or sustain attention without external support.</p>
      <p>They need: body doubling, timers, external organization systems, and help with planning/sequencing.</p>
    `,
  };

  return explanations[scaffoldType as keyof typeof explanations] || explanations.process;
}
