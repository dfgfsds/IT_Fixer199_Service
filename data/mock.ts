export interface Service {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  rating: number
  reviews: number
  image: string
  categoryId: string
  benefits: string[]
  duration: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  discount?: number
}

export interface Order {
  id: string
  date: string
  amount: number
  status: "ongoing" | "completed" | "cancelled"
  serviceId: string
  address: string
  slot: string
  paymentMethod: string
  technician: {
    name: string
    phone: string
    rating: number
  }
  timeline: {
    booked: string
    assigned?: string
    onTheWay?: string
    completed?: string
  }
}

export const categories: Category[] = [
  { id: "cleaning", name: "Cleaning", icon: "Sparkles", color: "bg-blue-100 text-blue-600" },
  { id: "plumbing", name: "Plumbing", icon: "Wrench", color: "bg-emerald-100 text-emerald-600" },
  { id: "electrical", name: "Electrical", icon: "Zap", color: "bg-amber-100 text-amber-600" },
  { id: "painting", name: "Painting", icon: "Paintbrush", color: "bg-pink-100 text-pink-600" },
  { id: "beauty", name: "Beauty", icon: "Scissors", color: "bg-rose-100 text-rose-600" },
  { id: "appliance", name: "Appliance Repair", icon: "Settings", color: "bg-indigo-100 text-indigo-600" },
  { id: "carpentry", name: "Carpentry", icon: "Hammer", color: "bg-orange-100 text-orange-600" },
  { id: "pest-control", name: "Pest Control", icon: "Bug", color: "bg-green-100 text-green-600" },
]

export const services: Service[] = [
  {
    id: "s1",
    name: "Deep Home Cleaning",
    description: "Professional deep cleaning of your entire home including kitchen, bathrooms, bedrooms, and living areas. Our trained experts use eco-friendly products and advanced equipment to ensure a thorough clean that removes allergens, bacteria, and stubborn stains.",
    shortDescription: "Complete home deep cleaning by verified professionals",
    price: 1499,
    rating: 4.8,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
    categoryId: "cleaning",
    benefits: ["Eco-friendly products", "Trained professionals", "3-hour service", "Satisfaction guaranteed"],
    duration: "3-4 hours",
  },
  {
    id: "s2",
    name: "Bathroom Cleaning",
    description: "Thorough bathroom cleaning including tiles, fixtures, mirrors, and floor. We tackle hard water stains, mildew, and soap scum with professional-grade cleaning solutions.",
    shortDescription: "Sparkling clean bathrooms with professional care",
    price: 499,
    rating: 4.7,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop",
    categoryId: "cleaning",
    benefits: ["Anti-bacterial treatment", "Hard water stain removal", "1-hour service", "Fresh fragrance"],
    duration: "1-2 hours",
  },
  {
    id: "s3",
    name: "Plumbing Repair",
    description: "Expert plumbing services for leaks, blockages, pipe repairs, and installations. Our certified plumbers come equipped with all necessary tools for quick fixes.",
    shortDescription: "Expert plumbing repair and installation services",
    price: 299,
    rating: 4.6,
    reviews: 1456,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop",
    categoryId: "plumbing",
    benefits: ["Certified plumbers", "90-day warranty", "Quick diagnosis", "Transparent pricing"],
    duration: "1-2 hours",
  },
  {
    id: "s4",
    name: "Electrical Wiring",
    description: "Professional electrical wiring, switch and socket installation, MCB panel work, and fan/light installation by licensed electricians.",
    shortDescription: "Licensed electricians for all wiring needs",
    price: 399,
    rating: 4.9,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
    categoryId: "electrical",
    benefits: ["Licensed electricians", "Safety certified", "1-year warranty", "Same-day service"],
    duration: "1-3 hours",
  },
  {
    id: "s5",
    name: "Interior Painting",
    description: "Transform your living space with our professional interior painting services. We use premium paints and ensure clean, streak-free finishes with full wall preparation.",
    shortDescription: "Premium interior painting with expert finish",
    price: 2499,
    rating: 4.7,
    reviews: 723,
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&h=400&fit=crop",
    categoryId: "painting",
    benefits: ["Premium paints", "Wall preparation included", "Clean finish", "Color consultation"],
    duration: "1-2 days",
  },
  {
    id: "s6",
    name: "Salon at Home",
    description: "Enjoy premium salon services in the comfort of your home. Professional stylists offer haircuts, styling, facials, manicure, pedicure, and more.",
    shortDescription: "Premium salon experience at your doorstep",
    price: 799,
    rating: 4.8,
    reviews: 3256,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    categoryId: "beauty",
    benefits: ["Certified stylists", "Premium products", "Hygiene kits", "Flexible timing"],
    duration: "1-2 hours",
  },
  {
    id: "s7",
    name: "AC Service & Repair",
    description: "Complete AC servicing including gas refill, filter cleaning, deep cleaning of indoor and outdoor units. Expert technicians for all AC brands.",
    shortDescription: "Complete AC service for all brands",
    price: 599,
    rating: 4.5,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1631545806609-49a4f9f025c8?w=600&h=400&fit=crop",
    categoryId: "appliance",
    benefits: ["All brands covered", "Gas refill available", "30-day warranty", "Genuine parts"],
    duration: "1-2 hours",
  },
  {
    id: "s8",
    name: "Pest Control Treatment",
    description: "Comprehensive pest control for cockroaches, ants, bed bugs, termites, and rodents. Safe, odorless chemicals with long-lasting protection.",
    shortDescription: "Safe and effective pest control solutions",
    price: 899,
    rating: 4.6,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1632935190508-1f1c39e6a6bc?w=600&h=400&fit=crop",
    categoryId: "pest-control",
    benefits: ["Safe chemicals", "Long-lasting effect", "All pests covered", "60-day warranty"],
    duration: "2-3 hours",
  },
]

