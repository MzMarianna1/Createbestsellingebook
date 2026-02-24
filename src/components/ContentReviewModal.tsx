import { useState } from 'react';
import { X, Check, Edit, Sparkles, Eye } from 'lucide-react';

interface ContentSample {
  day: number;
  type: string;
  format: string;
  hook: string;
  caption: string;
  visualPrompt: string;
  hashtags: string[];
  imageUrl?: string;
}

interface ContentReviewModalProps {
  samples: ContentSample[];
  onApprove: () => void;
  onReject: () => void;
  onEdit: (day: number, field: string, value: string) => void;
}

export default function ContentReviewModal({ samples, onApprove, onReject, onEdit }: ContentReviewModalProps) {
  const [selectedSample, setSelectedSample] = useState(0);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const currentSample = samples[selectedSample];

  const startEditing = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editingField) {
      onEdit(currentSample.day, editingField, editValue);
      setEditingField(null);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-[#0d9488] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-2xl font-black">Review AI-Generated Content Samples</h2>
              </div>
              <p className="text-white/90">
                Review 1 sample of each content type before full generation. Approve to generate all 30 days.
              </p>
            </div>
            <button
              onClick={onReject}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Sample Tabs */}
        <div className="flex gap-2 p-4 bg-gray-50 border-b overflow-x-auto">
          {samples.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSample(idx)}
              className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${
                selectedSample === idx
                  ? 'bg-[#0d9488] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {sample.type.charAt(0).toUpperCase() + sample.type.slice(1)} - {sample.format}
            </button>
          ))}
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Visual Preview */}
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Visual Preview
              </h3>
              <div className="bg-gray-100 rounded-lg p-4 aspect-square flex items-center justify-center">
                {currentSample.imageUrl ? (
                  <img
                    src={currentSample.imageUrl}
                    alt="Content preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="text-center">
                    <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm">
                      <div className="text-6xl mb-4">📚</div>
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Visual Prompt:</strong>
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {currentSample.visualPrompt}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Design this in Canva using the visual prompt, or use stock image with text overlay
              </p>
            </div>

            {/* Right: Content Details */}
            <div className="space-y-4">
              {/* Day & Type */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Content Type</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                    Day {currentSample.day}
                  </span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-bold">
                    {currentSample.type}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                    {currentSample.format}
                  </span>
                </div>
              </div>

              {/* Hook */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-gray-700">Hook</p>
                  <button
                    onClick={() => startEditing('hook', currentSample.hook)}
                    className="text-[#0d9488] hover:text-[#0a7a70] text-sm flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                {editingField === 'hook' ? (
                  <div>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg mb-2"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 bg-[#0d9488] text-white rounded text-sm font-bold"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-gray-900">{currentSample.hook}</p>
                )}
              </div>

              {/* Caption */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-gray-700">Caption</p>
                  <button
                    onClick={() => startEditing('caption', currentSample.caption)}
                    className="text-[#0d9488] hover:text-[#0a7a70] text-sm flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                {editingField === 'caption' ? (
                  <div>
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg mb-2 h-48"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 bg-[#0d9488] text-white rounded text-sm font-bold"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap max-h-64 overflow-y-auto">
                    {currentSample.caption}
                  </div>
                )}
              </div>

              {/* Hashtags */}
              <div>
                <p className="text-sm font-bold text-gray-700 mb-2">Hashtags</p>
                <div className="flex flex-wrap gap-2">
                  {currentSample.hashtags.map((tag, idx) => (
                    <span key={idx} className="text-xs text-[#0d9488] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Reviewing sample {selectedSample + 1} of {samples.length}
            </p>
            <div className="flex gap-3">
              <button
                onClick={onReject}
                className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50"
              >
                Regenerate Samples
              </button>
              <button
                onClick={onApprove}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-[#0d9488] text-white rounded-lg font-bold hover:opacity-90 flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Approve & Generate All 30 Days
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
