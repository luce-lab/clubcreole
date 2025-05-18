
export interface NightEvent {
  id: number;
  name: string;
  type: string;
  venue: string;
  image: string;
  description: string;
  date: string;
  time: string;
  price: number;
  offer: string;
  rating: number;
  features: string[];
}

// Mock data for nightlife events
export const nightEvents: NightEvent[] = [
  {
    id: 1,
    name: "Soirée Zouk & Kompa",
    type: "Club",
    venue: "Le Piment Rouge, Fort-de-France",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Une soirée endiablée au son du zouk et du kompa avec les meilleurs DJ de l'île. Ambiance garantie jusqu'au petit matin dans le club le plus branché de Fort-de-France.",
    date: "Tous les vendredis",
    time: "23:00 - 05:00",
    price: 20,
    offer: "Entrée gratuite avant minuit pour les membres du Club Créole",
    rating: 4.8,
    features: ["DJ Live", "Piste de danse", "Cocktails spéciaux", "Aire VIP"]
  },
  {
    id: 2,
    name: "Beach Party Sunset",
    type: "Plage",
    venue: "Plage de Grande Anse, Guadeloupe",
    image: "https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Dansez pieds nus sur le sable au coucher du soleil. Cocktails tropicaux, musique house et ambiance décontractée face à l'océan. L'événement incontournable de l'été en Guadeloupe.",
    date: "Samedis et dimanches",
    time: "17:00 - 01:00",
    price: 15,
    offer: "Un cocktail offert sur présentation de la carte Club Créole",
    rating: 4.9,
    features: ["Coucher de soleil", "Bar sur la plage", "Feux d'artifice", "Animations"]
  },
  {
    id: 3,
    name: "Casino Royal Night",
    type: "Casino",
    venue: "Casino des Trois-Îlets, Martinique",
    image: "https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Une soirée glamour au casino avec jeux de table, machines à sous et spectacle de cabaret. Tenue élégante exigée pour cette expérience luxueuse dans l'un des plus beaux casinos des Antilles.",
    date: "Tous les samedis",
    time: "20:00 - 04:00",
    price: 30,
    offer: "Jetons de jeu d'une valeur de 20€ offerts aux membres du Club Créole",
    rating: 4.7,
    features: ["Tables de jeux", "Spectacle cabaret", "Dîner gastronomique", "Service voiturier"]
  },
  {
    id: 4,
    name: "Soirée Karaoké Antillais",
    type: "Bar",
    venue: "Le Ti' Punch, Pointe-à-Pitre",
    image: "https://images.unsplash.com/photo-1574007557239-acf6863bc375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Ambiance conviviale et décontractée pour cette soirée karaoké où vous pourrez chanter les plus grands tubes antillais et internationaux. Cocktails et spécialités locales à déguster entre amis.",
    date: "Mercredis et jeudis",
    time: "20:00 - 01:00",
    price: 10,
    offer: "2 cocktails pour le prix d'un sur présentation de la carte Club Créole",
    rating: 4.5,
    features: ["Plus de 5000 chansons", "Animateur professionnel", "Petite restauration", "Terrasse"]
  }
];
