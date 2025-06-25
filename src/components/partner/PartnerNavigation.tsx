
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const PartnerNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "advantages", "application"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Gérer les ancres dans l'URL
    const hash = window.location.hash.replace("#", "");
    if (hash && ["hero", "advantages", "application"].includes(hash)) {
      setActiveSection(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      // Mettre à jour l'URL sans recharger la page
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4 py-3">
          <Button
            variant={activeSection === "hero" ? "default" : "ghost"}
            size="sm"
            onClick={() => scrollToSection("hero")}
            className={activeSection === "hero" ? "bg-creole-green hover:bg-creole-green/90" : ""}
          >
            Accueil
          </Button>
          <Button
            variant={activeSection === "advantages" ? "default" : "ghost"}
            size="sm"
            onClick={() => scrollToSection("advantages")}
            className={activeSection === "advantages" ? "bg-creole-green hover:bg-creole-green/90" : ""}
          >
            Avantages
          </Button>
          <Button
            variant={activeSection === "application" ? "default" : "ghost"}
            size="sm"
            onClick={() => scrollToSection("application")}
            className={activeSection === "application" ? "bg-creole-green hover:bg-creole-green/90" : ""}
          >
            Candidature
          </Button>
        </div>
      </div>
    </nav>
  );
};
