import React from 'react';
import { NotificationItem } from '../types';
import { X, Bell, Heart, MessageSquare, Repeat, Play, Repeat as TransferIcon } from 'lucide-react';

interface NotificationsModalProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  onClose,
  onMarkAllRead
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-[#0C1D38] text-slate-900 dark:text-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 bg-[#0B1E3D] text-white flex items-center justify-between border-b border-sky-900">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-[#00A3E0]" />
            <h3 className="font-extrabold text-sm">Notifications & Match Alerts</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-slate-300">
            <X size={18} />
          </button>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-[#07152B] border-b border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
          <span className="font-bold text-slate-600 dark:text-slate-300">Activity Hub</span>
          <button onClick={onMarkAllRead} className="text-[#00A3E0] font-bold hover:underline">
            Mark all read
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                !n.isRead
                  ? 'bg-sky-500/10 border-sky-500/30'
                  : 'bg-slate-50 dark:bg-[#07152B] border-slate-200 dark:border-slate-800'
              }`}
            >
              <img src={n.actorAvatar} alt="Actor" className="w-9 h-9 rounded-full object-cover shrink-0" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between font-bold mb-0.5">
                  <span className="text-slate-900 dark:text-white">{n.actorName}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{n.createdAt}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-snug">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
