import { 
  NavItem, 
  ServiceItem, 
  MenuCategory, 
  GalleryItem, 
  TestimonialItem, 
  TeamMember, 
  FAQItem 
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Intro", href: "#intro" },
  { id: "story", label: "Our Story", href: "#story" },
  { id: "services", label: "Experience", href: "#services" },
  { id: "menu", label: "The Menu", href: "#menu" },
  { id: "gallery", label: "Curations", href: "#gallery" },
  { id: "team", label: "Aesthetes", href: "#team" },
  { id: "faq", label: "Inquire", href: "#faq" },
  { id: "contact", label: "Reserve", href: "#contact" }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: "brews",
    title: "Artisanal Single-Origin Roasts",
    description: "Every cup is a masterpiece of precision. Hand-selected micro-lots roasted locally in micro-batches and brewed via custom temperature-profiled machinery.",
    iconName: "Coffee",
    tag: "Aroma Architecture"
  },
  {
    id: "ambience",
    title: "Cinematic Arched Lounge",
    description: "Exquisite brick chevron layout, towering glass arches, wood-slat panels, and tripodal warm lighting create an atmosphere of profound serenity.",
    iconName: "Compass",
    tag: "Design Philosophy"
  },
  {
    id: "gourmet",
    title: "Epicurean Restro Menu",
    description: "A continuous dialogue between culinary heritage and sensory innovation, curated by world-class chefs utilizing local organic produce.",
    iconName: "Sparkles",
    tag: "Gastronomic Art"
  },
  {
    id: "events",
    title: "Private Tasting Chambers",
    description: "Immersive multi-sensory experiences: custom music acoustics, ambient light pairings, and multi-course coffee-inspired molecular pairings.",
    iconName: "Volume2",
    tag: "Acoustics & Senses"
  }
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "coffee",
    title: "Handcrafted Elixirs",
    subtitle: "Liquid architecture engineered with raw botanical precision and micro-lot specialty beans.",
    items: [
      {
        id: "c1",
        name: "Gold Dust Cortado",
        description: "Double extraction of 94pt Ethiopian Yirgacheffe, finished with silky steam-distilled organic milk and edible 24K gold leaf.",
        price: "$12.00",
        tags: ["Signature", "Ethereal"],
        isSignature: true
      },
      {
        id: "c2",
        name: "Smoked Oak Maple Latte",
        description: "Cold-smoked barrel maple syrup infused into a smooth espresso base, velvety microfoam, and hand-grated charred vanilla pod.",
        price: "$14.00",
        tags: ["Rich", "Wood-Smoked"],
        isSignature: true
      },
      {
        id: "c3",
        name: "Single-Origin Pour Over (Ice-Chilled)",
        description: "Panama Geisha beans slow-dripped over carved crystal ice spheres. Notes of jasmine, bergamot, and white peach sweetness.",
        price: "$18.00",
        tags: ["Clarity", "Rare"],
        isSignature: false
      },
      {
        id: "c4",
        name: "Aged Cascara Soda",
        description: "Carbonated fermentation of sundried coffee cherry skins, fresh rosemary extraction, and a light spritz of Meyer lemon oil.",
        price: "$11.00",
        tags: ["Refreshing", "Fermented"],
        isSignature: false
      }
    ]
  },
  {
    id: "plates",
    title: "Epicurean Platters",
    subtitle: "Slightly complex culinary pairings engineered to balance the deep roasted tannins of our elixirs.",
    items: [
      {
        id: "p1",
        name: "Brick-Oven Sourdough Tartine",
        description: "36-hour slow-fermented crust topped with hand-scraped heirloom avocado mousse, fresh wood-fire smoked salmon, and elderflower gel.",
        price: "$24.00",
        tags: ["Gastronomy", "Heirloom"],
        isSignature: true
      },
      {
        id: "p2",
        name: "Truffle Wild Mushroom Risotto",
        description: "Acquerello aged carnaroli rice slow-cooked with double porcini broth, shaved Burgundy summer truffles, and Pecorino Romano foam.",
        price: "$36.00",
        tags: ["Earth", "Umami"],
        isSignature: true
      },
      {
        id: "p3",
        name: "Smoked Sage & Espresso Crusted Ribeye",
        description: "Tenderized wagyu steak strip crusted in espresso micro-grinds, flame-charred with sage butter, and a velvet potato-parsnip puree.",
        price: "$48.00",
        tags: ["Rich", "Decadent"],
        isSignature: false
      },
      {
        id: "p4",
        name: "Deconstructed Matcha Mascarpone",
        description: "Uji matcha sponge saturated in cascara concentrate, layered with whipped lavender-scented Italian mascarpone.",
        price: "$16.00",
        tags: ["Sweet", "Botanical"],
        isSignature: false
      }
    ]
  },
  {
    id: "cocktails",
    title: "After-Hours Mixology",
    subtitle: "Sophisticated spirit-infused elixirs to transition smoothly from golden twilight into midnight vibes.",
    items: [
      {
        id: "x1",
        name: "The Obsidian Espresso Martini",
        description: "In-house cold-brew concentrate, premium wheat vodka, handmade roasted hazelnut liqueur, and a vaporized orange blossom essence.",
        price: "$19.00",
        tags: ["Sensory", "Twilight"],
        isSignature: true
      },
      {
        id: "x2",
        name: "Charred Sage Mezcal Negroni",
        description: "Artisanal espadin mezcal, Campari infused with dried cascara hulls, sweet vermouth, and a flame-singed sage leaf garnish.",
        price: "$21.00",
        tags: ["Smoke", "Botanical"],
        isSignature: false
      },
      {
        id: "x3",
        name: "Velvet Truffle Sour",
        description: "Double cask bourbon, fresh pressed lemon, white truffle honey syrup, egg white foam, and aromatic bitter drops.",
        price: "$22.00",
        tags: ["Luxury", "Velvety"],
        isSignature: true
      }
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "The Brick Chevron Wall",
    category: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "tall",
    description: "The exquisite tripodal floor lamp bathes our custom herringbone brick masonry wall in a warm, cinematic ambient amber glow."
  },
  {
    id: "g2",
    title: "Espresso Architecture",
    category: "Brewing",
    imageUrl: "https://images.unsplash.com/photo-1510972527409-cca19de31749?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "square",
    description: "Symmetrical honey-like espresso extraction showing optimal cream density and precise temperature profiling."
  },
  {
    id: "g3",
    title: "Arched Exterior Facade",
    category: "Exterior",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "wide",
    description: "Lush tropical palm tree branches framing the towering brick-vaulted arches of the Spice Hub Restro Cafe, evoking mid-century European charm."
  },
  {
    id: "g4",
    title: "Slatted Wood Counter",
    category: "Interior",
    imageUrl: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "square",
    description: "A close-up of our interior service desk featuring vertical timber slats, glowing amber pendant lights, and curated greenery."
  },
  {
    id: "g5",
    title: "Palm Courtyard Sitting",
    category: "Exterior",
    imageUrl: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "tall",
    description: "The outdoor gravel garden and custom concrete cylindrical planters underneath thousands of fairy lights at deep twilight."
  },
  {
    id: "g6",
    title: "The Artisanal Standard",
    category: "Brewing",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "wide",
    description: "Perfect microfoam design meticulously poured by our beverage architects over single-origin roasts."
  },
  {
    id: "g7",
    title: "Truffle Culinary Masterpiece",
    category: "Gastronomy",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "square",
    description: "Curated fine dining creations that balance the rich oaky profiles of our estate coffee harvests."
  },
  {
    id: "g8",
    title: "Micro-lot Roasting Process",
    category: "Roastery",
    imageUrl: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "wide",
    description: "Hand-crafted roasting drum turning premium, fair-trade coffee cherries into highly aromatic beans."
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Genevieve Vance",
    role: "Architectural Designer & Critic",
    quote: "A staggering masterpiece of space and sense. The way the brick arches capture the amber twilight while the aroma of Panama Geisha drifts over slatted walnut is pure poetry.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t2",
    name: "Marcus Sterling",
    role: "Sensory Curator, Awwwards Group",
    quote: "Spice Hub doesn't just brew coffee; they build emotional landscapes. The Gold Dust Cortado is an elevated spiritual experience, and the hospitality is incredibly smooth.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t3",
    name: "Evelyn Thorne",
    role: "Gourmet Columnist, The Chronicle",
    quote: "An extraordinary intersection of high-end roastery and Michelin-grade dining. The espresso-crusted Ribeye steak and Rosemary Tonic represent a futuristic culinary baseline.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "m1",
    name: "Alessandro Ross",
    role: "Beverage Architect & Q-Grader",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    bio: "Obsessed with extraction physics, water chemistry, and micro-lot harvesting. Alessandro spent seven years sourcing specialty geishas across Central America."
  },
  {
    id: "m2",
    name: "Chef Elena Sterling",
    role: "Culinary Director",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400",
    bio: "Elena focuses on integrating complex coffee tannins and smoke profiles directly into state-of-the-art modern brick-oven recipes and fine dining creations."
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "f1",
    question: "Do you accept advance table or space reservations?",
    answer: "Absolutely. We offer advance table reservations for our interior Arched Lounge, exterior Palm Courtyard, and also booking for our private acoustic tasting rooms via our website or VIP concierge line."
  },
  {
    id: "f2",
    question: "Where do you source your coffee beans?",
    answer: "We source entirely via fair-trade, direct-relationship micro-lots. Our specialty beans carry an average cupping score of 88+, purchased from generational estates in Panama, Ethiopia, and Kenya."
  },
  {
    id: "f3",
    question: "What makes the acoustic tasting room experience unique?",
    answer: "Our tasting chambers feature sound-damped wood-slat configurations and acoustic layouts. We sync ambient lighting color temperatures and custom atmospheric tracks with the flavor profile of the beans."
  },
  {
    id: "f4",
    question: "Are your ingredients and produce organic and sustainable?",
    answer: "Yes, 100% of our dairy, alternatives, micro-herbs, and grains are certified organic. We partner directly with regional bio-diverse farms to ensure low carbon footprints."
  },
  {
    id: "f5",
    question: "Can I host a private corporate or creative curation event?",
    answer: "We offer bespoke rentals of our full premises, including multi-course tailored coffee-cocktail pairings and custom brick-oven catering for up to 60 guests."
  }
];
