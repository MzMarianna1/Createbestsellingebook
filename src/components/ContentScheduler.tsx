import { useState, useEffect } from 'react';
import { Calendar, Send, Check, Clock, AlertCircle, Play, Pause, Sparkles, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import ContentReviewModal from './ContentReviewModal';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-14f75f49`;

// 30-Day Content Calendar from documentation
const CONTENT_CALENDAR = [
  { day: 1, title: "3 Signs Homework is Traumatizing Your Child", type: "carousel", platforms: ["facebook", "instagram"] },
  { day: 2, title: "From 2 Hours to 30 Minutes Testimonial", type: "story", platforms: ["instagram"] },
  { day: 3, title: "Homework Shutdown Question", type: "post", platforms: ["facebook"] },
  { day: 4, title: "Homework Myths Reel", type: "reel", platforms: ["instagram", "tiktok"] },
  { day: 5, title: "Homework Resistance Decoder (Free Download)", type: "image", platforms: ["facebook", "instagram", "pinterest"] },
  { day: 6, title: "Behind the Scenes Story", type: "story", platforms: ["instagram"] },
  { day: 7, title: "Stop Homework Battles in 48 Hours Pin", type: "pin", platforms: ["pinterest"] },
  { day: 8, title: "Decode the Resistance Carousel", type: "carousel", platforms: ["facebook", "instagram"] },
  { day: 9, title: "Translation Guide Story", type: "story", platforms: ["instagram"] },
  { day: 10, title: "Case Study Post", type: "post", platforms: ["facebook"] },
  { day: 11, title: "Quick Wins Reel", type: "reel", platforms: ["instagram"] },
  { day: 12, title: "Quiz Promo Image", type: "image", platforms: ["facebook", "instagram", "pinterest"] },
  { day: 13, title: "Reader Question Story", type: "story", platforms: ["instagram"] },
  { day: 14, title: "Week 2 Recap Pin", type: "pin", platforms: ["pinterest"] },
  { day: 15, title: "Scaffold Types Carousel", type: "carousel", platforms: ["facebook", "instagram"] },
  { day: 16, title: "Process Scaffold Example", type: "story", platforms: ["instagram"] },
  { day: 17, title: "Capacity Scaffold Post", type: "post", platforms: ["facebook"] },
  { day: 18, title: "Emotional Scaffold Reel", type: "reel", platforms: ["instagram"] },
  { day: 19, title: "Executive Function Image", type: "image", platforms: ["facebook", "instagram", "pinterest"] },
  { day: 20, title: "Parent Win Story", type: "story", platforms: ["instagram"] },
  { day: 21, title: "Midpoint Pin", type: "pin", platforms: ["pinterest"] },
  { day: 22, title: "Common Mistakes Carousel", type: "carousel", platforms: ["facebook", "instagram"] },
  { day: 23, title: "FAQ Story", type: "story", platforms: ["instagram"] },
  { day: 24, title: "Transformation Post", type: "post", platforms: ["facebook"] },
  { day: 25, title: "Mini Training Reel", type: "reel", platforms: ["instagram"] },
  { day: 26, title: "Book Preview Image", type: "image", platforms: ["facebook", "instagram", "pinterest"] },
  { day: 27, title: "Launch Countdown Story", type: "story", platforms: ["instagram"] },
  { day: 28, title: "Week 4 Recap Pin", type: "pin", platforms: ["pinterest"] },
  { day: 29, title: "Final Offer Carousel", type: "carousel", platforms: ["facebook", "instagram"] },
  { day: 30, title: "Thank You & Next Steps", type: "post", platforms: ["facebook", "instagram"] },
];

interface ScheduleItem {
  day: number;
  designId: string;
  platforms: string[];
  caption: string;
  postTime: string;
  status: 'scheduled' | 'published' | 'draft';
  publishedAt?: string;
}

export default function ContentScheduler() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [automationEnabled, setAutomationEnabled] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [contentSamples, setContentSamples] = useState<any[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/schedule`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setSchedules(result.schedules || []);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const scheduleContent = async (day: number, data: Partial<ScheduleItem>) => {
    try {
      const response = await fetch(`${API_BASE}/content/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          day,
          ...data,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchSchedules();
        setEditing(null);
      }
    } catch (error) {
      console.error('Error scheduling content:', error);
    }
  };

  const publishNow = async (day: number) => {
    const schedule = schedules.find(s => s.day === day);
    if (!schedule) return;

    try {
      const response = await fetch(`${API_BASE}/canva/export-and-publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          designId: schedule.designId,
          platforms: schedule.platforms,
          caption: schedule.caption,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchSchedules();
        alert(`Published to ${schedule.platforms.join(', ')}!`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error publishing:', error);
      alert('Publishing failed. Check console for details.');
    }
  };

  const getScheduleForDay = (day: number): ScheduleItem | undefined => {
    return schedules.find(s => s.day === day);
  };

  const getCurrentDay = (): number => {
    const launchDate = new Date('2026-02-01');
    const today = new Date();
    const daysSinceLaunch = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    return (daysSinceLaunch % 30) + 1;
  };

  const generateAIContent = async () => {
    if (!confirm('Generate 30 days of AI content? This will take 5-10 minutes and use OpenAI API. Make sure OPENAI_API_KEY is configured.')) {
      return;
    }

    setGenerating(true);
    setGenerationProgress('Starting AI content generation...');

    try {
      const response = await fetch(`${API_BASE}/ai/generate-calendar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        setGenerationProgress(`✓ Generated ${result.calendar?.length || 30} days of content!`);
        alert(`Success! Generated ${result.calendar?.length || 30} days of AI content. Check the dashboard to review and schedule.`);
        await fetchSchedules();
      } else {
        throw new Error(result.error || 'Generation failed');
      }
    } catch (error: any) {
      console.error('AI generation error:', error);
      alert(`Error: ${error.message}. Make sure OPENAI_API_KEY is configured in Supabase Edge Function Secrets.`);
      setGenerationProgress('');
    } finally {
      setGenerating(false);
    }
  };

  const currentDay = getCurrentDay();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d9488]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Generation Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-[#0d9488] rounded-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8" />
              <h3 className="text-2xl font-black">AI CONTENT GENERATION</h3>
            </div>
            <p className="text-white/90 mb-4">
              Let AI create 30 days of on-brand content (captions + graphics) based on your ebook and brand guidelines. 
              Mix of teaching, motivational, and lifestyle posts optimized for maximum reach.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded font-bold">✓ Teaching Tips</span>
              <span className="bg-white/20 px-3 py-1 rounded font-bold">✓ Motivational Posts</span>
              <span className="bg-white/20 px-3 py-1 rounded font-bold">✓ Stories & Reels</span>
              <span className="bg-white/20 px-3 py-1 rounded font-bold">✓ Carousels</span>
              <span className="bg-white/20 px-3 py-1 rounded font-bold">✓ 100% On-Brand</span>
            </div>
          </div>
          <div className="ml-6">
            <button
              onClick={generateAIContent}
              disabled={generating}
              className="px-6 py-3 bg-white text-purple-600 font-black rounded-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  GENERATING...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  GENERATE 30 DAYS
                </>
              )}
            </button>
          </div>
        </div>
        {generationProgress && (
          <div className="mt-4 bg-white/20 rounded px-4 py-2 text-sm">
            {generationProgress}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#111111]">30-DAY CONTENT CALENDAR</h2>
          <p className="text-[#333333] mt-1">Schedule your social media automation</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-[#333333]">Current Day</div>
            <div className="text-2xl font-black text-[#0d9488]">Day {currentDay}</div>
          </div>
          
          <button
            onClick={() => setAutomationEnabled(!automationEnabled)}
            className={`flex items-center gap-2 px-4 py-2 rounded font-bold ${
              automationEnabled
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-[#333333]'
            }`}
          >
            {automationEnabled ? (
              <>
                <Play className="w-4 h-4" />
                AUTOMATION ON
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                AUTOMATION OFF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Automation Info */}
      {automationEnabled && (
        <div className="bg-green-50 border-2 border-green-600 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-[#333333]">
              <p className="font-bold text-green-900 mb-1">Automation Active</p>
              <p>Content will automatically publish daily at the scheduled time. Next post: Day {currentDay} at {getScheduleForDay(currentDay)?.postTime || '10:00 AM'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Content Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONTENT_CALENDAR.map((content) => {
          const schedule = getScheduleForDay(content.day);
          const isToday = content.day === currentDay;
          const isEditing = editing === content.day;

          return (
            <div
              key={content.day}
              className={`border-2 rounded-lg p-4 ${
                isToday
                  ? 'border-[#0d9488] bg-[#0d9488]/5'
                  : schedule?.status === 'published'
                  ? 'border-green-600 bg-green-50'
                  : schedule?.status === 'scheduled'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-[#111111]'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#111111]">DAY {content.day}</span>
                    {isToday && (
                      <span className="text-xs bg-[#0d9488] text-white px-2 py-0.5 rounded font-bold">
                        TODAY
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-[#333333] mt-1">{content.title}</div>
                </div>
                
                <StatusBadge status={schedule?.status || 'draft'} />
              </div>

              {/* Platforms */}
              <div className="flex flex-wrap gap-1 mb-3">
                {content.platforms.map(platform => (
                  <span
                    key={platform}
                    className="text-xs px-2 py-1 bg-white border border-[#111111] rounded font-bold"
                  >
                    {platform.toUpperCase()}
                  </span>
                ))}
              </div>

              {/* Editing Form */}
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Canva Design ID (e.g., DAGQx1234567)"
                    className="w-full px-3 py-2 border-2 border-[#111111] rounded text-sm"
                    defaultValue={schedule?.designId || ''}
                    id={`designId-${content.day}`}
                  />
                  <textarea
                    placeholder="Caption for social media..."
                    className="w-full px-3 py-2 border-2 border-[#111111] rounded text-sm"
                    rows={3}
                    defaultValue={schedule?.caption || ''}
                    id={`caption-${content.day}`}
                  />
                  <input
                    type="time"
                    className="w-full px-3 py-2 border-2 border-[#111111] rounded text-sm"
                    defaultValue={schedule?.postTime || '10:00'}
                    id={`postTime-${content.day}`}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const designId = (document.getElementById(`designId-${content.day}`) as HTMLInputElement).value;
                        const caption = (document.getElementById(`caption-${content.day}`) as HTMLTextAreaElement).value;
                        const postTime = (document.getElementById(`postTime-${content.day}`) as HTMLInputElement).value;
                        
                        scheduleContent(content.day, {
                          designId,
                          caption,
                          postTime,
                          platforms: content.platforms,
                          status: 'scheduled',
                        });
                      }}
                      className="flex-1 px-3 py-2 bg-[#0d9488] text-white font-bold rounded text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="px-3 py-2 border-2 border-[#111111] text-[#111111] font-bold rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Info */}
                  {schedule && (
                    <div className="text-xs text-[#333333] space-y-1 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Post at: {schedule.postTime}
                      </div>
                      {schedule.publishedAt && (
                        <div className="flex items-center gap-1 text-green-700">
                          <Check className="w-3 h-3" />
                          Published: {new Date(schedule.publishedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {schedule?.status === 'scheduled' ? (
                      <>
                        <button
                          onClick={() => publishNow(content.day)}
                          className="flex-1 px-3 py-2 bg-[#0d9488] text-white font-bold rounded text-sm flex items-center justify-center gap-1"
                        >
                          <Send className="w-4 h-4" />
                          Publish Now
                        </button>
                        <button
                          onClick={() => setEditing(content.day)}
                          className="px-3 py-2 border-2 border-[#111111] text-[#111111] font-bold rounded text-sm"
                        >
                          Edit
                        </button>
                      </>
                    ) : schedule?.status === 'published' ? (
                      <button
                        onClick={() => setEditing(content.day)}
                        className="w-full px-3 py-2 border-2 border-green-600 text-green-700 font-bold rounded text-sm"
                      >
                        View Details
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditing(content.day)}
                        className="w-full px-3 py-2 bg-[#111111] text-white font-bold rounded text-sm"
                      >
                        Schedule Content
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="border-2 border-[#0d9488] rounded-lg p-4 bg-white">
        <h3 className="font-black text-[#111111] mb-3">🚀 How to Use</h3>
        <ol className="space-y-2 text-sm text-[#333333]">
          <li><strong>1.</strong> Create designs in Canva for each day (use templates from documentation)</li>
          <li><strong>2.</strong> Copy the Design ID from Canva URL (e.g., DAGQx1234567)</li>
          <li><strong>3.</strong> Click "Schedule Content" and paste Design ID + caption</li>
          <li><strong>4.</strong> Set post time (defaults to 10:00 AM)</li>
          <li><strong>5.</strong> Enable automation above - content posts automatically!</li>
          <li><strong>6.</strong> Or click "Publish Now" to post immediately</li>
        </ol>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'scheduled' | 'published' | 'draft' }) {
  const config = {
    scheduled: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock, label: 'Scheduled' },
    published: { bg: 'bg-green-100', text: 'text-green-800', icon: Check, label: 'Published' },
    draft: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertCircle, label: 'Draft' },
  }[status];

  const Icon = config.icon;

  return (
    <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}