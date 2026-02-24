import { useState, useEffect } from 'react';
import { 
  DollarSign, Users, Mail, TrendingUp, Zap, Download, 
  Calendar, Activity, Target, BarChart3, Send, Palette, Settings, Play
} from 'lucide-react';
import { projectId, publicAnonKey } from './utils/supabase/info';
import ApiSettings from './components/ApiSettings';
import ContentScheduler from './components/ContentScheduler';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-14f75f49`;

export default function MarketingDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'scheduler' | 'email' | 'settings' | 'customers'>('overview');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE}/analytics/dashboard`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setAnalytics(result.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSocialCampaign = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/campaign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          theme: 'homework_battles',
          postCount: 7,
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert(`✅ Generated ${result.posts.length} social media posts!`);
      }
    } catch (error) {
      console.error('Error generating campaign:', error);
      alert('Error generating campaign. Check console for details.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d9488] mx-auto mb-4"></div>
          <p className="text-[#111111] font-bold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-[#111111]">MARKETING COMMAND CENTER</h1>
              <p className="text-[#333333] mt-1">Stop Homework Battles - Automation Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/App.tsx"
                className="px-4 py-2 text-sm font-bold text-[#0d9488] hover:text-[#111111] border-2 border-[#0d9488] hover:border-[#111111] rounded transition-colors"
              >
                View Ebook
              </a>
              <button
                onClick={() => fetchAnalytics()}
                className="px-4 py-2 text-sm font-bold bg-[#0d9488] text-white rounded hover:bg-[#0d9488]/90 transition-colors flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6">
            {['overview', 'scheduler', 'email', 'settings', 'customers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 font-bold rounded-t transition-colors ${
                  activeTab === tab
                    ? 'bg-[#0d9488] text-white'
                    : 'text-[#333333] hover:text-[#0d9488]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'overview' && <OverviewTab analytics={analytics} />}
        {activeTab === 'scheduler' && <ContentScheduler />}
        {activeTab === 'email' && <EmailTab />}
        {activeTab === 'settings' && <ApiSettings />}
        {activeTab === 'customers' && <CustomersTab />}
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab({ analytics }: { analytics: any }) {
  const stats = [
    {
      label: 'Total Revenue',
      value: `$${analytics?.totalRevenue || '0.00'}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Total Orders',
      value: analytics?.totalOrders || 0,
      icon: TrendingUp,
      color: 'text-[#0d9488]',
      bgColor: 'bg-teal-50',
    },
    {
      label: 'Email List',
      value: analytics?.totalCustomers || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Quiz Completions',
      value: analytics?.quizCompletions || 0,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Conversion Rate',
      value: analytics?.conversionRate || '0%',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-black text-[#111111] mb-1">{stat.value}</div>
            <div className="text-sm text-[#333333]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-black text-[#111111] mb-4">QUICK ACTIONS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/Quiz.tsx"
            className="p-4 border-2 border-[#0d9488] rounded-lg hover:bg-[#0d9488] hover:text-white transition-colors text-center font-bold"
          >
            📝 View Quiz Page
          </a>
          <a
            href="/SalesPage.tsx"
            className="p-4 border-2 border-[#0d9488] rounded-lg hover:bg-[#0d9488] hover:text-white transition-colors text-center font-bold"
          >
            💰 View Sales Page
          </a>
          <a
            href="/Checkout.tsx"
            className="p-4 border-2 border-[#0d9488] rounded-lg hover:bg-[#0d9488] hover:text-white transition-colors text-center font-bold"
          >
            🛒 View Checkout
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-black text-[#111111] mb-4">RECENT ACTIVITY</h2>
        {analytics?.recentEvents && analytics.recentEvents.length > 0 ? (
          <div className="space-y-3">
            {analytics.recentEvents.map((event: any, index: number) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-[#0d9488]" />
                  <span className="font-bold text-[#111111]">{event.event_type}</span>
                </div>
                <span className="text-sm text-[#333333]">
                  {new Date(event.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#333333]">No recent activity yet. Start by testing the quiz!</p>
        )}
      </div>

      {/* Path to $1M */}
      <div className="bg-gradient-to-r from-[#0d9488] to-[#0891b2] rounded-lg shadow-sm p-8 text-white">
        <h2 className="text-2xl font-black mb-4">📈 YOUR PATH TO $1M</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-4xl font-black mb-2">21,277</div>
            <div className="text-sm opacity-90">Sales needed @ $47</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">1,773</div>
            <div className="text-sm opacity-90">Sales per month (12mo)</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">59</div>
            <div className="text-sm opacity-90">Sales per day</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">5%</div>
            <div className="text-sm opacity-90">Conversion needed @ 1,180 visitors/day</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Email Tab
function EmailTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-black text-[#111111] mb-4 flex items-center gap-2">
          <Mail className="w-6 h-6 text-[#0d9488]" />
          EMAIL AUTOMATION
        </h2>
        <p className="text-[#333333] mb-6">
          Your Resend integration is configured. Email sequences trigger automatically.
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-[#0d9488] pl-4">
            <h3 className="font-black text-[#111111] mb-2">Quiz Result Email</h3>
            <p className="text-sm text-[#333333] mb-2">
              Triggers: Immediately after quiz completion<br />
              Purpose: Deliver personalized scaffold results + sales pitch
            </p>
            <div className="text-xs text-[#0d9488] font-bold">✓ ACTIVE</div>
          </div>

          <div className="border-l-4 border-[#0d9488] pl-4">
            <h3 className="font-black text-[#111111] mb-2">Welcome Email</h3>
            <p className="text-sm text-[#333333] mb-2">
              Triggers: Immediately after purchase<br />
              Purpose: Deliver ebook + bonus materials
            </p>
            <div className="text-xs text-[#0d9488] font-bold">✓ ACTIVE</div>
          </div>

          <div className="border-l-4 border-gray-300 pl-4 opacity-50">
            <h3 className="font-black text-[#111111] mb-2">Abandoned Cart Email</h3>
            <p className="text-sm text-[#333333] mb-2">
              Triggers: 24 hours after checkout started but not completed<br />
              Purpose: Recover lost sales
            </p>
            <div className="text-xs text-gray-500 font-bold">⏳ COMING SOON</div>
          </div>

          <div className="border-l-4 border-gray-300 pl-4 opacity-50">
            <h3 className="font-black text-[#111111] mb-2">Upsell to Coaching</h3>
            <p className="text-sm text-[#333333] mb-2">
              Triggers: 3 days after ebook purchase<br />
              Purpose: Upsell 1-on-1 strategy session
            </p>
            <div className="text-xs text-gray-500 font-bold">⏳ COMING SOON</div>
          </div>
        </div>
      </div>

      <div className="bg-[#f5f5f5] rounded-lg p-6">
        <h3 className="font-black text-[#111111] mb-3">📧 Setup Instructions</h3>
        <ol className="space-y-2 text-sm text-[#333333]">
          <li><strong>1.</strong> Go to Supabase Dashboard → Edge Functions → Secrets</li>
          <li><strong>2.</strong> Add secret: <code className="bg-white px-2 py-1 rounded">RESEND_API_KEY</code> with your Resend API key</li>
          <li><strong>3.</strong> Update FROM_EMAIL in <code className="bg-white px-2 py-1 rounded">/supabase/functions/server/resend.tsx</code></li>
          <li><strong>4.</strong> Test by completing the quiz at <a href="/Quiz.tsx" className="text-[#0d9488] font-bold">/Quiz.tsx</a></li>
        </ol>
      </div>
    </div>
  );
}

// Content Tab
function ContentTab({ onGenerateCampaign }: { onGenerateCampaign: () => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-black text-[#111111] mb-4 flex items-center gap-2">
          <Palette className="w-6 h-6 text-[#0d9488]" />
          CANVA CONTENT GENERATION
        </h2>
        <p className="text-[#333333] mb-6">
          Auto-generate social media posts, ad creatives, and marketing materials.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={onGenerateCampaign}
            className="p-6 border-2 border-[#0d9488] rounded-lg hover:bg-[#0d9488] hover:text-white transition-colors text-left"
          >
            <div className="font-black text-lg mb-2">🚀 Generate 7-Day Campaign</div>
            <div className="text-sm opacity-80">
              Create Instagram/Facebook posts for homework battles theme
            </div>
          </button>

          <button
            className="p-6 border-2 border-gray-300 rounded-lg hover:border-[#0d9488] transition-colors text-left opacity-50 cursor-not-allowed"
            disabled
          >
            <div className="font-black text-lg mb-2">📝 Generate Quiz Result Graphic</div>
            <div className="text-sm opacity-80">
              Auto-generated when customer completes quiz
            </div>
          </button>

          <button
            className="p-6 border-2 border-gray-300 rounded-lg hover:border-[#0d9488] transition-colors text-left opacity-50 cursor-not-allowed"
            disabled
          >
            <div className="font-black text-lg mb-2">💬 Generate Testimonial Cards</div>
            <div className="text-sm opacity-80">
              Coming soon - design testimonials for social proof
            </div>
          </button>

          <button
            className="p-6 border-2 border-gray-300 rounded-lg hover:border-[#0d9488] transition-colors text-left opacity-50 cursor-not-allowed"
            disabled
          >
            <div className="font-black text-lg mb-2">🎯 Generate Ad Creatives</div>
            <div className="text-sm opacity-80">
              Coming soon - Facebook/Instagram ad variations
            </div>
          </button>
        </div>

        <div className="bg-[#f5f5f5] rounded-lg p-6">
          <h3 className="font-black text-[#111111] mb-3">🎨 Setup Instructions</h3>
          <ol className="space-y-2 text-sm text-[#333333]">
            <li><strong>1.</strong> Get Canva API key from <a href="https://www.canva.com/developers/" target="_blank" rel="noopener" className="text-[#0d9488] font-bold">Canva Developers</a></li>
            <li><strong>2.</strong> Create design templates in Canva for each content type</li>
            <li><strong>3.</strong> Add template IDs to <code className="bg-white px-2 py-1 rounded">/supabase/functions/server/canva.tsx</code></li>
            <li><strong>4.</strong> Add secret: <code className="bg-white px-2 py-1 rounded">CANVA_API_KEY</code> in Supabase Dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// Customers Tab
function CustomersTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-black text-[#111111] mb-4 flex items-center gap-2">
        <Users className="w-6 h-6 text-[#0d9488]" />
        CUSTOMER MANAGEMENT
      </h2>
      <p className="text-[#333333] mb-6">
        View and manage your customers, quiz results, and purchase history.
      </p>
      <div className="text-center py-12 text-[#333333]">
        <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
        <p>Customer list view coming soon...</p>
        <p className="text-sm mt-2">For now, view customers directly in Supabase Dashboard</p>
      </div>
    </div>
  );
}