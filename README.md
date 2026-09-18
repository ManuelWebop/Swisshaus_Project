<div align="center">

<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>

# SwissHaus

**Plataforma fullstack para el restaurante suizo SwissHaus**

_Proyecto de portafolio_

</div>

---

## ¿Qué es SwissHaus?

SwissHaus es una plataforma web para **SwissHaus**, un restaurante suizo ubicado en Hermosillo, Sonora. Permite a los clientes consultar el menú de productos, inscribirse a eventos gastronómicos, acumular puntos de fidelidad y canjearlos por recompensas. Los administradores gestionan todo desde un panel integrado.

---

## Stack tecnológico

| Capa              | Tecnología                            | Por qué                                            |
| ----------------- | ------------------------------------- | -------------------------------------------------- |
| **Frontend**      | React 19 + TypeScript + Vite          | SPA rápida con hot reload y tipado estricto        |
| **Backend**       | NestJS + TypeScript                   | Framework modular, escalable y con DI nativa       |
| **ORM**           | Prisma                                | Type-safe, migraciones declarativas, Prisma Studio |
| **Base de datos** | PostgreSQL (Supabase)                 | Relacional robusto, hosted con Supabase            |
| **Auth**          | Supabase Auth + JWT                   | Gestión de usuarios, email confirm, reset password |
| **Storage**       | Supabase Storage                      | Imágenes de productos, eventos y avatares          |
| **Tests (back)**  | Jest + Supertest                      | Tests unitarios y E2E del API                      |
| **Tests (front)** | Vitest + Testing Library + Playwright | Tests unitarios y E2E del UI                       |

---

## Estructura del repositorio

```
swisshaus/
├── docs/
│   ├── DOCUMENTATION_BAKCEND.md   # 📖 Documentación técnica del backend
│   └── DOCUMENTATION_FRONTEND.md  # 📖 Documentación técnica del frontend
│
├── swisshaus-api/          # Backend — NestJS + Prisma
│   ├── src/
│   │   ├── modules/        # events, products, rewards, supabase, upload, backup
│   │   └── connect/        # Módulo y servicio de Prisma
│   ├── prisma/
│   │   └── schema.prisma   # Esquema de base de datos
│   └── package.json
│
├── swisshaus_web/          # Frontend — React + Vite
│   ├── src/
│   │   ├── pages/          # Una carpeta por ruta
│   │   ├── components/     # Componentes reutilizables
│   │   ├── services/       # Llamadas a la API
│   │   └── lib/api.ts      # Axios con interceptores de auth
│   ├── e2e/                # Tests Playwright
│   └── package.json
│
├── .gitignore
└── README.md
```

> La documentación técnica detallada de cada parte está en la carpeta [`docs/`](docs/):
>
> - [Backend — docs/DOCUMENTATION_BAKCEND.md](docs/DOCUMENTATION_BAKCEND.md)
> - [Frontend — docs/DOCUMENTATION_FRONTEND.md](docs/DOCUMENTATION_FRONTEND.md)

---

## Requisitos previos

