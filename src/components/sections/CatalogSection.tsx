import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Monument {
  id?: number;
  image_url: string;
  title: string;
  price: string;
  size: string;
  description?: string;
}

interface CatalogSectionProps {
  monuments: Monument[];
}

const CatalogSection = ({ monuments }: CatalogSectionProps) => {
  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
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
              key={item.id || idx}
              className="bg-card border-border hover:border-primary transition-all duration-300 overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.error-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'error-placeholder w-full h-full flex items-center justify-center text-muted-foreground';
                      placeholder.innerHTML = '<div class="text-center"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><p class="mt-2 text-sm">Изображение недоступно</p></div>';
                      parent.appendChild(placeholder);
                    }
                  }}
                  loading="lazy"
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
                    ЗАКАЗАТЬ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;