import React, { useState, useRef } from 'react';
import { User, HotMeterLevel, CommunityVerdict, HotTakeAnalysisResult } from '../types';
import { FlameIcon } from './CustomIcons';
import { X, Sparkles, Image as ImageIcon, Upload, Save, Send, Trash2, CheckCircle2 } from 'lucide-react';

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
  const [images, setImages] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [hashtags, setHashtags] = useState<string[]>(['HotTake', 'Football']);
  const [taggedClub, setTaggedClub] = useState('');
  const [taggedPlayer, setTaggedPlayer] = useState('');
  const [hotMeter, setHotMeter] = useState<HotMeterLevel>('SPICY');
  const [communityVerdict, setCommunityVerdict] = useState<CommunityVerdict>('WARM_TAKE');
  
  // Device File Upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // AI Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<HotTakeAnalysisResult | null>(null);

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

  // Device File Upload Handler
  const processFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setImages((prev) => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // AI Hot Take Analyzer call
  const handleAiAnalyze = async () => {
    if (!content.trim()) return;
    setIsAnalyzing(true);
    setAiResult(null);

    try {
      const res = await fetch('/api/analyze-take', {
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
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">@{user.username} • Level {user.level} Author</span>
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
              className="w-full bg-slate-50 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-hidden focus:border-orange-500 resize-none text-slate-900 dark:text-white placeholder-slate-400 font-normal"
              required
            />
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
              <span>{400 - content.length} characters left</span>
              <span>Clean, text-driven opinion</span>
            </div>
          </div>

          {/* Device Image Upload Zone */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
              Attach Images From Device
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUploadChange}
              accept="image/*"
              multiple
              className="hidden"
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center ${
                isDragging
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Upload size={20} className="text-orange-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Click or Drag & Drop images from your device
                </span>
                <span className="text-[10px] text-slate-400">Supports PNG, JPG, WEBP, GIF</span>
              </div>
            </div>

            {/* Uploaded Images Thumbnails */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2.5 mt-3">
                {images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 group shadow-xs">
                    <img src={img} alt="Uploaded attachment" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, index) => index !== i))}
                      className="absolute top-1 right-1 bg-slate-950/80 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                      title="Remove image"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Hot Take Analyzer Button */}
          <div className="bg-slate-50 dark:bg-slate-900/70 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Sparkles size={16} className="text-orange-500" />
                <span>AI Spiciness Analyzer</span>
              </div>
              <button
                type="button"
                onClick={handleAiAnalyze}
                disabled={!content.trim() || isAnalyzing}
                className="px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all disabled:opacity-50 flex items-center gap-1 shadow-xs"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Spiciness'}
              </button>
            </div>

            {aiResult && (
              <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span>Spiciness Score: <span className="text-orange-500">{aiResult.spicinessScore}/100</span></span>
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
                Hot Meter Level
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
                Verdict Category
              </label>
              <select
                value={communityVerdict}
                onChange={(e) => setCommunityVerdict(e.target.value as CommunityVerdict)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <option value="COLD_TAKE">Cold Take</option>
                <option value="WARM_TAKE">Warm Take</option>
                <option value="HOT_TAKE">Hot Take</option>
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
                placeholder="e.g. Arsenal FC"
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

