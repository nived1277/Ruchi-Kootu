import React from 'react';

export default function UserProfile({ profileUser, onClose, favoriteCuisine = "Modern South Indian", reviewsCount = 12, savedRestaurantsCount = 5 }) {
  if (!profileUser) return null;

  const joinedDate = profileUser.joinedDate || new Date(profileUser.timestamp || (Date.now() - 1000 * 60 * 60 * 24 * 30)).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-[fadeIn_300ms_ease-out]">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#0A0A0A] border border-gold/15 rounded-2xl p-6 flex flex-col items-center gap-5 shadow-2xl z-10">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-neutral-900 border border-gold/10 flex items-center justify-center hover:scale-105 transition-all text-neutral-400 hover:text-gold"
        >
          ✕
        </button>

        {/* Profile Avatar */}
        {profileUser.photoURL ? (
          <img 
            src={profileUser.photoURL} 
            alt={profileUser.displayName} 
            className="w-20 h-20 rounded-full object-cover border-2 border-gold/20" 
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/20 flex items-center justify-center text-gold text-2xl font-serif">
            {profileUser.displayName ? profileUser.displayName.charAt(0).toUpperCase() : "M"}
          </div>
        )}

        <div className="text-center">
          <h3 className="font-serif text-xl text-neutral-100 font-light">
            {profileUser.displayName || "Concierge Member"}
          </h3>
          <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono mt-1 block">
            Joined {joinedDate}
          </span>
        </div>

        <div className="w-full grid grid-cols-3 gap-3 border-y border-neutral-900 py-4 my-2">
          <div className="flex flex-col items-center text-center">
            <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Reviews</span>
            <span className="text-sm font-serif text-gold font-bold mt-1">{reviewsCount}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Fav Cuisine</span>
            <span className="text-[10px] font-semibold text-gold truncate max-w-full mt-1.5">{favoriteCuisine}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Saved</span>
            <span className="text-sm font-serif text-gold font-bold mt-1">{savedRestaurantsCount}</span>
          </div>
        </div>

        <div className="text-center text-[10px] text-neutral-400 font-light italic leading-relaxed">
          "A curator of fine dining and botanical flavors."
        </div>
      </div>
    </div>
  );
}
