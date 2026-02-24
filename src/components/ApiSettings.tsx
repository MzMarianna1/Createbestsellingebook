import { useState, useEffect } from 'react';
import { Key, Check, X, AlertCircle, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-14f75f49`;

interface ApiKeyConfig {
  name: string;
  key: string;
  description: string;
  status: 'active' | 'missing' | 'error';
  required: boolean;
  placeholder: string;
}

export default function ApiSettings() {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    CANVA_CLIENT_ID: '',
    CANVA_CLIENT_SECRET: '',
    META_ACCESS_TOKEN: '',
    META_PAGE_ID: '',
    META_INSTAGRAM_ACCOUNT_ID: '',
    PINTEREST_ACCESS_TOKEN: '',
  });
  
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({});

  const keyConfigs: ApiKeyConfig[] = [
    {
      name: 'CANVA_CLIENT_ID',
      key: 'canva_client_id',
      description: 'Required for automated design creation and export',
      status: apiKeys.CANVA_CLIENT_ID ? 'active' : 'missing',
      required: true,
      placeholder: 'sk_...',
    },
    {
      name: 'CANVA_CLIENT_SECRET',
      key: 'canva_client_secret',
      description: 'Required for automated design creation and export',
      status: apiKeys.CANVA_CLIENT_SECRET ? 'active' : 'missing',
      required: true,
      placeholder: 'sk_...',
    },
    {
      name: 'META_ACCESS_TOKEN',
      key: 'meta',
      description: 'Required for Facebook & Instagram posting',
      status: apiKeys.META_ACCESS_TOKEN ? 'active' : 'missing',
      required: true,
      placeholder: 'EAABsbCS1iHgBO...',
    },
    {
      name: 'META_PAGE_ID',
      key: 'meta_page',
      description: 'Your Facebook Page ID',
      status: apiKeys.META_PAGE_ID ? 'active' : 'missing',
      required: true,
      placeholder: '123456789012345',
    },
    {
      name: 'META_INSTAGRAM_ACCOUNT_ID',
      key: 'meta_ig',
      description: 'Your Instagram Business Account ID',
      status: apiKeys.META_INSTAGRAM_ACCOUNT_ID ? 'active' : 'missing',
      required: true,
      placeholder: '987654321098765',
    },
    {
      name: 'PINTEREST_ACCESS_TOKEN',
      key: 'pinterest',
      description: 'Optional: For Pinterest posting',
      status: apiKeys.PINTEREST_ACCESS_TOKEN ? 'active' : 'missing',
      required: false,
      placeholder: 'pina_...',
    },
  ];

  const saveApiKey = async (keyName: string, value: string) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/settings/api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          keyName,
          value,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setApiKeys(prev => ({ ...prev, [keyName]: value }));
      }
    } catch (error) {
      console.error('Error saving API key:', error);
    } finally {
      setSaving(false);
    }
  };

  const testApiKey = async (keyName: string) => {
    try {
      const response = await fetch(`${API_BASE}/settings/test-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ keyName }),
      });
      
      const result = await response.json();
      
      setTestResults(prev => ({
        ...prev,
        [keyName]: {
          success: result.success,
          message: result.message || (result.success ? 'API key is valid!' : 'API key test failed'),
        },
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [keyName]: {
          success: false,
          message: 'Connection error',
        },
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-[#111111] mb-2">API SETTINGS</h2>
        <p className="text-[#333333]">Configure API keys for full automation</p>
      </div>

      {/* Info Banner */}
      <div className="bg-[#0d9488]/10 border-2 border-[#0d9488] rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#0d9488] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-[#333333]">
            <p className="font-bold text-[#111111] mb-1">Security Note:</p>
            <p>API keys are encrypted and stored securely in Supabase Edge Function environment variables. They are never exposed to the frontend.</p>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="space-y-4">
        {keyConfigs.map((config) => (
          <div key={config.name} className="border-2 border-[#111111] rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-[#111111]">{config.name}</h3>
                  {config.required && (
                    <span className="text-xs bg-[#0d9488] text-white px-2 py-0.5 rounded font-bold">
                      REQUIRED
                    </span>
                  )}
                  <StatusBadge status={config.status} />
                </div>
                <p className="text-sm text-[#333333]">{config.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Input */}
              <div className="relative">
                <input
                  type={showKeys[config.name] ? 'text' : 'password'}
                  placeholder={config.placeholder}
                  value={apiKeys[config.name]}
                  onChange={(e) => setApiKeys(prev => ({ ...prev, [config.name]: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-[#111111] rounded font-mono text-sm pr-24"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    onClick={() => setShowKeys(prev => ({ ...prev, [config.name]: !prev[config.name] }))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {showKeys[config.name] ? (
                      <EyeOff className="w-4 h-4 text-[#333333]" />
                    ) : (
                      <Eye className="w-4 h-4 text-[#333333]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => saveApiKey(config.name, apiKeys[config.name])}
                  disabled={!apiKeys[config.name] || saving}
                  className="px-4 py-2 bg-[#0d9488] text-white font-bold rounded hover:bg-[#0d9488]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Key'}
                </button>
                
                <button
                  onClick={() => testApiKey(config.name)}
                  disabled={!apiKeys[config.name]}
                  className="px-4 py-2 border-2 border-[#111111] text-[#111111] font-bold rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Test Connection
                </button>
              </div>

              {/* Test Result */}
              {testResults[config.name] && (
                <div className={`flex items-center gap-2 text-sm ${testResults[config.name].success ? 'text-green-600' : 'text-red-600'}`}>
                  {testResults[config.name].success ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  <span>{testResults[config.name].message}</span>
                </div>
              )}
            </div>

            {/* Setup Instructions */}
            <SetupInstructions keyName={config.name} />
          </div>
        ))}
      </div>

      {/* Quick Setup Guide */}
      <div className="border-2 border-[#0d9488] rounded-lg p-4 bg-white">
        <h3 className="font-black text-[#111111] mb-3">📚 Quick Setup Guide</h3>
        <ol className="space-y-2 text-sm text-[#333333]">
          <li><strong>1. Canva:</strong> Get API key from <a href="https://www.canva.com/developers/apps/AAHAAFRb5g8" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">Canva Developer Portal</a></li>
          <li><strong>2. Meta:</strong> Get access token from <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">Meta for Developers</a></li>
          <li><strong>3. Page ID:</strong> Find in Facebook Page Settings → About</li>
          <li><strong>4. Instagram ID:</strong> Link Instagram Business account to Facebook Page</li>
          <li><strong>5. Pinterest:</strong> Get token from <a href="https://developers.pinterest.com/" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">Pinterest Developer Portal</a> (optional)</li>
        </ol>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'active' | 'missing' | 'error' }) {
  const config = {
    active: { bg: 'bg-green-100', text: 'text-green-800', icon: Check, label: 'Active' },
    missing: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertCircle, label: 'Not Set' },
    error: { bg: 'bg-red-100', text: 'text-red-800', icon: X, label: 'Error' },
  }[status];

  const Icon = config.icon;

  return (
    <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

function SetupInstructions({ keyName }: { keyName: string }) {
  const instructions: Record<string, JSX.Element> = {
    CANVA_CLIENT_ID: (
      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-[#333333]">
        <p className="font-bold mb-1">📘 Full Guide: <a href="/CANVA-API-KEY-GUIDE.md" className="text-[#0d9488] underline">CANVA-API-KEY-GUIDE.md</a></p>
        <p className="font-bold mb-1">How to get Canva Client ID:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go to <a href="https://www.canva.com/developers/apps/AAHAAFRb5g8" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">your Canva app</a></li>
          <li>Click "Authentication" tab</li>
          <li>Find "OAuth credentials" section</li>
          <li>Copy "Client ID" (starts with OC-...)</li>
          <li>Paste above and click "Save Key"</li>
        </ol>
        <p className="mt-2 text-yellow-700 font-bold">⚡ Or skip Canva API and use image URLs instead! (See guide)</p>
      </div>
    ),
    CANVA_CLIENT_SECRET: (
      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-[#333333]">
        <p className="font-bold mb-1">📘 Full Guide: <a href="/CANVA-API-KEY-GUIDE.md" className="text-[#0d9488] underline">CANVA-API-KEY-GUIDE.md</a></p>
        <p className="font-bold mb-1">How to get Canva Client Secret:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go to <a href="https://www.canva.com/developers/apps/AAHAAFRb5g8" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">your Canva app</a></li>
          <li>Click "Authentication" tab</li>
          <li>Find "OAuth credentials" section</li>
          <li>Click "Show" next to Client Secret</li>
          <li>Copy the secret</li>
          <li>Paste above and click "Save Key"</li>
        </ol>
        <p className="mt-2 text-yellow-700 font-bold">⚡ Or skip Canva API and use image URLs instead! (See guide)</p>
      </div>
    ),
    META_ACCESS_TOKEN: (
      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-[#333333]">
        <p className="font-bold mb-1">📘 Full Guide: <a href="/META-API-QUICK-SETUP.md" className="text-[#0d9488] underline">META-API-QUICK-SETUP.md</a></p>
        <p className="font-bold mb-1">How to get Meta Access Token (10 min):</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go to <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">Meta Graph API Explorer</a></li>
          <li>Click "Generate Access Token"</li>
          <li>Add permissions: pages_manage_posts, instagram_basic, instagram_content_publish</li>
          <li>Go to <a href="https://developers.facebook.com/tools/accesstoken/" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">Access Token Tool</a></li>
          <li>Click "Extend Access Token" (60-day token)</li>
          <li>Copy token and paste above ✅</li>
        </ol>
      </div>
    ),
    META_PAGE_ID: (
      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-[#333333]">
        <p className="font-bold mb-1">📘 Full Guide: <a href="/META-API-QUICK-SETUP.md" className="text-[#0d9488] underline">META-API-QUICK-SETUP.md</a></p>
        <p className="font-bold mb-1">How to find Facebook Page ID:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go to your Facebook Page</li>
          <li>Click "About" in the left menu</li>
          <li>Scroll to "Page Transparency"</li>
          <li>Copy "Page ID" (looks like: 123456789012345)</li>
        </ol>
      </div>
    ),
    META_INSTAGRAM_ACCOUNT_ID: (
      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-[#333333]">
        <p className="font-bold mb-1">📘 Full Guide: <a href="/META-API-QUICK-SETUP.md" className="text-[#0d9488] underline">META-API-QUICK-SETUP.md</a></p>
        <p className="font-bold mb-1">How to find Instagram Account ID:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Make sure Instagram is linked to Facebook Page (Page Settings → Instagram)</li>
          <li>Must be a BUSINESS account, not Personal</li>
          <li>Go to <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">Graph API Explorer</a></li>
          <li>Query: <code className="bg-gray-100 px-1">me/accounts?fields=instagram_business_account</code></li>
          <li>Copy <code className="bg-gray-100 px-1">instagram_business_account.id</code></li>
        </ol>
      </div>
    ),
    PINTEREST_ACCESS_TOKEN: (
      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-[#333333]">
        <p className="font-bold mb-1">How to get Pinterest Access Token:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Create app at <a href="https://developers.pinterest.com/" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">Pinterest Developers</a></li>
          <li>Request access to Pinterest API</li>
          <li>Generate access token with <code className="bg-gray-100 px-1">pins:write</code> scope</li>
        </ol>
      </div>
    ),
  };

  return instructions[keyName] || null;
}