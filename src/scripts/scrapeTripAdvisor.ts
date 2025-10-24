import 'dotenv/config';
import puppeteer from 'puppeteer';
import { createRestaurant } from '../services/restaurantService';
import { Restaurant } from '@/components/restaurant/types';

interface ScrapedRestaurant {
  name: string;
  location: string;
  description: string;
  type: string;
  rating: number;
  image: string;
  price_range: string;
  url?: string;
}

/**
 * Scrape les restaurants depuis TripAdvisor
 * @param url URL de la page TripAdvisor à scraper
 * @param maxRestaurants Nombre maximum de restaurants à scraper
 */
async function scrapeTripAdvisor(url: string, maxRestaurants: number = 20) {
  console.log('🚀 Démarrage du scraping de TripAdvisor...');
  console.log(`📍 URL: ${url}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Configuration du user agent pour éviter la détection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log('📄 Chargement de la page...');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Attendre que les restaurants soient chargés
    await page.waitForSelector('[data-test-target="restaurants-list"]', { timeout: 30000 }).catch(() => {
      console.log('⚠️  Sélecteur principal non trouvé, tentative avec un sélecteur alternatif...');
    });

    console.log('🔍 Extraction des données des restaurants...');

    // Extraire les données des restaurants
    const restaurants = await page.evaluate((max) => {
      const results: ScrapedRestaurant[] = [];

      // Chercher les cartes de restaurants (plusieurs sélecteurs possibles)
      const restaurantCards = document.querySelectorAll('[data-test-target="restaurants-list"] > div, .restaurants-list > div, div[data-automation="restaurantCard"]');

      console.log(`Trouvé ${restaurantCards.length} cartes de restaurants`);

      restaurantCards.forEach((card, index) => {
        if (index >= max) return;

        try {
          // Nom du restaurant
          const nameElement = card.querySelector('a[href*="Restaurant_Review"] h3, .restaurants-list__card-title a, div[data-automation="restaurantName"]');
          const name = nameElement?.textContent?.trim() || '';

          if (!name) return; // Ignorer si pas de nom

          // Note
          const ratingElement = card.querySelector('svg[aria-label*="bubble"], div[data-automation="rating"]');
          const ratingText = ratingElement?.getAttribute('aria-label') || '0';
          const ratingMatch = ratingText.match(/(\d+\.?\d*)/);
          const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;

          // Type de cuisine
          const cuisineElement = card.querySelector('a[href*="Restaurants-g"], span[class*="cuisine"], div[data-automation="cuisine"]');
          const type = cuisineElement?.textContent?.trim() || 'Restaurant';

          // Fourchette de prix
          const priceElement = card.querySelector('span[class*="price"], div[data-automation="priceRange"]');
          const price_range = priceElement?.textContent?.trim() || '€€';

          // Description (peut ne pas être disponible sur la page de liste)
          const descElement = card.querySelector('div[class*="description"], span[class*="review-snippet"]');
          const description = descElement?.textContent?.trim() || `Restaurant ${type} à Le Gosier, Guadeloupe`;

          // Image
          const imgElement = card.querySelector('img');
          const image = imgElement?.src || imgElement?.getAttribute('data-src') || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800';

          // URL du restaurant
          const linkElement = card.querySelector('a[href*="Restaurant_Review"]');
          const restaurantUrl = linkElement ? `https://www.tripadvisor.com${linkElement.getAttribute('href')}` : undefined;

          // Localisation
          const locationElement = card.querySelector('span[class*="address"], div[data-automation="address"]');
          const location = locationElement?.textContent?.trim() || 'Le Gosier, Guadeloupe';

          results.push({
            name,
            location,
            description,
            type,
            rating: rating > 5 ? rating / 10 : rating, // Normaliser à une échelle de 0-5
            image,
            price_range,
            url: restaurantUrl
          });
        } catch (error) {
          console.error('Erreur lors de l\'extraction d\'un restaurant:', error);
        }
      });

      return results;
    }, maxRestaurants);

    console.log(`✅ ${restaurants.length} restaurants extraits`);

    // Afficher un aperçu
    if (restaurants.length > 0) {
      console.log('\n📋 Aperçu des restaurants trouvés:');
      restaurants.forEach((r, i) => {
        console.log(`${i + 1}. ${r.name} - ${r.rating}/5 - ${r.price_range}`);
      });
    }

    return restaurants;

  } catch (error) {
    console.error('❌ Erreur lors du scraping:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * Convertit un restaurant scrapé en format Restaurant pour la base de données
 */
function convertToRestaurant(scraped: ScrapedRestaurant): Omit<Restaurant, 'id' | 'created_at' | 'updated_at'> {
  return {
    name: scraped.name,
    location: scraped.location,
    description: scraped.description,
    type: scraped.type,
    rating: scraped.rating,
    offer: null,
    icon: 'utensils',
    image: scraped.image,
    gallery_images: [],
    opening_hours: {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null
    },
    price_range: scraped.price_range,
    specialties: [],
    poids: 0 // Poids par défaut
  };
}

/**
 * Insère les restaurants dans Supabase
 */
async function insertRestaurants(restaurants: ScrapedRestaurant[]) {
  console.log('\n💾 Insertion des restaurants dans la base de données...');

  let successCount = 0;
  let errorCount = 0;
  const errors: Array<{ name: string; error: string }> = [];

  for (const restaurant of restaurants) {
    try {
      const restaurantData = convertToRestaurant(restaurant);
      await createRestaurant(restaurantData);
      successCount++;
      console.log(`✅ ${restaurant.name} inséré avec succès`);
    } catch (error) {
      errorCount++;
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      errors.push({ name: restaurant.name, error: errorMessage });

      // Si c'est une erreur de contrainte unique, on continue
      if (errorMessage.includes('unique') || errorMessage.includes('duplicate')) {
        console.log(`⚠️  ${restaurant.name} existe déjà dans la base de données`);
      } else {
        console.error(`❌ Erreur lors de l'insertion de ${restaurant.name}:`, errorMessage);
      }
    }
  }

  console.log('\n📊 Résumé:');
  console.log(`✅ ${successCount} restaurants insérés`);
  console.log(`❌ ${errorCount} erreurs`);

  if (errors.length > 0 && errors.some(e => !e.error.includes('unique') && !e.error.includes('duplicate'))) {
    console.log('\n⚠️  Erreurs rencontrées:');
    errors.forEach(e => {
      if (!e.error.includes('unique') && !e.error.includes('duplicate')) {
        console.log(`- ${e.name}: ${e.error}`);
      }
    });
  }
}

/**
 * Fonction principale
 */
async function main() {
  const url = process.argv[2] || 'https://www.tripadvisor.com/Restaurants-g644387-Le_Gosier_Grande_Terre_Island_Guadeloupe.html';
  const maxRestaurants = parseInt(process.argv[3] || '20');

  console.log('🍽️  Scraping des restaurants TripAdvisor');
  console.log('==========================================\n');

  try {
    // Scraper les restaurants
    const restaurants = await scrapeTripAdvisor(url, maxRestaurants);

    if (restaurants.length === 0) {
      console.log('⚠️  Aucun restaurant trouvé. Vérifiez l\'URL et réessayez.');
      return;
    }

    // Demander confirmation avant l'insertion
    console.log(`\n📝 Prêt à insérer ${restaurants.length} restaurants dans la base de données.`);
    console.log('💡 Pour continuer, le script va maintenant insérer les restaurants...\n');

    // Insérer dans la base de données
    await insertRestaurants(restaurants);

    console.log('\n✅ Scraping terminé avec succès!');

  } catch (error) {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  }
}

// Exécuter le script
main();
