import React from 'react';

export default function NotificationCard({ notification, onMarkRead, onDelete }) {
  const formattedTime = new Date(notification.timestamp).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`p-4 rounded-xl border flex gap-3.5 relative group transition-all duration-300 ${
      notification.read 
        ? 'bg-black/25 border-neutral-900/60 opacity-60' 
        : 'bg-[#0E0E0E]/80 border-gold/15 shadow-sm shadow-gold/5'
    }`}>
      {/* Icon Badge */}
      <div className="w-9 h-9 rounded-lg bg-gold/5 border border-gold/25 flex items-center justify-center text-gold text-base shrink-0">
        {notification.icon || '🔔'}
      </div>

      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h5 className={`text-xs font-semibold text-neutral-200 truncate ${!notification.read && 'text-[#D4AF37]'}`}>
            {notification.title}
          </h5>
          <span className="text-[8px] text-neutral-500 font-mono shrink-0">{formattedTime}</span>
        </div>
        <p className="text-[11px] text-neutral-400 font-light leading-relaxed whitespace-pre-wrap">
          {notification.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 items-center justify-center shrink-0">
        {!notification.read && (
          <button 
            onClick={() => onMarkRead(notification.id)}
            className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse hover:bg-neutral-500 transition-colors"
            title="Mark as read"
          />
        )}
        
        <button
          onClick={() => onDelete(notification.id)}
          className="text-neutral-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1 text-xs"
          title="Delete notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
