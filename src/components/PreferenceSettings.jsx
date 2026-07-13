import React from 'react';

export default function PreferenceSettings({ onClearHistory, onResetPreferences, onExportData, user }) {
  return (
    <div className="flex flex-col gap-6 animate-[fadeIn_300ms_ease-out] font-sans">
      <div className="flex flex-col gap-1.5 border-b border-neutral-900 pb-2">
        <h4 className="font-serif text-base text-neutral-200">Concierge Privacy & Settings</h4>
        <span className="text-[10px] text-neutral-500 font-light">Manage your gastronomy profile history and learning metrics.</span>
      </div>

      <div className="flex flex-col gap-5">
        {/* Export Data */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/80">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-neutral-200">Export Gastronomy Data</span>
            <span className="text-[10px] text-neutral-500 font-light">Download a JSON backup of your tracked preferences.</span>
          </div>
          <button 
            onClick={onExportData}
            className="px-4 py-2 rounded-lg bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            Export JSON
          </button>
        </div>

        {/* Clear History */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/80">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-neutral-200">Clear Activity Logs</span>
            <span className="text-[10px] text-neutral-500 font-light">Clears recently viewed list, searches, and visit logs.</span>
          </div>
          <button 
            onClick={onClearHistory}
            className="px-4 py-2 rounded-lg border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/5 text-rose-400 text-xs uppercase tracking-wider font-semibold transition-all"
          >
            Clear History
          </button>
        </div>

        {/* Reset Preferences */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/80">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-neutral-200">Reset Learning Weights</span>
            <span className="text-[10px] text-neutral-500 font-light">Completely clears your learned cuisine and category interests.</span>
          </div>
          <button 
            onClick={onResetPreferences}
            className="px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs uppercase tracking-wider font-semibold transition-all"
          >
            Reset Engine
          </button>
        </div>
      </div>
    </div>
  );
}
