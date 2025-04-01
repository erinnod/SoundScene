export interface EventType {
  id: string;
  title: string;
  venueName: string;
  address: string;
  date: string;
  price: string;
  description: string;
  genreTags: string[];
  imageUrl?: string;
  latitude: number;
  longitude: number;
  ticketUrl?: string;
}

export const mockEvents: EventType[] = [
  {
    id: "1",
    title: "Sunset Music Festival",
    venueName: "Utilita Arena Birmingham",
    address: "King Edwards Rd, Birmingham B1 2AA",
    date: "2024-06-15T18:00:00Z",
    price: "£75",
    description:
      "Join us for an unforgettable evening of live music at the Sunset Music Festival, featuring top artists from around the world. Enjoy an electrifying atmosphere, delicious food, and great company under the stars.",
    genreTags: ["Festival", "Live Music", "Rock"],
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    latitude: 52.479,
    longitude: -1.915,
    ticketUrl: "https://ticketsite.com/sunset-festival",
  },
  {
    id: "2",
    title: "Jazz in the Gardens",
    venueName: "Birmingham Botanical Gardens",
    address: "Westbourne Rd, Birmingham B15 3TR",
    date: "2024-06-17T18:30:00Z",
    price: "£12",
    description:
      "Bring a blanket and enjoy smooth jazz under the stars. Family friendly event featuring local jazz legends in the beautiful Birmingham Botanical Gardens.",
    genreTags: ["Jazz", "Blues"],
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629",
    latitude: 52.471,
    longitude: -1.926,
  },
  {
    id: "3",
    title: "Electronic Dreams",
    venueName: "The Mill",
    address: "29 Lower Trinity St, Birmingham B9 4AG",
    date: "2024-06-18T22:00:00Z",
    price: "£22",
    description:
      "A night of electronic music featuring both established DJs and emerging talent. Immerse yourself in cutting-edge visuals and a state-of-the-art sound system.",
    genreTags: ["Electronic", "House", "Techno"],
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    latitude: 52.474,
    longitude: -1.882,
    ticketUrl: "https://ticketsite.com/electronic-dreams",
  },
  {
    id: "4",
    title: "Acoustic Sessions",
    venueName: "The Dark Horse",
    address: "145 Alcester Rd, Birmingham B13 8JP",
    date: "2024-06-19T19:00:00Z",
    price: "£8",
    description:
      "Intimate acoustic performances in our specially designed listening room with perfect acoustics. Featuring talented local musicians from the Birmingham area.",
    genreTags: ["Acoustic", "Folk", "Singer-Songwriter"],
    latitude: 52.45,
    longitude: -1.894,
    ticketUrl: "https://ticketsite.com/acoustic-sessions",
  },
  {
    id: "5",
    title: "Hip Hop Showcase",
    venueName: "O2 Institute Birmingham",
    address: "78 Digbeth, Birmingham B5 6DY",
    date: "2024-06-20T21:00:00Z",
    price: "£18",
    description:
      "Showcasing the best local hip hop talent with open mic opportunities and guest performances. A celebration of Birmingham's vibrant hip hop culture.",
    genreTags: ["Hip Hop", "Rap"],
    imageUrl: "https://images.unsplash.com/photo-1547412834-c2f8019b8318",
    latitude: 52.475,
    longitude: -1.886,
    ticketUrl: "https://ticketsite.com/hiphop-showcase",
  },
  {
    id: "6",
    title: "Classical Night",
    venueName: "Symphony Hall",
    address: "Broad St, Birmingham B1 2EA",
    date: "2024-06-21T19:30:00Z",
    price: "£35",
    description:
      "An evening of classical masterpieces performed by the City of Birmingham Symphony Orchestra in the world-renowned Symphony Hall.",
    genreTags: ["Classical", "Orchestra"],
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    latitude: 52.479,
    longitude: -1.91,
    ticketUrl: "https://ticketsite.com/classical-night",
  },
  {
    id: "7",
    title: "Rock Legends Tribute",
    venueName: "The Flapper",
    address: "Cambrian Wharf, Kingston Row, Birmingham B1 2NU",
    date: "2024-06-22T20:30:00Z",
    price: "£15",
    description:
      "The best tribute bands playing classics from legendary rock bands of the 70s and 80s. An unforgettable night of rock nostalgia.",
    genreTags: ["Rock", "Classic Rock"],
    imageUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b",
    latitude: 52.481,
    longitude: -1.904,
    ticketUrl: "https://ticketsite.com/rock-legends",
  },
];
