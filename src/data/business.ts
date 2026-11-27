export type ServicePillar = 'cleaning' | 'garment';
export type ServiceColor = 'sky' | 'teal' | 'emerald' | 'indigo' | 'amber' | 'rose';

export interface ItemGroup {
  groupName: string;
  entries: string[];
}

export interface PricedRate {
  item: string;
  priceLabel: string;
  priceValue?: number;
}

export interface ServiceItem {
  id: string;
  pillar: ServicePillar;
  color: ServiceColor;
  title: string;
  subtitle: string;
  description: string;
  method: string;
  turnaround: string;
  modeTag: string;
  priceFrom?: string;
  pricedRates?: PricedRate[];
  highlight?: string;
  items: string[];
  itemGroups: ItemGroup[];
  processSteps: string[];
  careNote: string;
}

export interface RateCardCategory {
  id: 'upholstery-carpet' | 'dry-cleaning' | 'dye-services' | 'laundry';
  title: string;
  subtitle: string;
  serviceId: string;
  badge: string;
  color: ServiceColor;
  items: {
    id: string;
    name: string;
    priceLabel: string;
    priceValue: number | null;
    unitNote?: string;
  }[];
}

export const COLOR_THEMES: Record<
  ServiceColor,
  {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    iconBg: string;
    iconText: string;
    iconHoverBg: string;
    topBar: string;
    ring: string;
    pillBg: string;
    pillText: string;
  }
> = {
  sky: {
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-800',
    badgeBorder: 'border-sky-200',
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-700',
    iconHoverBg: 'group-hover:bg-sky-600 group-hover:text-white',
    topBar: 'from-sky-500 to-cyan-400',
    ring: 'border-sky-500 ring-sky-500/20',
    pillBg: 'bg-sky-600',
    pillText: 'text-sky-700',
  },
  teal: {
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-800',
    badgeBorder: 'border-teal-200',
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-700',
    iconHoverBg: 'group-hover:bg-teal-600 group-hover:text-white',
    topBar: 'from-teal-600 to-emerald-400',
    ring: 'border-teal-600 ring-teal-500/20',
    pillBg: 'bg-teal-700',
    pillText: 'text-teal-700',
  },
  emerald: {
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    badgeBorder: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-700',
    iconHoverBg: 'group-hover:bg-emerald-600 group-hover:text-white',
    topBar: 'from-emerald-500 to-teal-400',
    ring: 'border-emerald-500 ring-emerald-500/20',
    pillBg: 'bg-emerald-600',
    pillText: 'text-emerald-700',
  },
  indigo: {
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-800',
    badgeBorder: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-700',
    iconHoverBg: 'group-hover:bg-indigo-600 group-hover:text-white',
    topBar: 'from-indigo-600 to-sky-500',
    ring: 'border-indigo-500 ring-indigo-500/20',
    pillBg: 'bg-indigo-600',
    pillText: 'text-indigo-700',
  },
  amber: {
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-900',
    badgeBorder: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-700',
    iconHoverBg: 'group-hover:bg-amber-500 group-hover:text-white',
    topBar: 'from-amber-500 to-orange-400',
    ring: 'border-amber-500 ring-amber-500/20',
    pillBg: 'bg-amber-600',
    pillText: 'text-amber-700',
  },
  rose: {
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-800',
    badgeBorder: 'border-rose-200',
    iconBg: 'bg-rose-100',
    iconText: 'text-rose-700',
    iconHoverBg: 'group-hover:bg-rose-600 group-hover:text-white',
    topBar: 'from-rose-500 to-pink-400',
    ring: 'border-rose-500 ring-rose-500/20',
    pillBg: 'bg-rose-600',
    pillText: 'text-rose-700',
  },
};

export interface SocialLinkItem {
  id: 'instagram' | 'facebook' | 'tiktok';
  name: string;
  handle: string;
  url: string | null;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@krystalcarecleaners',
    url: 'https://www.instagram.com/krystalcarecleaners/',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Krystal Care Cleaners',
    url: 'https://www.facebook.com/share/1DH2CbebRZ/',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@krystalcarecleaners',
    url: 'https://www.tiktok.com/@krystalcarecleaners',
  },
];