- **Node.js** v18 o superior — [nodejs.org](https://nodejs.org/)
- **npm** v9 o superior (incluido con Node.js)
- **Git**
- **PostgreSQL** o cuenta de [Supabase](https://supabase.com) activa
- `postgresql-client` instalado en el sistema (para los backups de BD)

Verifica tu entorno:

```bash
node --version   # >= 18.x
npm --version    # >= 9.x
```

---

## Instalación rápida

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd swisshaus
```

### 2. Configurar el backend

```bash
cd swisshaus-api
npm install

# Copiar y rellenar las variables de entorno
cp .env.example .env
```

Variables de entorno necesarias en `swisshaus-api/.env`:

```env
DATABASE_URL="postgresql://user:password@host:5432/swisshaus?schema=public"
SUPABASE_URL="https://<tu-proyecto>.supabase.co"
SUPABASE_ANON_KEY="<anon-key>"
SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
SUPABASE_JWT_SECRET="<jwt-secret-de-supabase>"
REDIS_URL="redis://localhost:6379"
CORS_ORIGIN="http://localhost:5173"
NODE_ENV="development"
```

Aplicar migraciones de base de datos:

```bash
npx prisma migrate dev
```

### 3. Configurar el frontend

```bash
cd ../swisshaus_web
npm install
cp .env.example .env
```

Variables de entorno necesarias en `swisshaus_web/.env`:

```env
VITE_API_URL="http://localhost:3000"
VITE_GOOGLE_MAPS_API_KEY="<tu-api-key-de-google-maps>"
```

---

## Ejecutar en desarrollo

### Opción A — Ambos a la vez (recomendado)

> Requiere haber instalado dependencias en ambas carpetas previamente.

No hay script raíz configurado. Abre dos terminales:

**Terminal 1 — Backend:**

```bash
cd swisshaus-api
npm run start:dev
# API disponible en http://localhost:3000
# Swagger UI en  http://localhost:3000/api
```

**Terminal 2 — Frontend:**

```bash
cd swisshaus_web
npm run dev
# App disponible en http://localhost:5173
```

### Opción B — Backend solo

```bash
cd swisshaus-api && npm run start:dev
```

### Opción C — Frontend solo (modo mock)

```bash
cd swisshaus_web && npm run dev
```

---

## Scripts principales

### Backend (`swisshaus-api/`)

```bash
npm run start:dev    # Desarrollo con hot-reload
npm run build        # Compilar TypeScript
npm run start:prod   # Producción
npm run test         # Tests unitarios
npm run test:cov     # Tests con cobertura
npm run test:e2e     # Tests E2E
npm run lint         # ESLint + auto-fix
npm run api          # Pipeline completo (lint + type-check + build + tests)
npx prisma studio    # GUI de la base de datos
npx prisma migrate dev  # Aplicar migraciones
```

### Frontend (`swisshaus_web/`)

```bash
npm run dev          # Desarrollo con HMR
npm run build        # Build de producción
npm run preview      # Preview del build
npm run test         # Tests unitarios (Vitest)
npm run test:watch   # Tests en modo watch
npm run test:e2e     # Tests E2E (Playwright)
npm run test:e2e:ui  # Tests E2E con interfaz gráfica
npm run lint         # ESLint
npm run web          # Pipeline completo (lint + type-check + tests + build)
```

---

## Funcionalidades principales

- **Menú de productos** — Filtros por categoría (Fondue, Raclette, Carnes, Postres, Vinos), badges de "Popular" y "Nuevo", gestión de stock.
- **Eventos gastronómicos** — Creación, inscripción online, cupos, estados automáticos (programado → en curso → finalizado).
- **Sistema de puntos** — Los clientes acumulan puntos al participar en eventos y los canjean por recompensas.
- **Auth completa** — Registro multi-fase, confirmación por email, recuperación de contraseña, renovación automática de JWT.
- **Gestión de media** — Subida de imágenes con compresión automática a WebP via Supabase Storage.
- **Panel de administración** — CRUD de eventos, productos y recompensas para roles admin/empleado.
- **Backups** — Generación y restauración de backups de BD bajo demanda (solo admins).

---

## Seguridad

- JWT validado en cada request privado por `SupabaseAuthGuard`.
- Control de acceso por rol (`admin` / `empleado` / `cliente`) con `RolesGuard`.
- Rate limiting: 10 req/min global; 5 req/90s en endpoints de autenticación.
- Headers de seguridad HTTP con Helmet (CSP, HSTS, X-Frame-Options).
- CORS configurado por whitelist de dominios.
- Validación estricta de DTOs (`class-validator`) con `whitelist: true`.
- Soft-delete en lugar de eliminación real para auditoría.
- Sin exposición de `SERVICE_KEY` de Supabase al cliente.

---

## Licencia

Distribuido bajo la licencia incluida en [LICENSE](LICENSE).
