# StaffNook.Frontend

## Для запуска

Для клонирования и запуска вам потребуется [Git](https://git-scm.com) и [Node.js](https://nodejs.org/en/download/) (который поставляется с [npm](http://npmjs.com)) установленные на ваш компьютер. Из вашей командной строки:

```bash
# Клонируйте репозиторий
git clone https://github.com/ipanagushin/StaffNook.Frontend.git
# Перейдите в папку с клонированным репозиторием
cd StaffNook.Frontend
# Установка зависимостей
npm install
# Запуск приложения
npm run dev
```

## Переменные окружения

Для корректной работы приложения, вам необходимо определить следующие переменные окружения. Создайте файл `.env` в корне вашего проекта и укажите их значения.

1. **VITE_API_URL**
   Эта переменная определяет URL API.

   Пример:

   ```plaintext
   VITE_API_URL="http://localhost:5000"
   ```

2. **VITE_STORAGE_SECRET_KEY**
   Эта переменная представляет собой секретный ключ, который используется для обеспечения безопасности данных хранящихся в браузере пользователей. Это может быть любая строка символов. Убедитесь, что ключ достаточно сложен, чтобы предотвратить несанкционированный доступ.

   Пример:

   ```plaintext
   VITE_STORAGE_SECRET_KEY="mysecretkey123"
   ```