export const BUSINESS_INFO = {
  legalName: 'Krystal Care Cleaners (Pty) Ltd',
  shortName: 'Krystal Care Cleaners',
  brandMotto: 'Bring Colour Back to Life!',
  tagline: 'Mobile Deep Cleaning & Specialist Garment Care Across Johannesburg & Gauteng',
  address: '14 Dharwar St, Lenasia Extension 11, Johannesburg, 1827',
  shortAddress: '14 Dharwar St, Lenasia Ext 11, JHB 1827',
  phoneDisplay: '+27 77 247 3275',
  phoneLocal: '077 247 3275',
  phoneHref: 'tel:+27772473275',
  email: 'info@krystalcare.co.za',
  emailHref: 'mailto:info@krystalcare.co.za',
  whatsappNumber: '27772473275',
  whatsappBaseUrl: 'https://wa.me/27772473275',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=14+Dharwar+St%2C+Lenasia+Extension+11%2C+Johannesburg%2C+1827',
  wazeUrl:
    'https://waze.com/ul?q=14%20Dharwar%20St%2C%20Lenasia%20Extension%2011%2C%20Johannesburg%2C%201827&navigate=yes',
  rating: '4.9',
  reviewCount: 23,
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
    { days: 'Saturday – Sunday', time: '8:00 AM – 2:00 PM' },
  ],
  amenities: [
    'Mobile Onsite Teams',
    'Door-to-Door Collection & Delivery',
    'Card Payments Accepted',
    'Once-Off & Regular Contracts',
  ],
};

export const RATE_CARD_SECTIONS: RateCardCategory[] = [
  {
    id: 'upholstery-carpet',
    title: 'Couch, Carpet, Curtain & Mattress',
    subtitle: 'Mobile onsite extraction across Johannesburg & Lenasia',
    serviceId: 'couch-chair',
    badge: 'Mobile Extraction',
    color: 'teal',
    items: [
      { id: 'fabric-1seater', name: '1-Seater Fabric Couch', priceLabel: 'R200', priceValue: 200 },
      { id: 'fabric-3seater', name: '3-Seater Fabric Couch', priceLabel: 'R850', priceValue: 850 },
      { id: 'leather-1seater', name: '1-Seater Leather Couch', priceLabel: 'R280', priceValue: 280 },
      { id: 'leather-3seater', name: '3-Seater Leather Couch', priceLabel: 'R1,750', priceValue: 1750 },
      {
        id: 'dining-chair',
        name: 'Dining Room Chair',
        priceLabel: 'R100',
        priceValue: 100,
        unitNote: 'Per chair',
      },
      {
        id: 'carpet-room',
        name: 'Carpet Cleaning (1 Room)',
        priceLabel: 'R450',
        priceValue: 450,
        unitNote: 'Standard room',
      },
      {
        id: 'persian-rug-quote',
        name: 'Persian & Shaggy Rugs',
        priceLabel: 'WhatsApp Quote',
        priceValue: null,
        unitNote: 'Send photo & rug size',
      },
      {
        id: 'curtain-quote',
        name: 'Curtain Cleaning (Unlined / Lined)',
        priceLabel: 'WhatsApp Quote',
        priceValue: null,
        unitNote: 'Send photo / drop size',
      },
      {
        id: 'mattress-quote',
        name: 'Mattress Sanitising (3/4 – King)',
        priceLabel: 'WhatsApp Quote',
        priceValue: null,
        unitNote: 'Send bed size',
      },
    ],
  },
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning, Suits & Indian Outfits',
    subtitle: 'Suits, sarees, wedding dresses, outerwear & household pillows',
    serviceId: 'dry-cleaning-formal',
    badge: 'Solvent & Press',
    color: 'rose',
    items: [
      { id: 'suit-2pc', name: '2-Piece Suit', priceLabel: 'R280', priceValue: 280 },
      { id: 'suit-3pc', name: '3-Piece Suit', priceLabel: 'R360', priceValue: 360 },
      { id: 'ties-bowties', name: 'Ties & Bowties', priceLabel: 'R100', priceValue: 100 },
      { id: 'lumber-jacket', name: 'Lumber Jackets', priceLabel: 'R180', priceValue: 180 },
      { id: 'overcoats', name: 'Overcoats', priceLabel: 'R240', priceValue: 240 },
      { id: 'pillows-dc', name: 'Pillows', priceLabel: 'R80', priceValue: 80 },
      {
        id: 'indian-outfits-sarees',
        name: 'Indian Outfits (Sarees, Lehengas, Kurtas)',
        priceLabel: 'WhatsApp Quote',
        priceValue: null,
        unitNote: 'Send photo for quote',
      },
      {
        id: 'wedding-dresses',
        name: 'Wedding Dresses & Bridalwear',
        priceLabel: 'WhatsApp Quote',
        priceValue: null,
        unitNote: 'Send photo for quote',
      },
      {
        id: 'skirts-dresses-pleated',
        name: 'Skirts & Dresses (Plain / Pleated)',
        priceLabel: 'WhatsApp Quote',
        priceValue: null,
        unitNote: 'Depends on pleat & fabric',
      },
    ],
  },
  {
    id: 'dye-services',
    title: 'Dye Services — Bring Colour Back to Life!',
    subtitle: 'High-saturation garment dyeing for faded jeans, tops & caps',
    serviceId: 'clothing-dyeing',
    badge: 'Colour Revival',
    color: 'indigo',
    items: [
      { id: 'dye-jeans', name: 'Jeans', priceLabel: 'R300', priceValue: 300 },
      { id: 'dye-tshirts', name: 'T-Shirts', priceLabel: 'R280', priceValue: 280 },
      { id: 'dye-longsleeve', name: 'Long Sleeve Shirts', priceLabel: 'R260', priceValue: 260 },
      { id: 'dye-golf', name: 'Golf Shirts', priceLabel: 'R230', priceValue: 230 },
      { id: 'dye-caps', name: 'Caps', priceLabel: 'R140', priceValue: 140 },
    ],
  },
  {
    id: 'laundry',
    title: 'Laundry Services',
    subtitle: 'Crisp everyday wash, iron, fold & bulky bedding care',
    serviceId: 'laundry-linen',
    badge: '24–48 Hr Turnaround',
    color: 'sky',
    items: [
      { id: 'wash-fold', name: 'Wash & Fold', priceLabel: 'R60', priceValue: 60 },
      { id: 'wash-iron', name: 'Wash & Iron', priceLabel: 'R70', priceValue: 70 },
      { id: 'linen', name: 'Linen', priceLabel: 'R75', priceValue: 75 },
      { id: 'blankets-duvet', name: 'Blankets & Duvet', priceLabel: 'R260', priceValue: 260 },
      {
        id: 'feather-duvet',
        name: 'Feather Duvets',
        priceLabel: 'WhatsApp Quote',
        priceValue: null,
        unitNote: 'Send size on WhatsApp',
      },
      {
        id: 'sneakers-quote',
        name: 'Sneaker Cleaning (Leather / Suede / Mesh)',
        priceLabel: 'WhatsApp Quote',
        priceValue: null,
        unitNote: 'Send pair photo',
      },
    ],
  },
];

