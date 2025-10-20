import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const PortraitSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Профессиональная ретушь портретов
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Превратим любое фото в идеальное изображение для памятника
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] bg-secondary">
                  <img 
                    src="https://cdn.poehali.dev/files/a7e2b5c8-444e-4895-b70e-a11e197150b5.png"
                    alt="Ретушь мужского портрета"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-oswald font-semibold text-sm">
                    ПОСЛЕ ОБРАБОТКИ
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] bg-secondary">
                  <img 
                    src="https://cdn.poehali.dev/files/9ca0c748-52ff-4d52-984c-a84b6c09e20d.png"
                    alt="Ретушь женского портрета"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-oswald font-semibold text-sm">
                    ПОСЛЕ ОБРАБОТКИ
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-[2fr,1fr] gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="font-oswald font-bold text-2xl">
                    Что входит в обработку портрета
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="ImagePlus" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-oswald font-bold text-xl mb-2">Улучшение качества</h3>
                        <div className="text-muted-foreground">
                          Восстановим даже старые и повреждённые фотографии
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Palette" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-oswald font-bold text-xl mb-2">Цветокоррекция</h3>
                        <div className="text-muted-foreground">
                          Сделаем изображение ярким и естественным
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Sparkles" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-oswald font-bold text-xl mb-2">Ретушь и детализация</h3>
                        <div className="text-muted-foreground">
                          Уберём дефекты, добавим чёткости и деталей
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Eye" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-oswald font-bold text-xl mb-2">3D макет перед изготовлением</h3>
                        <div className="text-muted-foreground">
                          Покажем, как будет выглядеть памятник до начала работ
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Target" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-oswald font-bold text-xl mb-2">Подбор в рамках бюджета</h3>
                        <div className="text-muted-foreground">
                          Предложим оптимальные варианты под ваш бюджет
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="Phone" size={20} className="text-primary" />
                      <span className="font-oswald font-bold text-lg">Бесплатная консультация</span>
                    </div>
                    <Button 
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ ДИЗАЙНЕРА
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group overflow-hidden rounded-lg">
                    <img 
                      src="https://cdn.poehali.dev/files/ff61127a-f19b-45fb-a0b0-0de645b1e942.jpg"
                      alt="Вариант памятника 1"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative group overflow-hidden rounded-lg">
                    <img 
                      src="https://cdn.poehali.dev/files/87bc9d45-ccf5-4b6f-b17d-69c46b43b750.jpg"
                      alt="Вариант памятника 2"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative group overflow-hidden rounded-lg">
                    <img 
                      src="https://cdn.poehali.dev/files/7f31e6e3-9dc6-46ab-bfec-7a04f3815530.jpg"
                      alt="Вариант памятника 3"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative group overflow-hidden rounded-lg">
                    <img 
                      src="https://cdn.poehali.dev/files/5e1d3c51-eff5-4f46-9ef3-fc1a50c7cfb0.jpg"
                      alt="Вариант памятника 4"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PortraitSection;
