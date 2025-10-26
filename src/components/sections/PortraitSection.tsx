import RetouchForm from "@/components/RetouchForm";

const PortraitSection = () => {
  return (
    <section id="retouch" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-oswald font-bold text-3xl md:text-5xl mb-4">
              Ретушь фото для памятника
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Загрузите фото и мы подготовим его для гравировки на памятнике
            </p>
          </div>

          <RetouchForm />
        </div>
      </div>
    </section>
  );
};

export default PortraitSection;