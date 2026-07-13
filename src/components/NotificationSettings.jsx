import React from 'react';

export default function NotificationSettings({ preferences = {}, onSavePreferences }) {
  const togglePreference = (key) => {
    onSavePreferences({
      ...preferences,
      [key]: !preferences[key]
    });
  };

  const options = [
    { key: 'aiNotifications', label: 'AI Recommendations', description: 'Alerts when personalized gastronomy briefs are resolved.' },
    { key: 'favorites', label: 'Favorite Spot Updates', description: 'Alerts when a saved lounge updates menus or schedules.' },
    { key: 'reviews', label: 'Reviews Activity', description: 'Alerts when new inspection reports are published on your favorites.' },
    { key: 'community', label: 'Community Feedback', description: 'Alerts when other food critics like your reviews.' },
    { key: 'trending', label: 'Trending Alerts', description: 'Notifies you of nearby trending fine dining hotspots.' }
  ];

  return (
    <div className="flex flex-col gap-5 animate-[fadeIn_300ms_ease-out] font-sans">
      <div className="flex flex-col gap-1 border-b border-neutral-900 pb-2">
        <h4 className="font-serif text-base text-neutral-200">Alert Registry Settings</h4>
        <span className="text-[10px] text-neutral-500 font-light">Customize when you receive live updates.</span>
      </div>

      <div className="flex flex-col gap-4">
        {options.map(({ key, label, description }) => {
          const isEnabled = preferences[key] !== false;
          return (
            <div key={key} className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/10 border border-neutral-800/80">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-neutral-200">{label}</span>
                <span className="text-[10px] text-neutral-500 font-light">{description}</span>
              </div>
              
              {/* Gold Switch */}
              <button
                type="button"
                onClick={() => togglePreference(key)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${isEnabled ? 'bg-[#D4AF37]' : 'bg-neutral-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-neutral-950 transition-transform duration-300 ${isEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
