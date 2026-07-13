import React from 'react';
import NotificationCard from './NotificationCard.jsx';

export default function NotificationDrawer({ isOpen, onClose, notifications = [], onMarkRead, onDelete }) {
  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    notifications.forEach(n => {
      if (!n.read) {
        onMarkRead(n.id);
      }
    });
  };

  return (
    <div className="absolute right-0 top-14 w-80 max-h-[420px] bg-[#0A0A0A] border border-gold/15 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-[fadeIn_200ms_ease-out]">
      <div className="px-5 py-4 border-b border-neutral-900 bg-neutral-950/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono font-bold">
            Activity Updates
          </span>
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-gold/10 border border-gold/30 text-[8px] font-mono text-gold animate-pulse">
              NEW
            </span>
          )}
        </div>
        <div className="flex gap-2.5 items-center">
          {notifications.some(n => !n.read) && (
            <button
              onClick={handleMarkAllRead}
              className="text-[9px] text-neutral-400 hover:text-gold uppercase tracking-wider font-mono transition-colors"
            >
              Read All
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-gold p-0.5 text-xs font-mono"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5 scrollbar-thin max-h-[340px]">
        {notifications.length > 0 ? (
          notifications.map(notif => (
            <NotificationCard
              key={notif.id}
              notification={notif}
              onMarkRead={onMarkRead}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12 gap-3 text-neutral-600">
            <span className="text-xl">🌙</span>
            <span className="text-[10px] uppercase tracking-widest font-mono font-medium">
              Registry is Quiet
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
