import type { DestinationDetail } from "../types";

export const destinationDetails: Record<string, DestinationDetail> = {
  "kuala-lumpur": {
    slug: "kuala-lumpur",
    city: "Kuala Lumpur",
    country: "Malaysia",
    countryFlag: "🇲🇾",
    tagline: "A vibrant blend of historic culture and towering modern architecture",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    ],
    longOverview: "Kuala Lumpur is Malaysia’s bustling capital city. Famous for its iconic Petronas Twin Towers, colorful street food scenes, and lush green parks, it’s a favorite getaway for travelers seeking a modern Asian escape.",
    whyVisit: [
      "See the iconic Petronas Twin Towers up close",
      "Shop in the world-class Bukit Bintang malls",
      "Explore the historic Batu Caves temples",
      "Enjoy diverse culinary offerings at Jalan Alor",
    ],
    attractions: [
      {
        name: "Petronas Twin Towers",
        description: "The world's tallest twin towers, offering panoramic views of the city skyline from the skybridge.",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
      },
      {
        name: "Batu Caves",
        description: "A limestone hill featuring a series of caves and Hindu temples, guarded by a giant golden statue.",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      },
      {
        name: "Bukit Bintang",
        description: "The city's premier shopping and entertainment district, filled with malls, cafés, and nightlife.",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      },
    ],
    bestTimeToVisit: "March to September",
    currency: "Malaysian Ringgit (MYR)",
    languages: "Malay, English",
  },

  dubai: {
    slug: "dubai",
    city: "Dubai",
    country: "UAE",
    countryFlag: "🇦🇪",
    tagline: "The city of gold, luxury, and record-breaking modern marvels",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    ],
    longOverview: "Dubai is a global hub of innovation, shopping, and entertainment. Known for the soaring Burj Khalifa, massive theme parks, and thrilling desert safaris, it offers an unforgettable luxury escape.",
    whyVisit: [
      "Climb the observation decks of Burj Khalifa",
      "Shop at the massive Dubai Mall",
      "Experience dune bashing on a desert safari",
      "Explore the man-made Palm Jumeirah islands",
    ],
    attractions: [
      {
        name: "Burj Khalifa",
        description: "The tallest structure in the world, featuring observation decks with stunning panoramic views.",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
      },
      {
        name: "Palm Jumeirah",
        description: "A magnificent man-made island shaped like a palm tree, featuring luxury beachfront resorts.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      },
      {
        name: "Desert Safari",
        description: "Experience dune bashing, camel riding, and traditional dining under the starry sky.",
        image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
      },
    ],
    bestTimeToVisit: "November to March",
    currency: "UAE Dirham (AED)",
    languages: "Arabic, English",
  },

  bangkok: {
    slug: "bangkok",
    city: "Bangkok",
    country: "Thailand",
    countryFlag: "🇹🇭",
    tagline: "A sensory explosion of historic temples, canal markets, and vibrant street life",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    ],
    longOverview: "Bangkok, the capital of Thailand, combines ornate shrines with vibrant street life. The city features a network of busy canals alongside historic temples like Wat Arun and the Grand Palace.",
    whyVisit: [
      "Tour the stunning Grand Palace",
      "Taste world-class street food in Chinatown",
      "Ride long-tail boats through floating markets",
      "Enjoy duty-free shopping at Siam Paragon",
    ],
    attractions: [
      {
        name: "The Grand Palace",
        description: "A spectacular complex of royal buildings and temples, including the sacred Wat Phra Kaew.",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
      },
      {
        name: "Wat Arun",
        description: "The famous 'Temple of Dawn' situated beautifully on the banks of the Chao Phraya River.",
        image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80",
      },
      {
        name: "Chatuchak Market",
        description: "One of the largest outdoor markets in the world, featuring over 15,000 stalls.",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      },
    ],
    bestTimeToVisit: "November to February",
    currency: "Thai Baht (THB)",
    languages: "Thai, English",
  },

  male: {
    slug: "male",
    city: "Male",
    country: "Maldives",
    countryFlag: "🇲🇻",
    tagline: "An island paradise of overwater villas, crystal-clear lagoons, and colorful reefs",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    ],
    longOverview: "Male is the gateway to the Maldives' hundreds of pristine private resort islands. Famous for overwater bungalows, crystal-clear lagoons, and colorful coral reefs, it's the ultimate beach lover's getaway.",
    whyVisit: [
      "Stay in premium overwater bungalows",
      "Snorkel with sea turtles in vibrant house reefs",
      "Enjoy private candle-lit dinners on sandy beaches",
      "Indulge in luxury water sports and cruises",
    ],
    attractions: [
      {
        name: "Private Resort Islands",
        description: "Luxury bungalows and villas sitting directly over crystal-clear lagoons.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      },
      {
        name: "Banana Reef",
        description: "One of the oldest dive sites in the Maldives, known for its rich marine life and corals.",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      },
      {
        name: "Local Markets",
        description: "Get a taste of traditional Maldivian life by visiting fresh fish and coconut markets in Male.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      },
    ],
    bestTimeToVisit: "December to April",
    currency: "Maldivian Rufiyaa (MVR)",
    languages: "Dhivehi, English",
  },

  maldives: {
    slug: "maldives",
    city: "Male",
    country: "Maldives",
    countryFlag: "🇲🇻",
    tagline: "An island paradise of overwater villas, crystal-clear lagoons, and colorful reefs",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    ],
    longOverview: "Male is the gateway to the Maldives' hundreds of pristine private resort islands. Famous for overwater bungalows, crystal-clear lagoons, and colorful coral reefs, it's the ultimate beach lover's getaway.",
    whyVisit: [
      "Stay in premium overwater bungalows",
      "Snorkel with sea turtles in vibrant house reefs",
      "Enjoy private candle-lit dinners on sandy beaches",
      "Indulge in luxury water sports and cruises",
    ],
    attractions: [
      {
        name: "Private Resort Islands",
        description: "Luxury bungalows and villas sitting directly over crystal-clear lagoons.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      },
      {
        name: "Banana Reef",
        description: "One of the oldest dive sites in the Maldives, known for its rich marine life and corals.",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      },
      {
        name: "Local Markets",
        description: "Get a taste of traditional Maldivian life by visiting fresh fish and coconut markets in Male.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      },
    ],
    bestTimeToVisit: "December to April",
    currency: "Maldivian Rufiyaa (MVR)",
    languages: "Dhivehi, English",
  },

  kathmandu: {
    slug: "kathmandu",
    city: "Kathmandu",
    country: "Nepal",
    countryFlag: "🇳🇵",
    tagline: "The gateway to the Himalayas, rich in ancient history and spiritual heritage",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
      "https://images.unsplash.com/photo-1518733057094-95b532cb43b9?w=800&q=80",
    ],
    longOverview: "Kathmandu, Nepal's capital, is set in a valley surrounded by the Himalayan mountains. It features historical palaces, ancient temples, and lively markets like Thamel.",
    whyVisit: [
      "Explore royal palaces in Durbar Square",
      "Visit the sacred Swayambhunath (Monkey Temple)",
      "Circumambulate the massive Boudhanath Stupa",
      "Shop for souvenirs and gear in lively Thamel",
    ],
    attractions: [
      {
        name: "Durbar Square",
        description: "The historic heart of the city, featuring royal palaces, courtyards, and ancient temples.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
      },
      {
        name: "Swayambhunath",
        description: "An ancient religious complex atop a hill, offering views of the valley and playful monkeys.",
        image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
      },
      {
        name: "Boudhanath Stupa",
        description: "One of the largest spherical stupas in the world, a sacred Tibetan Buddhist pilgrimage site.",
        image: "https://images.unsplash.com/photo-1518733057094-95b532cb43b9?w=800&q=80",
      },
    ],
    bestTimeToVisit: "September to November",
    currency: "Nepalese Rupee (NPR)",
    languages: "Nepali, English",
  },

  dhaka: {
    slug: "dhaka",
    city: "Dhaka",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "The vibrant capital of Bangladesh, a city of rich history, festivals, and rickshaws",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
      "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
    ],
    longOverview: "Dhaka is the bustling, energetic capital of Bangladesh. Located along the Buriganga River, it is famous for its historical Mughal architecture, colorful festivals, and delicious culinary heritage.",
    whyVisit: [
      "See the historical Lalbagh Fort and pink Ahsan Manzil",
      "Ride a traditional rickshaw through the narrow streets of Old Dhaka",
      "Experience the architectural marvel of the Parliament Building",
      "Taste authentic Dhakaiya Biryani and street food",
    ],
    attractions: [
      {
        name: "Lalbagh Fort",
        description: "An incomplete 17th-century Mughal fort complex with beautiful gardens and a tomb.",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
      },
      {
        name: "Ahsan Manzil",
        description: "The grand Pink Palace of the Nawabs of Dhaka, located along the Buriganga River.",
        image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
      },
      {
        name: "National Parliament Building",
        description: "A modernist architectural masterpiece designed by world-renowned architect Louis Kahn.",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      },
    ],
    bestTimeToVisit: "October to March",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  sreemangal: {
    slug: "sreemangal",
    city: "Sreemangal",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "The tea capital of Bangladesh, a green paradise of rolling hills and rainforests",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    ],
    longOverview: "Sreemangal is known as the tea capital of Bangladesh. It is surrounded by endless green tea gardens, rubber plantations, and the beautiful Lawachara National Park.",
    whyVisit: [
      "Walk through endless green carpets of tea gardens",
      "Spot rare gibbons and wildlife in Lawachara Rainforest",
      "Taste the famous multi-layered colored tea",
      "Stay in eco-resorts hidden in nature",
    ],
    attractions: [
      {
        name: "Tea Garden Trails",
        description: "Walk through endless carpets of tea plants covering rolling hills.",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      },
      {
        name: "Lawachara National Park",
        description: "A lush semi-evergreen forest sanctuary home to rare gibbons, birds, and orchids.",
        image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
      },
      {
        name: "Nilkantha Tea Cabin",
        description: "Taste the famous multi-layered colored tea, a unique local specialty.",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
      },
    ],
    bestTimeToVisit: "September to February",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  gazipur: {
    slug: "gazipur",
    city: "Gazipur",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "A tranquil forest getaway featuring premium luxury resorts and safari parks",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    ],
    longOverview: "Gazipur, situated just outside Dhaka, is a popular escape for urban dwellers. It is home to dense Sal forests, luxury eco-resorts, and the Bangabandhu Safari Park.",
    whyVisit: [
      "Stay in eco-resorts offering organic food and luxury pools",
      "Take a safari ride through Bangabandhu Safari Park",
      "Walk the shaded forest trails of Bhawal National Park",
      "Escape the city noise without a long journey",
    ],
    attractions: [
      {
        name: "Bangabandhu Safari Park",
        description: "The largest safari park in Bangladesh, featuring wild animals in natural enclosures.",
        image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
      },
      {
        name: "Premium Eco Resorts",
        description: "A variety of resorts offering organic food, swimming pools, and peaceful natural settings.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      },
      {
        name: "Bhawal National Park",
        description: "A massive Sal forest reserve ideal for picnics, cycling, and walking trails.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      },
    ],
    bestTimeToVisit: "November to February",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  "coxs-bazar": {
    slug: "coxs-bazar",
    city: "Cox's Bazar",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "The world's longest natural sandy beach, a haven of seafood and surfing",
    image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    ],
    longOverview: "Cox's Bazar is Bangladesh's top beach destination, boasting a 120km unbroken sandy beach. It is a hub of fresh seafood, beach sports, and scenic drives along the Marine Drive.",
    whyVisit: [
      "Walk the world's longest unbroken natural sandy beach",
      "Drive down the scenic Marine Drive highway",
      "Indulge in fresh lobster, crab, and local seafood",
      "Take a day trip to the coral island of Saint Martin's",
    ],
    attractions: [
      {
        name: "Inani Beach",
        description: "A clean, quiet coral beach famous for its golden sands and sunset views.",
        image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
      },
      {
        name: "Himchari National Park",
        description: "Offers scenic views of the hills meeting the sea, along with a quiet waterfall.",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      },
      {
        name: "Maheshkhali Island",
        description: "A peaceful island accessible by speedboat, featuring ancient Adinath temple and salt fields.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      },
    ],
    bestTimeToVisit: "October to April",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  sylhet: {
    slug: "sylhet",
    city: "Sylhet",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "A land of waterfalls, green swamps, and holy shrines",
    image: "https://images.unsplash.com/photo-1627893528424-792f89b0f2d5?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1627893528424-792f89b0f2d5?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1587213811864-46e59f6873b7?w=800&q=80",
    ],
    longOverview: "Sylhet is a division in northeastern Bangladesh famous for its unique geography. It features scenic tea gardens, crystal-clear swamp forests like Ratargul, and holy Sufi shrines.",
    whyVisit: [
      "Boat through the submersed trees of Ratargul Swamp Forest",
      "Visit the scenic rock-gathering riverbanks of Jaflong",
      "Explore the holy Shrine of Sufi Saint Hazrat Shah Jalal",
      "Walk the historical tea estates of Malnicherra",
    ],
    attractions: [
      {
        name: "Ratargul Swamp Forest",
        description: "A unique freshwater swamp forest, explore by boating through submersed trees.",
        image: "https://images.unsplash.com/photo-1627893528424-792f89b0f2d5?w=800&q=80",
      },
      {
        name: "Jaflong",
        description: "A scenic riverbank at the foot of the Khasi hills, famous for stone gathering and tea gardens.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      },
      {
        name: "Shrine of Hazrat Shah Jalal",
        description: "A highly revered spiritual site that attracts millions of visitors annually.",
        image: "https://images.unsplash.com/photo-1587213811864-46e59f6873b7?w=800&q=80",
      },
    ],
    bestTimeToVisit: "October to April",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  bandarban: {
    slug: "bandarban",
    city: "Bandarban",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "Breathtaking green mountains, misty valleys, and rich tribal heritage",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    ],
    longOverview: "Bandarban is a hilly district in southeastern Bangladesh, part of the Chittagong Hill Tracts. It features the highest peaks, pristine waterfalls, and rich ethnic minority cultures.",
    whyVisit: [
      "Watch the sunrise above the clouds at Nilgiri",
      "Trek to the volcanic Boga Lake deep in the hills",
      "Visit the Golden Temple (Buddha Dhatu Jadi)",
      "Learn about the rich cultures of ethnic minority communities",
    ],
    attractions: [
      {
        name: "Nilgiri Peak",
        description: "A peak-top resort offering spectacular views of clouds rolling over green hills.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      },
      {
        name: "Boga Lake",
        description: "A pristine volcanic lake set deep in the mountains, wrapped in local tribal legends.",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
      },
      {
        name: "Buddha Dhatu Jadi",
        description: "A striking golden Buddhist temple featuring beautiful architectural styling.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      },
    ],
    bestTimeToVisit: "November to March",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, Tribal Languages",
  },

  rangamati: {
    slug: "rangamati",
    city: "Rangamati",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "Serene mountain town surrounded by the turquoise waters of Kaptai Lake",
    image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    ],
    longOverview: "Rangamati is a picturesque hill district in the Chittagong Hill Tracts. Famed for Kaptai Lake—the largest artificial lake in South Asia—it offers boat rides through scenic valleys, indigenous handicrafts, and cascading waterfalls.",
    whyVisit: [
      "Cruise the calm waters of Kaptai Lake by engine boat",
      "Walk across the iconic Rangamati Hanging Bridge",
      "Shop for authentic handmade Chakma fabrics and souvenirs",
      "Visit the cascading waterfalls of Shuvolong",
    ],
    attractions: [
      {
        name: "Kaptai Lake",
        description: "A vast turquoise lake dotted with lush green islands and hill ridges.",
        image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800&q=80",
      },
      {
        name: "Rangamati Hanging Bridge",
        description: "The iconic multi-colored suspension bridge crossing a scenic arm of the lake.",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      },
      {
        name: "Shuvolong Waterfalls",
        description: "Spectacular natural waterfalls dropping directly into the lake during monsoon and autumn.",
        image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
      },
    ],
    bestTimeToVisit: "October to March",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, Chakma, English",
  },

  khagrachari: {
    slug: "khagrachari",
    city: "Khagrachari",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "The gateway to Sajek Valley, mystical caves, and wild hill streams",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
      "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    ],
    longOverview: "Khagrachari is the heart of the northern Hill Tracts and the primary starting point for Sajek Valley. It features mysterious subterranean caves, panoramic hilltops, and cascading rivers.",
    whyVisit: [
      "Journey onward to the cloud kingdom of Sajek Valley",
      "Explore the dark, ancient tunnels of Alutila Mysterious Cave",
      "Enjoy 360-degree views of the valleys from Tareng Hill",
      "Cool off under the rushing cascades of Richhang Falls",
    ],
    attractions: [
      {
        name: "Alutila Mysterious Cave",
        description: "A 100-meter dark limestone cave you navigate carrying a traditional bamboo torch.",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
      },
      {
        name: "Tareng Hill Viewpoint",
        description: "A scenic ridge-top park offering dramatic views over surrounding hill ranges.",
        image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800&q=80",
      },
      {
        name: "Richhang Waterfall",
        description: "A natural rocky water slide and waterfall hidden in dense tropical greenery.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      },
    ],
    bestTimeToVisit: "September to March",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, Tripuri, Marma",
  },

  "saint-martin": {
    slug: "saint-martin",
    city: "Saint Martin",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "Bangladesh's only coral island, boasting crystalline blue waters and coconut groves",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
    ],
    longOverview: "Saint Martin's Island (Narikel Jinjira) is a tropical coral paradise in the northeastern Bay of Bengal. Known for azure waters, live coral reefs, fresh green coconuts, and starry night skies, it is an essential beach escape.",
    whyVisit: [
      "Wade across to the uninhabited coral island of Chera Dwip",
      "Taste fresh grilled lobster, pomfret, and king prawns by the sea",
      "Bicycle along peaceful sandy paths under coconut canopies",
      "Stargaze under some of the clearest night skies in the country",
    ],
    attractions: [
      {
        name: "Chera Dwip",
        description: "A pristine coral islet accessible during low tide, surrounded by turquoise water.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      },
      {
        name: "West Beach Coral Reefs",
        description: "A tranquil shoreline with natural rock pools, live corals, and sunset views.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      },
      {
        name: "Coconut Trails",
        description: "Miles of idyllic sandy trails bordered by leaning palms and fishermen hamlets.",
        image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
      },
    ],
    bestTimeToVisit: "November to February",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  kuakata: {
    slug: "kuakata",
    city: "Kuakata",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "The rare beach where you can watch both sunrise and sunset over the Bay of Bengal",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
    ],
    longOverview: "Kuakata, known as 'Sagor Kannya' (Daughter of the Sea), is located at the southern tip of Bangladesh. It is one of the few places on earth where both the rising and setting sun can be witnessed in unobstructed glory over the sea.",
    whyVisit: [
      "Watch the sunrise and sunset over the open sea from one vantage point",
      "Visit the ancient Buddhist Rakhine Temple and copper Buddha statues",
      "Explore the dense mangrove forest trails of Lebur Char",
      "Walk the vast 30-km wide sandy beachfront",
    ],
    attractions: [
      {
        name: "Kuakata Sunrise & Sunset Beach",
        description: "The sweeping shoreline renowned for dual horizon views at dawn and dusk.",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      },
      {
        name: "Lebur Char Mangroves",
        description: "An estuary point where sea meets river, lined with mangrove roots and crabs.",
        image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
      },
      {
        name: "Misripara Buddhist Temple",
        description: "A historic Rakhine temple featuring the second largest Buddha statue in South Asia.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      },
    ],
    bestTimeToVisit: "October to March",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, Rakhine, English",
  },

  sundarbans: {
    slug: "sundarbans",
    city: "Sundarbans",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "The world's largest mangrove forest and home of the legendary Royal Bengal Tiger",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    ],
    longOverview: "A UNESCO World Heritage Site, the Sundarbans is an immense deltaic mangrove forest spanning the coast of Bangladesh. Crossed by complex tidal waterways, mudflats, and small islands, it is home to spotted deer, saltwater crocodiles, and the Royal Bengal Tiger.",
    whyVisit: [
      "Embark on a multi-day liveaboard boat cruise through tidal canals",
      "Spot spotted deer, kingfishers, and wild boars in Kotka Wildlife Sanctuary",
      "Climb watchtowers at Hiron Point for panoramic forest views",
      "Experience the pristine solitude of the untouched Jamtola Sea Beach",
    ],
    attractions: [
      {
        name: "Kotka Wildlife Sanctuary",
        description: "The primary base for spotting spotted deer herds and observing tiger footprints.",
        image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
      },
      {
        name: "Karamjal Crocodile & Deer Breeding Center",
        description: "An accessible educational center with wooden boardwalks over the mangrove swamps.",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
      },
      {
        name: "Jamtola Beach",
        description: "A wild, secluded beach facing the open Bay, bordered by dense mangrove trees.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      },
    ],
    bestTimeToVisit: "November to February",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  rajshahi: {
    slug: "rajshahi",
    city: "Rajshahi",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "The clean Silk City on the banks of the Padma, famous for mangoes and ancient heritage",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    ],
    longOverview: "Rajshahi is situated on the northern bank of the mighty Padma River. Celebrated for its lush mango orchards, premier silk factories, and clean urban boulevards, it is also surrounded by centuries-old terracotta temples in Puthia.",
    whyVisit: [
      "Stroll the serene riverbanks of the Padma during golden sunset",
      "Explore the magnificent terracotta temple complex in Puthia",
      "Visit the historic Varendra Research Museum, the oldest in Bangladesh",
      "Taste world-famous Rajshahi mangoes in summer or purchase Rajshahi silk",
    ],
    attractions: [
      {
        name: "Puthia Temple Complex",
        description: "A royal palace and historic Hindu temples featuring ornate terracotta carvings.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      },
      {
        name: "Padma River Garden Promenade",
        description: "A wide riverside walkway offering pleasant breezes, boating, and street food.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      },
      {
        name: "Varendra Research Museum",
        description: "Bangladesh's premier archaeological museum with ancient Hindu and Buddhist sculptures.",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
      },
    ],
    bestTimeToVisit: "October to March (or May–July for mangoes)",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  bogura: {
    slug: "bogura",
    city: "Bogura",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "Ancient archaeological capital of Bengal, rich in historical mounds and sweet traditions",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
    ],
    longOverview: "Bogura is one of the oldest settlements in South Asia, home to Mahasthangarh dating back to the 3rd century BCE. Beyond its archaeological riches, Bogura is celebrated nationwide for its authentic sweet yogurt (Bogurar Doi).",
    whyVisit: [
      "Step back over 2,000 years at the Mahasthangarh ruins",
      "Taste the legendary clay-pot sweet curd (Bogurar Doi)",
      "Explore the mysterious Gokul Medh (Behula's honeymoon chamber)",
      "Visit the historic Kherua Mosque built in 1582",
    ],
    attractions: [
      {
        name: "Mahasthangarh Citadel Ruins",
        description: "Ancient ramparts and museum showcasing Mauryan, Gupta, and Pala dynasty relics.",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
      },
      {
        name: "Gokul Medh",
        description: "A monumental terraced stupa linked to the folk legend of Behula and Lakhindar.",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
      },
      {
        name: "Kherua Mosque",
        description: "A picturesque Sultanate-era three-domed brick mosque surrounded by palm trees.",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
      },
    ],
    bestTimeToVisit: "November to February",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  chattogram: {
    slug: "chattogram",
    city: "Chattogram",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "Commercial capital nestled between the Bay of Bengal, gentle hills, and ports",
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80",
      "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
    longOverview: "Chattogram (Chittagong) is the principal seaport and commercial heartbeat of Bangladesh. Surrounded by undulating hills, calm beaches like Patenga, and the Karnaphuli River, it is rich in colonial and maritime heritage.",
    whyVisit: [
      "Watch container ships roll by while eating street snacks at Patenga Sea Beach",
      "Ride boats and explore nature trails around picturesque Foy's Lake",
      "Pay respects at the solemn World War II Commonwealth Cemetery",
      "Taste authentic Mezbani Beef, Chattogram's famous feast delicacy",
    ],
    attractions: [
      {
        name: "Patenga Sea Beach",
        description: "A popular shoreline offering stunning sunsets, crab fry, and views of ship anchorages.",
        image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80",
      },
      {
        name: "Foy's Lake",
        description: "A scenic man-made lake nestled in green hills, featuring boating and an amusement park.",
        image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800&q=80",
      },
      {
        name: "Chittagong Commonwealth War Cemetery",
        description: "A beautifully maintained memorial for soldiers of the Burma Campaign.",
        image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
      },
    ],
    bestTimeToVisit: "October to March",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, Chittagonian, English",
  },

  barisal: {
    slug: "barisal",
    city: "Barisal",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "The Venice of Bengal, famous for vibrant floating markets and meandering rivers",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
      "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800&q=80",
    ],
    longOverview: "Barisal is the southern riverine capital of Bangladesh. Interwoven by rivers, canals, and waterways, it is famous for its lively floating guava markets in Bhimruli, giant passenger river steamers (rocket steamers), and abundant agriculture.",
    whyVisit: [
      "Glide through canals to witness the Bhimruli Floating Guava Market",
      "Take an iconic overnight Rocket Steamer trip on the mighty rivers",
      "Visit the historical lake-reservoir of Durga Sagar",
      "Explore Oxford Mission Church, one of Asia's finest architectural gems",
    ],
    attractions: [
      {
        name: "Bhimruli Floating Market",
        description: "Dozens of small wooden country boats trading fresh guavas on serene canal crossroads.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      },
      {
        name: "Durga Sagar Dighi",
        description: "A scenic 45-acre lake built in 1780 with an island sanctuary for migratory birds.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      },
      {
        name: "Oxford Mission Church",
        description: "A monumental 1903 red-brick church built in traditional Greek and Byzantine style.",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
      },
    ],
    bestTimeToVisit: "July to September (for floating markets) & Nov–Feb",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  jashore: {
    slug: "jashore",
    city: "Jashore",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "A historic southern crossroads famed for date-palm sweets and literary heritage",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    ],
    longOverview: "Jashore (Jessore) is the oldest municipality in Bangladesh. Renowned as the birthplace of legendary poet Michael Madhusudan Dutt along the Kopotakkho River, it is also famed for winter date-palm juice and aromatic jaggery (Khejur Gur).",
    whyVisit: [
      "Visit Sagardari, the picturesque riverside home of Michael Madhusudan Dutt",
      "Savor pure date-palm molasses and traditional winter pitha",
      "Visit the ancient Chanchra Shiva Temple and historic royal palaces",
      "Explore the lively flower village of Gadkhali, the flower capital of Bangladesh",
    ],
    attractions: [
      {
        name: "Gadkhali Flower Fields",
        description: "Thousands of acres of vibrant rose, gerbera, and marigold gardens.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      },
      {
        name: "Sagardari Poet Memorial",
        description: "The historical estate of Michael Madhusudan Dutt beside the Kopotakkho river.",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      },
      {
        name: "Chanchra Rajbari & Shiva Temple",
        description: "Ancient royal remains and terracotta temple dating back to 1696.",
        image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
      },
    ],
    bestTimeToVisit: "November to March",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  comilla: {
    slug: "comilla",
    city: "Comilla",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "Home of Mainamati Buddhist ruins, green ridges, and legendary sweet treats",
    image: "https://images.unsplash.com/photo-1483354483454-4cd359948304?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1483354483454-4cd359948304?w=800&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
    ],
    longOverview: "Comilla is rich in archaeological history, dating back to the 7th-century Deva and Chandra dynasties. With the Lalmai-Mainamati hills running along its western border and the famous authentic Matri Bhandar Rasmalai, it is an ideal cultural destination.",
    whyVisit: [
      "Explore the 8th-century Buddhist archaeological site at Shalban Vihara",
      "Taste the genuine Comilla Rasmalai from the historic Matri Bhandar",
      "Visit the Mainamati War Cemetery honoring World War II heroes",
      "Enjoy scenic walks along the Gomti River embankment",
    ],
    attractions: [
      {
        name: "Shalban Vihara & Mainamati Museum",
        description: "A monumental 115-cell Buddhist monastery with stupas and museum relics.",
        image: "https://images.unsplash.com/photo-1483354483454-4cd359948304?w=800&q=80",
      },
      {
        name: "Maynamati War Cemetery",
        description: "Serene memorial grounds nestled in tree-covered slopes with over 700 war graves.",
        image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
      },
      {
        name: "Dharmasagar Dighi",
        description: "A huge historic lake excavated in 1458, lined with parks and shaded walking tracks.",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
      },
    ],
    bestTimeToVisit: "October to March",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  mymensingh: {
    slug: "mymensingh",
    city: "Mymensingh",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "Cultural capital along the Old Brahmaputra, famed for folklore and grand estates",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    ],
    longOverview: "Mymensingh is known for the Maimansingha Gitika folk ballads, the Old Brahmaputra riverfront, and historic zamindar estates. It houses the renowned Shilpacharya Zainul Abedin Art Gallery and the expansive Bangladesh Agricultural University.",
    whyVisit: [
      "Admire original masterworks at Shilpacharya Zainul Abedin Art Gallery",
      "Stroll or boat along the scenic Old Brahmaputra riverbanks",
      "Visit the European-influenced architectural marvel of Alexander Castle",
      "Explore the sprawling gardens of the Agricultural University campus",
    ],
    attractions: [
      {
        name: "Zainul Abedin Art Gallery",
        description: "A riverside gallery exhibiting original sketches and paintings by Bangladesh's greatest artist.",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      },
      {
        name: "Alexander Castle",
        description: "A 1879 Gothic-style palace that hosted Rabindranath Tagore and Lord Curzon.",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      },
      {
        name: "Brahmaputra Riverfront Park",
        description: "A lush riverside promenade offering evening sunset views and fresh river fish dishes.",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      },
    ],
    bestTimeToVisit: "November to March",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  panchagarh: {
    slug: "panchagarh",
    city: "Panchagarh",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "Northernmost frontier with plainland tea gardens and snow-capped Kanchenjunga views",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      "https://images.unsplash.com/photo-1518733057094-95b532cb43b9?w=800&q=80",
    ],
    longOverview: "Panchagarh is the northernmost tip of Bangladesh, surrounded on three sides by India. In autumn and winter mornings, the snow-capped peak of Mount Kanchenjunga is visible across the horizon from Tetulia. It is also famous for organic plainland tea gardens and boulder-strewn rivers.",
    whyVisit: [
      "Witness Mount Kanchenjunga gleaming on the horizon on clear autumn mornings",
      "Tour the lush plainland tea estates unique to northern Bangladesh",
      "Visit the Zero Point border marker at Tetulia along the Mahananda River",
      "Explore ancient rock-collection rivers and peaceful border scenery",
    ],
    attractions: [
      {
        name: "Tetulia Dak Bungalow & Kanchenjunga Viewpoint",
        description: "The premier vantage point overlooking the Mahananda River with Himalayan peak views.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      },
      {
        name: "Plainland Tea Gardens",
        description: "Flat-terrain tea plantations stretching to the horizon like vibrant green carpets.",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      },
      {
        name: "Mirzapur Shahi Mosque",
        description: "An ornate 1656 Mughal architectural mosque boasting delicate terracotta artwork.",
        image: "https://images.unsplash.com/photo-1518733057094-95b532cb43b9?w=800&q=80",
      },
    ],
    bestTimeToVisit: "October to December (for mountain views) & Jan–Feb",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },

  naogaon: {
    slug: "naogaon",
    city: "Naogaon",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: "Home of Paharpur Buddhist Vihara, a UNESCO World Heritage treasure",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
    ],
    longOverview: "Naogaon is an extraordinary archaeological treasure in northern Bangladesh. It holds Somapura Mahavihara at Paharpur, the largest Buddhist monastery south of the Himalayas and a UNESCO World Heritage site, as well as the historic stone Kusumba Mosque.",
    whyVisit: [
      "Marvel at Somapura Mahavihara, the 8th-century UNESCO World Heritage monastery",
      "Visit the black-stone Kusumba Mosque (featured on the 5-Taka note)",
      "Explore the magnificent terracotta plaques and stupa architecture",
      "Walk the vast green grounds of Dubalhati and Balihar Zamindar Palaces",
    ],
    attractions: [
      {
        name: "Somapura Mahavihara (Paharpur)",
        description: "A monumental 27-acre UNESCO Buddhist monastery complex with a soaring central shrine.",
        image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&q=80",
      },
      {
        name: "Kusumba Mosque",
        description: "A stunning 1558 black basalt stone mosque known as the 'Black Gem of Bengal'.",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
      },
      {
        name: "Paharpur Site Museum",
        description: "Houses priceless stone sculptures, terracotta plaques, and copper coins from the Pala era.",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
      },
    ],
    bestTimeToVisit: "November to February",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  },
};

/**
 * Safe accessor that returns the destination details, or generates a complete
 * fallback detail view if the slug was not statically defined.
 */
export function getDestinationDetail(slug: string): DestinationDetail {
  if (destinationDetails[slug]) {
    return destinationDetails[slug];
  }

  // Generate dynamic fallback
  const formattedName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    slug,
    city: formattedName,
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    tagline: `Discover the unforgettable beauty, culture, and hospitality of ${formattedName}`,
    image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
    ],
    longOverview: `${formattedName} is a wonderful travel destination in Bangladesh. Packed with scenic spots, warm local hospitality, vibrant markets, and rich cultural traditions, it is an ideal destination for travelers of all styles.`,
    whyVisit: [
      `Explore historical landmarks and local sights across ${formattedName}`,
      "Enjoy delicious regional culinary specialties and street delicacies",
      "Capture stunning photos of local scenery and natural landscapes",
      "Book flights, hotels, and holiday packages with ease on ST-Trip",
    ],
    attractions: [
      {
        name: `${formattedName} Highlights Tour`,
        description: `Experience the best views, markets, and cultural heritage of ${formattedName}.`,
        image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
      },
      {
        name: "Scenic Riverfront & Promenades",
        description: "Serene walkways and water vistas perfect for evening strolls and photography.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      },
      {
        name: "Local Heritage & Markets",
        description: "Bustling bazaars offering local crafts, fresh produce, and unique regional souvenirs.",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      },
    ],
    bestTimeToVisit: "October to March",
    currency: "Bangladeshi Taka (BDT)",
    languages: "Bengali, English",
  };
}

