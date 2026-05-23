export interface Event {
  id: string;
  title: string;
  club: string;
  price: number;
  category: 'INFORMAL' | 'MANAGEMENT' | 'TECHNICAL' | 'CULTURAL' | 'CREATIVE' | 'SPORTS';
  description: string;
  longDescription: string;
  date: string;
  time: string;
  teamSize: number;
  venue: string;
  prize: string;
  image: string;
}

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  colors: string[];
}

export interface FAQItem {
  id: string;
  index: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'CHIEF PATRON' | 'PATRONS' | 'CO-PATRONS';
  image: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
  tag: string;
}

export const mockEvents: Event[] = [
  {
    id: 'utsav-arcade',
    title: 'UTSAV ARCADE',
    club: 'VITMAS X AYUDA',
    price: 236,
    category: 'INFORMAL',
    description: 'Games, giggles and good times',
    longDescription: 'This event blends high-energy game challenges with classic mela fun, creating a lively play zone for Riviera 2026. From Fast Finger, RC Car Racing, Storio Football, Match the bottle, to nostalgic fair games like Hoop the target, Break the Pyramid, Dart the target, Face Painting and more, there\'s something for everyone. Participants can choose their own challenges and jump straight into action, testing coordination, speed, strategy, and teamwork. With modern games bringing the thrill and traditional mela games adding charm, the space becomes perfect for friendly competition, laughter, and making memories with friends—right at the heart of our campus.',
    date: '28 Feb',
    time: '09:00 AM - 02:00 PM',
    teamSize: 1,
    venue: 'SJT Foodys 1',
    prize: 'TBA',
    image: '/images/utsav_arcade.png'
  },
  {
    id: 'potpourri',
    title: 'POTPOURRI',
    club: 'ENGLISH LITERARY ASSOCIATION (ELA)',
    price: 170,
    category: 'INFORMAL',
    description: 'A two round, team event featuring Dumb Charades and Pictionary.',
    longDescription: 'Get ready for the ultimate literary clash! Potpourri brings you a combination of wordplay, trivia, and theatrical expression. Form your teams and show off your speed in decoding clues, acting out book titles without speaking, and guessing literary icons in record time. A two-round, team event featuring Dumb Charades and Pictionary, where participants act, draw, and guess their way to victory through teamwork and creativity.',
    date: '28 Feb',
    time: '10:00 AM - 12:00 PM',
    teamSize: 2,
    venue: 'SJT 401',
    prize: '₹ 10,000',
    image: '/images/potpourri.png'
  },
  {
    id: 'cashino-3',
    title: 'CASHINO 3.0',
    club: 'DREAM MERCHANTS',
    price: 200,
    category: 'MANAGEMENT',
    description: 'Test your marketing, bid, and business skills in this mock casino.',
    longDescription: 'Cashino 3.0 tests your survival instincts in a simulated financial market. Use virtual currency to bid on corporate assets, negotiate trades under high stress, and outsmart rival syndicates. May the best strategist walk away with the jackpot!',
    date: '27 Feb',
    time: '11:00 AM - 04:00 PM',
    teamSize: 3,
    venue: 'Netaji Auditorium',
    prize: '₹ 25,000',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'robowars',
    title: 'ROBOWARS',
    club: 'ROBOTICS CLUB VIT',
    price: 500,
    category: 'TECHNICAL',
    description: 'Heavyweight metal-crushing combat robots battle in an enclosed arena.',
    longDescription: 'Witness sparks fly and metal bend in the arena of destruction! RoboWars brings together engineering marvels from all across India. Watch custom-built robots clash in a battle of power, speed, and endurance. Standard safety regulations apply.',
    date: '26-28 Feb',
    time: '10:00 AM - 06:00 PM',
    teamSize: 4,
    venue: 'SJT Ground',
    prize: '₹ 1,50,000',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'graffiti-art',
    title: 'GRAFFITI ART',
    club: 'FINE ARTS CLUB',
    price: 150,
    category: 'CREATIVE',
    description: 'Express your retro punk thoughts on public street canvasses.',
    longDescription: 'Grab your spray cans and transform plain white panels into retro-brutalist masterpieces. Recreate the rebel spirit of rock and punk with vibrant neon colors and bold outlines. Spray paint, masks, and workspace will be provided.',
    date: '26 Feb',
    time: '02:00 PM - 05:00 PM',
    teamSize: 1,
    venue: 'Hex Shield Area',
    prize: '₹ 8,000',
    image: 'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'clash-of-bands',
    title: 'CLASH OF BANDS',
    club: 'MUSIC CLUB',
    price: 400,
    category: 'CULTURAL',
    description: 'Rock, metal, and indie bands compete for the title of Best Band.',
    longDescription: 'Amps turned up to eleven, heavy drum beats, and electrifying vocal ranges. Clash of Bands invites college bands from all genres to rock the stage. Bring your original compositions or custom covers and make the crowd go wild.',
    date: '27 Feb',
    time: '05:00 PM - 10:00 PM',
    teamSize: 6,
    venue: 'Outdoor Plaza Stage',
    prize: '₹ 50,000',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80'
  }
];

