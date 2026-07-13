import { useState, useEffect } from 'react';
import { queryGemini } from '../services/gemini.js';
import { validateIntent } from '../utils/intentValidator.js';
import { parseIntent as offlineParseIntent } from '../utils/intentParser.js';

// In-memory cache for recent query intents
const geminiCache = {};

/**
 * Hook to resolve search query intents using Google's Gemini API with offline fallback.
 * @param {string} query - The search query input.
 * @param {object} preferences - The user's preferences context.
 */
export function useGemini(query = '', preferences = null) {
  const [intent, setIntent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('offline'); // 'gemini' | 'offline'

  useEffect(() => {
    if (!query) {
      setIntent(null);
      setIsLoading(false);
      setError(null);
      setSource('offline');
      return;
    }

    const cacheKey = query.trim().toLowerCase();

    // 1. Resolve from cache
    if (geminiCache[cacheKey]) {
      const cached = geminiCache[cacheKey];
      setIntent(cached.intent);
      setSource(cached.source);
      setIsLoading(false);
      setError(null);
      return;
    }

    // 2. Fetch or parse query intent
    const resolveIntent = async () => {
      setIsLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      // Force offline mode if API Key is not set or placeholder
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        const offlineIntent = offlineParseIntent(query);
        const validated = validateIntent(offlineIntent);
        geminiCache[cacheKey] = { intent: validated, source: 'offline' };
        setIntent(validated);
        setSource('offline');
        setIsLoading(false);
        return;
      }

      try {
        const rawIntent = await queryGemini(query, preferences);
        const validated = validateIntent(rawIntent);
        if (validated) {
          geminiCache[cacheKey] = { intent: validated, source: 'gemini' };
          setIntent(validated);
          setSource('gemini');
        } else {
          throw new Error("Validation failed for Gemini JSON structure.");
        }
      } catch (err) {
        console.warn("Gemini API request failed, falling back to offline parser:", err.message);
        setError(err.message);
        
        // Graceful fallback to offline parser
        const offlineIntent = offlineParseIntent(query);
        const validated = validateIntent(offlineIntent);
        geminiCache[cacheKey] = { intent: validated, source: 'offline' };
        setIntent(validated);
        setSource('offline');
      } finally {
        setIsLoading(false);
      }
    };

    resolveIntent();
  }, [query, preferences]);

  return { intent, isLoading, error, source };
}
export default useGemini;
