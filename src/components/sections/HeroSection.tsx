import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium animate-fade-in">
              <Icon name="Award" size={16} className="text-primary" />
              <span>Производство памятников премиум-класса</span>
            </div>

            <div className="space-y-6">
              <h1 className="font-oswald font-bold text-5xl md:text-7xl leading-tight animate-fade-in">
                Памятники из гранита
                <span className="block text-primary mt-2">с гарантией 10 лет</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in">
                Создаём вечную память о ваших близких. Собственное производство, современное оборудование, 
                опытные мастера.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 animate-fade-in">
              <Card className="p-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Factory" className="text-primary" size={20} />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">Собственное</div>
                    <div className="text-muted-foreground">производство</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" className="text-primary" size={20} />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">Гарантия</div>
                    <div className="text-muted-foreground">до 10 лет</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Truck" className="text-primary" size={20} />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">Доставка</div>
                    <div className="text-muted-foreground">и установка</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg px-10 py-7 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={() => navigate('/constructor')}
              >
                <Icon name="Wrench" className="mr-2" size={20} />
                СОЗДАТЬ ПРОЕКТ
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="font-oswald text-lg px-10 py-7 rounded-xl border-2 hover:bg-secondary/50"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Phone" className="mr-2" size={20} />
                КОНСУЛЬТАЦИЯ
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground animate-fade-in">
              <div className="flex items-center gap-2">
                <Icon name="Users" size={18} className="text-primary" />
                <span>2000+ клиентов</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={18} className="text-primary" />
                <span>С 2008 года</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={18} className="text-primary" />
                <span>4.9 рейтинг</span>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden animate-fade-in">
            <div className="absolute -top-6 -right-6 w-full h-full rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl"></div>
            
            <Card className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur border-2 border-primary/20 overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative p-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Icon name="Sparkles" size={16} className="text-primary" />
                  <span className="text-sm font-medium">Специальное предложение</span>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-baseline gap-3">
                    <span className="font-oswald font-bold text-7xl text-primary">25%</span>
                    <span className="font-oswald text-2xl font-bold">СКИДКА</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-oswald text-2xl font-bold">
                      На гравировку портрета
                    </h3>
                    <p className="text-muted-foreground">
                      При заказе памятника в этом месяце
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <Icon name="Check" className="text-primary flex-shrink-0" size={20} />
                    <span className="text-sm">Профессиональная ретушь фото</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Check" className="text-primary flex-shrink-0" size={20} />
                    <span className="text-sm">3D макет перед изготовлением</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Check" className="text-primary flex-shrink-0" size={20} />
                    <span className="text-sm">Идеальная детализация портрета</span>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg py-6 rounded-xl shadow-lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  ВОСПОЛЬЗОВАТЬСЯ СКИДКОЙ
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Предложение действует до конца месяца
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
