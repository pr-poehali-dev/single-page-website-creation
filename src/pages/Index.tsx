import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const services = [
    {
      title: "Простые памятники",
      description: "Классические формы, качественный гранит, доступные цены",
      icon: "Square"
    },
    {
      title: "Художественная резьба",
      description: "Ангелы, лебеди, цветы и религиозные символы",
      icon: "Sparkles"
    },
    {
      title: "Идеальные портреты",
      description: "Высокая детализация, профессиональная обработка",
      icon: "User"
    },
    {
      title: "Эксклюзивные проекты",
      description: "Индивидуальный дизайн, сложные композиции",
      icon: "Crown"
    }
  ];

  const advantages = [
    { value: "16+", label: "лет опыта" },
    { value: "100%", label: "гранит" },
    { value: "∞", label: "внимание к деталям" }
  ];

  const gallery = [
    {
      url: "https://cdn.poehali.dev/files/692de6e1-c8ae-42f8-ac61-0d8770aeb8ec.png",
      title: "Памятник с розами и листьями",
      description: "Художественная резьба, розы"
    },
    {
      url: "https://cdn.poehali.dev/files/a6e29eb2-0f18-47ca-917e-adac360db4c3.jpeg",
      title: "Памятник с ангелом в форме сердца",
      description: "Эксклюзивная резьба, ангел"
    },
    {
      url: "https://cdn.poehali.dev/files/e1b733d5-8a5c-4f60-9df4-9e05bb711cf9.jpeg",
      title: "Разнообразие стилей и форм",
      description: "Лебеди, религиозные символы"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-roboto">
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://cdn.poehali.dev/files/e1b733d5-8a5c-4f60-9df4-9e05bb711cf9.jpeg')` }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg mb-8 font-oswald font-bold text-2xl md:text-3xl">
              <Icon name="Phone" size={28} />
              8 (996) 068-11-68
            </div>
            
            <h1 className="font-oswald font-bold text-4xl md:text-7xl mb-6 tracking-tight text-white">
              ГРАНИТНЫЕ ПАМЯТНИКИ
            </h1>
            
            <p className="text-xl md:text-3xl font-oswald font-medium text-primary mb-8">
              ОТ ПРОСТЫХ ДО ЭКСКЛЮЗИВНЫХ
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-white">
                <Icon name="Check" className="text-primary" size={24} />
                <span className="text-lg">ИДЕАЛЬНЫЕ ПОРТРЕТЫ</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Icon name="Check" className="text-primary" size={24} />
                <span className="text-lg">РАБОТА С ДИЗАЙНЕРОМ</span>
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

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-around items-center gap-8">
            {advantages.map((adv, idx) => (
              <div key={idx} className="text-center animate-fade-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="font-oswald font-bold text-5xl md:text-7xl text-primary mb-2">
                  {adv.value}
                </div>
                <div className="text-lg md:text-xl text-muted-foreground uppercase">
                  {adv.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-oswald font-bold text-3xl md:text-5xl text-center mb-12 text-primary">
            НАШИ УСЛУГИ
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <h3 className="font-oswald font-semibold text-xl mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-oswald font-bold text-3xl md:text-5xl text-center mb-4 text-primary">
            НАШИ РАБОТЫ
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Каждый памятник — это уникальное произведение, созданное с любовью и вниманием к деталям
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {gallery.map((item, idx) => (
              <Card 
                key={idx} 
                className="bg-card border-border hover:border-primary transition-all duration-300 overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-oswald font-semibold text-xl text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-6 text-primary">
              ОПЫТ И ПРОФЕССИОНАЛИЗМ
            </h2>
            <p className="text-lg md:text-xl text-foreground mb-4">
              Более 16 лет мы создаём памятники, которые сохраняют память о ваших близких
            </p>
            <p className="text-muted-foreground">
              Каждый проект — это индивидуальная работа с дизайнером. Мы используем только качественный гранит 
              и современные технологии обработки камня для создания идеальных портретов и художественной резьбы.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "Palette", title: "Индивидуальный дизайн", desc: "Работаем над каждым проектом с учетом ваших пожеланий" },
              { icon: "Shield", title: "Гарантия качества", desc: "Используем проверенные материалы и технологии" },
              { icon: "Clock", title: "Точные сроки", desc: "Соблюдаем оговоренные сроки изготовления" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon as any} className="text-primary" size={40} />
                </div>
                <h3 className="font-oswald font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl text-center mb-4 text-primary">
              СВЯЖИТЕСЬ С НАМИ
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Оставьте заявку, и мы свяжемся с вами для обсуждения проекта
            </p>
            
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input 
                      placeholder="Введите имя"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input 
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <Textarea 
                      placeholder="Опишите ваш проект или задайте вопрос"
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
                </form>
                
                <div className="mt-8 pt-8 border-t border-border text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-oswald font-bold mb-2">
                    <Icon name="Phone" className="text-primary" size={24} />
                    <a href="tel:+79960681168" className="hover:text-primary transition-colors">
                      8 (996) 068-11-68
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">Звоните ежедневно с 9:00 до 20:00</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-secondary border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 Гранитные памятники. Все права защищены.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Опыт и профессионализм — более 16 лет
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;