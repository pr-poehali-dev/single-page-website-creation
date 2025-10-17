import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [activeTab, setActiveTab] = useState(0);

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
    { icon: "Users", title: "2000+ довольных клиентов", desc: "Отзывы на сайте" },
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
            <div className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#prices" className="hover:text-primary transition-colors">Цены</a>
              <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
            </div>
            <a href="tel:+79960681168" className="flex items-center gap-1.5 font-oswald font-bold text-base hover:text-primary transition-colors whitespace-nowrap">
              <Icon name="Phone" size={18} />
              8 (996) 068-11-68
            </a>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="font-oswald font-bold text-4xl md:text-6xl mb-6 animate-fade-in">
              Изготовление памятников из гранита
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
              Более 16 лет создаём памятники, которые сохраняют память о ваших близких
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={24} />
                <span>Собственное производство</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={24} />
                <span>Гарантия до 10 лет</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={24} />
                <span>Доставка и установка</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-xl px-8 py-6"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-oswald font-bold text-3xl md:text-5xl text-center mb-4">
            Каталог памятников
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Выберите готовый вариант или закажите индивидуальный проект
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {monuments.map((item, idx) => (
              <Card 
                key={idx}
                className="bg-card border-border hover:border-primary transition-all duration-300 overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-oswald font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">Размер: {item.size} см</p>
                  <div className="flex justify-between items-center">
                    <span className="font-oswald text-2xl text-primary">{item.price}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
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
          <h2 className="font-oswald font-bold text-3xl md:text-5xl text-center mb-4">
            Наши услуги
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Полный комплекс услуг от изготовления до установки
          </p>

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
                  <p className="text-muted-foreground text-sm">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-oswald font-bold text-3xl md:text-5xl text-center mb-12">
            Почему выбирают нас
          </h2>

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
                <p className="text-muted-foreground text-sm">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Ретушь фото для памятника
            </h2>
            <p className="text-muted-foreground text-lg">
              Профессиональная обработка и восстановление фотографий
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
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
                  <p className="text-sm text-center text-muted-foreground">Реставрация и улучшение качества</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
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
                  <p className="text-sm text-center text-muted-foreground">Цветокоррекция и детализация</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Восстанавливаем старые фотографии • Улучшаем качество • Готовим к гравировке
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-oswald"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Image" className="mr-2" size={20} />
              ЗАКАЗАТЬ РЕТУШЬ
            </Button>
          </div>
        </div>
      </section>

      <section id="prices" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-oswald font-bold text-3xl md:text-5xl text-center mb-4">
            Цены на памятники
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Прозрачное ценообразование без скрытых платежей
          </p>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border">
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

            <div className="mt-8 p-6 bg-secondary rounded-lg">
              <div className="flex items-start gap-4">
                <Icon name="Info" className="text-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-semibold mb-2">Что входит в стоимость:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Изготовление памятника из качественного гранита</li>
                    <li>• Полировка всех поверхностей</li>
                    <li>• Гравировка ФИО и дат</li>
                    <li>• Упаковка для транспортировки</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4">
                    * Доставка и установка оплачиваются отдельно. Точная стоимость рассчитывается индивидуально.
                  </p>
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
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl text-center mb-4">
              Оставьте заявку
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Перезвоним в течение 15 минут и ответим на все вопросы
            </p>

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

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
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
                    <p className="text-sm text-muted-foreground">Звоните ежедневно с 9:00 до 20:00</p>
                  </div>
                </div>
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
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+79960681168" className="hover:text-primary transition-colors">
                    8 (996) 068-11-68
                  </a>
                </p>
                <p className="text-muted-foreground">Ежедневно с 9:00 до 20:00</p>
              </div>
            </div>

            <div>
              <h3 className="font-oswald font-bold text-xl mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Изготовление памятников</li>
                <li>• Художественная резьба</li>
                <li>• Портреты и гравировка</li>
                <li>• Доставка и установка</li>
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