// RUCHI KOOTU - Floating Pill Navbar Component
import React, { useState, useEffect } from 'react';
import htm from 'htm';
import NotificationBell from './NotificationBell.jsx';
import NotificationDrawer from './NotificationDrawer.jsx';
const html = htm.bind(React.createElement);

export default function FloatingNavbar({ 
  resetView, 
  hasCoordinates, 
  onOpenSettings, 
  user, 
  onOpenProfile,
  unreadCount,
  notifications,
  onMarkRead,
  onDelete
}) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return html`
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className=${`
        pointer-events-auto
        glass-panel
        flex items-center justify-between
        px-6 py-3
        rounded-full
        transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
        ${scrolled ? 'w-[90%] md:w-[650px] py-2.5 shadow-2xl' : 'w-[95%] md:w-[950px]'}
      `}>
        <div className="flex items-center gap-2 cursor-pointer" onClick=${resetView}>
          <span className="text-gold font-serif text-lg tracking-widest uppercase font-semibold">Ruchi Kootu</span>
          <span className="hidden md:inline text-[9px] uppercase tracking-widest text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded-full">
            Private Member
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick=${resetView} 
            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-gold transition-colors duration-300"
          >
            Home
          </button>
          <a 
            href="#discover"
            className=${`
              text-xs uppercase tracking-widest text-neutral-400 hover:text-gold transition-colors duration-300
              ${hasCoordinates ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
          >
            Discover
          </a>

          
          <div className="flex items-center gap-3 border-l border-neutral-800 pl-4 relative">
            <${NotificationBell} 
              unreadCount=${unreadCount} 
              onClick=${() => setDrawerOpen(!drawerOpen)} 
            />
            <${NotificationDrawer}
              isOpen=${drawerOpen}
              onClose=${() => setDrawerOpen(false)}
              notifications=${notifications}
              onMarkRead=${onMarkRead}
              onDelete=${onDelete}
            />

            ${user ? html`
              <button 
                onClick=${onOpenProfile} 
                className="flex items-center gap-2.5 hover:opacity-85 transition-opacity"
              >
                <img src=${user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'} className="w-7 h-7 rounded-full object-cover border border-gold/40 shrink-0" />
                <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-neutral-300 font-semibold">${user.displayName || "Member"}</span>
              </button>
            ` : html`
              <button 
                onClick=${onOpenProfile}
                className="px-4 py-1.5 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold text-[9px] uppercase tracking-widest font-semibold transition-all duration-300"
              >
                Sign In
              </button>
            `}
          </div>
        </div>
      </nav>
    </div>
  `;
}
