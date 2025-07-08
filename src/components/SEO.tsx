import { useSEO, SEOData } from '@/hooks/useSEO';

interface SEOProps extends SEOData {}

export const SEO: React.FC<SEOProps> = (props) => {
  useSEO(props);
  return null;
};

export default SEO;