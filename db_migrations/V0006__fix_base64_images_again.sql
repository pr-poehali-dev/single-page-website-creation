-- Заменяем base64-изображения на placeholder (повторно, так как пользователь снова добавил base64)
UPDATE t_p78642605_single_page_website_.monuments 
SET image_url = 'https://images.unsplash.com/photo-1548247461-12b33e77f1d8?w=400'
WHERE LENGTH(image_url) > 1000;
