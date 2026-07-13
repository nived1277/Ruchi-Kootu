// Curated Selection of Premium Dining Establishments for Ruchi Kootu
export const mockRestaurants = [
  {
    id: "rest-1",
    name: "L'Ambroisie Dorée",
    cuisine: "Contemporary French",
    rating: 4.9,
    reviewCount: 312,
    priceLevel: 4, // ₹₹₹₹
    distance: 0.7, // km
    latOffset: 0.005,  // relative to center
    lngOffset: -0.008,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
    ],
    address: "24, Rue Royale, Luxury Enclave, Bangalore",
    phone: "+91 80 4920 1100",
    description: "An intimate sanctuary of haute gastronomy where classic French techniques harmonize with rare indigenous botanicals. Executed with flawless precision under crystal chandeliers, every dish is a poetic masterwork designed to elevate the senses.",
    hours: {
      weekday: "19:00 - 23:30",
      weekend: "12:30 - 15:00, 19:00 - 00:00"
    },
    reviews: [
      { author: "Aishwarya R.", rating: 5, comment: "An unparalleled culinary odyssey. The truffle-infused lobster tail was divine, and the champagne pairings selected by the sommelier were impeccable." },
      { author: "Vikram Malhotra", rating: 5, comment: "Absolute perfection. The service feels invisible yet omnipresent. Truly a private concierge feel from start to finish." }
    ]
  },
  {
    id: "rest-2",
    name: "Swarna Mahal",
    cuisine: "Royal Awadhi",
    rating: 4.8,
    reviewCount: 489,
    priceLevel: 4, // ₹₹₹₹
    distance: 1.2,
    latOffset: -0.006,
    lngOffset: 0.004,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617692518904-8ab3e1390f57?auto=format&fit=crop&w=800&q=80"
    ],
    address: "The Palace Promenade, Vasanth Nagar, Bangalore",
    phone: "+91 80 6718 9999",
    description: "Savor the legacy of royal kitchens. Swarna Mahal presents a sensory journey back to the courts of Awadh, featuring slow-cooked biryanis in sealed clay pots (Dum Pukht), gold-leaf adorned kebabs, and rich saffron curries simmered for eighteen hours.",
    hours: {
      weekday: "12:30 - 15:30, 19:00 - 23:30",
      weekend: "12:30 - 16:00, 19:00 - 00:00"
    },
    reviews: [
      { author: "Devendra K.", rating: 5, comment: "The Kakori Kebab literally melts on the tongue. Accompanied by the mesmerizing live Sitar performance, it's an evening to remember." },
      { author: "Nisha Sen", rating: 4.8, comment: "Remarkable depth of flavor. The gold-leaf decoration is a touch of pure opulence that fits the palace-like surroundings perfectly." }
    ]
  },
  {
    id: "rest-3",
    name: "Kuro Shiro",
    cuisine: "Artisanal Japanese",
    rating: 4.7,
    reviewCount: 182,
    priceLevel: 3, // ₹₹₹
    distance: 2.1,
    latOffset: 0.012,
    lngOffset: 0.009,
    isOpen: false,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"
    ],
    address: "7th Pavilion, Indiranagar, Bangalore",
    phone: "+91 80 4455 8800",
    description: "A monochrome architectural masterpiece specializing in Edomae-style sushi and modern Omakase. Sourcing daily seafood from Toyosu Market, our master chefs curate a highly intimate 12-seat dining experience highlighting pure simplicity.",
    hours: {
      weekday: "18:30 - 22:30",
      weekend: "18:00 - 23:00"
    },
    reviews: [
      { author: "Rohan D.", rating: 5, comment: "Intimate and exceptional Omakase. Watching the chef shape each piece of nigiri with singular focus is like watching fine art being created." },
      { author: "Sarah M.", rating: 4, comment: "Extremely fresh ingredients. Bookings are difficult to secure, but worth every single effort." }
    ]
  },
  {
    id: "rest-4",
    name: "Kootu Resto Bar",
    cuisine: "Modern South Indian",
    rating: 4.9,
    reviewCount: 520,
    priceLevel: 3, // ₹₹₹
    distance: 0.3,
    latOffset: -0.002,
    lngOffset: -0.003,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Heritage Quarter, Lavelle Road, Bangalore",
    phone: "+91 80 8291 0033",
    description: "Our signature namesakes: A sophisticated playground for South Indian flavor alchemy. 'Kootu' denotes union, and here it is represented by marrying heritage recipes from Chettinad, Malabar, and Kongunad with modern molecular presentations and artisanal cocktails.",
    hours: {
      weekday: "12:00 - 15:30, 19:00 - 23:30",
      weekend: "12:00 - 00:30"
    },
    reviews: [
      { author: "Karthik Raja", rating: 5, comment: "An incredible sensory explosion. The Ghee Roast prawns served in spherical smoke domes, followed by tender coconut elixir, are unmatched." },
      { author: "Priya Menon", rating: 4.8, comment: "Gorgeous ambiance under the golden banyan install. Service is exceptionally courteous." }
    ]
  },
  {
    id: "rest-5",
    name: "Aura Glasshouse",
    cuisine: "New Nordic & Botanical",
    rating: 4.6,
    reviewCount: 145,
    priceLevel: 4, // ₹₹₹₹
    distance: 3.4,
    latOffset: 0.022,
    lngOffset: -0.015,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Skye-Line Ridge, UB City Vista, Bangalore",
    phone: "+91 80 9182 7364",
    description: "Perched high above the city silhouette in a soaring structure of pure glass and brass, Aura celebrates the micro-seasons. We showcase minimalist plating, fermented delights, cold-pressed infusions, and smoke-cured delicacies of Nordic tradition, local roots.",
    hours: {
      weekday: "18:00 - 23:30",
      weekend: "12:00 - 16:00, 18:00 - 00:00"
    },
    reviews: [
      { author: "Neil D'Souza", rating: 4.5, comment: "Spectacular views paired with highly conceptual food. Not for someone looking for huge portions, but a masterclass in clean flavor profiling." },
      { author: "Amrita V.", rating: 4.7, comment: "Felt like sitting inside a glowing jewel box. The cloudberry and sea buckthorn dessert was remarkable." }
    ]
  }
];
