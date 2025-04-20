const data = {
  movies: [
    {
      id: 'movie_001',
      title: 'Starbound Odyssey',
      genre: 'Sci-Fi',
      rating: 4.5,
      duration: '2h 10m',
      language: 'English',
      showtimes: ['14:30', '17:45', '21:00'],
      cinema: 'GV VivoCity',
      franchise: 'GV',
      poster: 'https://via.placeholder.com/100x150?text=Starbound',
    },
    {
      id: 'movie_002',
      title: 'Love in Orchard',
      genre: 'Romance',
      rating: 4.2,
      duration: '1h 45m',
      language: 'Mandarin',
      showtimes: ['13:15', '18:00', '20:30'],
      cinema: 'Shaw Theatres Lido',
      franchise: 'Shaw Theatres',
      poster: 'https://via.placeholder.com/100x150?text=Orchard+Love',
    },
  ],

  attractions: [
    {
      id: 'attr_001',
      name: 'Gardens by the Bay',
      description:
        'A nature park spanning 101 hectares in central Singapore, adjacent to the Marina Reservoir. The park consists of three waterfront gardens: Bay South Garden, Bay East Garden and Bay Central Garden.',
      img_url: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
      details: {
        location: '18 Marina Gardens Dr, Singapore 018953',
        openingHours: '5:00 AM - 2:00 AM daily',
        admission: 'Free (Outdoor Gardens), SGD 28 (Conservatories)',
        cost: 'SGD 28 (for Conservatories)',
        highlights: [
          'Supertree Grove',
          'Flower Dome',
          'Cloud Forest',
          'OCBC Skyway',
          'Garden Rhapsody Light Show',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
        ],
      },
    },
    {
      id: 'attr_002',
      name: 'Sentosa Island',
      description:
        'A popular island resort in Singapore, visited by some twenty million people a year. Attractions include a 2 km long sheltered beach, Fort Siloso, two golf courses, and the Resorts World Sentosa.',
      img_url: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
      details: {
        location: 'Sentosa Island, Singapore',
        openingHours: '24 hours (varies by attraction)',
        admission: 'Free (island entry), Attractions vary',
        cost: 'Free (Island entry), Attractions vary',
        highlights: [
          'Universal Studios Singapore',
          'S.E.A. Aquarium',
          'Adventure Cove Waterpark',
          'Skyline Luge',
          'Palawan Beach',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
        ],
      },
    },
    {
      id: 'attr_003',
      name: 'Singapore Zoo',
      description:
        "One of the world's most renowned zoos, Singapore Zoo is famous for its open concept, which allows visitors to interact with the animals in naturalistic settings.",
      img_url: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
      details: {
        location: '80 Mandai Lake Rd, Singapore 729826',
        openingHours: '8:30 AM - 6:00 PM daily',
        admission: 'SGD 37 (Adult), SGD 25 (Child)',
        cost: 'SGD 37 (Adult), SGD 25 (Child)',
        highlights: [
          'Jungle Breakfast with Wildlife',
          'Rainforest Kidzworld',
          'Elephant Show',
          'Wild Africa Exhibit',
          'Fragile Forest',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
        ],
      },
    },
    {
      id: 'attr_004',
      name: 'Marina Bay Sands SkyPark',
      description:
        'An observation deck located atop the iconic Marina Bay Sands hotel, offering panoramic views of the Singapore skyline and beyond.',
      img_url: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
      details: {
        location: '10 Bayfront Ave, Singapore 018956',
        openingHours: '9:30 AM - 10:00 PM daily',
        admission: 'SGD 23 (Adult), SGD 17 (Child)',
        cost: 'SGD 23 (Adult), SGD 17 (Child)',
        highlights: [
          'Infinity Pool',
          'SkyPark Observation Deck',
          'Panoramic Views of Singapore',
          'Marina Bay Skyline',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
        ],
      },
    },
    {
      id: 'attr_005',
      name: 'Singapore Flyer',
      description:
        'One of the worlds largest observation wheels, offering breathtaking views of Singapores skyline, the Marina Bay area, and even parts of Malaysia and Indonesia.',
      img_url: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
      details: {
        location: '30 Raffles Ave, Singapore 039803',
        openingHours: '8:30 AM - 10:30 PM daily',
        admission: 'SGD 33 (Adult), SGD 21 (Child)',
        cost: 'SGD 33 (Adult), SGD 21 (Child)',
        highlights: [
          '360-degree Views',
          'Sunset and Night Rides',
          'Air-conditioned Capsules',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
        ],
      },
    },
  ],

  events: [
    {
      id: 'event_001',
      name: 'Singapore Grand Prix',
      description:
        'The Singapore Grand Prix is a Formula 1 night race that takes place in the heart of the city. It is renowned for its electrifying atmosphere and stunning views of the Marina Bay skyline.',
      img_url: 'https://images.unsplash.com/photo-1548207131-d0a42b22a61f',
      details: {
        location: 'Marina Bay Street Circuit, Singapore',
        openingHours: 'Various timings throughout the weekend',
        admission: 'From SGD 68 (General Admission)',
        cost: 'From SGD 68 (General Admission)',
        highlights: [
          'Formula 1 Races',
          'Live Music Performances',
          'Night Race under the Lights',
          'Celebrity Appearances',
          'Pit Stop Challenge',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1548207131-d0a42b22a61f',
          'https://images.unsplash.com/photo-1548207123-6d95b1c4b576',
          'https://images.unsplash.com/photo-1567474556-d35e6f5fa7b9',
        ],
      },
    },
    {
      id: 'event_002',
      name: 'Singapore International Film Festival (SGIFF)',
      description:
        'SGIFF is the most prestigious film festival in Southeast Asia, showcasing a mix of international films, documentaries, and shorts from various genres and cultures.',
      img_url: 'https://images.unsplash.com/photo-1496342060984-b6801d8efc59',
      details: {
        location: 'Various cinemas across Singapore',
        openingHours: 'Varies by film screening',
        admission: 'SGD 15 - SGD 35 (per screening)',
        cost: 'SGD 15 - SGD 35 (per screening)',
        highlights: [
          'International Film Screenings',
          'Industry Networking Events',
          'Filmmaker Talks',
          'Awards Ceremony',
          'Red Carpet Events',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1496342060984-b6801d8efc59',
          'https://images.unsplash.com/photo-1569981489-76d9a7b5f13a',
          'https://images.unsplash.com/photo-1552612979-2b04c5b1b3bc',
        ],
      },
    },
    {
      id: 'event_003',
      name: 'Singapore Food Festival',
      description:
        'The Singapore Food Festival celebrates the citys rich culinary heritage with a month-long event that features food tastings, cooking workshops, and food markets.',
      img_url: 'https://images.unsplash.com/photo-1569478989-b1b409b529d9',
      details: {
        location: 'Various locations across Singapore',
        openingHours: 'Varies by event, typically 10:00 AM - 10:00 PM',
        admission:
          'Free entry for certain events, tickets required for workshops and tastings',
        cost: 'SGD 10 - SGD 50 (depending on the event)',
        highlights: [
          'Street Food Markets',
          'Signature Dishes from Local Chefs',
          'Cooking Classes',
          'Food Tasting Experiences',
          'Culinary Demonstrations',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1569478989-b1b409b529d9',
          'https://images.unsplash.com/photo-1603300222987-b5a7b4b7c700',
          'https://images.unsplash.com/photo-1562933810-46752a567e3b',
        ],
      },
    },
    {
      id: 'event_004',
      name: 'Lantern Festival (Mid-Autumn Festival)',
      description:
        'The Mid-Autumn Festival, or Lantern Festival, is a vibrant cultural celebration featuring lantern displays, traditional music, and mooncake tastings. It celebrates the harvest moon and the importance of family.',
      img_url: 'https://images.unsplash.com/photo-1506516214575-2d08b8c8f2d3',
      details: {
        location: 'Chinatown, Singapore',
        openingHours: '6:00 PM - 10:00 PM daily',
        admission: 'Free',
        cost: 'Free',
        highlights: [
          'Lantern Displays',
          'Mooncake Tasting',
          'Chinese Traditional Music',
          'Cultural Performances',
          'Street Processions',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1506516214575-2d08b8c8f2d3',
          'https://images.unsplash.com/photo-1562924719-d5507e570a40',
          'https://images.unsplash.com/photo-1569162998-3eec914d607b',
        ],
      },
    },
    {
      id: 'event_005',
      name: 'Singapore International Jazz Festival (Sing Jazz)',
      description:
        'Sing Jazz is a premier jazz festival in Singapore, bringing together world-class jazz artists and offering performances in an open-air venue, with a mix of classic and contemporary jazz.',
      img_url: 'https://images.unsplash.com/photo-1504129055-b67954f6b6f5',
      details: {
        location: 'Esplanade - Theatres on the Bay, Singapore',
        openingHours: '7:00 PM - 11:00 PM (varies by day)',
        admission: 'SGD 55 - SGD 200 (depending on performance)',
        cost: 'SGD 55 - SGD 200 (depending on performance)',
        highlights: [
          'Live Jazz Performances',
          'International and Local Jazz Artists',
          'Outdoor Concerts',
          'Workshops and Masterclasses',
          'Food and Beverage Stalls',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1504129055-b67954f6b6f5',
          'https://images.unsplash.com/photo-1577794021022-81588e9b198f',
          'https://images.unsplash.com/photo-1552373839-4e8f1e19a469',
        ],
      },
    },
  ],

  dining: [
    {
      id: 'dining_001',
      name: 'Burnt Ends',
      cuisine: 'Modern Australian',
      rating: 4.7,
      price_range: '$$$',
      location: '7 Dempsey Road',
      opening_hours: '18:00 - 22:30',
      image: 'https://via.placeholder.com/150?text=Burnt+Ends',
    },
    {
      id: 'dining_002',
      name: 'Lau Pa Sat',
      cuisine: 'Hawker',
      rating: 4.3,
      price_range: '$',
      location: '18 Raffles Quay',
      opening_hours: '24 Hours',
      image: 'https://via.placeholder.com/150?text=Lau+Pa+Sat',
    },
  ],
}

export default data
