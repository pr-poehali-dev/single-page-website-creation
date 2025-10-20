-- Создание таблицы для памятников в каталоге
CREATE TABLE IF NOT EXISTS monuments (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    size VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных данных
INSERT INTO monuments (image_url, title, price, size) VALUES
('https://cdn.poehali.dev/files/5e942f45-1c38-42c5-b8f6-4e37f326c4d1.jpeg', 'Горизонтальные памятники', 'от 25 000 ₽', '120x60x8'),
('https://cdn.poehali.dev/files/692de6e1-c8ae-42f8-ac61-0d8770aeb8ec.png', 'Вертикальные памятники', 'от 15 000 ₽', '100x50x5'),
('https://cdn.poehali.dev/files/a6e29eb2-0f18-47ca-917e-adac360db4c3.jpeg', 'Эксклюзивные памятники', 'от 45 000 ₽', '120x60x8'),
('https://cdn.poehali.dev/files/e1b733d5-8a5c-4f60-9df4-9e05bb711cf9.jpeg', 'Комплексы на могилу', 'от 80 000 ₽', 'комплект');