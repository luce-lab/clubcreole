
import { Car, Route, Shield, Fuel } from "lucide-react";
import type { CarRental, ClientReview } from "./CarRentalTypes";

export const carRentals: CarRental[] = [
  {
    id: 1,
    name: "Caribbean Cars",
    type: "Véhicules économiques",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Fort-de-France",
    description: "Une large gamme de véhicules économiques et compacts, parfaits pour explorer l'île. Service client réactif et tarifs compétitifs.",
    rating: 4.6,
    offer: "15% de réduction sur toutes les locations de plus de 3 jours pour les membres du Club Créole",
    icon: Car,
    features: [
      "Véhicules récents",
      "Assistance 24/7",
      "Kilométrage illimité",
      "Assurance tous risques",
      "Prise en charge aéroport",
      "Annulation gratuite"
    ],
    models: [
      {
        name: "Peugeot 208",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 29,
        category: "Citadine",
        seats: 5,
        transmission: "Manuelle",
        airCon: true
      },
      {
        name: "Renault Clio",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 32,
        category: "Citadine",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "Citroën C3",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452ae51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 28,
        category: "Citadine",
        seats: 5,
        transmission: "Manuelle",
        airCon: true
      }
    ]
  },
  {
    id: 2,
    name: "Prestige Auto",
    type: "Véhicules de luxe",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Les Trois-Îlets",
    description: "Louez des voitures de luxe et profitez d'un service premium. Notre flotte comprend des SUV haut de gamme, des cabriolets et des berlines de luxe.",
    rating: 4.8,
    offer: "Un jour de location offert pour toute réservation d'une semaine ou plus",
    icon: Shield,
    features: [
      "Véhicules premium",
      "Service de conciergerie",
      "Livraison à votre hôtel",
      "Chauffeur disponible",
      "Assurance tous risques incluse",
      "Service client VIP"
    ],
    models: [
      {
        name: "Mercedes Classe C Cabriolet",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 120,
        category: "Cabriolet",
        seats: 4,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "BMW X5",
        image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 150,
        category: "SUV",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "Audi A8",
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 180,
        category: "Berline",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      }
    ]
  },
  {
    id: 3,
    name: "Eco Drive",
    type: "Véhicules électriques",
    image: "https://images.unsplash.com/photo-1593941707882-a5bfb1050f50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Le Lamentin",
    description: "Louez des véhicules 100% électriques pour une expérience écologique. Contribuez à préserver la beauté naturelle des Antilles tout en explorant l'île.",
    rating: 4.5,
    offer: "Recharge gratuite et 10% de réduction pour les membres du Club Créole",
    icon: Fuel,
    features: [
      "Véhicules 100% électriques",
      "Recharge gratuite",
      "Bornes de recharge cartographiées",
      "Assistance 24/7",
      "Kilométrage illimité",
      "Conseils d'éco-conduite"
    ],
    models: [
      {
        name: "Renault Zoe",
        image: "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 45,
        category: "Citadine électrique",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "Peugeot e-208",
        image: "https://images.unsplash.com/photo-1647588807130-91d14e004a99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 48,
        category: "Citadine électrique",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "Tesla Model 3",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 90,
        category: "Berline électrique",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      }
    ]
  },
  {
    id: 4,
    name: "Aventure 4x4",
    type: "Véhicules tout-terrain",
    image: "https://images.unsplash.com/photo-1533743410561-5c70e1a14cc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Sainte-Anne",
    description: "Spécialiste des 4x4 et SUV pour explorer les zones moins accessibles. Idéal pour les aventuriers souhaitant découvrir les trésors cachés de l'île.",
    rating: 4.7,
    offer: "Kit d'aventure offert (GPS, glacière, guides) pour toute location 4x4 de 3 jours ou plus",
    icon: Route,
    features: [
      "4x4 et SUV tout-terrain",
      "GPS avec routes hors des sentiers battus",
      "Kit d'aventure inclus",
      "Assistance 24/7 sur toute l'île",
      "Conseils d'itinéraires personnalisés",
      "Service de dépannage spécialisé"
    ],
    models: [
      {
        name: "Jeep Wrangler",
        image: "https://images.unsplash.com/photo-1597007030739-6d2e7172ce5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 85,
        category: "4x4",
        seats: 4,
        transmission: "Manuelle",
        airCon: true
      },
      {
        name: "Toyota Land Cruiser",
        image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 95,
        category: "4x4",
        seats: 7,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "Dacia Duster",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 60,
        category: "SUV compact",
        seats: 5,
        transmission: "Manuelle",
        airCon: true
      }
    ]
  }
];

export const clientReviews: ClientReview[] = [
  {
    id: 1,
    name: "Sophie Martin",
    location: "Paris, France",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    comment: "Service exceptionnel ! La voiture était impeccable et le prix avec la réduction Club Créole était vraiment avantageux. Je recommande vivement Caribbean Cars pour découvrir la Martinique.",
    rating: 5,
    date: "15 mai 2023",
    rentalCompany: "Caribbean Cars"
  },
  {
    id: 2,
    name: "Thomas Dubois",
    location: "Lyon, France",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    comment: "Prestige Auto a rendu mon séjour inoubliable. J'ai pu profiter d'un cabriolet de luxe pour admirer les paysages martiniquais. Le jour de location offert grâce au Club Créole a été un vrai plus !",
    rating: 5,
    date: "3 juin 2023",
    rentalCompany: "Prestige Auto"
  },
  {
    id: 3,
    name: "Marie Leroy",
    location: "Bordeaux, France",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    comment: "Très satisfaite de mon expérience avec Eco Drive. Louer un véhicule électrique était parfait pour explorer l'île tout en respectant l'environnement. Les recharges gratuites sont un vrai avantage.",
    rating: 4,
    date: "22 juillet 2023",
    rentalCompany: "Eco Drive"
  },
  {
    id: 4,
    name: "Jean Moreau",
    location: "Marseille, France",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    comment: "Aventure 4x4 a dépassé toutes mes attentes ! Le SUV était parfaitement adapté aux routes plus difficiles de la Martinique. Le kit d'aventure offert était vraiment utile pour nos excursions.",
    rating: 5,
    date: "10 août 2023",
    rentalCompany: "Aventure 4x4"
  },
  {
    id: 5,
    name: "Claire Petit",
    location: "Nantes, France",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    comment: "Service client exceptionnel chez Caribbean Cars. Ils ont été très réactifs quand j'ai eu un petit problème et l'ont résolu immédiatement. La réduction Club Créole était substantielle !",
    rating: 5,
    date: "5 septembre 2023",
    rentalCompany: "Caribbean Cars"
  }
];
