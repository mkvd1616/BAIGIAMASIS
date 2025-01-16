import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();

// Папка для загрузки файлов (не используется __dirname)
const uploadDir = 'ikeltos';  // Просто указываем имя папки

// Настройка Multer
const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, uploadDir);  // Указываем папку для загрузки
    },
    filename: function (req, file, next) {
        next(null, Date.now() + '.jpg');  // Уникальное имя для каждого файла
    }
});

const upload = multer({ storage: storage });

// Middleware для обработки JSON данных
app.use(express.json());

// Настройка статического ресурса для отображения изображений
app.use('/nuotraukos', express.static(uploadDir));

// Пример маршрута для загрузки файла
app.post('/api', upload.single('nuotrauka'), (req, res) => {
    console.log(req.file); // Информация о загруженном файле
    console.log(req.body); // Информация из формы (если есть)
    res.json('Файл успешно загружен');
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер работает на порту 3000');
});
