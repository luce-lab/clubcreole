import { useEffect } from 'react';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: Record<string, any>;
}

export const useSEO = (seoData: SEOData) => {
  useEffect(() => {
    // Update document title
    document.title = seoData.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', seoData.description);
    if (seoData.keywords) {
      updateMetaTag('keywords', seoData.keywords);
    }

    // Open Graph tags
    updateMetaTag('og:title', seoData.ogTitle || seoData.title, true);
    updateMetaTag('og:description', seoData.ogDescription || seoData.description, true);
    updateMetaTag('og:type', seoData.ogType || 'website', true);
    
    if (seoData.ogImage) {
      updateMetaTag('og:image', seoData.ogImage, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', seoData.twitterCard || 'summary_large_image');
    updateMetaTag('twitter:title', seoData.ogTitle || seoData.title);
    updateMetaTag('twitter:description', seoData.ogDescription || seoData.description);

    // Canonical URL
    if (seoData.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = seoData.canonical;
    }

    // Structured Data
    if (seoData.structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(seoData.structuredData);
    }

  }, [seoData]);
};