export const SERVICE_CATALOG: ServiceItem[] = [
  {
    id: 'carpet-rug',
    pillar: 'cleaning',
    color: 'sky',
    title: 'Carpet & Persian Rug Cleaning',
    subtitle: 'Deep hot-water extraction for homes & offices',
    description:
      'Lift embedded dust, allergens, pet hair, and stubborn high-traffic marks without oversaturating fibres. Ideal for fitted carpets and delicate woven Persian rugs.',
    method: 'Commercial Hot-Water Extraction & Low-Moisture Rug Rinse',
    turnaround: 'Dries in 3–5 hours onsite',
    modeTag: 'Mobile Onsite or Collection',
    priceFrom: 'Rooms R450 · Persian Rugs: WhatsApp Quote',
    pricedRates: [{ item: 'Carpet Cleaning (1 Room)', priceLabel: 'R450', priceValue: 450 }],
    highlight: 'Fast-Dry Extraction',
    items: [
      'Bedrooms (From R450 per room)',
      'Passages & Stairways (WhatsApp Quote)',
      'Lounge Rooms & Suites (WhatsApp Quote)',
      'Loose & Shaggy Rugs (WhatsApp Quote)',
      'Persian Rugs & Carpets (WhatsApp Quote)',
    ],
    itemGroups: [
      {
        groupName: 'Fitted Residential & Office Areas',
        entries: ['Bedrooms (R450 / room)', 'Passages & Stairways', 'Lounge & Dining Rooms', 'Boardrooms & Office Suites'],
      },
      {
        groupName: 'Loose & Delicate Rugs',
        entries: ['Loose Decorative Rugs', 'Wool & Shaggy Rugs', 'Persian Rugs & Hand-Knotted Carpets'],
      },
    ],
    processSteps: [
      'Pre-vacuuming and high-traffic stain pre-spotting',
      'pH-balanced fibre treatment safe for children and pets',
      'High-suction hot-water extraction removing dirt & moisture',
      'Pile grooming for an even, plush finish',
    ],
    careNote: 'Persian and delicate wool rugs receive colour-fastness testing and gentle low-moisture rinsing.',
  },
  {
    id: 'couch-chair',
    pillar: 'cleaning',
    color: 'teal',
    title: 'Couch, Sofa & Chair Cleaning',
    subtitle: 'Upholstered & leather furniture revival',
    description:
      'Thorough deep-cleaning tailored to fabric weave or leather grain—restoring freshness, colour vibrancy, and hygiene to everyday seating.',
    method: 'Deep Upholstery Extraction & Leather Conditioning',
    turnaround: 'Dries in 3–6 hours onsite',
    modeTag: 'Mobile Onsite',
    priceFrom: 'Chairs R100 · Couches R200+',
    pricedRates: [
      { item: 'Dining Room Chair (Each)', priceLabel: 'R100', priceValue: 100 },
      { item: '1-Seater Fabric Couch', priceLabel: 'R200', priceValue: 200 },
      { item: '3-Seater Fabric Couch', priceLabel: 'R850', priceValue: 850 },
      { item: '1-Seater Leather Couch', priceLabel: 'R280', priceValue: 280 },
      { item: '3-Seater Leather Couch', priceLabel: 'R1,750', priceValue: 1750 },
    ],
    highlight: 'Most Popular',
    items: [
      '3-Seater Fabric Couch (R850)',
      '1-Seater Fabric Couch (R200)',
      'Leather Couches (1-Seater R280 · 3-Seater R1,750)',
      'Dining Room Chairs (R100 each)',
      'Office & Reception Chairs',
    ],
    itemGroups: [
      {
        groupName: 'Lounge Seating',
        entries: [
          '1-Seater Fabric Couch (R200)',
          '3-Seater Fabric Couch (R850)',
          '1-Seater Leather Couch (R280)',
          '3-Seater Leather Couch (R1,750)',
        ],
      },
      {
        groupName: 'Individual & Commercial Chairs',
        entries: ['Dining Room Chairs (R100 each)', 'Armchairs & Ottomans', 'Fabric & Mesh Office Chairs'],
      },
    ],
    processSteps: [
      'Fabric / leather inspection & spot stain pre-treatment',
      'Deep extraction flushing out body oils, spills & dust',
      'Deodorising rinse to eliminate pet and food odours',
      'Optional leather balm conditioning for supple shine',
    ],
    careNote: 'Safe for microfibre, linen blends, suede-look fabrics, and genuine leather suites.',
  },
  {
    id: 'mattress-headboard',
    pillar: 'cleaning',
    color: 'emerald',
    title: 'Mattress & Headboard Sanitising',
    subtitle: 'Allergen, dust-mite & odour removal',
    description:
      'Breathe easier where you sleep. We deep-clean and sanitise mattresses and upholstered headboards across every standard and custom bed size.',
    method: 'High-Temp Sanitising Extraction & Allergen Flush',
    turnaround: 'Dries in 3–5 hours onsite',
    modeTag: 'Mobile Onsite',
    priceFrom: 'WhatsApp Quote (3/4 – King)',
    highlight: 'Allergen Relief',
    items: [
      'Single & Three-Quarter (3/4)',
      'Double & Queen',
      'King & Extra-Length',
      'Upholstered Headboards',
    ],
    itemGroups: [
      {
        groupName: 'All Mattress Sizes',
        entries: ['3/4 Mattress', 'Single Mattress', 'Double Mattress', 'Queen Mattress', 'King Mattress'],
      },
      {
        groupName: 'Bed Frames & Headboards',
        entries: ['Tufted & Buttoned Headboards', 'Fabric Bed Bases & Pedestals'],
      },
    ],
    processSteps: [
      'High-power dry extraction to pull out dust mites & skin dander',
      'Targeted enzyme treatment for sweat, spills, or pet marks',
      'Sanitising steam-assisted extraction on top & side panels',
      'Fresh hygiene finish ready for fresh linen the same evening',
    ],
    careNote: 'We recommend booking morning slots so mattresses are completely dry before bedtime.',
  },
  {
    id: 'curtain-specialist',
    pillar: 'cleaning',
    color: 'indigo',
    title: 'Curtain Specialist Cleaning',
    subtitle: 'Dust, grime & odour removal for delicate drapes',
    description:
      'Protect custom pleating, linings, and delicate fabrics while clearing years of accumulated Gauteng dust, sunlight residue, and household odours.',
    method: 'Fabric-Safe Curtain Care (Onsite or Take-Down)',
    turnaround: 'Same-day onsite or 48 hr workshop',
    modeTag: 'Onsite or Collection',
    priceFrom: 'WhatsApp Quote (by drop & lining)',
    items: [
      'Unlined Curtains & Sheers',
      'Lined & Blockout Curtains',
      'Pelmet & Drapery Care',
    ],
    itemGroups: [
      {
        groupName: 'Curtain Types',
        entries: ['Curtains – Unlined & Sheer Voiles', 'Curtains – Lined & Blockout Drapes', 'Pinch-Pleat & Eyelet Panels'],
      },
      {
        groupName: 'Convenient Handling',
        entries: ['Onsite Hanging Steam Refresh', 'Take-Down, Workshop Clean & Re-Hang'],
      },
    ],
    processSteps: [
      'Inspection of fabric backing, hooks, and sun-weakened areas',
      'Gentle dust & particulate extraction from folds and hems',
      'De-odorising & stain spot-treatment without shrinking',
      'Steam finishing for crisp vertical drape',
    ],
    careNote: 'Prevents shrinkage and preserves thermal/blockout curtain linings.',
  },
  {
    id: 'tile-grout-office',
    pillar: 'cleaning',
    color: 'amber',
    title: 'Tile, Grout & Office Deep Cleaning',
    subtitle: 'Commercial spaces & hard-floor restoration',
    description:
      'Revive darkened grout lines, tiled kitchens, bathrooms, and commercial office floors with scheduled or once-off deep cleaning built around your business hours.',
    method: 'Rotary Scrubbing, Grout Agitation & Commercial Extraction',
    turnaround: 'Same-day completion · After-hours available',
    modeTag: 'Residential & Commercial',
    priceFrom: 'WhatsApp Quote',
    highlight: 'Once-Off or Regular',
    items: [
      'Tile & Grout Deep Scrubbing',
      'Once-Off Office Deep Cleans',
      'Regular Office Maintenance',
      'Reception & Boardroom Carpets',
    ],
    itemGroups: [
      {
        groupName: 'Hard Floors & Grout',
        entries: ['Porcelain & Ceramic Tiles', 'Kitchen & Bathroom Grout Lines', 'Patio & Passage Tiling'],
      },
      {
        groupName: 'Office & Commercial',
        entries: ['Once-Off Deep Office Clean', 'Weekly / Monthly Office Contracts', 'Boardroom Carpets & Task Chairs'],
      },
    ],
    processSteps: [
      'Alkaline degreaser & grout-lifting pre-treatment',
      'Mechanical rotary brush agitation in grout joints',
      'Wet-vacuum slurry extraction leaving floors streak-free',
      'Sanitised desk, chair & communal area finishing for offices',
    ],
    careNote: 'Ideal for end-of-lease handovers, post-renovation cleanups, and busy Johannesburg offices.',
  },
  {
    id: 'laundry-linen',
    pillar: 'garment',
    color: 'teal',
    title: 'Laundry & Bed Linen Care',
    subtitle: 'Wash, iron & fold with crisp finishing',
    description:
      'Take laundry day off your plate. Everyday garments and household bed linen washed hygienically, pressed neatly, and folded ready for your cupboard.',
    method: 'Temperature-Sorted Wash, Soften & Steam Press',
    turnaround: '24–48 hour standard turnaround',
    modeTag: 'Mobile Collection & Delivery',
    priceFrom: 'From R60',
    pricedRates: [
      { item: 'Wash & Fold', priceLabel: 'R60', priceValue: 60 },
      { item: 'Wash & Iron', priceLabel: 'R70', priceValue: 70 },
      { item: 'Linen', priceLabel: 'R75', priceValue: 75 },
      { item: 'Blankets & Duvet', priceLabel: 'R260', priceValue: 260 },
      { item: 'Pillows', priceLabel: 'R80', priceValue: 80 },
    ],
    highlight: 'Fast Turnaround',
    items: [
      'Wash & Fold (R60) · Wash & Iron (R70)',
      'Household Linen (R75)',
      'Blankets & Duvet (R260)',
      'Feather Duvets (WhatsApp Quote)',
      'Standard & Continental Pillows (R80)',
    ],
    itemGroups: [
      {
        groupName: 'Laundromat & Everyday Laundry',
        entries: ['Wash & Fold (R60)', 'Wash & Iron (R70)', 'Weekly Family Laundry Bundles'],
      },
      {
        groupName: 'Bed Linen & Bedding',
        entries: [
          'Linen & Sheets (R75)',
          'Blankets & Duvet (R260)',
          'Feather Duvets (WhatsApp Quote)',
          'Pillows (R80)',
        ],
      },
    ],
    processSteps: [
      'Colour and fabric sorting with gentle detergents',
      'Stain pre-treatment on collars, cuffs, and linen marks',
      'Commercial drying & steam pressing for zero creases',
      'Neatly folded or hung in protective wrapping',
    ],
    careNote: 'Feather duvets and continental pillows are dried carefully to restore full loft.',
  },
  {
    id: 'dry-cleaning-formal',
    pillar: 'garment',
    color: 'rose',
    title: 'Dry Cleaning, Suits & Indian Outfits',
    subtitle: 'Specialist solvent & delicate couture care',
    description:
      'Precision care for structured tailoring, bridal gowns, and intricately embellished traditional wear that demand experienced hands.',
    method: 'Gentle Solvent Dry Cleaning & Hand-Finished Pressing',
    turnaround: '48–72 hours (Express available)',
    modeTag: 'Specialist Garment Care',
    priceFrom: 'Suits R280+ · Sarees: WhatsApp Quote',
    pricedRates: [
      { item: '2-Piece Suit', priceLabel: 'R280', priceValue: 280 },
      { item: '3-Piece Suit', priceLabel: 'R360', priceValue: 360 },
      { item: 'Ties & Bowties', priceLabel: 'R100', priceValue: 100 },
      { item: 'Pillows', priceLabel: 'R80', priceValue: 80 },
      { item: 'Sarees, Indian Outfits & Wedding Dresses', priceLabel: 'WhatsApp Quote' },
    ],
    highlight: 'Delicate Specialists',
    items: [
      '2-Piece Suit (R280) · 3-Piece Suit (R360)',
      'Ties & Bow Ties (R100)',
      'Pleated Skirts & Dresses (WhatsApp Quote)',
      'Wedding Dresses & Bridalwear (WhatsApp Quote)',
      'Indian Outfits: Sarees, Lehengas, Kurtas (WhatsApp Quote)',
    ],
    itemGroups: [
      {
        groupName: 'Suits & Formalwear',
        entries: ['2-Piece Suit (R280)', '3-Piece Suit (R360)', 'Ties & Bowties (R100)', 'Shirts, Jackets & Slacks'],
      },
      {
        groupName: 'Skirts & Dresses',
        entries: ['Skirt – Plain / Semi-Pleated / Full Pleated', 'Dress – Plain / Semi-Pleated / Full Pleated'],
      },
      {
        groupName: 'Bridal & Cultural Couture',
        entries: ['Wedding Dresses', 'Indian Outfits (Sarees, Lehengas, Sherwanis, Kurtas)'],
      },
    ],
    processSteps: [
      'Beadwork, embroidery, and trim protection check',
      'Delicate dry-cleaning cycle to protect structure & colour',
      'Hand-spotting for makeup, oil, or food marks',
      'Precision steaming of pleats and protective garment bag',
    ],
    careNote: 'Trusted in Lenasia for delicate zari, sequin, silk, and bridal preservation.',
  },
  {
    id: 'winterwear-outerwear',
    pillar: 'garment',
    color: 'sky',
    title: 'Jerseys, Jackets & Overcoats',
    subtitle: 'Seasonal refresh for heavy & knit garments',
    description:
      'Keep knitwear shape intact and outerwear crisp without shrinkage or pilling, ready for Gauteng’s chilly winter mornings.',
    method: 'Shape-Safe Knit & Coat Care',
    turnaround: '48–72 hours',
    modeTag: 'Mobile Collection & Delivery',
    priceFrom: 'From R180',
    pricedRates: [
      { item: 'Lumber Jackets', priceLabel: 'R180', priceValue: 180 },
      { item: 'Overcoats', priceLabel: 'R240', priceValue: 240 },
    ],
    items: [
      'Lumber Jackets (R180)',
      'Overcoats (R240)',
      'Knit Jerseys & Cardigans',
      'Caps & Hats',
    ],
    itemGroups: [
      {
        groupName: 'Winter & Outerwear',
        entries: [
          'Lumber Jackets (R180)',
          'Overcoats (R240)',
          'Jerseys & Wool Knits',
          'Caps & Hats',
        ],
      },
    ],
    processSteps: [
      'Collar, cuff, and pocket-edge stain care',
      'Controlled cleaning cycle preventing wool shrinkage',
      'De-linting and gentle steam shaping on padded forms',
      'Ready-to-wear breathable hanging cover',
    ],
    careNote: 'Ideal before storing coats away for summer or refreshing them ahead of winter.',
  },
  {
    id: 'clothing-dyeing',
    pillar: 'garment',
    color: 'indigo',
    title: 'Clothing Dyeing Services',
    subtitle: 'Bring Colour Back to Life!',
    description:
      'Breathe second life into sun-faded denim, workwear, t-shirts, golf shirts, caps, and everyday favourites with rich, even colour dyeing.',
    method: 'High-Saturation Vat Dyeing & Colour Fixation',
    turnaround: '3–5 working days',
    modeTag: 'Mobile Collection & Delivery',
    priceFrom: 'From R140',
    pricedRates: [
      { item: 'Caps', priceLabel: 'R140', priceValue: 140 },
      { item: 'Golf Shirts', priceLabel: 'R230', priceValue: 230 },
      { item: 'Long Sleeve Shirts', priceLabel: 'R260', priceValue: 260 },
      { item: 'T-Shirts', priceLabel: 'R280', priceValue: 280 },
      { item: 'Jeans', priceLabel: 'R300', priceValue: 300 },
    ],
    highlight: 'Bring Colour Back!',
    items: [
      'Jeans (R300)',
      'T-Shirts (R280)',
      'Long Sleeve Shirts (R260)',
      'Golf Shirts (R230)',
      'Caps (R140)',
    ],
    itemGroups: [
      {
        groupName: 'Official Dye Rate Card',
        entries: [
          'Jeans — R300',
          'T-Shirts — R280',
          'Long Sleeve Shirts — R260',
          'Golf Shirts — R230',
          'Caps — R140',
        ],
      },
      {
        groupName: 'Additional Dyeable Garments',
        entries: ['Dungarees & Chinos', 'Cotton Jackets & Waistcoats'],
      },
    ],
    processSteps: [
      'Fabric label inspection (cotton, linen & natural blends dye best)',
      'Deep pre-wash to strip oils or residue for even pigment uptake',
      'Controlled hot dye bath & colour-lock fixer rinse',
      'Final wash, dry & press for rich, uniform tone',
    ],
    careNote: 'Most popular for restoring faded black jeans, chinos, golf shirts, and cotton caps.',
  },
  {
    id: 'sneaker-cleaning',
    pillar: 'garment',
    color: 'amber',
    title: 'Sneaker Cleaning & Refresh',
    subtitle: 'Midsoles, uppers, suede & mesh restoration',
    description:
      'Gentle hand-cleaning and deodorising for everyday trainers, crisp leather classics, suede pairs, and canvas sneakers.',
    method: 'Hand-Brushed Upper, Midsole & Insole Sanitising',
    turnaround: '24–48 hours',
    modeTag: 'Mobile Collection & Delivery',
    priceFrom: 'WhatsApp Quote',
    items: [
      'Leather & White Sneaker Restoration',
      'Mesh, Knit & Canvas Trainers',
      'Suede & Nubuck Conditioning',
      'Lace & Midsole Brightening',
    ],
    itemGroups: [
      {
        groupName: 'Footwear Care',
        entries: [
          'White Leather Sneakers',
          'Running & Mesh Knit Trainers',
          'Suede & Nubuck Sneakers',
          'Lace Whitening & Insole Deodorising',
        ],
      },
    ],
    processSteps: [
      'Separate lace & insole wash with antibacterial deodoriser',
      'Soft-bristle upper cleaning tailored to leather, mesh, or suede',
      'Deep scuff & stain lift along rubber midsoles and toe boxes',
      'Controlled air-drying with shape support',
    ],
    careNote: 'Never machine-tumbled—every pair is hand-cleaned to protect glue seams and suede nap.',
  },
];

