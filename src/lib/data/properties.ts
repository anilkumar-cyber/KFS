export type PropertyType =
  | "farm-land"
  | "hmda-plots"
  | "dtcp-plots"
  | "independent-house"
  | "apartment"
  | "villa"
  | "commercial"
  | "open-plot";

export type Property = {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  typeLabel: string;
  price: number;
  priceLabel: string;
  location: string;
  city: string;
  state: string;
  areaSqft: number;
  bedrooms: number | null;
  bathrooms: number | null;
  bankLoanAvailable: boolean;
  featured: boolean;
  images: string[];
  description: string;
  amenities: string[];
  nearbyPlaces: { name: string; distance: string }[];
  lat: number;
  lng: number;
  postedOn: string;
  reraId?: string;
};

const img = (seed: string, i: number) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80&sig=${i}`;

export const properties: Property[] = [
  {
    id: "p1",
    slug: "hmda-plot-shamshabad-hyderabad",
    title: "HMDA Approved Plot in Shamshabad",
    type: "hmda-plots",
    typeLabel: "HMDA Approved Plot",
    price: 4500000,
    priceLabel: "₹45 Lakh",
    location: "Shamshabad",
    city: "Hyderabad",
    state: "Telangana",
    areaSqft: 2400,
    bedrooms: null,
    bathrooms: null,
    bankLoanAvailable: true,
    featured: true,
    images: [img("photo-1500382017468-9049fed747ef", 1), img("photo-1500382017468-9049fed747ef", 2)],
    description:
      "A premium HMDA-approved residential plot located minutes from Shamshabad international airport, ideal for building your dream home or as a long-term investment.",
    amenities: ["Gated Community", "24x7 Security", "Underground Drainage", "Wide Roads", "Landscaped Parks"],
    nearbyPlaces: [
      { name: "Rajiv Gandhi International Airport", distance: "8 km" },
      { name: "ORR Exit 2", distance: "3 km" },
      { name: "Apollo Hospital", distance: "6 km" },
    ],
    lat: 17.2403,
    lng: 78.4294,
    postedOn: "2026-06-12",
    reraId: "P02400001234",
  },
  {
    id: "p2",
    slug: "dtcp-plot-vizag-anandapuram",
    title: "DTCP Approved Plot in Anandapuram",
    type: "dtcp-plots",
    typeLabel: "DTCP Approved Plot",
    price: 3200000,
    priceLabel: "₹32 Lakh",
    location: "Anandapuram",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    areaSqft: 1800,
    bedrooms: null,
    bathrooms: null,
    bankLoanAvailable: true,
    featured: true,
    images: [img("photo-1449844908441-8829872d2607", 3)],
    description:
      "DTCP approved open plot in the rapidly developing Anandapuram corridor of Visakhapatnam with excellent connectivity to the IT hub and beach road.",
    amenities: ["Avenue Plantation", "Compound Wall", "Street Lighting", "Rainwater Harvesting"],
    nearbyPlaces: [
      { name: "Vizag IT SEZ", distance: "5 km" },
      { name: "NH16", distance: "2 km" },
      { name: "Rushikonda Beach", distance: "7 km" },
    ],
    lat: 17.8631,
    lng: 83.3746,
    postedOn: "2026-05-28",
  },
  {
    id: "p3",
    slug: "luxury-villa-whitefield-bangalore",
    title: "4BHK Luxury Villa in Whitefield",
    type: "villa",
    typeLabel: "Villa",
    price: 21000000,
    priceLabel: "₹2.10 Crore",
    location: "Whitefield",
    city: "Bangalore",
    state: "Karnataka",
    areaSqft: 3600,
    bedrooms: 4,
    bathrooms: 5,
    bankLoanAvailable: true,
    featured: true,
    images: [img("photo-1613977257363-707ba9348227", 4), img("photo-1600585154340-be6161a56a0c", 5)],
    description:
      "An elegant 4BHK villa in a premium gated community in Whitefield, featuring a private garden, modular kitchen, and clubhouse access.",
    amenities: ["Clubhouse", "Swimming Pool", "Gymnasium", "Kids Play Area", "Private Garden", "Covered Parking"],
    nearbyPlaces: [
      { name: "ITPL", distance: "3 km" },
      { name: "Phoenix Marketcity", distance: "5 km" },
      { name: "Whitefield Railway Station", distance: "4 km" },
    ],
    lat: 12.9698,
    lng: 77.75,
    postedOn: "2026-07-02",
    reraId: "PRM/KA/RERA/1251/2026",
  },
  {
    id: "p4",
    slug: "3bhk-apartment-gachibowli-hyderabad",
    title: "3BHK Premium Apartment in Gachibowli",
    type: "apartment",
    typeLabel: "Apartment",
    price: 12500000,
    priceLabel: "₹1.25 Crore",
    location: "Gachibowli",
    city: "Hyderabad",
    state: "Telangana",
    areaSqft: 1850,
    bedrooms: 3,
    bathrooms: 3,
    bankLoanAvailable: true,
    featured: true,
    images: [img("photo-1502672260266-1c1ef2d93688", 6), img("photo-1560184897-ae75f418493e", 7)],
    description:
      "Spacious 3BHK apartment in a high-rise tower in Gachibowli's IT corridor, close to major tech parks, international schools and hospitals.",
    amenities: ["Swimming Pool", "Gym", "24x7 Power Backup", "Clubhouse", "Multi-level Parking"],
    nearbyPlaces: [
      { name: "Financial District", distance: "2 km" },
      { name: "DLF Cyber City", distance: "4 km" },
      { name: "Continental Hospitals", distance: "3 km" },
    ],
    lat: 17.4401,
    lng: 78.3489,
    postedOn: "2026-06-20",
    reraId: "P02400005678",
  },
  {
    id: "p5",
    slug: "independent-house-kukatpally-hyderabad",
    title: "Independent House in Kukatpally",
    type: "independent-house",
    typeLabel: "Independent House",
    price: 9800000,
    priceLabel: "₹98 Lakh",
    location: "Kukatpally",
    city: "Hyderabad",
    state: "Telangana",
    areaSqft: 2200,
    bedrooms: 3,
    bathrooms: 3,
    bankLoanAvailable: true,
    featured: false,
    images: [img("photo-1570129477492-45c003edd2be", 8)],
    description:
      "A well-maintained independent house on a 200 sq. yard plot in a peaceful residential locality of Kukatpally, close to schools and markets.",
    amenities: ["Private Terrace", "Car Parking", "Borewell", "Solar Water Heater"],
    nearbyPlaces: [
      { name: "KPHB Metro Station", distance: "1.5 km" },
      { name: "Forum Mall", distance: "3 km" },
    ],
    lat: 17.4849,
    lng: 78.4138,
    postedOn: "2026-04-15",
  },
  {
    id: "p6",
    slug: "commercial-shop-madhapur-hyderabad",
    title: "Commercial Shop Space in Madhapur",
    type: "commercial",
    typeLabel: "Commercial Property",
    price: 18500000,
    priceLabel: "₹1.85 Crore",
    location: "Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    areaSqft: 1200,
    bedrooms: null,
    bathrooms: 2,
    bankLoanAvailable: true,
    featured: false,
    images: [img("photo-1524758631624-e2822e304c36", 9)],
    description:
      "Ground floor commercial shop space on a high-footfall road in Madhapur, suitable for retail, showroom, or restaurant business.",
    amenities: ["Wide Frontage", "Ample Parking", "3-Phase Power", "Fire Safety Compliant"],
    nearbyPlaces: [
      { name: "Hitech City Metro", distance: "1 km" },
      { name: "Inorbit Mall", distance: "2 km" },
    ],
    lat: 17.4483,
    lng: 78.3915,
    postedOn: "2026-03-10",
  },
  {
    id: "p7",
    slug: "farm-land-shadnagar-hyderabad",
    title: "Farm Land Near Shadnagar",
    type: "farm-land",
    typeLabel: "Farm Land",
    price: 6500000,
    priceLabel: "₹65 Lakh",
    location: "Shadnagar",
    city: "Hyderabad Outskirts",
    state: "Telangana",
    areaSqft: 43560,
    bedrooms: null,
    bathrooms: null,
    bankLoanAvailable: false,
    featured: false,
    images: [img("photo-1500937386664-56d1dfef3854", 10)],
    description:
      "A serene 1-acre farm land near Shadnagar with borewell access and road frontage, ideal for a farmhouse or weekend retreat.",
    amenities: ["Borewell", "Road Frontage", "Fruit Orchard", "Fencing"],
    nearbyPlaces: [
      { name: "NH44", distance: "2 km" },
      { name: "Shadnagar Town", distance: "5 km" },
    ],
    lat: 17.0667,
    lng: 78.2,
    postedOn: "2026-02-18",
  },
  {
    id: "p8",
    slug: "open-plot-sarjapur-bangalore",
    title: "Open Residential Plot in Sarjapur Road",
    type: "open-plot",
    typeLabel: "Open Plot",
    price: 8900000,
    priceLabel: "₹89 Lakh",
    location: "Sarjapur Road",
    city: "Bangalore",
    state: "Karnataka",
    areaSqft: 2400,
    bedrooms: null,
    bathrooms: null,
    bankLoanAvailable: true,
    featured: true,
    images: [img("photo-1464082354059-27db6ce50048", 11)],
    description:
      "BMRDA approved open plot in the fast-growing Sarjapur Road corridor, close to major IT parks and international schools.",
    amenities: ["Gated Layout", "Underground Cabling", "Parks", "CC Roads"],
    nearbyPlaces: [
      { name: "Wipro Campus", distance: "4 km" },
      { name: "Sarjapur Junction", distance: "2 km" },
    ],
    lat: 12.9,
    lng: 77.6869,
    postedOn: "2026-01-25",
  },
];

export const propertyTypeOptions: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "farm-land", label: "Farm Lands" },
  { value: "hmda-plots", label: "HMDA Approved Plots" },
  { value: "dtcp-plots", label: "DTCP Approved Plots" },
  { value: "independent-house", label: "Independent Houses" },
  { value: "apartment", label: "Apartments" },
  { value: "villa", label: "Villas" },
  { value: "commercial", label: "Commercial Properties" },
  { value: "open-plot", label: "Open Plots" },
];

export function getPropertyBySlug(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export type AuctionProperty = {
  id: string;
  title: string;
  bank: string;
  location: string;
  city: string;
  state: string;
  reservePrice: number;
  reservePriceLabel: string;
  emdAmount: string;
  auctionDate: string;
  propertyType: string;
  areaSqft: number;
  image: string;
  description: string;
};

export const auctionProperties: AuctionProperty[] = [
  {
    id: "a1",
    title: "Bank Auction: 3BHK Flat in Miyapur",
    bank: "State Bank of India",
    location: "Miyapur",
    city: "Hyderabad",
    state: "Telangana",
    reservePrice: 6800000,
    reservePriceLabel: "₹68 Lakh",
    emdAmount: "₹6.8 Lakh",
    auctionDate: "2026-09-15",
    propertyType: "Apartment",
    areaSqft: 1450,
    image: img("photo-1512917774080-9991f1c4c750", 12),
    description: "SARFAESI auction of a 3BHK apartment in a well-developed residential complex in Miyapur.",
  },
  {
    id: "a2",
    title: "Bank Auction: Commercial Plot in Vijayawada",
    bank: "Punjab National Bank",
    location: "Benz Circle",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    reservePrice: 15000000,
    reservePriceLabel: "₹1.50 Crore",
    emdAmount: "₹15 Lakh",
    auctionDate: "2026-09-22",
    propertyType: "Commercial Plot",
    areaSqft: 3200,
    image: img("photo-1486406146926-c627a92ad1ab", 13),
    description: "E-auction of a prime commercial plot on Benz Circle main road with high visibility.",
  },
  {
    id: "a3",
    title: "Bank Auction: Independent House in Mysuru",
    bank: "Bank of Baroda",
    location: "Vijayanagar",
    city: "Mysuru",
    state: "Karnataka",
    reservePrice: 9200000,
    reservePriceLabel: "₹92 Lakh",
    emdAmount: "₹9.2 Lakh",
    auctionDate: "2026-10-05",
    propertyType: "Independent House",
    areaSqft: 2100,
    image: img("photo-1570129477492-45c003edd2be", 14),
    description: "Well-located independent house up for auction under SARFAESI Act in Mysuru's Vijayanagar locality.",
  },
];
