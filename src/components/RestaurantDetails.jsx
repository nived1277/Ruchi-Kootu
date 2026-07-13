import React, { useState, useEffect } from 'react';
import RestaurantInfo from './RestaurantInfo.jsx';
import RestaurantActions from './RestaurantActions.jsx';
import PhotoGallery from './PhotoGallery.jsx';
import ReviewCard from './ReviewCard.jsx';
import ReviewForm from './ReviewForm.jsx';
import UserProfile from './UserProfile.jsx';
import useReviews from '../hooks/useReviews.js';

const categoryPlaceholders = {
  'restaurant': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
  'cafe': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
  'fast_food': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  'food_court': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  'bakery': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
};

export default function RestaurantDetails({
  restaurant,
  onClose,
  isFavorite,
  onToggleFavorite,
  showToast,
  onAddToRecentlyViewed,
  user,
  firebaseDb
}) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [selectedProfileUser, setSelectedProfileUser] = useState(null);

  const { reviews, addReview, editReview, deleteReview, likeReview } = useReviews(
    restaurant?.id,
    user,
    firebaseDb
  );

  useEffect(() => {
    setIsClosing(false);
    setActiveImageIdx(0);
    
    if (restaurant && restaurant.id) {
      onAddToRecentlyViewed && onAddToRecentlyViewed(restaurant.id);
    }
  }, [restaurant, onAddToRecentlyViewed]);

  if (!restaurant) return null;

  const {
    name,
    category,
    cuisine,
    images = [],
    description,
    ruchiScore = 95,
    ruchiReasons = [],
    popularDishes = [],
    amenities = [],
    loadingDetails
  } = restaurant;

  const handleCloseClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 450);
  };

  const categoryKey = (category || '').toLowerCase().replace(' ', '_');
  const resolvedImages = images.length > 0 ? images : [categoryPlaceholders[categoryKey] || categoryPlaceholders['restaurant']];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Close Overlay Backdrop */}
      <div className="absolute inset-0" onClick={handleCloseClick}></div>

      {/* Detail Slide-out */}
      <div className={`relative w-full max-w-2xl h-full bg-[#0A0A0A] border-l border-gold/15 shadow-2xl flex flex-col overflow-y-auto z-10 transition-transform duration-500 ease-in-out ${isClosing ? 'translate-x-full' : 'translate-x-0'}`}>
        
        {/* Header Image Carousel */}
        <div className="relative h-[340px] w-full shrink-0 overflow-hidden bg-neutral-900">
          <img 
            src={resolvedImages[activeImageIdx] || categoryPlaceholders['restaurant']} 
            alt={name}
            className="w-full h-full object-cover transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/50"></div>

          {/* Carousel Indicators */}
          {resolvedImages.length > 1 && (
            <div className="absolute bottom-6 left-6 flex gap-2 z-20">
              {resolvedImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-12 h-1 rounded-full transition-all duration-500 ${activeImageIdx === idx ? 'bg-gold w-16' : 'bg-white/30 hover:bg-white/60'}`}
                />
              ))}
            </div>
          )}

          {/* Close button */}
          <button 
            onClick={handleCloseClick} 
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full glass-panel-gold border border-gold/20 flex items-center justify-center hover:scale-105 transition-all duration-300 text-gold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Top Ribbon */}
          <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
            {cuisine && (
              <span className="glass-panel px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-gold font-semibold border border-gold/30">
                {cuisine}
              </span>
            )}
            <span className="glass-panel-gold px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-emerald-400 font-semibold border border-emerald-400/20">
              Ruchi Score: {ruchiScore}%
            </span>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-8 md:p-12 flex-1 flex flex-col gap-8">
          
          {loadingDetails ? (
            <div className="flex flex-col gap-6 py-12 items-center justify-center text-center">
              <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Retrieving Live Concierge Dossier...</p>
            </div>
          ) : (
            <>
              {/* Info Block */}
              <RestaurantInfo restaurant={restaurant} />

              {/* Description Story */}
              {description && (
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">The Story</span>
                  <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed font-serif italic">
                    "{description}"
                  </p>
                </div>
              )}

              {/* Score reasoning */}
              {ruchiReasons && ruchiReasons.length > 0 && (
                <div className="glass-panel-gold p-6 rounded-2xl border border-gold/25 flex flex-col gap-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Reasoning Breakdown</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ruchiReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-300 font-light">
                        <span className="text-gold shrink-0">✔</span>
                        <span>{reason.replace("✔ ", "")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Dishes & Amenities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {amenities && amenities.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Amenities & Services</h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {amenities.map((amenity, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-neutral-400 font-light">
                          <svg className="h-3 w-3 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {popularDishes && popularDishes.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Concierge Recommended Dishes</h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {popularDishes.map((dish, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-neutral-400 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                          <span className="font-serif italic text-neutral-300">{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions Block */}
              <RestaurantActions 
                restaurant={restaurant} 
                isFavorite={isFavorite} 
                onToggleFavorite={onToggleFavorite} 
                showToast={showToast} 
              />

              {/* Photo Gallery Registry */}
              <div className="border-t border-neutral-900 pt-8 mt-2">
                <PhotoGallery defaultPhotos={resolvedImages} reviewPhotos={reviews.flatMap(r => r.photos || [])} />
              </div>

              {/* Reviews and Community Section */}
              <div className="flex flex-col gap-6 border-t border-neutral-900 pt-8 mt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg text-neutral-100 font-light tracking-wide">Community Inspections</h4>
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{reviews.length} reviews</span>
                </div>

                {/* Review Form */}
                <ReviewForm 
                  onSubmit={async (data) => {
                    if (editingReview) {
                      await editReview(editingReview.id, data);
                      setEditingReview(null);
                      showToast("Your review has been updated.");
                    } else {
                      await addReview(data);
                      showToast("Thank you for your inspection report.");
                    }
                  }}
                  existingReview={editingReview}
                  onCancel={editingReview ? () => setEditingReview(null) : null}
                />

                {/* Reviews List */}
                <div className="flex flex-col gap-4 mt-2">
                  {reviews.length > 0 ? reviews.map(rev => (
                    <ReviewCard 
                      key={rev.id}
                      review={rev}
                      currentUser={user}
                      onLike={likeReview}
                      onEdit={(r) => setEditingReview(r)}
                      onDelete={async (id) => {
                        if (confirm("Are you sure you want to delete this review?")) {
                          await deleteReview(id);
                          showToast("Review deleted.");
                        }
                      }}
                      onUserClick={(u) => setSelectedProfileUser(u)}
                    />
                  )) : (
                    <div className="text-center py-6 text-xs text-neutral-500 italic">
                      No inspections logged for this lounge yet. Be the first to share!
                    </div>
                  )}
                </div>
              </div>

              {/* Public User Profile Modal */}
              {selectedProfileUser && (
                <UserProfile
                  profileUser={{
                    uid: selectedProfileUser.userId,
                    displayName: selectedProfileUser.userName,
                    photoURL: selectedProfileUser.userAvatar,
                    timestamp: selectedProfileUser.timestamp
                  }}
                  favoriteCuisine={restaurant.cuisine || "Modern South Indian"}
                  reviewsCount={5}
                  savedRestaurantsCount={3}
                  onClose={() => setSelectedProfileUser(null)}
                />
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
