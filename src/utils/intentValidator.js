// RUCHI KOOTU - Structured Intent Validator

/**
 * Validates and normalizes structured intent objects (usually from Gemini API responses).
 * Returns a clean intent object conforming to RUCHI KOOTU schemas.
 */
export function validateIntent(obj) {
  if (!obj || typeof obj !== 'object') {
    return null;
  }

  const validCategories = ["Cafe", "Restaurant", "Bakery", "Fast Food", "Food Court"];
  let category = null;
  if (obj.category && typeof obj.category === 'string') {
    const matched = validCategories.find(c => c.toLowerCase() === obj.category.toLowerCase().trim());
    if (matched) {
      category = matched;
    }
  }

  const validCuisines = ["Contemporary French", "Royal Awadhi", "Artisanal Japanese", "Modern South Indian", "New Nordic & Botanical"];
  let cuisine = null;
  if (obj.cuisine && typeof obj.cuisine === 'string') {
    const matched = validCuisines.find(c => c.toLowerCase() === obj.cuisine.toLowerCase().trim());
    if (matched) {
      cuisine = matched;
    }
  }

  const budget = typeof obj.budget === 'number' && obj.budget > 0 ? obj.budget : null;
  const distance = typeof obj.distance === 'number' && obj.distance > 0 ? obj.distance : null;
  
  // Accept standard or alternate naming conventions
  const isOpenNow = typeof obj.openNow === 'boolean' ? obj.openNow : (typeof obj.isOpenNow === 'boolean' ? obj.isOpenNow : false);
  const familyFriendly = typeof obj.family === 'boolean' ? obj.family : (typeof obj.familyFriendly === 'boolean' ? obj.familyFriendly : false);
  const romantic = typeof obj.romantic === 'boolean' ? obj.romantic : false;
  
  // Work friendly inference from mood
  const workFriendly = typeof obj.workFriendly === 'boolean' ? obj.workFriendly : (obj.mood === 'work' || obj.mood === 'quiet');
  
  const outdoorSeating = typeof obj.outdoorSeating === 'boolean' ? obj.outdoorSeating : false;
  const coffee = typeof obj.coffee === 'boolean' ? obj.coffee : false;
  const dessert = typeof obj.dessert === 'boolean' ? obj.dessert : false;

  const keywords = Array.isArray(obj.keywords) ? obj.keywords.filter(k => typeof k === 'string') : [];

  return {
    cuisine,
    category,
    budget,
    distance,
    isOpenNow,
    familyFriendly,
    romantic,
    workFriendly,
    outdoorSeating,
    coffee,
    dessert,
    keywords
  };
}
export default validateIntent;
