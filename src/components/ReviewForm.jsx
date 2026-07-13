import React, { useState, useEffect } from 'react';

export default function ReviewForm({ onSubmit, existingReview, onCancel }) {
  const [rating, setRating] = useState(existingReview?.rating || 5);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photos, setPhotos] = useState(existingReview?.photos || []);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
      setPhotos(existingReview.photos || []);
    }
  }, [existingReview]);

  const handleAddPhoto = () => {
    if (!photoUrl.trim()) return;
    setPhotos(prev => [...prev, photoUrl.trim()]);
    setPhotoUrl("");
  };

  const handleRemovePhoto = (idxToRemove) => {
    setPhotos(prev => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit({ rating, comment, photos });
    setComment("");
    setPhotos([]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 rounded-2xl bg-gradient-to-b from-[#0F0F0F] to-black border border-gold/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-sm text-neutral-100 font-light">
          {existingReview ? "Edit Your Review" : "Share Your Gastronomy Experience"}
        </h4>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel} 
            className="text-[9px] uppercase tracking-widest text-neutral-500 hover:text-gold transition-colors font-mono"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Star Selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold font-mono">Your Rating</label>
        <div className="flex gap-1.5 text-lg">
          {Array.from({ length: 5 }).map((_, idx) => {
            const starValue = idx + 1;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setRating(starValue)}
                className={`transition-colors duration-250 ${starValue <= rating ? 'text-gold' : 'text-neutral-700'}`}
              >
                ★
              </button>
            );
          })}
        </div>
      </div>

      {/* Comments */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold font-mono">Review Details</label>
        <textarea
          placeholder="Share details of your inspection: service quality, atmosphere, tasting menu favorites..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          required
          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-gold/15 focus:border-gold/45 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none transition-all duration-300 resize-none font-light leading-relaxed"
        />
      </div>

      {/* Photo Uploads */}
      <div className="flex flex-col gap-2">
        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold font-mono">Photo Attachments</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste dining image URL..."
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-gold/15 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-gold/40 transition-all font-light"
          />
          <button
            type="button"
            onClick={handleAddPhoto}
            className="px-4 py-2 rounded-xl bg-gold/10 border border-gold/30 hover:bg-gold/20 text-gold text-xs font-semibold transition-all"
          >
            Attach
          </button>
        </div>

        {/* Preview grid */}
        {photos.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {photos.map((url, idx) => (
              <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-gold/25 group">
                <img src={url} alt="Attached thumbnail" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-red-500 font-bold"
                  title="Remove image"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A25C] text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-gold/10"
      >
        {existingReview ? "Save Changes" : "Submit Inspection Report"}
      </button>
    </form>
  );
}
