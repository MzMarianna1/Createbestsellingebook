import { CheckCircle, Download, Mail, Gift, Users } from 'lucide-react';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-white">
      {/* Success Header */}
      <div className="bg-[#0d9488] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <CheckCircle className="w-24 h-24 mx-auto mb-6" />
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            WELCOME!
          </h1>
          <p className="text-2xl sm:text-3xl leading-relaxed">
            Your purchase is complete. Check your email for instant access.
          </p>
        </div>
      </div>

      {/* What's Next */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <h2 className="text-4xl font-black text-[#111111] mb-12 text-center">
            What Happens Next
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0d9488] flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-black text-xl text-[#111111] mb-2">1. Check Your Email</h3>
              <p className="text-[#333333]">
                Your download link is on its way to your inbox right now
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0d9488] flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-black text-xl text-[#111111] mb-2">2. Download Everything</h3>
              <p className="text-[#333333]">
                Get the ebook + all 3 bonus materials immediately
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0d9488] flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-black text-xl text-[#111111] mb-2">3. Start Tonight</h3>
              <p className="text-[#333333]">
                Go straight to Chapter 10 for immediate-use strategies
              </p>
            </div>
          </div>

          {/* Downloads Box */}
          <div className="bg-[#f5f5f5] rounded-lg p-8 border-l-4 border-[#0d9488]">
            <h3 className="font-black text-2xl text-[#111111] mb-6">📚 Your Downloads</h3>
            
            <div className="space-y-4">
              <a
                href="/App.tsx"
                target="_blank"
                className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div>
                  <h4 className="font-bold text-[#111111]">Stop Homework Battles - Complete Guide</h4>
                  <p className="text-sm text-[#333333]">63-page PDF</p>
                </div>
                <Download className="w-6 h-6 text-[#0d9488]" />
              </a>

              <a
                href="/BonusMaterials.tsx"
                target="_blank"
                className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div>
                  <h4 className="font-bold text-[#111111]">Bonus Materials</h4>
                  <p className="text-sm text-[#333333]">Quick-Start Guide, Scripts & Decoder</p>
                </div>
                <Download className="w-6 h-6 text-[#0d9488]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <h2 className="text-4xl font-black text-[#111111] mb-8">
            🚀 Quick Start Guide
          </h2>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <ol className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0d9488] text-white font-black flex items-center justify-center">
                  1
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#111111] mb-2">
                    Start with Chapter 10 (Quick-Start Guide)
                  </h3>
                  <p className="text-[#333333]">
                    Get the immediate-use strategies you can implement tonight before dinner
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0d9488] text-white font-black flex items-center justify-center">
                  2
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#111111] mb-2">
                    Take the quiz (Chapter 1)
                  </h3>
                  <p className="text-[#333333]">
                    Identify which scaffold your child needs most
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0d9488] text-white font-black flex items-center justify-center">
                  3
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#111111] mb-2">
                    Read your scaffold chapter
                  </h3>
                  <p className="text-[#333333]">
                    Deep dive into the specific support your child needs (Chapters 2-5)
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0d9488] text-white font-black flex items-center justify-center">
                  4
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#111111] mb-2">
                    Use the Teacher Email Scripts (Bonus)
                  </h3>
                  <p className="text-[#333333]">
                    Copy-paste templates for requesting accommodations
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Upsell: Coaching */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-r from-[#0d9488] to-[#0891b2] rounded-lg shadow-2xl p-8 sm:p-12 text-white text-center">
            <Gift className="w-16 h-16 mx-auto mb-6" />
            
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Want Personalized Help?
            </h2>
            
            <p className="text-xl mb-8 opacity-90">
              Book a 1-on-1 strategy session with Marianna to get a custom implementation plan for your child
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="font-black text-xl mb-4">In 60 minutes, we'll:</h3>
              <ul className="text-left space-y-2 text-lg">
                <li>✓ Analyze your specific homework situation</li>
                <li>✓ Identify the exact scaffolds missing</li>
                <li>✓ Create a custom implementation plan</li>
                <li>✓ Script the conversation with your child's teacher</li>
                <li>✓ Troubleshoot what's not working</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="text-sm line-through opacity-75 mb-2">Regular Price: $347</div>
              <div className="text-5xl font-black mb-2">$297</div>
              <div className="text-lg opacity-90">As an ebook buyer, you save $50</div>
            </div>

            <a
              href="/Checkout.tsx?product=coaching"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0d9488] font-black text-lg rounded-lg hover:bg-gray-100 transition-colors"
            >
              Book Your Strategy Session
              <CheckCircle className="w-5 h-5" />
            </a>

            <p className="text-sm mt-6 opacity-75">Only 5 spots available this month</p>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl font-black text-[#111111] mb-6">
            Questions? We're Here to Help
          </h2>
          
          <p className="text-lg text-[#333333] mb-8">
            Email <a href="mailto:marianna@mzmarianna.com" className="text-[#0d9488] font-bold hover:underline">marianna@mzmarianna.com</a> and I'll respond within 24 hours.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-black text-[#111111] mb-2">Download Issues?</h3>
              <p className="text-sm text-[#333333]">
                Check your spam folder or email us for a direct link
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-black text-[#111111] mb-2">Need a Refund?</h3>
              <p className="text-sm text-[#333333]">
                30-day money-back guarantee, no questions asked
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Share the Love */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <Users className="w-16 h-16 text-[#0d9488] mx-auto mb-6" />
          
          <h2 className="text-3xl font-black text-[#111111] mb-4">
            Know Other Parents Struggling?
          </h2>
          
          <p className="text-lg text-[#333333] mb-8">
            Share this guide with friends who need it. Every parent deserves peaceful homework time.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=Just got this amazing guide to stop homework battles! Finally something that actually works. Check it out: https://mzmarianna.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#1DA1F2] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://mzmarianna.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#4267B2] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Share on Facebook
            </a>
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
