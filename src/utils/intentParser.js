// RUCHI KOOTU - Natural Language Intent Parser

/**
 * Parses user search queries to extract structured filters and intents.
 * @param {string} query - The natural language query
 * @returns {object|null} - The parsed intent options
 */
export function parseIntent(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();

  // 1. Detect Cuisine
  let cuisine = null;
  if (/japanese|sushi|ramen|omakase|wagyu|raw fish/i.test(q)) {
    cuisine = "Artisanal Japanese";
  } else if (/french|bistro|cuisine|ambroisie|foie gras|lobster/i.test(q)) {
    cuisine = "Contemporary French";
  } else if (/awadhi|biryani|palace|kebab|mughlai|saffron/i.test(q)) {
    cuisine = "Royal Awadhi";
  } else if (/nordic|botanical|glasshouse|fermented|cloudberr/i.test(q)) {
    cuisine = "New Nordic & Botanical";
  } else if (/south|kootu|dosa|ghee roast|payasam|meals|kerala/i.test(q)) {
    cuisine = "Modern South Indian";
  }

  // 2. Detect Restaurant Category
  let category = null;
  if (/cafe|coffee shop|tea|brew/i.test(q)) {
    category = "Cafe";
  } else if (/bakery|bread|croissant|pastry|bake/i.test(q)) {
    category = "Bakery";
  } else if (/fast food|burger|pizza|sandwich|quick/i.test(q)) {
    category = "Fast Food";
  } else if (/food court/i.test(q)) {
    category = "Food Court";
  } else if (/restaurant|dining|bistro|lounge/i.test(q)) {
    category = "Restaurant";
  }

  // 3. Detect Budget Preferences (under/below/max price or generic tags)
  let budget = null;
  const underPriceMatch = q.match(/(?:under|below|less than|max|maximum)\s*(?:₹|rs\.?)?\s*(\d+)/i);
  if (underPriceMatch) {
    budget = Number(underPriceMatch[1]);
  } else if (/budget|cheap|pocket|affordable|value/i.test(q)) {
    budget = 300; // default budget threshold in rupees
  } else if (/luxury|fine dining|elite|expensive|premium/i.test(q)) {
    budget = 1000;
  }

  // 4. Detect Distance Preferences
  let distance = null;
  const distanceMatch = q.match(/(?:within|under|below|less than|max|maximum)?\s*(\d+(?:\.\d+)?)\s*(?:km|kilometer)/i);
  if (distanceMatch) {
    distance = parseFloat(distanceMatch[1]);
  } else if (/nearby|near me|close|walkable/i.test(q)) {
    distance = 1.5; // default close distance
  }

  // 5. Detect Boolean Preferences & Ambiance
  const isOpenNow = /open now|open immediately|currently open|available now/i.test(q);
  const familyFriendly = /family|kids|children|group|gather/i.test(q);
  const romantic = /romantic|date|intimate|candlelight|anniversary/i.test(q);
  const workFriendly = /work|laptop|quiet|study|wifi|focus/i.test(q);
  const outdoorSeating = /outdoor|garden|seating outside|terrace|rooftop/i.test(q);
  const coffee = /coffee|caffeine|espresso|latte|cappuccino/i.test(q);
  const dessert = /dessert|sweet|cake|ice cream|pastry|payasam/i.test(q);

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
    dessert
  };
}
export default parseIntent;
