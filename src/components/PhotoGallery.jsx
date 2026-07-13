import React, { useState } from 'react';

export default function PhotoGallery({ defaultPhotos = [], reviewPhotos = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const allPhotos = [...defaultPhotos, ...reviewPhotos];

  if (allPhotos.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
        <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono font-semibold">
          Inspector Photo Registry
        </span>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-gold/5 border border-gold/15 text-gold">
          {allPhotos.length} Photos
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
        {allPhotos.map((photoUrl, idx) => (
          <div 
            key={idx} 
            onClick={() => setSelectedImage(photoUrl)}
            className="aspect-square rounded-xl overflow-hidden bg-neutral-950 border border-neutral-900 hover:border-gold/30 hover:scale-[1.03] transition-all cursor-zoom-in group relative"
          >
            <img 
              src={photoUrl} 
              alt="Restaurant inspect gallery" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-gold text-xs">🔍 View</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Zoom */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-900 border border-gold/20 flex items-center justify-center text-neutral-300 hover:text-gold hover:scale-105 transition-all"
          >
            ✕
          </button>
          <img 
            src={selectedImage} 
            alt="Expanded view" 
            className="max-w-[90%] max-h-[85%] rounded-2xl border border-gold/15 shadow-2xl object-contain" 
          />
        </div>
      )}
    </div>
  );
}
