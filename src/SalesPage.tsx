import { Check, Download, Gift, Lock, Star, Users, Zap } from 'lucide-react';

export default function SalesPage() {
  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#111111] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-sm tracking-[0.3em] uppercase text-[#0d9488] font-black mb-4">
            FOR PARENTS WHO ARE DONE WITH THE NIGHTLY FIGHT
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.9] mb-8">
            STOP<br />
            HOMEWORK<br />
            BATTLES
          </h1>
          
          <div className="h-1 bg-[#0d9488] w-32 mb-8" />
          
          <p className="text-2xl sm:text-3xl leading-relaxed mb-8 max-w-2xl">
            How to Get Cooperation Without Yelling, Bribing, or Breaking Your Child's Spirit
          </p>
          
          <button
            onClick={scrollToCheckout}
            className="px-8 py-4 bg-[#0d9488] text-white font-black text-lg rounded-lg hover:bg-[#0891b2] transition-colors inline-flex items-center gap-2"
          >
            Get Instant Access - $47
            <Zap className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* The Problem */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-[#111111] mb-8">
            You've tried everything.
          </h2>
          
          <div className="space-y-4 text-lg text-[#333333] mb-8">
            <p>Rewards. Consequences. Sitting next to them. Walking away. Breaking homework into smaller chunks. Setting timers.</p>
            <p>You've read the books. You've asked the teacher. You've googled "why won't my kid do homework" at midnight more times than you can count.</p>
            <p className="text-2xl text-[#111111] font-black">And still, every afternoon is a war zone.</p>
          </div>

          <div className="bg-[#f5f5f5] rounded-lg p-8 my-12 border-l-4 border-[#0d9488]">
            <p className="text-2xl text-[#111111] font-black mb-4">
              Here's what no one's telling you:
            </p>
            <p className="text-xl text-[#333333]">
              <strong className="text-[#0d9488]">This isn't a behavior problem. It's a scaffolding problem.</strong>
            </p>
          </div>

          <p className="text-lg text-[#333333] mb-4">
            Your child isn't refusing to cooperate. They're <strong>stuck</strong>. And the reason they're stuck isn't laziness, defiance, or lack of motivation.
          </p>
          
          <p className="text-lg text-[#333333]">
            It's because the way homework is designed doesn't match how their brain actually works.
          </p>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
            <p className="text-[#333333] italic">
              "This changed our entire evening routine in less than a week."
            </p>
            <p className="text-sm text-[#333333] mt-2">- Sarah M., parent of 3rd grader</p>
          </div>
        </div>
      </div>

      {/* The Solution */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-[#111111] mb-8">
            The 4 Scaffolds Framework
          </h2>

          <p className="text-xl text-[#333333] mb-12">
            In 15+ years working with hundreds of families, I've identified exactly 4 types of support structures that make the difference between homework battles and homework peace.
          </p>

          <div className="space-y-8">
            {[
              {
                title: "PROCESS SCAFFOLDS",
                when: "When they say: 'I don't know what to do'",
                solution: "Step-by-step visual instructions, examples, checklists, and breaking tasks into smaller visible chunks.",
                icon: "📋",
              },
              {
                title: "CAPACITY SCAFFOLDS",
                when: "When they: Start strong, crash after 10 minutes",
                solution: "Hard stops, shorter assignments, strategic breaks, and respecting their actual working memory capacity.",
                icon: "⚡",
              },
              {
                title: "EMOTIONAL SCAFFOLDS",
                when: "When they say: 'I can't' or 'I'm stupid'",
                solution: "Low-stakes entry points, permission to mess up, and separation of effort from outcome.",
                icon: "💙",
              },
              {
                title: "EXECUTIVE FUNCTION SCAFFOLDS",
                when: "When they: Can't transition, organize, or sustain attention",
                solution: "External organization systems, body doubling, timers, and help with planning/sequencing.",
                icon: "🧠",
              },
            ].map((scaffold, index) => (
              <div key={index} className="border-l-4 border-[#0d9488] pl-6 py-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{scaffold.icon}</span>
                  <h3 className="text-2xl font-black text-[#111111]">{scaffold.title}</h3>
                </div>
                <p className="text-base text-[#333333] mb-2">
                  <strong>{scaffold.when}</strong>
                </p>
                <p className="text-base text-[#333333]">
                  <strong>They need:</strong> {scaffold.solution}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={scrollToCheckout}
              className="px-8 py-4 bg-[#0d9488] text-white font-black text-lg rounded-lg hover:bg-[#0891b2] transition-colors inline-flex items-center gap-2"
            >
              Get the Complete Guide - $47
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* What's Inside */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-[#111111] mb-12 text-center">
            What's Inside
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "10 comprehensive chapters (63 pages)",
              "The 4 Scaffolds Framework explained in detail",
              "Quiz to identify your child's exact needs",
              "Word-for-word scripts for tonight",
              "How to work with teachers without conflict",
              "Troubleshooting guide for common scenarios",
              "Quick-Start Guide for immediate relief",
              "Teacher Email Scripts (bonus)",
              "Homework Resistance Decoder (bonus)",
              "30-day money-back guarantee",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-[#0d9488] flex-shrink-0 mt-1" />
                <span className="text-lg text-[#111111]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guarantee */}
      <div className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-[#0d9488] flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-[#111111] mb-6">
            30-Day Money-Back Guarantee
          </h2>
          
          <p className="text-xl text-[#333333] mb-8 leading-relaxed">
            Try the strategies for 30 days. If you don't see a reduction in homework stress, I'll refund you—no questions asked.
          </p>
          
          <p className="text-lg text-[#333333]">
            You have nothing to lose except the nightly fights.
          </p>
        </div>
      </div>

      {/* Checkout Section */}
      <div id="checkout" className="py-20 bg-[#0d9488]">
        <div className="max-w-2xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-lg shadow-2xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-black text-[#111111] mb-4">
                Get Instant Access
              </h2>
              <p className="text-lg text-[#333333]">
                Download immediately. Start tonight.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <span className="text-lg font-bold text-[#111111]">Stop Homework Battles</span>
                <span className="text-lg font-bold text-[#111111]">$47</span>
              </div>
              
              <div className="space-y-2 text-sm text-[#333333]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0d9488]" />
                  <span>Complete 63-page ebook (PDF)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0d9488]" />
                  <span>3 bonus materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0d9488]" />
                  <span>Instant download</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0d9488]" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>

            <a
              href="#/checkout"
              className="w-full py-4 bg-[#0d9488] text-white font-black text-lg rounded-lg hover:bg-[#0891b2] transition-colors flex items-center justify-center gap-2 mb-6"
            >
              <Lock className="w-5 h-5" />
              Secure Checkout - $47
            </a>

            <div className="text-center text-sm text-[#333333]">
              <p className="mb-2">🔒 Secure payment via Stripe</p>
              <p>📧 Instant delivery to your email</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 bg-[#111111] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <p className="text-2xl font-black mb-2">Marianna Vitale</p>
          <p className="text-lg mb-4">Founder, Mz. Marianna's Learning Kingdom</p>
          <p className="text-sm italic opacity-80">Teaching differently. Built different.</p>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm opacity-60">
              © 2026 Mz. Marianna's Learning Kingdom. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
