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
  events: [
    {
      id: 'event_001',
      name: 'Singapore Jazz Festival',
      category: 'Music',
      date: '2025-04-15',
      time: '19:00',
      location: 'Marina Bay Sands',
      price: 68,
      description:
        'An evening of world-class jazz performances by local and international artists.',
      image: 'https://via.placeholder.com/150?text=Jazz+Fest',
    },
    {
      id: 'event_002',
      name: 'TechNext Conference',
      category: 'Technology',
      date: '2025-05-02',
      time: '09:00',
      location: 'Suntec City Convention Centre',
      price: 120,
      description:
        'A 1-day conference with speakers from Google, AWS, and Meta discussing the future of tech.',
      image: 'https://via.placeholder.com/150?text=Tech+Next',
    },
  ],
  /* "attractions": [     {
            "id": "attraction_001",
            "name": "Gardens by the Bay",
            "type": "Nature Park",
            "entry_fee": 28,
            "location": "18 Marina Gardens Dr",
            "opening_hours": "09:00 - 21:00",
            "rating": 4.8,
            "image": "https://via.placeholder.com/150?text=Gardens+Bay"
        },
        {
            "id": "attraction_002",
            "name": "Universal Studios Singapore",
            "type": "Theme Park",
            "entry_fee": 79,
            "location": "Sentosa Island",
            "opening_hours": "10:00 - 19:00",
            "rating": 4.6,
            "image": "https://via.placeholder.com/150?text=USS"
        }
    ],*/

  // sample.tsx

  attractions: [
    {
      id: 'attraction_001',
      name: 'Gardens by the Bay',
      type: 'Nature Park',
      description:
        'A nature park spanning 101 hectares in central Singapore, adjacent to the Marina Reservoir.',
      img_url: 'https://images.unsplash.com/photo-1587135991058-8816a5a6e0a0',
    },
    {
      id: 'attraction_002',
      name: 'Universal Studios Singapore',
      type: 'Theme Park',
      description:
        "Southeast Asia's first and only Universal Studios theme park, featuring 24 rides and attractions.",
      img_url: 'https://images.unsplash.com/photo-1596386461350-326ccb383e9f',
    },
    {
      id: 'attraction_003',
      name: 'Marina Bay Sands',
      type: 'Hotel & Casino',
      description:
        'An iconic integrated resort fronting Marina Bay, known for its infinity pool and skyline views.',
      img_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    },
    {
      id: 'attraction_004',
      name: 'Sentosa Island',
      type: 'Island Resort',
      description:
        'A popular island resort with beaches, attractions, golf courses, and luxury hotels.',
      img_url: 'https://images.unsplash.com/photo-1560964645-5296b5099677',
    },
    {
      id: 'attraction_005',
      name: 'Singapore Zoo',
      type: 'Zoo',
      description:
        'A world-renowned wildlife park with open enclosures and naturalistic habitats.',
      img_url: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6',
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
