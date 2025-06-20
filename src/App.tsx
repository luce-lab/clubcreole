import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Loisirs from "./pages/Loisirs";
import Restauration from "./pages/Restauration";
import Hebergements from "./pages/Hebergements";
import Concerts from "./pages/Concerts";
import Soiree from "./pages/Soiree";
import Location from "./pages/Location";
import Plongee from "./pages/Plongee";
import Canoe from "./pages/Canoe";
import Randonnee from "./pages/Randonnee";
import Voyance from "./pages/Voyance";
import Voyages from "./pages/TravelActivity";
import Offers from "./pages/Offers";
import PartnersManagement from "./pages/PartnersManagement";
import TravelDetail from "./pages/TravelDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/loisirs" element={<Loisirs />} />
        <Route path="/restauration" element={<Restauration />} />
        <Route path="/hebergements" element={<Hebergements />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/soiree" element={<Soiree />} />
        <Route path="/location" element={<Location />} />
        <Route path="/plongee" element={<Plongee />} />
        <Route path="/canoe" element={<Canoe />} />
        <Route path="/randonnee" element={<Randonnee />} />
        <Route path="/voyance" element={<Voyance />} />
        <Route path="/voyages" element={<Voyages />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/partners" element={<PartnersManagement />} />
        <Route path="/voyages/:id" element={<TravelDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
