import 'dotenv/config';
import { createAccommodation } from '../services/accommodationService';

const laCollineVerteData = {
  name: "La Colline Verte",
  type: "Bungalow",
  location: "Entre Saint-Rose et Deshaies, Guadeloupe",
  price: 150,
  rating: 4.5,
  image: "https://res.cloudinary.com/amenitiz/image/upload/c_fill,f_auto,h_2000,q_auto:good,w_2880/v1739351001/yd8sip3z59369xzcdbhs.jpg",
  gallery_images: [
    "https://res.cloudinary.com/amenitiz/image/upload/c_fill,f_auto,h_2000,q_auto:good,w_2880/v1739351001/ldzumam8avliwudcthsp.jpg",
    "https://res.cloudinary.com/amenitiz/image/upload/c_fill,f_auto,h_2000,q_auto:good,w_2880/v1739352769/vjkklrjmrd8qguklogwq.jpg"
  ],
  features: [
    "Bungalows créoles",
    "Vue sur la mer des Caraïbes",
    "Piscine",
    "Jardin tropical"
  ],
  description: "Situé entre St-Rose et Deshaies, La Colline Verte propose des bungalows créoles dans un jardin tropical avec piscine et vue sur la mer des Caraïbes. Les gîtes peuvent accueillir de 2 à 8 personnes et disposent d'une terrasse privée et d'une cuisine équipée. Proche des plages de La Perle et Fort Royal.",
  rooms: 1,
  bathrooms: 1,
  max_guests: 8,
  amenities: [
    { name: "Wi-Fi", available: true },
    { name: "Piscine", available: true },
    { name: "Parking gratuit", available: true },
    { name: "Climatisation", available: true },
    { name: "Cuisine équipée", available: true },
    { name: "Télévision", available: true },
    { name: "Barbecue", available: true }
  ],
  rules: [
    "Animaux non admis (à confirmer)",
    "Non fumeur (à confirmer)"
  ],
  weight: 1
};

async function insertHotel() {
  try {
    console.log('Insertion de La Colline Verte dans la base de données...');
    const newAccommodation = await createAccommodation(laCollineVerteData);
    console.log('La Colline Verte insérée avec succès:', newAccommodation);
  } catch (error) {
    console.error('Erreur lors de l\'insertion de La Colline Verte:', error);
  }
}

insertHotel();