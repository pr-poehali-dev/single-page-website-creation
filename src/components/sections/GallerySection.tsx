const GallerySection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Наши работы
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Примеры выполненных проектов — качество, которому доверяют
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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

            <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img 
                src="https://cdn.poehali.dev/files/6f5b52e2-08d6-473f-838f-e3ffd77bc1cf.jpg"
                alt="Вертикальный памятник с портретом"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-oswald font-bold text-xl mb-2">Вертикальные стелы</h3>
                  <p className="text-sm opacity-90">С профессиональной гравировкой портрета</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img 
                src="https://cdn.poehali.dev/files/a92e8f49-5be4-4b4b-939f-e97e69b14d55.jpg"
                alt="Памятник с цветником"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-oswald font-bold text-xl mb-2">Мемориальные комплексы</h3>
                  <p className="text-sm opacity-90">С благоустройством и цветником</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img 
                src="https://cdn.poehali.dev/files/e4f88cd9-b74c-4b96-bf11-ab78a26bc19a.jpg"
                alt="Элитный памятник"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-oswald font-bold text-xl mb-2">Элитные памятники</h3>
                  <p className="text-sm opacity-90">Эксклюзивный дизайн по индивидуальному проекту</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
