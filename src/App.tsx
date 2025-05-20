
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DivingActivity from "./pages/DivingActivity";
import CanoeActivity from "./pages/CanoeActivity";
import HikingActivity from "./pages/HikingActivity";
import JetSkiActivity from "./pages/JetSkiActivity";
import LoisirsActivity from "./pages/LoisirsActivity";
import RestaurantActivity from "./pages/RestaurantActivity";
import RestaurantDetail from "./pages/RestaurantDetail";
import CarRentalActivity from "./pages/CarRentalActivity";
import CarRentalDetail from "./pages/CarRentalDetail";
import AccommodationActivity from "./pages/AccommodationActivity";
import AccommodationDetail from "./pages/AccommodationDetail";
import ConcertActivity from "./pages/ConcertActivity";
import ConcertDetail from "./pages/ConcertDetail";
import NightlifeActivity from "./pages/NightlifeActivity";
import NightlifeDetail from "./pages/NightlifeDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PartnersManagement from "./pages/PartnersManagement";
import UsersManagement from "./pages/UsersManagement";
import Reservations from "./pages/Reservations";
import Clients from "./pages/Clients";
import Offers from "./pages/Offers";
import LoisirsManagement from "./pages/LoisirsManagement";
import { AuthProvider } from "./contexts/auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/plongee" element={<DivingActivity />} />
            <Route path="/canoe" element={<CanoeActivity />} />
            <Route path="/randonnee" element={<HikingActivity />} />
            <Route path="/jet-ski" element={<JetSkiActivity />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/partners" element={<PartnersManagement />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/loisirs" element={<LoisirsActivity />} />
            <Route path="/loisirs-management" element={<LoisirsManagement />} />
            <Route path="/restauration" element={<RestaurantActivity />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/location" element={<CarRentalActivity />} />
            <Route path="/location/:id" element={<CarRentalDetail />} />
            <Route path="/hebergements" element={<AccommodationActivity />} />
            <Route path="/hebergements/:id" element={<AccommodationDetail />} />
            <Route path="/concerts" element={<ConcertActivity />} />
            <Route path="/concerts/:id" element={<ConcertDetail />} />
            <Route path="/soiree" element={<NightlifeActivity />} />
            <Route path="/soiree/:id" element={<NightlifeDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
