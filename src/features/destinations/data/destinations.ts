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
};
