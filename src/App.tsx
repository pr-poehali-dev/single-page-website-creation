import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Index from "./pages/Index";
import Constructor from "./pages/Constructor";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div className="hidden md:flex fixed top-4 right-4 z-50 gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg p-2 shadow-lg">
        <Button
          variant={location.pathname === "/" ? "default" : "outline"}
          size="sm"
          onClick={() => navigate("/")}
        >
          <Icon name="Home" size={16} className="mr-2" />
          Сайт
        </Button>
        <Button
          variant={location.pathname === "/admin" ? "default" : "outline"}
          size="sm"
          onClick={() => navigate("/admin")}
        >
          <Icon name="Settings" size={16} className="mr-2" />
          Админка
        </Button>
        <Button
          variant={location.pathname === "/constructor" ? "default" : "outline"}
          size="sm"
          onClick={() => navigate("/constructor")}
        >
          <Icon name="Wrench" size={16} className="mr-2" />
          Конструктор
        </Button>
      </div>

      <div className="md:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
        >
          <Icon name={isOpen ? "X" : "Menu"} size={20} />
        </Button>
        
        {isOpen && (
          <div className="absolute top-14 right-0 w-48 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg p-2 shadow-lg flex flex-col gap-2">
            <Button
              variant={location.pathname === "/" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className="w-full justify-start"
            >
              <Icon name="Home" size={16} className="mr-2" />
              Сайт
            </Button>
            <Button
              variant={location.pathname === "/admin" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                navigate("/admin");
                setIsOpen(false);
              }}
              className="w-full justify-start"
            >
              <Icon name="Settings" size={16} className="mr-2" />
              Админка
            </Button>
            <Button
              variant={location.pathname === "/constructor" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                navigate("/constructor");
                setIsOpen(false);
              }}
              className="w-full justify-start"
            >
              <Icon name="Wrench" size={16} className="mr-2" />
              Конструктор
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

const AppContent = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/constructor" element={<Constructor />} />
        <Route path="/admin" element={<Admin />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;