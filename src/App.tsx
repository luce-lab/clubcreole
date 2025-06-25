
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
import VoyageDetail from "./pages/VoyageDetail";
import LoisirsDetail from "./pages/LoisirsDetail";
import ConcertDetail from "./pages/ConcertDetail";
import NightlifeDetail from "./pages/NightlifeDetail";
import CarRentalDetail from "./pages/CarRentalDetail";
import RestaurantDetail from "./pages/RestaurantDetail";
import AccommodationDetail from "./pages/AccommodationDetail";
import OfferDetail from "./pages/OfferDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UsersManagement from "./pages/UsersManagement";
import AccommodationsManagement from "./pages/AccommodationsManagement";
import Clients from "./pages/Clients";
import LoisirsManagement from "./pages/LoisirsManagement";
import CarRentalManagement from "./pages/CarRentalManagement";
import DevenirPartenaire from "./pages/DevenirPartenaire";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/loisirs" element={<LoisirsActivity />} />
          <Route path="/loisirs/:id" element={<LoisirsDetail />} />
          <Route path="/restauration" element={<RestaurantActivity />} />
          <Route path="/restauration/:id" element={<RestaurantDetail />} />
          <Route path="/hebergements" element={<AccommodationActivity />} />
          <Route path="/hebergements/:id" element={<AccommodationDetail />} />
          <Route path="/concerts" element={<ConcertActivity />} />
          <Route path="/concerts/:id" element={<ConcertDetail />} />
          <Route path="/soiree" element={<NightlifeActivity />} />
          <Route path="/soiree/:id" element={<NightlifeDetail />} />
          <Route path="/location" element={<CarRentalActivity />} />
          <Route path="/location/:id" element={<CarRentalDetail />} />
          <Route path="/plongee" element={<DivingActivity />} />
          <Route path="/canoe" element={<CanoeActivity />} />
          <Route path="/randonnee" element={<HikingActivity />} />
          <Route path="/voyance" element={<VoyanceActivity />} />
          <Route path="/voyages" element={<TravelActivity />} />
          <Route path="/voyages/:id" element={<VoyageDetail />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/offers/:id" element={<OfferDetail />} />
          <Route path="/partners" element={<PartnersManagement />} />
          <Route path="/devenir-partenaire" element={<DevenirPartenaire />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/accommodations-management" element={<AccommodationsManagement />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/loisirs-management" element={<LoisirsManagement />} />
          <Route path="/car-rental-management" element={<CarRentalManagement />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
