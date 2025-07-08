// Helpers pour générer les données SEO et structured data

export const generateBaseURL = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://clubcreole.fr'; // URL de production
};

export const generateLocalBusinessSchema = (business: {
  name: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  image?: string;
  rating?: number;
  priceRange?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": business.name,
  "description": business.description,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": business.address
  },
  ...(business.phone && { "telephone": business.phone }),
  ...(business.website && { "url": business.website }),
  ...(business.image && { "image": business.image }),
  ...(business.rating && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": business.rating,
      "bestRating": "5"
    }
  }),
  ...(business.priceRange && { "priceRange": business.priceRange })
});

export const generateEventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image?: string;
  price?: number;
  offers?: any;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.name,
  "description": event.description,
  "startDate": event.startDate,
  ...(event.endDate && { "endDate": event.endDate }),
  "location": {
    "@type": "Place",
    "name": event.location,
    "address": event.location
  },
  ...(event.image && { "image": event.image }),
  ...(event.offers && { "offers": event.offers })
});

export const generateProductSchema = (product: {
  name: string;
  description: string;
  image?: string;
  price?: number;
  currency?: string;
  availability?: string;
  brand?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  ...(product.image && { "image": product.image }),
  ...(product.brand && { "brand": product.brand }),
  ...(product.price && {
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.currency || "EUR",
      "availability": `https://schema.org/${product.availability || 'InStock'}`
    }
  })
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Club Créole",
  "description": "Votre plateforme de réservation d'activités, restaurants et hébergements en Guadeloupe",
  "url": generateBaseURL(),
  "logo": `${generateBaseURL()}/lovable-uploads/bf88336d-adb2-4cf0-bbfe-a1fbc6feb951.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "availableLanguage": "French"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Guadeloupe"
  },
  "serviceType": [
    "Réservation d'activités",
    "Réservation de restaurants", 
    "Réservation d'hébergements",
    "Location de voitures",
    "Voyages organisés"
  ]
});

export const generateBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});