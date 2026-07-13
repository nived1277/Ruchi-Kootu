import React from 'react';

export default function ReviewCard({ review, currentUser, onLike, onEdit, onDelete, onUserClick }) {
  const isOwner = currentUser && review.userId === currentUser.uid;
  const isLiked = currentUser && review.likedBy?.includes(currentUser.uid);
  const formattedDate = new Date(review.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="p-4 rounded-xl bg-black/40 border border-neutral-900 flex flex-col gap-3 relative group hover:border-gold/25 transition-all animate-[fadeIn_300ms_ease-out]">
      <div className="flex items-center gap-3 w-full">
        <div 
          onClick={() => onUserClick && onUserClick(review)}
          className="flex items-center gap-3 cursor-pointer hover:opacity-85 transition-opacity"
        >
          {review.userAvatar ? (
            <img 
              src={review.userAvatar} 
              alt={review.userName} 
              className="w-8 h-8 rounded-full object-cover border border-gold/10" 
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold text-xs font-semibold">
              {review.userName ? review.userName.charAt(0).toUpperCase() : "G"}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-neutral-200 truncate">{review.userName}</span>
            <span className="text-[9px] text-neutral-500 font-mono mt-0.5">{formattedDate}</span>
          </div>
        </div>

        {/* Edit / Delete Buttons if Owner */}
        {isOwner && (
          <div className="flex items-center gap-2 ml-auto opacity-40 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(review)} 
              className="text-[9px] uppercase tracking-wider text-neutral-400 hover:text-gold transition-colors font-mono"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(review.id)} 
              className="text-[9px] uppercase tracking-wider text-neutral-400 hover:text-red-500 transition-colors font-mono"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 text-gold text-[10px]">
        {Array.from({ length: 5 }).map((_, idx) => (
          <span key={idx}>{idx < review.rating ? "★" : "☆"}</span>
        ))}
      </div>

      {/* Comment */}
      <p className="text-xs text-neutral-300 leading-relaxed font-light whitespace-pre-wrap">
        {review.comment}
      </p>

      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2 overflow-x-auto py-1">
          {review.photos.map((photoUrl, idx) => (
            <img 
              key={idx} 
              src={photoUrl} 
              alt="Review attachment" 
              className="w-16 h-16 rounded-lg object-cover border border-neutral-800 hover:border-gold/30 transition-all cursor-zoom-in"
              onClick={() => window.open(photoUrl, '_blank')}
            />
          ))}
        </div>
      )}

      {/* Helpful Like Button */}
      <div className="flex items-center gap-2 border-t border-neutral-900/60 pt-2.5 mt-1">
        <button
          onClick={() => onLike(review.id)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wide font-medium transition-all ${
            isLiked 
              ? 'bg-gold/15 border border-gold/30 text-gold shadow-sm shadow-gold/5' 
              : 'bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-gold hover:border-gold/20'
          }`}
        >
          <span>👍</span>
          <span>Helpful ({review.likes || 0})</span>
        </button>
      </div>
    </div>
  );
}
