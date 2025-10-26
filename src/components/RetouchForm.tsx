import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const RetouchForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Размер файла не должен превышать 10 МБ");
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error("Заполните обязательные поля");
      return;
    }

    if (!selectedFile) {
      toast.error("Прикрепите фотографию");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("comment", formData.comment);
      formDataToSend.append("photo", selectedFile);

      const response = await fetch("https://functions.poehali.dev/8fc1d3aa-d848-4664-99c3-7ad60233aa64", {
        method: "POST",
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Заявка отправлена! Мы свяжемся с вами в течение 30 минут");
        setFormData({ name: "", phone: "", comment: "" });
        setSelectedFile(null);
        setPreviewUrl("");
      } else {
        toast.error(result.error || "Ошибка при отправке заявки");
      }
    } catch (error) {
      toast.error("Ошибка при отправке заявки. Попробуйте позже");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 md:p-12 shadow-lg">
        <h3 className="font-oswald font-bold text-3xl md:text-4xl text-center mb-8">
          Заказать ретушь фото
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Загрузка фото */}
          <div>
            <label className="block font-semibold mb-3 text-lg">
              Загрузите фото
            </label>
            <div className="relative">
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="photo-upload"
                className="flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed border-primary/50 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all p-8"
              >
                {previewUrl ? (
                  <div className="relative w-full">
                    <img
                      src={previewUrl}
                      alt="Предпросмотр"
                      className="max-h-[300px] mx-auto rounded-lg object-contain"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedFile(null);
                        setPreviewUrl("");
                      }}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Icon name="Upload" size={48} className="text-primary mb-4" />
                    <p className="font-oswald font-semibold text-xl text-foreground mb-2">
                      Выбрать фото
                    </p>
                    <p className="text-muted-foreground text-center">
                      с телефона или компьютера
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Имя */}
          <div>
            <label className="block font-semibold mb-3 text-lg">
              Ваше имя <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              placeholder="Как к вам обращаться?"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-14 text-base"
              required
            />
          </div>

          {/* Телефон */}
          <div>
            <label className="block font-semibold mb-3 text-lg">
              Телефон <span className="text-destructive">*</span>
            </label>
            <Input
              type="tel"
              placeholder="+7 (___) __-__-__"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-14 text-base"
              required
            />
          </div>

          {/* Комментарий */}
          <div>
            <label className="block font-semibold mb-3 text-lg">
              Комментарий
            </label>
            <Textarea
              placeholder="Опишите пожелания к ретуши (необязательно)"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="min-h-[120px] text-base resize-none"
            />
          </div>

          {/* Кнопка отправки */}
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-oswald text-xl h-16"
          >
            {loading ? (
              <>
                <Icon name="Loader2" className="animate-spin mr-2" size={24} />
                Отправка...
              </>
            ) : (
              <>
                <Icon name="Send" className="mr-2" size={24} />
                Отправить заявку
              </>
            )}
          </Button>

          <p className="text-center text-muted-foreground text-sm">
            Мы свяжемся с вами в течение 30 минут
          </p>
        </form>
      </div>
    </div>
  );
};

export default RetouchForm;