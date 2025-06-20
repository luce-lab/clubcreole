
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import BackButton from "@/components/common/BackButton";
import VoyanceHeader from "@/components/voyance/VoyanceHeader";
import VoyanceMediumsList from "@/components/voyance/VoyanceMediumsList";
import VoyanceSearchBar from "@/components/voyance/VoyanceSearchBar";

const VoyanceActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <BackButton backTo="/" />
        <VoyanceHeader />
        <VoyanceSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <VoyanceMediumsList searchTerm={searchTerm} />
      </main>
      <Footer />
    </div>
  );
};

export default VoyanceActivity;
