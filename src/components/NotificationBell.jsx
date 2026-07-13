import React from 'react';

export default function NotificationBell({ unreadCount, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="relative w-10 h-10 rounded-full glass-panel-gold border border-gold/10 flex items-center justify-center hover:scale-105 hover:border-gold/30 transition-all duration-300 text-gold shrink-0"
      title="Activity updates"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>

      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9A25C] text-neutral-950 text-[9px] font-bold font-mono flex items-center justify-center border border-[#0A0A0A] animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}
