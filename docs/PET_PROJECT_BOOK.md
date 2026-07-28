# PET PROJECT BOOK

---

# Цель

Построить современный pet-проект с инфраструктурой, максимально похожей на реальную production-среду.

Основные задачи:

- освоить Docker;
- освоить GitHub Actions;
- построить полноценный CI/CD;
- реализовать Preview Deployments;
- использовать Infrastructure as Code.

---

# Финальная архитектура

Frontend: React + Vite (SPA)

Backend: Self-hosted Convex

Database: PostgreSQL

Containers: Docker

Orchestration: Docker Compose

CI/CD: GitHub Actions

Registry: GHCR

Reverse Proxy: Traefik

Server: VPS

Preview Deployments: Wildcard DNS

---

# Финальная схема

```
Developer
     │
 git push
     │
     ▼
 GitHub
     │
     ▼
GitHub Actions
     │
     ▼
GHCR
     │
     ▼
Production VPS
     │
     ▼
Traefik
 ├── Production
 ├── Frontend Preview PR-*
 └── Full Preview PR-*
      ├── Frontend
      ├── Convex
      └── PostgreSQL
```

---

# Что уже сделано

## Локальная разработка

- ✅ установлен Docker
- ✅ установлен Docker Compose
- ✅ создан репозиторий preview-deployment-lab
- ✅ создан frontend (React + Vite)
- ✅ создан учебный backend (Node.js)
- ✅ настроен Nginx
- ✅ создан docker-compose.yml
- ✅ frontend и backend запускаются через Docker Compose

---

## GitHub

- ✅ настроен GitHub Actions
- ✅ GitHub Actions собирает frontend image
- ✅ Docker image публикуется в GHCR

Образ:

```
ghcr.io/entryfra/preview-deployment-frontend:latest
```

---

## Production VPS

- ✅ приобретен настоящий VPS
- ✅ установлена Ubuntu Server
- ✅ установлен Docker
- ✅ установлен Docker Compose
- ✅ репозиторий перенесен на VPS
- ✅ VPS переведен на SSH
- ✅ настроен Deploy Key (Read Only)
- ✅ GitHub Actions подключается к VPS по SSH
- ✅ автоматический deployment успешно работает

После каждого git push автоматически выполняется:

```
docker compose pull

docker compose up -d
```

---

# Что изучено

## Docker

- Docker Images
- Docker Containers
- Docker Compose
- Docker Registry
- Docker Layers

---

## GitHub Actions

Понял принцип работы CI/CD.

После git push автоматически запускается pipeline.

Pipeline:

```
Checkout

↓

Docker Build

↓

Docker Push

↓

SSH

↓

Production VPS

↓

docker compose pull

↓

docker compose up -d
```

---

## GitHub Registry

Научился:

- публиковать Docker Images
- скачивать их на VPS

---

## SSH

Изучено:

- SSH Keys
- authorized_keys
- known_hosts
- Deploy Keys
- GitHub Secrets

---

## Production

Понял основные принципы:

- GitHub — Source of Truth.
- Production VPS не должен делать git push.
- VPS имеет только минимально необходимые права.
- Используется Principle of Least Privilege.
- Сервер только запускает приложение.

---

# Принятые решения

Настоящий backend проекта — Self-hosted Convex.

Учебный Node.js backend используется только для изучения Docker.

Production VPS использует Deploy Key только на чтение.

Все изменения выполняются только через GitHub.

---

# Текущая архитектура

```
Developer

↓

Git Push

↓

GitHub

↓

GitHub Actions

↓

Docker Build

↓

GHCR

↓

SSH

↓

Production VPS

↓

docker compose pull

↓

docker compose up -d
```

---

# Следующий этап

Следующий крупный этап проекта:

## Traefik

Нужно:

- заменить Nginx на Traefik;
- настроить reverse proxy;
- подготовить инфраструктуру для Preview Deployments.

---

# План проекта

## Этап 1

- ✅ Docker
- ✅ Docker Compose
- ✅ GitHub Actions
- ✅ Production Deploy

---

## Этап 2

- ⏳ Traefik

---

## Этап 3

- ⏳ Wildcard DNS

---

## Этап 4

- ⏳ Frontend Preview

---

## Этап 5

- ⏳ Self-hosted Convex

---

## Этап 6

- ⏳ PostgreSQL

---

## Этап 7

- ⏳ Full Preview Deployments

---

# Правило проекта

Этот файл является единственным источником правды.

Каждый завершенный этап обязан содержать:

- что сделано;
- чему научился;
- какие решения были приняты;
- текущую архитектуру;
- следующий этап.


## Новое

- Traefik встроен в основной docker-compose.yml.
- Nginx удалён из основной архитектуры.
- Frontend полностью работает через Traefik.
- Разобрана архитектура:
  EntryPoint → Router → Service → Container.
- Следующий этап:
  подключить backend через Traefik и убрать внешний порт 3000.



  Глава: Preview Deployment
# Preview Deployment

## Архитектура

Developer
    │
git push
    │
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ▼
Build
    │
    ▼
Docker Image
    │
    ▼
GHCR
    │
    ▼
SSH
    │
    ▼
VPS
    │
    ▼
Traefik
    │
    ▼
Preview Container
Что делает Traefik

Очень простыми словами:

Traefik — это диспетчер.

Он получает запрос.

Смотрит:

На какой домен пришёл пользователь?

Если:

pr-5.preview.santailya.ru

↓

отправляет пользователя
в контейнер Preview-5.
Что делает DNS
DNS не знает ничего про Docker.

Он знает только:

какому IP принадлежит домен.
Wildcard DNS
*.preview.santailya.ru

↓

Все адреса

pr-1.preview...

pr-2.preview...

pr-999.preview...

ведут на один VPS.
GitHub Actions Preview
PR

↓

Checkout

↓

Install

↓

Lint

↓

Build

↓

Docker Build

↓

Push GHCR

↓

SSH

↓

docker compose

↓

Preview готов
Кто за что отвечает
DNS

↓

Находит сервер

--------------------

Traefik

↓

Находит контейнер

--------------------

GitHub Actions

↓

Создаёт контейнер
Git Flow
main

│

├── feature/login

├── feature/preview

├── feature/backend

↓

Pull Request

↓

Preview

↓

Merge

↓

main
GHCR
Образы НЕ лежат на VPS.

Они лежат в GHCR.

VPS их только скачивает.
Что осталось
□ Production Deployment

□ HTTPS

□ Convex

□ Full Preview Stack

□ Kubernetes

