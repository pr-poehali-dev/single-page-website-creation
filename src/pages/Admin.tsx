import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

interface Monument {
  id?: number;
  title: string;
  image_url: string;
  price: string;
  size: string;
  description?: string;
}

const Admin = () => {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Monument>({
    title: "",
    image_url: "",
    price: "",
    size: "",
    description: ""
  });

  const API_URL = "https://functions.poehali.dev/92a4ea52-a3a0-4502-9181-ceeb714f2ad6";
  const UPLOAD_URL = "https://functions.poehali.dev/96dcc1e1-90f9-4b11-b0c7-2d66559ddcbb";

  useEffect(() => {
    fetchMonuments();
  }, []);

  const fetchMonuments = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMonuments(data);
    } catch (error) {
      console.error("Error fetching monuments:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      }

      setFormData({ title: "", image_url: "", price: "", size: "", description: "" });
      setEditingId(null);
      fetchMonuments();
    } catch (error) {
      console.error("Error saving monument:", error);
    }
  };

  const handleEdit = (monument: Monument) => {
    setFormData(monument);
    setEditingId(monument.id || null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить этот памятник?")) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      fetchMonuments();
    } catch (error) {
      console.error("Error deleting monument:", error);
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", image_url: "", price: "", size: "", description: "" });
    setEditingId(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const extension = file.name.split('.').pop() || 'jpg';

        const response = await fetch(UPLOAD_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64,
            extension: extension
          })
        });

        const data = await response.json();

        if (data.url) {
          setFormData({ ...formData, image_url: data.url });
        } else {
          alert('Ошибка загрузки изображения');
        }

        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка загрузки изображения');
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-oswald font-bold text-4xl mb-2">Админ-панель</h1>
          <p className="text-muted-foreground">Управление каталогом памятников</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-oswald">
                {editingId ? "Редактировать памятник" : "Добавить памятник"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Название *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Вертикальные памятники"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Изображение *</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="flex-1"
                      />
                      {uploading && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Loader2" className="animate-spin" size={16} />
                          Загрузка...
                        </div>
                      )}
                    </div>
                    <Input
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="или вставьте URL: https://..."
                      required
                    />
                    {formData.image_url && (
                      <div className="relative w-full h-40 bg-secondary rounded overflow-hidden">
                        <img
                          src={formData.image_url}
                          alt="Превью"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Цена *</label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="от 15 000 ₽"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Размер *</label>
                  <Input
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="100x50x5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Описание</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Дополнительная информация"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Icon name={editingId ? "Save" : "Plus"} className="mr-2" size={18} />
                    {editingId ? "Сохранить" : "Добавить"}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Отмена
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="font-oswald font-bold text-2xl">Список памятников</h2>
            {monuments.map((monument) => (
              <Card key={monument.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={monument.image_url}
                      alt={monument.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-oswald font-bold text-lg">{monument.title}</h3>
                      <p className="text-sm text-muted-foreground">Цена: {monument.price}</p>
                      <p className="text-sm text-muted-foreground">Размер: {monument.size}</p>
                      {monument.description && (
                        <p className="text-sm mt-1">{monument.description}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(monument)}
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(monument.id!)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;