export const mockMerch: MerchItem[] = [
  {
    id: 'hoodie',
    name: 'RIVIERA HOODIE',
    price: 549,
    image: '/images/hoodie.png',
    description: 'Premium dark forest green streetwear hoodie, with a retro-brutalist graphic print on the back showing a sketch of a guitar and text RIVIERA and Rise Rush Revel.',
    colors: ['#14532D', '#000000', '#FF188C', '#0D21DD']
  },
  {
    id: 'varsity',
    name: 'VARSITY JACKET',
    price: 779,
    image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=600&auto=format&fit=crop&q=80',
    description: 'Brutalist retro varsity jacket with patched letters, leather sleeves, and premium inner lining.',
    colors: ['#0D21DD', '#000000', '#FF9A00']
  },
  {
    id: 'tshirt',
    name: 'RIVIERA T-SHIRT',
    price: 299,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    description: '100% cotton heavy-knit vintage style tee with the Riviera official cursive brandmark.',
    colors: ['#FFFFFF', '#000000', '#FF188C']
  },
  {
    id: 'cap',
    name: 'RIVIERA RETRO CAP',
    price: 339,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80',
    description: 'Adjustable brutalist buckle cap featuring neon details and distressed visor lines.',
    colors: ['#000000', '#FF9A00', '#F5F1E5']
  }
];

export const mockFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    index: '#01',
    question: 'Are there accommodation facilities available for outstation participants?',
    answer: 'Yes, accommodation is provided in hostels at the VIT Vellore campus for the entire duration of the festival. You can book hostel rooms directly through the registration portal during checkout.'
  },
  {
    id: 'faq-2',
    index: '#02',
    question: 'Is transportation provided to and from the venue, or should attendees arrange their own transportation?',
    answer: 'Participants must arrange their own transport to Vellore. However, local campus shuttles will be operating 24/7 to transport registered candidates between host venues, food courts, and hostel zones.'
  },
  {
    id: 'faq-3',
    index: '#03',
    question: 'What is required for identity verification at the event?',
    answer: 'All attendees must bring their official College ID card alongside the registration QR code sent to their registered email. Government-issued IDs are required for non-student attendees.'
  },
  {
    id: 'faq-4',
    index: '#04',
    question: 'How many teams can a college send for the events?',
    answer: 'Each college is permitted to send only one team per event.'
  },
  {
    id: 'faq-5',
    index: '#05',
    question: 'Is there a provision for on-spot registrations for events?',
    answer: 'On-spot registrations are highly limited and depend entirely on the remaining slots of each category. We strongly recommend booking online via the events portal beforehand.'
  },
  {
    id: 'faq-6',
    index: '#06',
    question: 'Who is eligible to participate in the events?',
    answer: 'Any student currently enrolled in an undergraduate or postgraduate program in a recognized university or college is eligible to participate. School children are not allowed.'
  },
  {
    id: 'faq-7',
    index: '#07',
    question: 'How does the rolling trophy and ranking system work?',
    answer: 'Colleges accumulate points based on their placement in individual cultural and sports categories. The college with the highest aggregate points wins the prestigious Riviera Rolling Trophy.'
  }
];

export const mockTeam: TeamMember[] = [
  {
    id: 'patron-1',
    name: 'Dr. G. Viswanathan',
    role: 'Chancellor',
    category: 'CHIEF PATRON',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' // Replace with realistic placeholders, we'll style these beautifully
  },
  {
    id: 'patron-2',
    name: 'Dr. Sankar Viswanathan',
    role: 'Vice President',
    category: 'PATRONS',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'patron-3',
    name: 'Dr. Sekar Viswanathan',
    role: 'Vice President',
    category: 'PATRONS',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'patron-4',
    name: 'Dr. G V Selvam',
    role: 'Vice President',
    category: 'PATRONS',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'co-patron-1',
    name: 'Prof. Kadambari S.',
    role: 'Assistant Vice President',
    category: 'CO-PATRONS',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'co-patron-2',
    name: 'Dr. Rambabu Kodali',
    role: 'Vice Chancellor',
    category: 'CO-PATRONS',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'co-patron-3',
    name: 'Dr. Partha Sharathi Mallick',
    role: 'Pro-Vice Chancellor',
    category: 'CO-PATRONS',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&auto=format&fit=crop&q=80'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'announce-1',
    title: 'RITVIZ PERFORMING LIVE AT PROSHOW',
    date: '28 Feb',
    content: 'Get ready to dance to the tunes of Udd Gaye and Sage as Ritviz takes over the main stage on Day 3 of Riviera!',
    tag: 'PROSHOW',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'announce-2',
    title: 'SUNIDHI CHAUHAN TO ROCK DAY 1',
    date: '26 Feb',
    content: 'The melody queen is arriving! Register now to secure your spot for the opening night proshow performance.',
    tag: 'PROSHOW',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'announce-3',
    title: 'RIVIERA SPORTS CHAMPIONSHIP REGISTRATIONS OPEN',
    date: '20 Feb',
    content: 'Unleash your inner champion. Registrations for Athletics, Football, Cricket, Badminton and Basketball are officially live.',
    tag: 'SPORTS',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80'
  }
];
