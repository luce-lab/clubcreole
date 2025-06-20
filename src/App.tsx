
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import LoisirsActivity from "./pages/LoisirsActivity";
import RestaurantActivity from "./pages/RestaurantActivity";
import AccommodationActivity from "./pages/AccommodationActivity";
import ConcertActivity from "./pages/ConcertActivity";
import NightlifeActivity from "./pages/NightlifeActivity";
import CarRentalActivity from "./pages/CarRentalActivity";
import DivingActivity from "./pages/DivingActivity";
import CanoeActivity from "./pages/CanoeActivity";
import HikingActivity from "./pages/HikingActivity";
import VoyanceActivity from "./pages/VoyanceActivity";
import TravelActivity from "./pages/TravelActivity";
import Offers from "./pages/Offers";
import PartnersManagement from "./pages/PartnersManagement";
import TravelDetail from "./pages/TravelDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UsersManagement from "./pages/UsersManagement";
import AccommodationsManagement from "./pages/AccommodationsManagement";
import Clients from "./pages/Clients";
import LoisirsManagement from "./pages/LoisirsManagement";
import CarRentalManagement from "./pages/CarRentalManagement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/loisirs" element={<LoisirsActivity />} />
          <Route path="/restauration" element={<RestaurantActivity />} />
          <Route path="/hebergements" element={<AccommodationActivity />} />
          <Route path="/concerts" element={<ConcertActivity />} />
          <Route path="/soiree" element={<NightlifeActivity />} />
          <Route path="/location" element={<CarRentalActivity />} />
          <Route path="/plongee" element={<DivingActivity />} />
          <Route path="/canoe" element={<CanoeActivity />} />
          <Route path="/randonnee" element={<HikingActivity />} />
          <Route path="/voyance" element={<VoyanceActivity />} />
          <Route path="/voyages" element={<TravelActivity />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/partners" element={<PartnersManagement />} />
          <Route path="/voyages/:id" element={<TravelDetail />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
