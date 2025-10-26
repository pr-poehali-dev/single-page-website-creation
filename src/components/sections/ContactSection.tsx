import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Новая заявка с сайта%0A%0AИмя: ${formData.name}%0AТелефон: ${formData.phone}%0AСообщение: ${formData.message || 'не указано'}`;
    const whatsappUrl = `https://wa.me/79960681168?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
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
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <Textarea 
                    placeholder="Расскажите подробнее о вашем заказе"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-background border-border min-h-[100px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg"
                >
                  <Icon name="Send" className="mr-2" size={20} />
                  ОТПРАВИТЬ ЗАЯВКУ
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <h3 className="font-oswald font-bold text-xl mb-6">Наши контакты</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <Icon name="Phone" size={32} className="text-primary mx-auto mb-3" />
                  <div className="font-oswald font-bold mb-1">Телефон</div>
                  <a href="tel:+79960681168" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    8 (996) 068-11-68
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <Icon name="MessageCircle" size={32} className="text-primary mx-auto mb-3" />
                  <div className="font-oswald font-bold mb-1">WhatsApp</div>
                  <a href="https://wa.me/79960681168" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Написать в WhatsApp
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <Icon name="Send" size={32} className="text-primary mx-auto mb-3" />
                  <div className="font-oswald font-bold mb-1">Telegram</div>
                  <a href="https://t.me/79960681168" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Написать в Telegram
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;