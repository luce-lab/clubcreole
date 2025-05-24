
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  Car,
  Bed,
  MapPin,
  UserCheck,
  Gift,
  Waves
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [managementOpen, setManagementOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      title: "Tableau de bord",
      icon: LayoutDashboard,
      path: "/dashboard",
      roles: ["admin", "partner", "client"]
    },
    {
      title: "Gestion",
      icon: Settings,
      roles: ["admin"],
      submenu: [
        {
          title: "Utilisateurs",
          icon: Users,
          path: "/users",
        },
        {
          title: "Partenaires",
          icon: UserCheck,
          path: "/partners",
        },
        {
          title: "Loisirs",
          icon: MapPin,
          path: "/loisirs-management",
        },
        {
          title: "Hébergements",
          icon: Bed,
          path: "/accommodations-management",
        },
        {
          title: "Locations de voitures",
          icon: Car,
          path: "/car-rental-management",
        },
        {
          title: "Plongées",
          icon: Waves,
          path: "/diving-management",
        }
      ]
    },
    {
      title: "Réservations",
      icon: Calendar,
      path: "/reservations",
      roles: ["admin", "partner"]
    },
    {
      title: "Clients",
      icon: Users,
      path: "/clients",
      roles: ["admin", "partner"]
    },
    {
      title: "Offres",
      icon: Gift,
      path: "/offers",
      roles: ["admin", "partner"]
    }
  ];

  const filteredItems = menuItems.filter(item => 
    !item.roles || item.roles.includes(user?.role || "")
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-creole-green">Menu</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 space-y-2">
          {filteredItems.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                <div>
                  <Button
                    variant={managementOpen ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left",
                      managementOpen && "bg-gray-100"
                    )}
                    onClick={() => setManagementOpen(!managementOpen)}
                  >
                    <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="flex-1">{item.title}</span>
                    {managementOpen ? (
                      <ChevronDown className="ml-auto h-4 w-4 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0" />
                    )}
                  </Button>
                  {managementOpen && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Button
                          key={subItem.path}
                          variant={isActive(subItem.path) ? "secondary" : "ghost"}
                          className="w-full justify-start text-left"
                          onClick={() => navigate(subItem.path)}
                        >
                          <subItem.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span>{subItem.title}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant={isActive(item.path || "") ? "secondary" : "ghost"}
                  className="w-full justify-start text-left"
                  onClick={() => item.path && navigate(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span>{item.title}</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
