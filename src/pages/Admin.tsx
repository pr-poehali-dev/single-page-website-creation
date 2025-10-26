import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
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

    // Валидация обязательных полей
    if (!formData.title.trim()) {
      alert('❌ Пожалуйста, введите название памятника');
      return;
    }
    if (!formData.image_url.trim()) {
      alert('❌ Пожалуйста, загрузите изображение памятника');
      return;
    }
    if (!formData.price.trim()) {
      alert('❌ Пожалуйста, укажите цену');
      return;
    }
    if (!formData.size.trim()) {
      alert('❌ Пожалуйста, укажите размер');
      return;
    }

    try {
      let response;
      if (editingId) {
        response = await fetch(`${API_URL}?id=${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      }

      if (response.ok) {
        alert(editingId ? '✓ Памятник успешно обновлён' : '✓ Памятник успешно добавлен');
        setFormData({ title: "", image_url: "", price: "", size: "", description: "" });
        setEditingId(null);
        fetchMonuments();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error:', errorData);
        alert('✗ Ошибка при сохранении памятника');
      }
    } catch (error) {
      console.error("Error saving monument:", error);
      alert('✗ Ошибка при сохранении памятника');
    }
  };

  const handleEdit = (monument: Monument) => {
    setFormData(monument);
    setEditingId(monument.id || null);
  };

  const handleDelete = async (id: number) => {
    const monument = monuments.find(m => m.id === id);
    if (!confirm(`Вы уверены, что хотите удалить памятник "${monument?.title}"?\n\nЭто действие нельзя отменить.`)) return;

    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE"
      });
      
      if (response.ok) {
        alert('✓ Памятник успешно удалён');
        fetchMonuments();
      } else {
        alert('✗ Ошибка при удалении памятника');
      }
    } catch (error) {
      console.error("Error deleting monument:", error);
      alert('✗ Ошибка при удалении памятника');
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", image_url: "", price: "", size: "", description: "" });
    setEditingId(null);
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const reader = new FileReader();
      
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentLoaded = Math.round((e.loaded / e.total) * 50);
          setUploadProgress(percentLoaded);
        }
      };
      
      reader.onload = async (event) => {
        try {
          setUploadProgress(50);
          const base64 = event.target?.result as string;
          const extension = file.name.split('.').pop() || 'jpg';

          setUploadProgress(60);

          const response = await fetch(UPLOAD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              image: base64,
              extension: extension
            })
          });

          setUploadProgress(90);

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            console.error('Upload error:', errorData);
            alert(`Ошибка загрузки: ${errorData.error || 'Неизвестная ошибка'}`);
            setUploading(false);
            setUploadProgress(0);
            return;
          }

          const data = await response.json();

          if (data.url) {
            setUploadProgress(100);
            setFormData({ ...formData, image_url: data.url });
            
            setTimeout(() => {
              setUploading(false);
              setUploadProgress(0);
            }, 500);
          } else {
            alert('Ошибка: не получен URL изображения');
            setUploading(false);
            setUploadProgress(0);
          }
        } catch (error) {
          console.error('Upload error:', error);
          alert('Ошибка загрузки изображения');
          setUploading(false);
          setUploadProgress(0);
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка загрузки изображения');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
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
                    <div 
                      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragging 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {uploading ? (
                        <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
                          <Icon name="Loader2" className="animate-spin text-primary" size={40} />
                          <div className="w-full space-y-2">
                            <Progress value={uploadProgress} className="h-2" />
                            <p className="text-sm text-center text-muted-foreground font-medium">
                              Загрузка {uploadProgress}%
                            </p>
                          </div>
                        </div>
                      ) : formData.image_url ? (
                        <div className="space-y-3">
                          <div className="relative w-full h-48 bg-secondary rounded overflow-hidden">
                            <img
                              src={formData.image_url}
                              alt="Превью"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `
                                  <div class="flex flex-col items-center justify-center h-full">
                                    <svg class="w-12 h-12 text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                    </svg>
                                    <p class="text-sm text-muted-foreground">Ошибка загрузки изображения</p>
                                  </div>
                                `;
                              }}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setFormData({ ...formData, image_url: "" })}
                          >
                            <Icon name="X" className="mr-2" size={16} />
                            Удалить изображение
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Icon name="Upload" className="mx-auto text-muted-foreground" size={48} />
                          <div>
                            <p className="text-sm font-medium mb-1">
                              Перетащите изображение сюда
                            </p>
                            <p className="text-xs text-muted-foreground">
                              или нажмите, чтобы выбрать файл
                            </p>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                    <Input
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="или вставьте URL: https://..."
                      required
                    />
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
            {monuments.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-12 text-center">
                  <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">Пока нет памятников в каталоге</p>
                  <p className="text-sm text-muted-foreground">Добавьте первый памятник через форму слева</p>
                </CardContent>
              </Card>
            ) : (
              monuments.map((monument) => (
                <Card key={monument.id} className={editingId === monument.id ? 'border-primary border-2' : ''}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0 bg-secondary rounded border-2 border-border overflow-hidden">
                        <img
                          src={monument.image_url}
                          alt={monument.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                            target.parentElement!.innerHTML += `
                              <svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                              </svg>
                            `;
                          }}
                        />
                        {editingId === monument.id && (
                          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-oswald font-bold text-lg mb-1 truncate">{monument.title}</h3>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Icon name="DollarSign" size={14} />
                            {monument.price}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Icon name="Maximize2" size={14} />
                            {monument.size}
                          </p>
                        </div>
                        {monument.description && (
                          <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{monument.description}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant={editingId === monument.id ? "default" : "outline"}
                          onClick={() => handleEdit(monument)}
                          className="min-w-[100px]"
                        >
                          <Icon name="Edit" size={16} className="mr-2" />
                          Изменить
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(monument.id!)}
                          className="min-w-[100px]"
                        >
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;