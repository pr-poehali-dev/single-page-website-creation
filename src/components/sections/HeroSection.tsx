import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 md:py-32 bg-secondary overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://cdn.poehali.dev/files/8250ec23-b3d9-4d40-8aad-d4400cf81768.PNG"
          alt="Памятник фон"
          className="w-full h-full object-contain object-right"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1fr,auto] gap-8 lg:gap-12 items-center">
          <div className="max-w-3xl">
            <h2 className="font-oswald font-bold text-4xl md:text-6xl mb-6 animate-fade-in">
              Изготовление памятников из гранита
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
              Более 16 лет создаём памятники, которые сохраняют память о ваших близких
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" className="text-primary" size={16} />
                </div>
                <span>Собственное производство</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" className="text-primary" size={16} />
                </div>
                <span>Гарантия до 10 лет</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" className="text-primary" size={16} />
                </div>
                <span>Доставка и установка</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg px-8 py-6"
                onClick={() => navigate('/constructor')}
              >
                <Icon name="Wrench" className="mr-2" size={20} />
                СОЗДАТЬ ПРОЕКТ
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="font-oswald text-lg px-8 py-6"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl p-8 shadow-2xl overflow-hidden w-[280px] h-[280px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
              
              <div className="relative z-10 text-primary-foreground text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl border-4 border-white/40 mb-4 shadow-lg px-[13px]">
                  <div>
                    <div className="font-oswald font-bold text-6xl leading-none">25%</div>
                    <div className="font-oswald text-sm mt-1">СКИДКА</div>
                  </div>
                </div>
                <div className="font-oswald text-xl font-bold mb-1">НА ПОРТРЕТ</div>
                <div className="text-sm opacity-90">При заказе памятника</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
