/**
 * Normalise une chaîne de caractères en supprimant les accents et caractères spéciaux
 * @param str - Chaîne à normaliser
 * @returns Chaîne normalisée sans accents
 */
export const normalizeString = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

/**
 * Vérifie si une chaîne de recherche correspond à un texte en ignorant les accents
 * @param searchTerm - Terme de recherche
 * @param text - Texte dans lequel rechercher
 * @returns true si le terme de recherche est trouvé (sans tenir compte des accents)
 */
export const matchesIgnoreAccents = (searchTerm: string, text: string): boolean => {
  const normalizedSearch = normalizeString(searchTerm);
  const normalizedText = normalizeString(text);
  return normalizedText.includes(normalizedSearch);
};