export const SERVICE_AREAS = [
  {
    name: 'Lenasia & Lenasia South',
    badge: 'Mobile Dispatch · Ext 11',
    note: 'Rapid mobile dispatch across all extensions plus convenient door-to-door garment collection & delivery.',
  },
  {
    name: 'Joburg South',
    badge: 'Daily Routes',
    note: 'Mondeor, Bassonia, Glenvista, Meyersdal, Mulbarton, Ormonde & surrounds.',
  },
  {
    name: 'Sandton & Rosebank',
    badge: 'Home & Office',
    note: 'Residential upholstery, Persian rugs, mattresses & corporate office deep cleans.',
  },
  {
    name: 'Randburg',
    badge: 'Gauteng Mobile',
    note: 'Full mobile carpet, couch, mattress, tile & curtain cleaning teams.',
  },
  {
    name: 'East Rand',
    badge: 'Gauteng Mobile',
    note: 'Scheduled residential & commercial deep-cleaning visits across Ekurhuleni.',
  },
  {
    name: 'Greater Johannesburg',
    badge: 'On Request',
    note: 'Midrand, Soweto, Roodepoort & Pretoria bookings for multi-item jobs.',
  },
];

export const REVIEW_HIGHLIGHTS = [
  {
    quote:
      'Fast turnaround, fair pricing, and our lounge couch and queen mattress looked and smelled brand new after the deep clean.',
    author: 'Lenasia & Joburg South Households',
    service: 'Couch & Mattress Deep Cleaning',
  },
  {
    quote:
      'They handled our office carpets and dining chairs efficiently with minimal disruption. Spotless finish and friendly team.',
    author: 'Commercial & Office Clients',
    service: 'Office & Carpet Cleaning',
  },
  {
    quote:
      'Reliable collection and crisp finishing on delicate formalwear and household linen. Truly earns their 4.9-star reputation in Lenasia.',
    author: 'Regular Garment & Linen Clients',
    service: 'Dry Cleaning & Laundry',
  },
];

