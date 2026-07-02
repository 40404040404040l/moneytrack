# MoneyTrack

**MoneyTrack** — full-stack приложение для учета личных финансов. Оно помогает фиксировать доходы и расходы, распределять операции по категориям и смотреть аналитику за выбранный период.

Проект состоит из React frontend, FastAPI backend и PostgreSQL. Его можно запускать целиком через Docker Compose или отдельно поднимать frontend/backend для разработки.

## Возможности

- регистрация и авторизация пользователей;
- JWT-аутентификация;
- персональные категории доходов и расходов;
- добавление доходов, расходов и произвольных транзакций;
- фильтрация операций по периоду;
- аналитика по категориям;
- временная шкала доходов и расходов;
- Swagger-документация backend API.

## Стек

- **Frontend:** React, Vite, React Router, Axios
- **Styles:** Tailwind CSS
- **Backend:** Python, FastAPI, SQLAlchemy, Pydantic
- **Auth:** JWT, passlib, bcrypt
- **Database:** PostgreSQL
- **DevOps:** Docker, Docker Compose, Nginx для production-сборки frontend
- **Tests:** pytest, httpx

## Структура проекта

```text
moneytrack/
├── backend/
│   ├── app/
│   │   ├── main.py       # FastAPI-приложение и роуты
│   │   ├── auth.py       # JWT и хеширование паролей
│   │   ├── database.py   # Подключение SQLAlchemy
│   │   ├── models.py     # Модели БД
│   │   ├── schemas.py    # Pydantic-схемы
│   │   └── test_*.py     # Тесты
│   ├── Dockerfile
│   ├── requirements.txt
│   └── pytest.ini
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios-клиент
│   │   ├── components/   # UI-компоненты
│   │   ├── context/      # AuthContext
│   │   ├── layout/       # Navbar, Sidebar, Layout
│   │   └── pages/        # Страницы приложения
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Быстрый запуск через Docker

Требования:

- Docker
- Docker Compose

Запуск:

```bash
docker compose up -d --build
```

После запуска будут доступны:

- frontend: `http://localhost:3000`
- backend API: `http://localhost:8000`
- Swagger: `http://localhost:8000/docs`
- PostgreSQL: `localhost:5433`

Остановить сервисы:

```bash
docker compose down
```

Остановить и удалить данные БД:

```bash
docker compose down -v
```

## Локальный запуск для разработки

### 1. Подготовить PostgreSQL

Можно использовать базу из Docker Compose:

```bash
docker compose up -d db
```

Для подключения backend с локальной машины используйте порт `5433`.

### 2. Настроить backend

Создайте файл `backend/.env`:

```env
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5433/moneytrack
SECRET_KEY=change-this-secret-key
```

Установка зависимостей и запуск:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Для Windows активация окружения:

```bash
.venv\Scripts\activate
```

### 3. Настроить frontend

При необходимости создайте `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

Установка зависимостей и запуск:

```bash
cd frontend
npm install
npm run dev
```

Frontend в dev-режиме будет доступен по адресу:

```text
http://localhost:5173
```

## Тесты

Backend:

```bash
cd backend
pytest -v
```

Через скрипт:

```bash
./run_tests.sh -v
```

Отдельный файл:

```bash
pytest app/test_auth.py -v
```

## Основные API endpoints

| Метод | Endpoint | Назначение |
| --- | --- | --- |
| `GET` | `/health` | Проверка состояния API |
| `POST` | `/register` | Регистрация пользователя |
| `POST` | `/token` | Получение JWT-токена |
| `GET` | `/categories` | Список категорий пользователя |
| `POST` | `/categories` | Создание категории |
| `DELETE` | `/categories/{id}` | Удаление категории |
| `GET` | `/transactions` | Список транзакций |
| `POST` | `/transactions` | Создание транзакции |
| `POST` | `/income` | Быстрое добавление дохода |
| `POST` | `/expense` | Быстрое добавление расхода |
| `GET` | `/analytics` | Общая аналитика |
| `GET` | `/analytics/categories` | Аналитика по категориям |
| `GET` | `/analytics/timeline` | Данные для временной шкалы |

## Полезные команды

```bash
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend
docker compose up -d --build
```

## Примечания

- Backend автоматически создает таблицы через SQLAlchemy при старте приложения.
- При регистрации пользователя создается набор базовых категорий.
- Для production обязательно замените `SECRET_KEY`.
- Файлы `.env` не должны попадать в git.
