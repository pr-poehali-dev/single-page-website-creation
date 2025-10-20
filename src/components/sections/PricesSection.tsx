import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const PricesSection = () => {
  const prices = [
    { name: "Памятник 100x50x5", price: "от 15 000 ₽" },
    { name: "Памятник 120x60x8", price: "от 25 000 ₽" },
    { name: "Эксклюзивный памятник", price: "от 45 000 ₽" },
    { name: "Портрет на памятник", price: "от 5 000 ₽" },
    { name: "Гравировка текста", price: "от 1 500 ₽" },
    { name: "Художественная резьба", price: "от 10 000 ₽" }
  ];

  return (
    <section id="prices" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Цены на памятники
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Прозрачные цены без скрытых платежей
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {prices.map((item, idx) => (
              <Card 
                key={idx}
                className="bg-card border-border hover:border-primary transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-oswald font-semibold text-lg flex-1">{item.name}</h3>
                    <Icon name="Check" size={20} className="text-primary flex-shrink-0 ml-2" />
                  </div>
                  <div className="font-oswald text-2xl text-primary">{item.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="font-oswald font-bold text-2xl mb-2">
                  Что входит в стоимость?
                </h3>
                <p className="text-muted-foreground">
                  Полный комплекс работ под ключ
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Материалы</div>
                    <div className="text-sm text-muted-foreground">Качественный гранит проверенных поставщиков</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Изготовление</div>
                    <div className="text-sm text-muted-foreground">Работа на современном оборудовании</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Гравировка</div>
                    <div className="text-sm text-muted-foreground">Портреты, текст, орнаменты</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Полировка</div>
                    <div className="text-sm text-muted-foreground">Идеальная финишная обработка</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Доставка</div>
                    <div className="text-sm text-muted-foreground">По всей области, бережная перевозка</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Установка</div>
                    <div className="text-sm text-muted-foreground">Профессиональный монтаж на месте</div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg px-8"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  РАССЧИТАТЬ СТОИМОСТЬ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricesSection;