export const FAQS = [
  {
    question: 'Are you a mobile cleaning business that comes to my home or office?',
    answer:
      'Yes! We are a mobile cleaning and garment-care business. Our equipped teams travel directly to homes and offices across Lenasia, Joburg South, Sandton, Rosebank, Randburg, and the East Rand to deep-clean carpets, couches, mattresses, tile & grout, curtains, and offices onsite. For laundry, dry cleaning, clothing dyeing, and sneaker care, we offer convenient door-to-door collection and delivery (or scheduled Lenasia Ext 11 dispatch).',
  },
  {
    question: 'How long do carpets, couches, and mattresses take to dry?',
    answer:
      'We use high-powered commercial extraction equipment that removes the vast majority of moisture during cleaning. Most couches, mattresses, and carpets dry within 3 to 6 hours depending on fabric thickness and room ventilation.',
  },
  {
    question: 'Do you clean delicate Indian outfits and wedding dresses?',
    answer:
      'Yes. We offer specialist dry cleaning for wedding dresses as well as traditional Indian outfits (including beaded, silk, zari, and embroidered garments), pleated skirts/dresses, and tailored suits.',
  },
  {
    question: 'Which payment methods do you accept?',
    answer:
      'We accept card payments (mobile card machine onsite), EFT, and cash for all mobile cleaning and door-to-door collection & delivery orders.',
  },
  {
    question: 'What items can be dyed through your clothing dyeing service?',
    answer:
      'We refresh and recolour cotton and dye-compatible jeans (R300), t-shirts (R280), long sleeve shirts (R260), golf shirts (R230), caps (R140), dungarees, and jackets. Send us a quick photo on WhatsApp (+27 77 247 3275) or email info@krystalcare.co.za and we will advise on the fabric label before booking.',
  },
];
