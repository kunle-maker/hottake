import React, { useState } from 'react';
import { User, HotMeterLevel, CommunityVerdict, HotTakeAnalysisResult } from '../types';
import { FlameIcon } from './CustomIcons';
import { X, Sparkles, Image, Hash, Tag, Save, Send } from 'lucide-react';

interface CreatePostModalProps {
  user: User;
  onClose: () => void;
  onSubmit: (data: {
    content: string;
    images?: string[];
    hashtags: string[];
    taggedClub?: string;
    taggedPlayer?: string;
    hotMeter: HotMeterLevel;
    communityVerdict: CommunityVerdict;
  }) => void;
  onSaveDraft?: (draftContent: string) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  user,
  onClose,
  onSubmit,
  onSaveDraft
}) => {
  const [content, setContent] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [hashtags, setHashtags] = useState<string[]>(['HotTake', 'Football']);
  const [taggedClub, setTaggedClub] = useState('');
  const [taggedPlayer, setTaggedPlayer] = useState('');
  const [hotMeter, setHotMeter] = useState<HotMeterLevel>('SPICY');
  const [communityVerdict, setCommunityVerdict] = useState<CommunityVerdict>('WARM_TAKE');
  
  // AI Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<HotTakeAnalysisResult | null>(null);
  const [showImageField, setShowImageField] = useState(false);

  const handleAddHashtag = () => {
    if (hashtagInput.trim()) {
      const cleanTag = hashtagInput.trim().replace(/^#/, '');
      if (!hashtags.includes(cleanTag)) {
        setHashtags([...hashtags, cleanTag]);
      }
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter(t => t !== tagToRemove));
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setImages([...images, imageInput.trim()]);
      setImageInput('');
      setShowImageField(false);
    }
  };

  // AI Hot Take Analyzer call
  const handleAiAnalyze = async () => {
    if (!content.trim()) return;
    setIsAnalyzing(true);
    setAiResult(null);

    try {
      const res = await fetch('/api/gemini/analyze-take', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAiResult(data.analysis);
        setHotMeter(data.analysis.hotMeter);
        setCommunityVerdict(data.analysis.verdict);
        if (data.analysis.suggestedHashtags && data.analysis.suggestedHashtags.length > 0) {
          const combined = Array.from(new Set([...hashtags, ...data.analysis.suggestedHashtags]));
          setHashtags(combined);
        }
      }
    } catch (err) {
      console.error('AI analysis error', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      content,
      images,
      hashtags,
      taggedClub: taggedClub || undefined,
      taggedPlayer: taggedPlayer || undefined,
      hotMeter,
      communityVerdict
    });
    onClose();
  };

  const handleSaveDraft = () => {
    if (content.trim() && onSaveDraft) {
      onSaveDraft(content);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <FlameIcon size={20} className="text-orange-500" />
            <h2 className="font-extrabold text-base">Publish Hot Take</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* User info */}
          <div className="flex items-center gap-2.5">
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <div>
              <div className="font-bold text-sm leading-tight text-slate-900 dark:text-white">{user.displayName}</div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">@{user.username} • Lvl {user.level} Author</span>
            </div>
          </div>

          {/* Text Area */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What is your spiciest football opinion today? (e.g., 'Tactically, Arsenal double pivot locks down Madrid...')"
              rows={4}
              maxLength={400}
              className="w-full bg-slate-50 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-hidden focus:border-orange-500 resize-none text-slate-900 dark:text-white placeholder-slate-400"
              required
            />
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
              <span>{400 - content.length} characters left</span>
              <span>No emojis needed!</span>
            </div>
          </div>

          {/* AI Hot Take Analyzer Button */}
          <div className="bg-slate-50 dark:bg-slate-900/70 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Sparkles size={16} className="text-orange-500" />
                <span>AI Hot Take Meter Analyzer</span>
              </div>
              <button
                type="button"
                onClick={handleAiAnalyze}
                disabled={!content.trim() || isAnalyzing}
                className="px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all disabled:opacity-50 flex items-center gap-1 shadow-xs"
              >
                {isAnalyzing ? 'Analyzing...' : 'Test Spiciness'}
              </button>
            </div>

            {aiResult && (
              <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span>Spiciness Score: <span className="text-red-500">{aiResult.spicinessScore}/100</span></span>
                  <span className="text-slate-600 dark:text-slate-300">Hot Meter: <strong className="text-slate-900 dark:text-white">{aiResult.hotMeter}</strong></span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic">{aiResult.aiSummary}</p>
              </div>
            )}
          </div>

          {/* Hot Meter Manual Override Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Hot Meter™
              </label>
              <select
                value={hotMeter}
                onChange={(e) => setHotMeter(e.target.value as HotMeterLevel)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <option value="MILD">Mild Take</option>
                <option value="SPICY">Spicy Take</option>
                <option value="NUCLEAR">Nuclear Take</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Community Verdict
              </label>
              <select
                value={communityVerdict}
                onChange={(e) => setCommunityVerdict(e.target.value as CommunityVerdict)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <option value="COLD_TAKE">Cold Take</option>
                <option value="WARM_TAKE">Warm Take</option>
                <option value="HOT_TAKE">Hot Take!</option>
                <option value="VOLCANIC">Volcanic Take</option>
                <option value="LEGENDARY">Legendary Take</option>
              </select>
            </div>
          </div>

          {/* Tagged Club & Player */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Tag Club</label>
              <input
                type="text"
                value={taggedClub}
                onChange={(e) => setTaggedClub(e.target.value)}
                placeholder="e.g. Arsenal"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Tag Player</label>
              <input
                type="text"
                value={taggedPlayer}
                onChange={(e) => setTaggedPlayer(e.target.value)}
                placeholder="e.g. Bukayo Saka"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Hashtags input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Hashtags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddHashtag(); } }}
                placeholder="Add hashtag (press Enter)"
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddHashtag}
                className="px-3 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-xs font-bold rounded-lg text-slate-900 dark:text-white"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md text-xs font-medium flex items-center gap-1 border border-slate-200 dark:border-slate-700"
                >
                  #{tag}
                  <button type="button" onClick={() => handleRemoveHashtag(tag)} className="hover:text-red-500 ml-0.5">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Images preview & input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-500">Image URL (Optional)</label>
              <button
                type="button"
                onClick={() => setShowImageField(!showImageField)}
                className="text-xs text-orange-600 dark:text-orange-400 font-bold hover:underline flex items-center gap-1"
              >
                <Image size={14} />
                <span>{showImageField ? 'Cancel' : 'Attach Image'}</span>
              </button>
            </div>
            {showImageField && (
              <div className="flex gap-2 mt-1">
                <input
                  type="url"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-lg"
                >
                  Attach
                </button>
              </div>
            )}
            {images.length > 0 && (
              <div className="flex gap-2 mt-2">
                {images.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-300">
                    <img src={img} alt="attached" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, index) => index !== i))}
                      className="absolute top-0 right-0 bg-red-600 text-white w-4 h-4 text-[10px] flex items-center justify-center rounded-bl"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={!content.trim()}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all flex items-center gap-1.5 disabled:opacity-40"
            >
              <Save size={15} />
              <span>Save Draft</span>
            </button>

            <button
              type="submit"
              disabled={!content.trim()}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all flex items-center gap-2 shadow-xs disabled:opacity-50"
            >
              <Send size={15} />
              <span>Publish Take</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
