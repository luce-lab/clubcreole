
import { Music } from "lucide-react";

export interface Concert {
  id: number;
  name: string;
  artist: string;
  genre: string;
  image: string;
  location: string;
  description: string;
  date: string;
  time: string;
  price: number;
  offer: string;
  rating: number;
  icon: React.ElementType;
}

// Mock data for concerts
export const concerts: Concert[] = [
  {
    id: 1,
    name: "Festival Zouk & Love de merde",
    artist: "Kassav' & Invités",
    genre: "Zouk",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Stade de Dillon, Fort-de-France",
    description: "Le légendaire groupe Kassav' revient pour une soirée exceptionnelle dédiée au zouk. Avec des invités surprise et une ambiance garantie, ce concert s'annonce comme l'événement musical de l'année en Martinique.",
    date: "15 juillet 2024",
    time: "20:00",
    price: 45,
    offer: "Réduction de 20% sur le tarif normal pour les membres du Club Créole",
    rating: 4.9,
    icon: Music
  },
  {
    id: 2,
    name: "Nuit du Reggae",
    artist: "Alpha Blondy & The Solar System",
    genre: "Reggae",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Plage de Grande Anse, Guadeloupe",
    description: "Alpha Blondy, l'une des figures majeures du reggae africain, se produira pour un concert exceptionnel au coucher du soleil sur la magnifique plage de Grande Anse. Vibrations positives garanties!",
    date: "23 juillet 2024",
    time: "19:30",
    price: 38,
    offer: "Un cocktail offert sur présentation de la carte Club Créole",
    rating: 4.7,
    icon: Music
  },
  {
    id: 3,
    name: "Soirée Biguine Jazz",
    artist: "Martinique Jazz Orchestra",
    genre: "Jazz & Biguine",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Théâtre de Pointe-à-Pitre",
    description: "Une soirée unique mêlant les rythmes traditionnels de la biguine aux harmonies sophistiquées du jazz. Le Martinique Jazz Orchestra vous propose un voyage musical à travers l'histoire des Antilles.",
    date: "5 août 2024",
    time: "20:30",
    price: 32,
    offer: "Places en catégorie supérieure au tarif standard pour les membres du Club Créole",
    rating: 4.8,
    icon: Music
  },
  {
    id: 4,
    name: "Carnaval Électronique",
    artist: "DJ Snake & artistes locaux",
    genre: "Électro / Dance",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Plage des Salines, Martinique",
    description: "Le célèbre DJ Snake vient mixer sur la plage des Salines pour une nuit électro mémorable. En première partie, découvrez les meilleurs talents locaux de la scène électronique antillaise.",
    date: "12 août 2024",
    time: "22:00",
    price: 55,
    offer: "Accès à l'espace VIP avec une consommation offerte pour les membres du Club Créole",
    rating: 4.6,
    icon: Music
  },
  {
    id: 5,
    name: "Concert Gospel - Dena Mwana",
    artist: "Dena Mwana avec Samantha Jean & Joella",
    genre: "Gospel",
    image: "/lovable-uploads/dbe431ca-1435-4f4d-9e21-fe2aa7ccfc86.png",
    location: "Palais des Sports du Gosier",
    description: "Venez vivre une soirée inoubliable au Palais des Sports du Gosier avec la voix céleste de Dena Mwana ! Un concert gospel puissant, rempli d'amour, de foi et d'émotions. Préparez-vous à chanter, danser, prier et vibrer dans une ambiance spirituelle exceptionnelle.",
    date: "14 juillet 2025",
    time: "17:00",
    price: 40,
    offer: "Tarif préférentiel à 30€ au lieu de 40€ pour les membres du Club Créole",
    rating: 4.9,
    icon: Music
  },
  {
    id: 6,
    name: "Festival Terre de Blues",
    artist: "Artistes Blues & Soul",
    genre: "Blues",
    image: "/lovable-uploads/b74f7363-a541-46fc-991d-f00043c98c3f.png",
    location: "Plage du 3ème Pont à Grand-Bourg, Marie-Galante",
    description: "La 23ème édition du Festival Terre de Blues vous invite à découvrir les plus grands noms du blues dans un cadre exceptionnel à Marie-Galante. Un festival de 4 jours avec possibilité de camping sur place pour une expérience musicale complète.",
    date: "6 au 9 juin 2025",
    time: "18:00",
    price: 60,
    offer: "Tarif préférentiel à 45€ au lieu de 60€ pour les membres du Club Créole - Forfait camping 4 nuits inclus",
    rating: 4.8,
    icon: Music
  }
];
