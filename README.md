# Ruchi Kootu — Private Gastronomy Concierge

Ruchi Kootu is a premium, high-end private gastronomy recommendation platform customized for elite dining lounges, cafes, and bakeries. It leverages modern visual design, intelligent AI-driven intent parsing, and real-time social metrics to curate unmatched culinary suggestions.

## Tech Stack
*   **Core**: HTML5, React, Vite
*   **Styling**: HSL-tailored Hued Vanilla CSS and custom glassmorphic panels
*   **Intelligence**: Google Gemini API / Custom Regex Intent Parser Hybrid
*   **Database**: Firebase Firestore (real-time listener sync) with Local Storage fallback for guest profiles

## Folder Structure
```bash
├── public/
│   ├── manifest.json       # PWA manifest settings
│   └── sw.js              # Service Worker for resource caching
├── src/
│   ├── components/        # Social, AI and UI layouts
│   ├── hooks/             # Custom state management and API bindings
│   ├── services/          # Data synchronization and API queries
│   ├── utils/             # Scoring algorithms and mock structures
│   ├── App.js             # Refactored Core Orchestrator (<200 lines)
│   └── main.js            # Main React bootstrapper
└── vercel.json            # Vercel routing configurations
```

## Setup & Installations

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Setup environment variables by copying `.env.example` to `.env` or specifying variables in Vercel:
   ```bash
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Run local dev server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## License
Private Property — Strictly Members Only.
