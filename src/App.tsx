import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UsersManagement from "./pages/UsersManagement";
import UserDetailsPage from "./pages/users/UserDetailsPage";
import PartnersManagement from "./pages/PartnersManagement";
import LoisirsActivity from "./pages/LoisirsActivity";
import LoisirsDetail from "./pages/LoisirsDetail";
import LoisirsManagement from "./pages/LoisirsManagement";
import RestaurantActivity from "./pages/RestaurantActivity";
import RestaurantDetail from "./pages/RestaurantDetail";
import AccommodationActivity from "./pages/AccommodationActivity";
import AccommodationDetail from "./pages/AccommodationDetail";
import AccommodationsManagement from "./pages/AccommodationsManagement";
import CarRentalActivity from "./pages/CarRentalActivity";
import CarRentalDetail from "./pages/CarRentalDetail";
import CarRentalManagement from "./pages/CarRentalManagement";
import FleetManagement from "./pages/FleetManagement";
import DivingActivity from "./pages/DivingActivity";
import DivingManagement from "./pages/DivingManagement";
import ConcertActivity from "./pages/ConcertActivity";
import ConcertDetail from "./pages/ConcertDetail";
import NightlifeActivity from "./pages/NightlifeActivity";
import NightlifeDetail from "./pages/NightlifeDetail";
import CanoeActivity from "./pages/CanoeActivity";
import JetSkiActivity from "./pages/JetSkiActivity";
import HikingActivity from "./pages/HikingActivity";
import NotFound from "./pages/NotFound";
import Reservations from "./pages/Reservations";
import Clients from "./pages/Clients";
import Offers from "./pages/Offers";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UsersManagement />} />
              <Route path="/users/:id" element={<UserDetailsPage />} />
              <Route path="/partners" element={<PartnersManagement />} />
              <Route path="/loisirs" element={<LoisirsActivity />} />
              <Route path="/loisirs/:id" element={<LoisirsDetail />} />
              <Route path="/loisirs-management" element={<LoisirsManagement />} />
              <Route path="/restaurant" element={<RestaurantActivity />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/hebergement" element={<AccommodationActivity />} />
              <Route path="/hebergement/:id" element={<AccommodationDetail />} />
              <Route path="/accommodations-management" element={<AccommodationsManagement />} />
              <Route path="/location-voiture" element={<CarRentalActivity />} />
              <Route path="/location-voiture/:id" element={<CarRentalDetail />} />
              <Route path="/car-rental-management" element={<CarRentalManagement />} />
              <Route path="/fleet-management" element={<FleetManagement />} />
              <Route path="/plongee" element={<DivingActivity />} />
              <Route path="/diving-management" element={<DivingManagement />} />
              <Route path="/concert" element={<ConcertActivity />} />
              <Route path="/concert/:id" element={<ConcertDetail />} />
              <Route path="/nightlife" element={<NightlifeActivity />} />
              <Route path="/nightlife/:id" element={<NightlifeDetail />} />
              <Route path="/canoe" element={<CanoeActivity />} />
              <Route path="/jet-ski" element={<JetSkiActivity />} />
              <Route path="/randonnee" element={<HikingActivity />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
