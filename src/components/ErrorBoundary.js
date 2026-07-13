// RUCHI KOOTU - Premium Error Boundary Component
import React from 'react';
import htm from 'htm';
const html = htm.bind(React.createElement);

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Registry boundaries caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return html`
        <div className="min-h-screen bg-obsidian-dark flex items-center justify-center p-8">
          <div className="glass-panel-gold max-w-md w-full p-8 rounded-2xl border border-gold/20 text-center flex flex-col items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/30 flex items-center justify-center text-gold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">Concierge Service Interrupted</span>
              <h3 className="font-serif text-2xl text-neutral-200">Session Restoration Needed</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                An unexpected boundary interruption occurred while synchronizing the fine dining dashboard. Reload the session to restore concierge service.
              </p>
            </div>

            <div className="flex gap-3 w-full">
              <button 
                onClick=${() => window.location.reload()}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9A25C] text-neutral-900 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Reload Registry
              </button>
            </div>
          </div>
        </div>
      `;
    }

    return this.props.children;
  }
}
