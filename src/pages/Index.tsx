import { useState, useEffect } from "react";
import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import CatalogSection from "@/components/sections/CatalogSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortraitSection from "@/components/sections/PortraitSection";
import GallerySection from "@/components/sections/GallerySection";
import PricesSection from "@/components/sections/PricesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

interface Monument {
  id?: number;
  image_url: string;
  title: string;
  price: string;
  size: string;
  description?: string;
}

const Index = () => {
  const [monuments, setMonuments] = useState<Monument[]>([]);

  const API_URL = "https://functions.poehali.dev/92a4ea52-a3a0-4502-9181-ceeb714f2ad6";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMonuments(data))
      .catch(err => console.error("Error loading monuments:", err));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-roboto">
      <Header />
      <HeroSection />
      <CatalogSection monuments={monuments} />
      <ServicesSection />
      <PortraitSection />
      <GallerySection />
      <PricesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
