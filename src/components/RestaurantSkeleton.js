// RUCHI KOOTU - Boutique Restaurant Card Skeleton Loader Component
import React from 'react';
import htm from 'htm';
const html = htm.bind(React.createElement);

export default function RestaurantSkeleton() {
  return html`
    <div className="group relative rounded-2xl overflow-hidden glass-panel border border-gold/5 p-0 flex flex-col justify-between h-[392px] animate-pulse">
      <!-- Image Placeholder -->
      <div className="relative h-48 w-full skeleton-loading"></div>

      <!-- Content Placeholders -->
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-3">
          <!-- Title & Open Status -->
          <div className="flex justify-between items-center">
            <div className="h-4 w-2/3 rounded bg-neutral-800 skeleton-loading"></div>
            <div className="h-3 w-12 rounded bg-neutral-800 skeleton-loading"></div>
          </div>

          <!-- Rating & Price Row -->
          <div className="flex justify-between items-center">
            <div className="h-3.5 w-1/3 rounded bg-neutral-800 skeleton-loading"></div>
            <div className="h-3.5 w-10 rounded bg-neutral-800 skeleton-loading"></div>
          </div>

          <!-- Note -->
          <div className="h-3 w-full rounded bg-neutral-900 skeleton-loading"></div>
          <div className="h-3 w-4/5 rounded bg-neutral-900 skeleton-loading"></div>
        </div>

        <!-- Action Buttons Placeholder (matching new card design buttons) -->
        <div className="flex gap-2.5 pt-2">
          <div className="h-9 flex-1 rounded bg-neutral-800 skeleton-loading"></div>
          <div className="h-9 flex-1 rounded bg-neutral-800 skeleton-loading"></div>
        </div>

        <!-- Distance Footer -->
        <div className="flex justify-between items-center pt-4 border-t border-neutral-900/60">
          <div className="h-3 w-20 rounded bg-neutral-900 skeleton-loading"></div>
          <div className="h-3 w-16 rounded bg-neutral-900 skeleton-loading"></div>
        </div>
      </div>
    </div>
  `;
}
