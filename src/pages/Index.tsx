import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const monuments = [
    {
      image: "https://cdn.poehali.dev/files/692de6e1-c8ae-42f8-ac61-0d8770aeb8ec.png",
      title: "Вертикальные памятники",
      price: "от 15 000 ₽",
      size: "100x50x5"
    },
    {
      image: "https://cdn.poehali.dev/files/a6e29eb2-0f18-47ca-917e-adac360db4c3.jpeg",
      title: "Эксклюзивные памятники",
      price: "от 45 000 ₽",
      size: "120x60x8"
    },
    {
      image: "https://cdn.poehali.dev/files/e1b733d5-8a5c-4f60-9df4-9e05bb711cf9.jpeg",
      title: "Комплексы на могилу",
      price: "от 80 000 ₽",
      size: "комплект"
    }
  ];

  const services = [
    { icon: "Hammer", title: "Изготовление памятников", desc: "От простых до эксклюзивных" },
    { icon: "Image", title: "Портреты и гравировка", desc: "Идеальное качество" },
    { icon: "Palette", title: "Художественная резьба", desc: "Ангелы, цветы, узоры" },
    { icon: "Truck", title: "Доставка и установка", desc: "По всей области" },
    { icon: "FileText", title: "Оформление документов", desc: "Все разрешения" },
    { icon: "Wrench", title: "Благоустройство могил", desc: "Полный комплекс работ" }
  ];

  const advantages = [
    { icon: "Award", title: "16 лет опыта", desc: "Работаем с 2008 года" },
    { icon: "Users", title: "2000+ клиентов", desc: "Положительные отзывы" },
    { icon: "Shield", title: "Гарантия качества", desc: "До 10 лет" },
    { icon: "Clock", title: "Точные сроки", desc: "Договор с датами" }
  ];

  const prices = [
    { name: "Памятник 100x50x5", price: "от 15 000 ₽" },
    { name: "Памятник 120x60x8", price: "от 25 000 ₽" },
    { name: "Эксклюзивный памятник", price: "от 45 000 ₽" },
    { name: "Портрет на памятник", price: "от 5 000 ₽" },
    { name: "Гравировка текста", price: "от 1 500 ₽" },
    { name: "Художественная резьба", price: "от 10 000 ₽" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-roboto">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-oswald font-bold text-2xl text-primary">ГРАНИТНЫЕ ПАМЯТНИКИ</h1>
              <p className="text-xs text-muted-foreground">Производство с 2008 года</p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#prices" className="hover:text-primary transition-colors">Цены</a>
              <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="tel:+79960681168" className="flex items-center gap-1.5 font-oswald font-bold text-base hover:text-primary transition-colors whitespace-nowrap">
                <Icon name="Phone" size={18} />
                8 (996) 068-11-68
              </a>
              <a href="https://wa.me/79960681168" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg transition-colors">
                <Icon name="MessageCircle" size={18} />
              </a>
              <a href="https://t.me/79960681168" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition-colors">
                <Icon name="Send" size={18} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-32 bg-secondary overflow-hidden">
        {/* Фоновое изображение */}
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

            {/* Баннер скидки - квадратный */}
            <div className="relative animate-fade-in">
              <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl p-8 shadow-2xl overflow-hidden w-[280px] h-[280px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                
                <div className="relative z-10 text-primary-foreground text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl border-4 border-white/40 mb-4 shadow-lg px-[13px]">
                    <div>
                      <div className="font-oswald font-bold text-6xl leading-none">25%</div>
                      <div className="text-sm font-bold mt-1">СКИДКА</div>
                    </div>
                  </div>
                  
                  <div className="font-oswald font-bold text-2xl mb-2">
                    АКЦИЯ!
                  </div>
                  
                  <div className="text-sm opacity-90">
                    На все памятники до конца месяца
                  </div>
                </div>
              </div>
              
              {/* Декоративные элементы */}
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Помощь дизайнера */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Помощь дизайнера в подборе памятника
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Не знаете, какой памятник выбрать? Наш дизайнер поможет подобрать идеальный вариант
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-card border-border shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Palette" size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-oswald font-bold text-xl mb-2">Индивидуальный подход</h3>
                          <div className="text-muted-foreground">
                            Учтём все ваши пожелания: форму, размер, материал, декоративные элементы
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Image" size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-oswald font-bold text-xl mb-2">Визуализация</h3>
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="relative group overflow-hidden rounded-lg">
                      <img 
                        src="https://cdn.poehali.dev/files/a2c6a92c-4a27-4268-a9b2-25eac2f8dad9.jpg"
                        alt="Вариант памятника 2"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="relative group overflow-hidden rounded-lg col-span-2">
                      <img 
                        src="https://cdn.poehali.dev/files/a3bce19f-dfe6-4d50-b322-ddd2ed85257a.jpg"
                        alt="Вариант памятника 3"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-0 my-0"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Каталог памятников
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Выберите готовый вариант или закажите индивидуальный проект
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {monuments.map((item, idx) => (
              <Card 
                key={idx}
                className="bg-card border-border hover:border-primary transition-all duration-300 overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-oswald font-semibold text-xl mb-2">{item.title}</h3>
                  <div className="text-sm text-muted-foreground mb-4">Размер: {item.size} см</div>
                  <div className="flex justify-between items-center">
                    <span className="font-oswald text-2xl text-primary">{item.price}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="font-oswald"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Заказать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="font-oswald"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              СМОТРЕТЬ ВЕСЬ КАТАЛОГ
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Наши услуги
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Полный комплекс услуг от изготовления до установки
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, idx) => (
              <Card 
                key={idx}
                className="bg-card border-border hover:border-primary transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={32} />
                  </div>
                  <h3 className="font-oswald font-semibold text-xl mb-2">
                    {service.title}
                  </h3>
                  <div className="text-muted-foreground text-sm">
                    {service.desc}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Профессионализм и качество проверенные временем
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {advantages.map((adv, idx) => (
              <div 
                key={idx} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={adv.icon as any} className="text-primary" size={40} />
                </div>
                <h3 className="font-oswald font-semibold text-xl mb-2">{adv.title}</h3>
                <div className="text-muted-foreground text-sm">{adv.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Ретушь фото для памятника
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Профессиональная обработка и восстановление фотографий
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-8">
                <h3 className="font-oswald font-semibold text-2xl text-center mb-8">
                  Пример реставрации старой фотографии
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative aspect-[3/4] mb-4 rounded-lg overflow-hidden border-2 border-border bg-secondary">
                      <img 
                        src="https://cdn.poehali.dev/files/3e19395b-495c-4eef-91ce-74b56fbffe66.jpg"
                        alt="Фото до реставрации"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-secondary text-foreground px-4 py-2 rounded-lg font-oswald font-semibold text-sm border border-border">
                        ДО ОБРАБОТКИ
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="X" size={14} className="text-destructive" />
                        </div>
                        Трещины и повреждения
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="X" size={14} className="text-destructive" />
                        </div>
                        Низкая контрастность
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="X" size={14} className="text-destructive" />
                        </div>
                        Выцветшие участки
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="relative aspect-[3/4] mb-4 rounded-lg overflow-hidden border-2 border-primary bg-secondary">
                      <img 
                        src="https://cdn.poehali.dev/files/ed11db8d-2e82-4c44-a219-2b25cbe05cd3.jpg"
                        alt="Фото после реставрации"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-oswald font-semibold text-sm">
                        ПОСЛЕ ОБРАБОТКИ
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={14} className="text-primary" />
                        </div>
                        Устранены все повреждения
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={14} className="text-primary" />
                        </div>
                        Улучшена чёткость и детали
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={14} className="text-primary" />
                        </div>
                        Готово к гравировке
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] bg-secondary">
                  <img 
                    src="https://cdn.poehali.dev/files/a7e2b5c8-444e-4895-b70e-a11e197150b5.png"
                    alt="Ретушь мужского портрета"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-oswald font-semibold text-sm">
                    ПОСЛЕ ОБРАБОТКИ
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-center text-muted-foreground">Реставрация и улучшение качества</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] bg-secondary">
                  <img 
                    src="https://cdn.poehali.dev/files/7112f930-700c-4c99-a122-56bf0dbc2b2c.png"
                    alt="Ретушь женского портрета"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-oswald font-semibold text-sm">
                    ПОСЛЕ ОБРАБОТКИ
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-center text-muted-foreground">Цветокоррекция и детализация</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg px-8"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Image" className="mr-2" size={20} />
              ЗАКАЗАТЬ РЕТУШЬ ФОТО
            </Button>
          </div>
        </div>
      </section>

      {/* Наши работы - Галерея */}
      <section id="portfolio" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Наши работы
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Примеры выполненных проектов — качество, которому доверяют
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Фото 1 - Кладбище общий вид */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img 
                src="https://cdn.poehali.dev/files/bbcac88c-6deb-429e-b227-40488c7c5273.jpg"
                alt="Благоустройство территории"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-oswald font-bold text-xl mb-2">Комплексное благоустройство</h3>
                  <p className="text-sm opacity-90">Установка памятников и уход за территорией</p>
                </div>
              </div>
            </div>

            {/* Фото 2 - Памятник Хитарова */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img 
                src="https://cdn.poehali.dev/files/58ba923f-a428-4ebd-a17d-2cd8e5b523a8.jpg"
                alt="Горизонтальный памятник с гравировкой"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-oswald font-bold text-xl mb-2">Художественная гравировка</h3>
                  <p className="text-sm opacity-90">Индивидуальный дизайн и качественное исполнение</p>
                </div>
              </div>
            </div>

            {/* Фото 3 - Горизонтальный с крестом */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img 
                src="https://cdn.poehali.dev/files/c80c1bd4-c413-425a-a1fc-91dbb36a8de4.jpg"
                alt="Горизонтальный памятник с крестом"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-oswald font-bold text-xl mb-2">Горизонтальные памятники</h3>
                  <p className="text-sm opacity-90">Классический дизайн из чёрного гранита</p>
                </div>
              </div>
            </div>

            {/* Фото 4 - Из каталога */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img 
                src="https://cdn.poehali.dev/files/692de6e1-c8ae-42f8-ac61-0d8770aeb8ec.png"
                alt="Вертикальный памятник"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-oswald font-bold text-xl mb-2">Вертикальные памятники</h3>
                  <p className="text-sm opacity-90">Традиционная форма, проверенная временем</p>
                </div>
              </div>
            </div>

            {/* Фото 5 - Эксклюзивный */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img 
                src="https://cdn.poehali.dev/files/a6e29eb2-0f18-47ca-917e-adac360db4c3.jpeg"
                alt="Эксклюзивный памятник"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-oswald font-bold text-xl mb-2">Эксклюзивные проекты</h3>
                  <p className="text-sm opacity-90">Уникальный дизайн по индивидуальному заказу</p>
                </div>
              </div>
            </div>

            {/* Фото 6 - Комплекс */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img 
                src="https://cdn.poehali.dev/files/e1b733d5-8a5c-4f60-9df4-9e05bb711cf9.jpeg"
                alt="Комплекс на могилу"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-oswald font-bold text-xl mb-2">Комплексы на могилу</h3>
                  <p className="text-sm opacity-90">Полное обустройство с оградой и цветником</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg px-8"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Phone" className="mr-2" size={20} />
              ОБСУДИТЬ ВАШ ПРОЕКТ
            </Button>
          </div>
        </div>
      </section>

      <section id="prices" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Цены на памятники
            </h2>
            <div className="text-muted-foreground max-w-2xl mx-auto">
              Прозрачное ценообразование без скрытых платежей
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border mb-8">
              <CardContent className="p-0">
                {prices.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex justify-between items-center p-6 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="font-oswald text-xl text-primary">{item.price}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-secondary border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Info" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold mb-3">Что входит в стоимость:</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={12} className="text-primary" />
                        </div>
                        Изготовление памятника из качественного гранита
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={12} className="text-primary" />
                        </div>
                        Полировка всех поверхностей
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={12} className="text-primary" />
                        </div>
                        Гравировка ФИО и дат
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={12} className="text-primary" />
                        </div>
                        Упаковка для транспортировки
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      * Доставка и установка оплачиваются отдельно. Точная стоимость рассчитывается индивидуально.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg px-8"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                РАССЧИТАТЬ СТОИМОСТЬ
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
                Оставьте заявку
              </h2>
              <p className="text-muted-foreground">
                Перезвоним в течение 15 минут и ответим на все вопросы
              </p>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                    <Input 
                      placeholder="Введите ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-background border-border"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон *</label>
                    <Input 
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-background border-border"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Комментарий</label>
                    <Textarea 
                      placeholder="Опишите ваши пожелания"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg py-6"
                  >
                    ОТПРАВИТЬ ЗАЯВКУ
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </div>
                </form>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex flex-col items-center gap-4">
                    <a 
                      href="tel:+79960681168" 
                      className="flex items-center gap-2 text-2xl font-oswald font-bold hover:text-primary transition-colors"
                    >
                      <Icon name="Phone" size={28} />
                      8 (996) 068-11-68
                    </a>
                    <div className="text-sm text-muted-foreground">Звоните ежедневно с 9:00 до 20:00</div>
                    
                    <div className="flex items-center gap-3">
                      <a 
                        href="https://wa.me/79960681168" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg transition-colors"
                      >
                        <Icon name="MessageCircle" size={20} />
                        <span className="font-medium">WhatsApp</span>
                      </a>
                      <a 
                        href="https://t.me/79960681168" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition-colors"
                      >
                        <Icon name="Send" size={20} />
                        <span className="font-medium">Telegram</span>
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="MapPin" size={16} />
                      <span>Великий Новгород, ул. Державина 17, стр. 3</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=31.273500%2C58.521800&z=17&l=map&pt=31.273500,58.521800,pm2rdm"
                  width="100%" 
                  height="400" 
                  frameBorder="0"
                  className="w-full"
                  title="Великий Новгород, ул. Державина 17, стр. 3"
                  allowFullScreen
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-oswald font-bold text-xl mb-4">О компании</h3>
              <p className="text-sm text-muted-foreground">
                Производство гранитных памятников с 2008 года. Собственное производство, гарантия качества.
              </p>
            </div>

            <div>
              <h3 className="font-oswald font-bold text-xl mb-4">Контакты</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+79960681168" className="hover:text-primary transition-colors">
                    8 (996) 068-11-68
                  </a>
                </div>
                <div className="text-muted-foreground">Ежедневно с 9:00 до 20:00</div>
                <div className="flex items-center gap-2">
                  <a href="https://wa.me/79960681168" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg transition-colors text-xs">
                    <Icon name="MessageCircle" size={14} />
                    <span>WhatsApp</span>
                  </a>
                  <a href="https://t.me/79960681168" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition-colors text-xs">
                    <Icon name="Send" size={14} />
                    <span>Telegram</span>
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={16} />
                  <span>ул. Державина 17, стр. 3</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-oswald font-bold text-xl mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Изготовление памятников
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Художественная резьба
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Портреты и гравировка
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Доставка и установка
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Гранитные памятники. Все права защищены.</p>
            <p className="mt-2">Опыт и профессионализм — более 16 лет</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;