export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Cleaning Kit",
    description: "All-in-one cleaning kit with eco-friendly solutions, microfiber cloths, scrub brushes, and spray bottles. Everything you need for a sparkling home.",
    price: 699,
    originalPrice: 999,
    rating: 4.5,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=400&fit=crop",
    discount: 30,
  },
  {
    id: "p2",
    name: "Tool Kit Professional",
    description: "Professional-grade 120-piece tool kit including wrench set, screwdrivers, pliers, hammer, tape measure, and more in a durable carrying case.",
    price: 1299,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41f0a53?w=600&h=400&fit=crop",
    discount: 28,
  },
  {
    id: "p3",
    name: "Smart Air Purifier",
    description: "HEPA air purifier with smart WiFi controls, air quality monitoring, and whisper-quiet operation. Covers up to 500 sq ft.",
    price: 4999,
    originalPrice: 6999,
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop",
    discount: 29,
  },
  {
    id: "p4",
    name: "Organic Essential Oils Set",
    description: "Set of 12 pure essential oils including lavender, tea tree, eucalyptus, peppermint, and more. Perfect for aromatherapy and home fragrance.",
    price: 899,
    rating: 4.6,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop",
  },
  {
    id: "p5",
    name: "Steam Mop Pro",
    description: "High-powered steam mop that sanitizes floors without chemicals. Adjustable steam settings, swivel head, and multiple pad attachments.",
    price: 3499,
    originalPrice: 4499,
    rating: 4.4,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&h=400&fit=crop",
    discount: 22,
  },
  {
    id: "p6",
    name: "Paint Sprayer Kit",
    description: "Electric paint sprayer with adjustable nozzle, multiple spray patterns, and easy-clean design. Perfect for DIY painting projects.",
    price: 2199,
    originalPrice: 2999,
    rating: 4.3,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop",
    discount: 27,
  },
]

export const orders: Order[] = [
  {
    id: "ORD-7821",
    date: "2026-03-03",
    amount: 1499,
    status: "ongoing",
    serviceId: "s1",
    address: "42 Marine Drive, South Mumbai, 400002",
    slot: "Today, 2:00 PM - 5:00 PM",
    paymentMethod: "UPI",
    technician: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      rating: 4.9,
    },
    timeline: {
      booked: "2026-03-03 09:30 AM",
      assigned: "2026-03-03 10:15 AM",
      onTheWay: "2026-03-03 01:30 PM",
    },
  },
  {
    id: "ORD-7654",
    date: "2026-02-28",
    amount: 799,
    status: "completed",
    serviceId: "s6",
    address: "15 Bandra West, Mumbai, 400050",
    slot: "Feb 28, 10:00 AM - 12:00 PM",
    paymentMethod: "Card",
    technician: {
      name: "Priya Sharma",
      phone: "+91 98765 43211",
      rating: 4.8,
    },
    timeline: {
      booked: "2026-02-27 06:00 PM",
      assigned: "2026-02-27 06:30 PM",
      onTheWay: "2026-02-28 09:30 AM",
      completed: "2026-02-28 11:45 AM",
    },
  },
  {
    id: "ORD-7432",
    date: "2026-02-25",
    amount: 599,
    status: "cancelled",
    serviceId: "s7",
    address: "8 Juhu Beach Road, Mumbai, 400049",
    slot: "Feb 25, 3:00 PM - 5:00 PM",
    paymentMethod: "Wallet",
    technician: {
      name: "Amit Patel",
      phone: "+91 98765 43212",
      rating: 4.7,
    },
    timeline: {
      booked: "2026-02-24 08:00 PM",
    },
  },
]

export const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
]

export const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
]

export const savedAddresses = [
  { id: "a1", label: "Home", address: "42 Marine Drive, South Mumbai, 400002" },
  { id: "a2", label: "Office", address: "WeWork, Lower Parel, Mumbai, 400013" },
]
