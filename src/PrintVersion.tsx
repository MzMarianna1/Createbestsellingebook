import { Download, Printer } from 'lucide-react';

export default function PrintVersion() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <style>{`
        @media print {
          @page { 
            size: letter portrait;
            margin: 0.5in;
          }
          body { margin: 0; }
          .page-break { page-break-after: always; }
          .print-hide { display: none; }
        }
        @media screen {
          .print-content {
            max-width: 8.5in;
            margin: 0 auto;
            background: white;
            padding: 1in;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
        }
      `}</style>

      <div className="print-hide fixed top-0 left-0 right-0 bg-[#0d9488] text-white p-4 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="font-black text-xl">PRINT-FRIENDLY VERSION</h1>
            <p className="text-sm opacity-90">Standard Letter size (8.5×11) - Works on mobile!</p>
          </div>
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-white text-[#0d9488] font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
          >
            <Printer className="w-5 h-5" />
            Save as PDF
          </button>
        </div>
      </div>

      <div className="pt-24 pb-8 bg-gray-100 print:p-0">
        <div className="print-content">
          
          {/* COVER */}
          <div className="page-break min-h-screen flex flex-col justify-center items-start">
            <div className="space-y-8">
              <div className="text-sm tracking-[0.3em] uppercase text-[#0d9488] font-black">
                FOR PARENTS WHO ARE DONE WITH THE NIGHTLY FIGHT
              </div>
              
              <h1 className="text-7xl sm:text-8xl font-black tracking-tight leading-[0.9] text-[#111111]">
                STOP<br />
                HOMEWORK<br />
                BATTLES
              </h1>
              
              <div className="h-1 bg-[#0d9488] w-32" />
              
              <p className="text-2xl sm:text-3xl leading-relaxed text-[#333333] max-w-xl">
                How to Get Cooperation Without Yelling, Bribing, or Breaking Your Child's Spirit
              </p>
              
              <div className="pt-12 space-y-2">
                <div className="text-2xl text-[#111111] font-black">
                  Marianna Vitale
                </div>
                <div className="text-lg text-[#333333]">
                  Founder of Mz. Marianna's Learning Kingdom
                </div>
                <div className="text-base text-[#333333] italic">
                  Teaching differently. Built different.
                </div>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="page-break py-12">
            <div className="space-y-6">
              <div className="text-2xl font-black text-[#111111]">
                STOP HOMEWORK BATTLES
              </div>
              
              <div className="h-0.5 bg-[#0d9488] w-24" />
              
              <div className="space-y-4 text-sm text-[#333333] leading-relaxed">
                <p>
                  Copyright © 2026 Marianna Vitale<br />
                  All rights reserved.
                </p>
                
                <p>
                  No part of this publication may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the author.
                </p>
                
                <p className="font-bold text-[#111111]">
                  Published by Mz. Marianna's Learning Kingdom
                </p>
                
                <p>
                  www.MzMarianna.com
                </p>
                
                <div className="pt-6 border-t border-[#333333]/20">
                  <p className="text-xs italic">
                    <strong>Disclaimer:</strong> This book is designed to provide helpful information on the subjects discussed. It is not meant to be used to diagnose or treat any medical or psychological condition. For diagnosis or treatment, consult your physician or mental health professional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* INTRO */}
          <div className="page-break py-12">
            <div className="space-y-8">
              <div className="text-3xl sm:text-4xl text-[#111111] italic leading-relaxed">
                Your child isn't lazy.<br />
                The system missed them.
              </div>
              
              <p className="text-lg leading-relaxed text-[#111111]">
                You've tried everything. Rewards. Consequences. Sitting next to them. Walking away. Breaking homework into smaller chunks. Setting timers. You've read the books. You've asked the teacher. You've googled "why won't my kid do homework" at midnight more times than you can count.
              </p>
              
              <p className="text-lg leading-relaxed text-[#111111]">
                And still, every afternoon is a war zone.
              </p>
              
              <p className="text-lg leading-relaxed text-[#111111]">
                Here's what no one's telling you: <strong>This isn't a behavior problem. It's a scaffolding problem.</strong>
              </p>
              
              <p className="text-lg leading-relaxed text-[#111111]">
                Your child isn't refusing to cooperate. They're stuck. And the reason they're stuck isn't laziness, defiance, or lack of motivation. It's because the way homework is designed doesn't match how their brain actually works.
              </p>
              
              <div className="pl-6 border-l-4 border-[#0d9488] my-8">
                <p className="text-xl leading-relaxed text-[#111111]">
                  <strong className="text-[#0d9488]">THE TRUTH:</strong> You can't discipline your way out of a wiring mismatch.
                </p>
              </div>
              
              <p className="text-lg leading-relaxed text-[#111111]">
                In my 15+ years working with hundreds of families, I've seen this pattern repeat: Parents exhaust themselves trying to change their child's behavior, when what actually needs to change is the scaffolding—the support structures that make learning accessible.
              </p>
              
              <p className="text-lg leading-relaxed text-[#111111]">
                This book will show you exactly what scaffolding your child needs, how to identify the gaps, and what to do instead of fighting.
              </p>
              
              <p className="text-lg leading-relaxed text-[#111111]">
                No more guessing. No more battles. Just clear, tactical moves that work with your child's actual wiring.
              </p>
            </div>
          </div>

          {/* TABLE OF CONTENTS */}
          <div className="page-break py-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black text-[#111111] mb-2">CONTENTS</h2>
                <div className="h-1 bg-[#0d9488] w-20" />
              </div>
              
              <div className="space-y-3 text-base">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-[#111111]">Chapter 1</span>
                  <span className="text-[#333333]">Why Nothing Works (And What Will)</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-[#111111]">Chapter 2</span>
                  <span className="text-[#333333]">Process Scaffolds</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-[#111111]">Chapter 3</span>
                  <span className="text-[#333333]">Capacity Scaffolds</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-[#111111]">Chapter 4</span>
                  <span className="text-[#333333]">Emotional Scaffolds</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-[#111111]">Chapter 5</span>
                  <span className="text-[#333333]">Executive Function Scaffolds</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-[#111111]">Chapter 6</span>
                  <span className="text-[#333333]">When Multiple Scaffolds Stack</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-[#111111]">Chapter 7</span>
                  <span className="text-[#333333]">The Scaffolding Library</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-[#111111]">Chapter 8</span>
                  <span className="text-[#333333]">Working With Teachers</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-[#111111]">Chapter 9</span>
                  <span className="text-[#333333]">Troubleshooting Common Scenarios</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-[#111111]">Chapter 10</span>
                  <span className="text-[#333333]">The Quick-Start Guide</span>
                </div>
              </div>
              
              <div className="pt-8">
                <p className="text-lg text-[#333333] italic">
                  Note: This is a condensed print version. For the complete 63-page digital edition with full chapters, visit <strong className="text-[#0d9488]">www.MzMarianna.com</strong>
                </p>
              </div>
            </div>
          </div>

          {/* KEY TAKEAWAYS PAGE */}
          <div className="page-break py-12">
            <div className="space-y-8">
              <div>
                <div className="text-sm tracking-[0.2em] uppercase text-[#0d9488] font-black mb-2">
                  KEY FRAMEWORK
                </div>
                <h2 className="text-4xl font-black text-[#111111] mb-2">THE 4 SCAFFOLDS</h2>
                <div className="h-1 bg-[#0d9488] w-20" />
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-[#0d9488] pl-6">
                  <h3 className="text-2xl font-black text-[#111111] mb-2">1. PROCESS SCAFFOLDS</h3>
                  <p className="text-base text-[#333333] mb-3">
                    <strong>When they say:</strong> "I don't know what to do"
                  </p>
                  <p className="text-base text-[#333333]">
                    They need: Step-by-step visual instructions, examples, checklists, and breaking tasks into smaller visible chunks.
                  </p>
                </div>

                <div className="border-l-4 border-[#0d9488] pl-6">
                  <h3 className="text-2xl font-black text-[#111111] mb-2">2. CAPACITY SCAFFOLDS</h3>
                  <p className="text-base text-[#333333] mb-3">
                    <strong>When they:</strong> Start strong, crash after 10 minutes
                  </p>
                  <p className="text-base text-[#333333]">
                    They need: Hard stops, shorter assignments, strategic breaks, and respecting their actual working memory capacity.
                  </p>
                </div>

                <div className="border-l-4 border-[#0d9488] pl-6">
                  <h3 className="text-2xl font-black text-[#111111] mb-2">3. EMOTIONAL SCAFFOLDS</h3>
                  <p className="text-base text-[#333333] mb-3">
                    <strong>When they say:</strong> "I can't" or "I'm stupid"
                  </p>
                  <p className="text-base text-[#333333]">
                    They need: Low-stakes entry points, permission to mess up, and separation of effort from outcome.
                  </p>
                </div>

                <div className="border-l-4 border-[#0d9488] pl-6">
                  <h3 className="text-2xl font-black text-[#111111] mb-2">4. EXECUTIVE FUNCTION SCAFFOLDS</h3>
                  <p className="text-base text-[#333333] mb-3">
                    <strong>When they:</strong> Can't transition, organize, or sustain attention
                  </p>
                  <p className="text-base text-[#333333]">
                    They need: External organization systems, body doubling, timers, and help with planning/sequencing.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-[#f5f5f5] p-6 rounded">
                <p className="text-lg text-[#111111] leading-relaxed">
                  <strong>The shift:</strong> Stop trying to change your child. Start providing the right scaffold.
                </p>
              </div>
            </div>
          </div>

          {/* CONVERSION PAGE */}
          <div className="page-break py-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black text-[#111111] mb-4">WHAT'S NEXT?</h2>
                <div className="h-1 bg-[#0d9488] w-20 mb-8" />
              </div>
              
              <p className="text-lg leading-relaxed text-[#111111]">
                If you've made it this far, you already know: homework battles aren't about defiance. They're about missing scaffolds.
              </p>
              
              <p className="text-lg leading-relaxed text-[#111111]">
                You don't need more advice. You need a clear path forward—one that fits your child's actual wiring, not some generic checklist.
              </p>
              
              <div className="border-l-4 border-[#0d9488] pl-6 my-8">
                <h3 className="text-2xl font-black text-[#111111] mb-4">Ready to go deeper?</h3>
                <p className="text-lg leading-relaxed text-[#111111] mb-4">
                  Take the 2-minute Learning Style Quiz to discover exactly where your child needs support—and what scaffolding will actually work for their brain.
                </p>
                <div className="text-xl text-[#0d9488] font-black tracking-wide">
                  → www.MzMarianna.com/quiz
                </div>
              </div>
              
              <div className="pt-8 space-y-2">
                <div className="text-2xl text-[#111111] font-black">
                  Marianna Vitale
                </div>
                <div className="text-lg text-[#333333]">
                  Founder of Mz. Marianna's Learning Kingdom
                </div>
                <div className="text-base text-[#333333] italic">
                  Teaching differently. Built different.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
