import { useState } from 'react';
import { Download, Printer, ArrowLeft } from 'lucide-react';
import { 
  QuickStartGuide, 
  TeacherEmailScripts, 
  TeacherEmailScriptsPage2,
  HomeworkResistanceDecoder 
} from './components/BonusMaterials';

export default function BonusMaterialsApp() {
  const [selectedBonus, setSelectedBonus] = useState<string | null>(null);

  const bonuses = [
    {
      id: 'quick-start',
      title: 'Quick-Start Guide',
      description: '1-page printable roadmap to stop homework battles in 48 hours',
      pages: [<QuickStartGuide key="quick-start" />]
    },
    {
      id: 'teacher-emails',
      title: 'Teacher Email Scripts',
      description: '5 copy-paste templates that position you as a partner',
      pages: [
        <TeacherEmailScripts key="teacher-1" />, 
        <TeacherEmailScriptsPage2 key="teacher-2" />
      ]
    },
    {
      id: 'decoder',
      title: 'Homework Resistance Decoder',
      description: 'Interactive checklist to identify which scaffold your child needs',
      pages: [<HomeworkResistanceDecoder key="decoder" />]
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  if (selectedBonus) {
    const bonus = bonuses.find(b => b.id === selectedBonus);
    if (!bonus) return null;

    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <style>{`
          @media print {
            @page { 
              size: 1600px 2560px;
              margin: 0;
            }
            body { margin: 0; }
            .page-break { page-break-after: always; }
          }
        `}</style>

        <div className="fixed top-4 left-4 right-4 z-50 flex justify-between print:hidden bg-white/95 backdrop-blur-sm shadow-sm rounded-lg px-6 py-4">
          <button
            onClick={() => setSelectedBonus(null)}
            className="px-4 py-2 text-sm font-bold text-[#111111] hover:text-[#0d9488] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bonus Materials
          </button>
          
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-[#0d9488] text-white font-bold rounded-lg hover:bg-[#0d9488]/90 transition-colors flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print/Save as PDF
          </button>
        </div>

        <div className="pt-24 pb-16">
          <div className="flex flex-col items-center gap-0">
            {bonus.pages.map((page, index) => (
              <div key={index} className="page-break">
                {page}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-16">
      <div className="max-w-4xl mx-auto px-8">
        <div className="space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-[#111111] tracking-tight">
              BONUS MATERIALS
            </h1>
            <div className="h-1 bg-[#0d9488] w-32" />
          </div>
          <p className="text-2xl text-[#333333] leading-relaxed">
            Export each bonus material as a separate PDF to include in your premium package or use for your own reference.
          </p>
        </div>

        <div className="grid gap-6">
          {bonuses.map((bonus) => (
            <button
              key={bonus.id}
              onClick={() => setSelectedBonus(bonus.id)}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all text-left group border-l-4 border-[#0d9488]"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <h2 className="text-2xl font-black text-[#111111] group-hover:text-[#0d9488] transition-colors">
                    {bonus.title}
                  </h2>
                  <p className="text-lg text-[#333333] leading-relaxed">
                    {bonus.description}
                  </p>
                  <div className="text-sm text-[#0d9488] font-bold">
                    {bonus.pages.length} page{bonus.pages.length > 1 ? 's' : ''}
                  </div>
                </div>
                <Download className="w-6 h-6 text-[#0d9488] group-hover:scale-110 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-lg border-l-4 border-[#0d9488]">
          <h3 className="text-xl font-black text-[#111111] mb-4">
            HOW TO USE THESE BONUSES
          </h3>
          <div className="space-y-4 text-[#333333]">
            <p>
              <strong className="text-[#111111]">Standard Package ($37-47):</strong> Include the main ebook only
            </p>
            <p>
              <strong className="text-[#111111]">Premium Package ($67-97):</strong> Include all 3 bonus materials as separate PDFs
            </p>
            <p>
              <strong className="text-[#111111]">Lead Magnet:</strong> Give away the Quick-Start Guide to build your email list, then sell the full ebook + bonuses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
