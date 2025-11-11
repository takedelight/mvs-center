# MVS Client

Фронтенд застосунок для системи **MVS Center**.
Проєкт складається з двох частин:

---

## Встановлення та запуск

### 1. Клонування та запуск API

```bash
git clone https://github.com/takedelight/mvs-center-api.git
cd mvs-center-api
npm install
```

Скопіюйте приклад конфігурації:

```bash
cp .env.example .env
```

Запустіть базу даних і сервер у Docker:

```bash
docker-compose up -d
```

> Переконайтесь, що порт `5432` (PostgreSQL) не зайнятий іншими процесами.

---

### 2. Клонування та запуск клієнта

```bash
git clone https://github.com/takedelight/mvs-center.git
cd mvs-center
npm install
npm run dev
```
