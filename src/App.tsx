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
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plongee" element={<DivingActivity />} />
          <Route path="/canoe" element={<CanoeActivity />} />
          <Route path="/randonnee" element={<HikingActivity />} />
          <Route path="/jet-ski" element={<JetSkiActivity />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loisirs" element={<LoisirsActivity />} />
          <Route path="/restauration" element={<RestaurantActivity />} />
          <Route path="/hebergements" element={<NotFound />} />
          <Route path="/concerts" element={<NotFound />} />
          <Route path="/soiree" element={<NotFound />} />
          <Route path="/location" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
