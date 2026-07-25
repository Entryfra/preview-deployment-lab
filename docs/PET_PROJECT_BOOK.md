# PET PROJECT BOOK

## Цель

За 5 дней собрать учебный pet-проект с автоматическим CI/CD и Preview Deployments.

## Финальная архитектура

- Frontend: React + Vite, SPA
- Backend: Self-hosted Convex
- Database: Postgres
- Контейнеры: Docker
- Управление сервисами: Docker Compose
- CI/CD: GitHub Actions
- Registry: GHCR
- Reverse proxy: Traefik
- Сервер: VPS
- Preview-домены: wildcard DNS

## Финальная схема

```text
GitHub
   ↓
GitHub Actions
   ↓
GHCR
   ↓
VPS
   ↓
Traefik
   ├── Production
   ├── Frontend Preview PR-*
   └── Full Preview PR-*
          ├── Frontend
          ├── Self-hosted Convex
          └── Postgres
```

## Что уже сделано

- Установлены Docker и Docker Compose.
- Создан репозиторий preview-deployment-lab.
- Создан frontend на React + Vite.
- Создан учебный Node.js backend.
- Создан Nginx reverse proxy.
- Создан docker-compose.yml.
- Frontend и backend запускаются через Docker Compose.
- Настроен GitHub Actions.
- GitHub Actions собирает frontend Docker image.
- Frontend image публикуется в GHCR:
  ghcr.io/entryfra/preview-deployment-frontend:latest
- Создан SSH-ключ для GitHub Actions.
- В GitHub Secrets добавлены:
  - SSH_PRIVATE_KEY
  - SERVER_HOST
  - SERVER_USER

## Принятые решения

- Настоящий backend проекта — Self-hosted Convex.
- Отдельного Node.js backend в финальной архитектуре не будет.
- Учебный Node.js backend пока существует в репозитории, но развивать его не будем.
- Сначала делаем автоматический deploy ветки main.
- Затем устанавливаем Traefik.
- Потом делаем frontend preview.
- После этого добавляем Self-hosted Convex и Postgres.
- Последний этап — full preview для каждого PR.

## Текущая точка

Frontend image уже собирается в GitHub Actions и загружается в GHCR.

Следующий этап:

```text
GitHub Actions
   ↓ SSH
VPS
   ↓
docker compose pull
   ↓
docker compose up -d
```

То есть нужно сделать автоматический deployment ветки main на сервер.

## План на 5 дней

### День 1

- Зафиксировать документацию.
- Сделать автоматический deploy frontend из main на VPS.

### День 2

- Установить Traefik.
- Подключить production-маршрут.
- Настроить домен или проверить через тестовый адрес.

### День 3

- Настроить wildcard DNS.
- Сделать frontend-only preview по номеру PR.

### День 4

- Настроить удаление preview после закрытия PR.
- Добавить Self-hosted Convex и Postgres.

### День 5

- Сделать full preview.
- Проверить весь жизненный цикл.
- Привести документацию и репозиторий в порядок.

## Правило работы

Этот файл является единственным источником правды.

В начале нового чата файл нужно загрузить и написать:

«Продолжаем pet-проект. Используй PET_PROJECT_BOOK.md как источник истины».

После каждого завершённого этапа обновлять:

- что сделали;
- какие файлы изменили;
- какие команды использовали;
- какие ошибки возникли;
- какой следующий шаг.
