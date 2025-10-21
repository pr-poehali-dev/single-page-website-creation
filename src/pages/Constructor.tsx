import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Constructor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedSize, setSelectedSize] = useState("100x50x5");
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedStyle, setSelectedStyle] = useState("vertical");
  const [selectedDecor, setSelectedDecor] = useState<string[]>([]);
  const [hasOgrada, setHasOgrada] = useState(false);
  const [hasCvetnik, setHasCvetnik] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const sizes = [
    { id: "100x50x5", label: "100×50×5 см", price: 15000 },
    { id: "120x60x8", label: "120×60×8 см", price: 25000 },
    { id: "140x70x10", label: "140×70×10 см", price: 35000 },
    { id: "custom", label: "Индивидуальный размер", price: 0 }
  ];

  const colors = [
    { id: "black", label: "Чёрный гранит", hex: "#1a1a1a" },
    { id: "red", label: "Красный гранит", hex: "#8B4513" },
    { id: "gray", label: "Серый гранит", hex: "#696969" },
    { id: "green", label: "Зелёный гранит", hex: "#2F4F4F" }
  ];

  const styles = [
    { id: "vertical", label: "Вертикальный", image: "https://cdn.poehali.dev/files/692de6e1-c8ae-42f8-ac61-0d8770aeb8ec.png" },
    { id: "horizontal", label: "Горизонтальный", image: "https://cdn.poehali.dev/files/c80c1bd4-c413-425a-a1fc-91dbb36a8de4.jpg" },
    { id: "exclusive", label: "Эксклюзивный", image: "https://cdn.poehali.dev/files/a6e29eb2-0f18-47ca-917e-adac360db4c3.jpeg" }
  ];

  const decorOptions = [
    { id: "cross", label: "Православный крест", price: 3000 },
    { id: "flowers", label: "Резные цветы", price: 8000 },
    { id: "angel", label: "Ангел", price: 15000 },
    { id: "birch", label: "Берёза", price: 10000 }
  ];

  const toggleDecor = (id: string) => {
    setSelectedDecor(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Пожалуйста, выберите изображение');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Файл слишком большой. Максимум 10 МБ');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://api.poehali.dev/storage/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки');
      }

      const data = await response.json();
      setUploadedPhoto(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Не удалось загрузить фото. Попробуйте ещё раз');
    } finally {
      setIsUploading(false);
    }
  };

  const calculatePrice = () => {
    let total = sizes.find(s => s.id === selectedSize)?.price || 0;
    
    selectedDecor.forEach(decorId => {
      const decor = decorOptions.find(d => d.id === decorId);
      if (decor) total += decor.price;
    });

    if (hasOgrada) total += 20000;
    if (hasCvetnik) total += 15000;

    return total;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-roboto">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад
              </Button>
              <div>
                <h1 className="font-oswald font-bold text-xl text-primary">КОНСТРУКТОР ПАМЯТНИКА</h1>
                <p className="text-xs text-muted-foreground">Создайте свой уникальный проект</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <a href="tel:+79960681168" className="flex items-center gap-1.5 font-oswald font-bold text-base hover:text-primary transition-colors">
                <Icon name="Phone" size={18} />
                8 (996) 068-11-68
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Левая часть - настройки */}
          <div className="space-y-8">
            {/* Размер */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Maximize2" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-oswald font-bold text-2xl">Размер памятника</h2>
                    <p className="text-sm text-muted-foreground">Выберите стандартный или закажите индивидуальный</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {sizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedSize === size.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-oswald font-bold text-lg">{size.label}</div>
                      {size.price > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">от {size.price.toLocaleString()} ₽</div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Форма */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Shapes" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-oswald font-bold text-2xl">Форма памятника</h2>
                    <p className="text-sm text-muted-foreground">Классические и эксклюзивные варианты</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {styles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                        selectedStyle === style.id 
                          ? 'border-primary' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="aspect-[3/4] bg-secondary">
                        <img 
                          src={style.image} 
                          alt={style.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 text-center font-oswald font-semibold">
                        {style.label}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Цвет */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Palette" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-oswald font-bold text-2xl">Цвет гранита</h2>
                    <p className="text-sm text-muted-foreground">Выберите материал для памятника</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {colors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                        selectedColor === color.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div 
                        className="w-12 h-12 rounded border-2 border-border"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <div className="font-oswald font-semibold text-lg text-left">{color.label}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Загрузка фото */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Image" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-oswald font-bold text-2xl">Фотография для портрета</h2>
                    <p className="text-sm text-muted-foreground">Загрузите фото для гравировки на памятнике</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {uploadedPhoto ? (
                    <div className="relative rounded-lg overflow-hidden border-2 border-primary/20">
                      <img 
                        src={uploadedPhoto} 
                        alt="Загруженное фото" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-background/90 backdrop-blur"
                          onClick={() => {
                            setUploadedPhoto(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                        >
                          <Icon name="X" size={16} className="mr-1" />
                          Удалить
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white text-sm flex items-center gap-2">
                          <Icon name="CheckCircle" size={16} className="text-green-400" />
                          Фото успешно загружено
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className={`flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                          isUploading 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary hover:bg-secondary/50'
                        }`}
                      >
                        {isUploading ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm text-muted-foreground">Загрузка фото...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon name="Upload" size={28} className="text-primary" />
                            </div>
                            <div className="text-center">
                              <p className="font-semibold mb-1">Нажмите для выбора фото</p>
                              <p className="text-sm text-muted-foreground">или перетащите файл сюда</p>
                              <p className="text-xs text-muted-foreground mt-2">Максимум 10 МБ • JPG, PNG, HEIC</p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  )}

                  {uploadError && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <Icon name="AlertCircle" size={18} className="text-red-500" />
                      <p className="text-sm text-red-500">{uploadError}</p>
                    </div>
                  )}

                  <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <Icon name="Info" size={16} className="text-primary" />
                      Рекомендации для фото:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                      <li>• Хорошее освещение и чёткость</li>
                      <li>• Лицо анфас, без солнцезащитных очков</li>
                      <li>• Высокое разрешение (минимум 1200×1600 px)</li>
                      <li>• Наши специалисты бесплатно отретушируют фото</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Декор */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Sparkles" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-oswald font-bold text-2xl">Художественные элементы</h2>
                    <p className="text-sm text-muted-foreground">Выберите декоративные элементы</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {decorOptions.map(decor => (
                    <button
                      key={decor.id}
                      onClick={() => toggleDecor(decor.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedDecor.includes(decor.id) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-oswald font-bold text-lg">{decor.label}</div>
                          <div className="text-sm text-muted-foreground mt-1">+{decor.price.toLocaleString()} ₽</div>
                        </div>
                        {selectedDecor.includes(decor.id) && (
                          <Icon name="Check" size={20} className="text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Благоустройство */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Trees" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-oswald font-bold text-2xl">Благоустройство</h2>
                    <p className="text-sm text-muted-foreground">Дополнительные элементы комплекса</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={() => setHasOgrada(!hasOgrada)}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                      hasOgrada 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-oswald font-bold text-lg">Ограда</div>
                      <div className="text-sm text-muted-foreground mt-1">Металлическая ограда вокруг участка • +20 000 ₽</div>
                    </div>
                    {hasOgrada && <Icon name="Check" size={20} className="text-primary" />}
                  </button>

                  <button
                    onClick={() => setHasCvetnik(!hasCvetnik)}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                      hasCvetnik 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-oswald font-bold text-lg">Цветник</div>
                      <div className="text-sm text-muted-foreground mt-1">Гранитный цветник с уходом • +15 000 ₽</div>
                    </div>
                    {hasCvetnik && <Icon name="Check" size={20} className="text-primary" />}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Правая часть - итоговая стоимость */}
          <div>
            <div className="sticky top-24">
              <Card className="bg-card border-border shadow-xl">
                <CardContent className="p-6">
                  <h3 className="font-oswald font-bold text-2xl mb-6">Ваш проект</h3>
                  
                  <div className="space-y-4 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Размер:</span>
                      <span className="font-semibold">{sizes.find(s => s.id === selectedSize)?.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Форма:</span>
                      <span className="font-semibold">{styles.find(s => s.id === selectedStyle)?.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Цвет:</span>
                      <span className="font-semibold">{colors.find(c => c.id === selectedColor)?.label}</span>
                    </div>
                    {selectedDecor.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Декор:</span>
                        <span className="font-semibold">{selectedDecor.length} элемента</span>
                      </div>
                    )}
                    {hasOgrada && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ограда:</span>
                        <span className="font-semibold">Да</span>
                      </div>
                    )}
                    {hasCvetnik && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Цветник:</span>
                        <span className="font-semibold">Да</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-primary/10 rounded-lg p-4 mb-6">
                    <div className="text-sm text-muted-foreground mb-1">Ориентировочная стоимость</div>
                    <div className="font-oswald font-bold text-4xl text-primary">
                      {calculatePrice().toLocaleString()} ₽
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      * Точная цена рассчитывается индивидуально
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-lg"
                      onClick={() => navigate('/?scroll=contact')}
                    >
                      <Icon name="Send" className="mr-2" size={20} />
                      ОТПРАВИТЬ ЗАЯВКУ
                    </Button>
                    
                    <Button 
                      size="lg"
                      variant="outline"
                      className="w-full font-oswald text-lg"
                      onClick={() => window.print()}
                    >
                      <Icon name="Download" className="mr-2" size={20} />
                      СОХРАНИТЬ ПРОЕКТ
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Icon name="Info" size={16} className="mt-0.5 flex-shrink-0" />
                      <p>Наш менеджер свяжется с вами для уточнения деталей и согласования проекта</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Constructor;