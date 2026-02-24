import { ReactNode } from 'react';

// Master Typography Components
export function EbookTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-[5.5rem] leading-[0.9] tracking-tight text-[#111111] font-black">
      {children}
    </h1>
  );
}

export function EbookSubtitle({ children }: { children: ReactNode }) {
  return (
    <p className="text-[1.75rem] leading-relaxed text-[#333333] max-w-2xl">
      {children}
    </p>
  );
}

export function ChapterNumber({ children }: { children: ReactNode }) {
  return (
    <div className="text-sm tracking-[0.3em] uppercase text-[#0d9488] mb-4">
      {children}
    </div>
  );
}

export function ChapterTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[3.5rem] leading-tight tracking-tight text-[#111111] font-black mb-8">
      {children}
    </h2>
  );
}

export function ChapterSubhead({ children }: { children: ReactNode }) {
  return (
    <p className="text-xl text-[#333333] italic leading-relaxed max-w-2xl">
      {children}
    </p>
  );
}

export function BodyText({ children }: { children: ReactNode }) {
  return (
    <p className="text-[1.375rem] leading-[1.75] text-[#111111] mb-6">
      {children}
    </p>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-2xl font-black text-[#111111] mb-4 mt-12">
      {children}
    </h3>
  );
}

// Accent Line Component
export function AccentLine({ width = "40%" }: { width?: string }) {
  return (
    <div 
      className="h-1 bg-[#0d9488]" 
      style={{ width }}
    />
  );
}

// Reflection Box Component
export function ReflectionBox({ 
  title, 
  children 
}: { 
  title: string; 
  children: ReactNode;
}) {
  return (
    <div className="my-12 pl-8 border-l-4 border-[#0d9488] bg-white">
      <div className="text-sm tracking-[0.2em] uppercase text-[#0d9488] font-black mb-4">
        {title}
      </div>
      <div className="text-[1.25rem] leading-relaxed text-[#111111]">
        {children}
      </div>
    </div>
  );
}

// Mini Shift Box Component
export function MiniShiftBox({ children }: { children: ReactNode }) {
  return (
    <div className="my-12 pl-8 border-l-4 border-[#0d9488] bg-white">
      <div className="text-sm tracking-[0.2em] uppercase text-[#0d9488] font-black mb-4">
        MINI SHIFT
      </div>
      <div className="text-[1.25rem] leading-relaxed text-[#111111]">
        {children}
      </div>
    </div>
  );
}

// Try This Box Component
export function TryThisBox({ children }: { children: ReactNode }) {
  return (
    <div className="my-12 pl-8 border-l-4 border-[#0d9488] bg-white">
      <div className="text-sm tracking-[0.2em] uppercase text-[#0d9488] font-black mb-4">
        TRY THIS ONCE
      </div>
      <div className="text-[1.25rem] leading-relaxed text-[#111111]">
        {children}
      </div>
    </div>
  );
}

// Quote/Callout Component
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-12 text-2xl leading-relaxed text-[#111111] italic">
      {children}
    </div>
  );
}

// Page Container Component
export function EbookPage({ children }: { children: ReactNode }) {
  return (
    <div 
      className="bg-white mx-auto shadow-2xl"
      style={{
        width: '800pt', // 11.11 inches - PDF standard measurement
        height: '1280pt', // 17.78 inches - PDF standard measurement
        padding: '60pt 80pt' // 0.83" top/bottom, 1.11" left/right margins
      }}
    >
      {children}
    </div>
  );
}

// Author Signature Component
export function AuthorSignature() {
  return (
    <div className="space-y-2">
      <div className="text-2xl text-[#111111] font-black">
        Marianna Vitale
      </div>
      <div className="text-lg text-[#333333]">
        Founder of Mz. Marianna's Learning Kingdom
      </div>
      <div className="text-base text-[#333333] italic mt-1">
        Teaching differently. Built different.
      </div>
    </div>
  );
}

// Simple Spacer Component
export function Spacer({ height = "4rem" }: { height?: string }) {
  return <div style={{ height }} />;
}

// List Component
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4 my-6">
      {items.map((item, index) => (
        <li key={index} className="flex gap-4 text-[1.375rem] leading-[1.75] text-[#111111]">
          <span className="text-[#0d9488] font-black mt-1">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}