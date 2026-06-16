# MIMO asosidagi 5G antenna tizimi monitoringi uchun web-dastur

Ushbu loyiha 5G antenna infratuzilmasini MIMO texnologiyasi asosida monitoring qilish uchun yaratilgan diplom darajasidagi web-dasturdir. Tizim stansiyalar, RF/MIMO parametrlar, KPI ko'rsatkichlari, alarmlar, konfiguratsiyalar, hisobotlar va foydalanuvchi rollarini boshqarishni ko'rsatadi.

## Texnologiyalar

- Frontend: React, Vite, TypeScript, Tailwind CSS, React Router, Axios, Recharts, Lucide React
- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL, Prisma ORM
- Auth: JWT, bcrypt
- Validatsiya: Zod
- Muhit: dotenv, Docker Compose

## Papka tuzilmasi

```text
MIMO/
  client/
    src/
      api/
      components/
      context/
      hooks/
      pages/
      types/
  server/
    prisma/
      schema.prisma
      seed.ts
    src/
      config/
      controllers/
      middlewares/
      routes/
      services/
      utils/
  docker-compose.yml
  README.md
```

## O'rnatish

```bash
npm run install:all
```

Server va client uchun env fayllarini yarating:

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

## Database ishga tushirish

Docker o'rnatilgan bo'lsa:

```bash
docker compose up -d
```

PostgreSQL qo'lda ishlatilsa, `server/.env` ichidagi `DATABASE_URL` qiymatini o'zingizning bazangizga moslang.

## Prisma migrate va seed

```bash
cd server
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

## Backendni ishga tushirish

```bash
cd server
npm run dev
```

API manzili:

```text
http://localhost:5000/api
```

## Frontendni ishga tushirish

Yangi terminal oynasida:

```bash
cd client
npm run dev
```

Web-dastur:

```text
http://localhost:5173
```

## Demo login ma'lumotlari

Administrator:

```text
Email: admin@mimo.uz
Parol: Admin123!
```

Operator:

```text
Email: operator@mimo.uz
Parol: Operator123!
```

## Asosiy funksiyalar

- JWT orqali kirish va chiqish
- Admin va operator rollari
- Boshqaruv panelida KPI kartalar va grafiklar
- Stansiyalar ro'yxati, qidirish, ko'rish, qo'shish va o'chirish
- Stansiya tafsilotlari: MIMO turi, portlar, beam, EIRP, gain, harorat, KPI va alarmlar
- KPI monitoring: RSRP, SINR, throughput, PRB, latency, packet loss, qamrov va sig'im
- Alarm moduli: daraja, holat, manba, vaqt va yechish amali
- Konfiguratsiya: quvvat limiti, harorat limiti, alarm limiti, scheduler va beam rejimi
- Hisobotlar: umumiy jadval, CSV eksport, chop etish ko'rinishi
- Foydalanuvchilar boshqaruvi admin uchun
- Dark mode tugmasi
- Audit log backend qo'llab-quvvatlovi

## Render orqali deploy

1. [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**.
2. `karajanofff/PARWAZ` repozitoriyasini ulang, branch: `main`, fayl: `render.yaml`.
3. **Apply** bosing. Quyidagi resurslar yaratiladi:
   - `mimo-db` — PostgreSQL bazasi
   - `mimo-api` — API + frontend (bitta servis)
4. Sayt manzili: `https://mimo-api.onrender.com`

> **Eslatma:** Agar `mimo-api` yoki `mimo-db` to'xtatilgan bo'lsa, Render Dashboard'dan **Resume** qiling.

Demo login ma'lumotlari production'da ham bir xil:

```text
admin@mimo.uz / Admin123!
operator@mimo.uz / Operator123!
```

## API yo'nalishlari

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/stations`
- `GET /api/stations/:id`
- `POST /api/stations`
- `PUT /api/stations/:id`
- `DELETE /api/stations/:id`
- `GET /api/kpis`
- `GET /api/kpis/station/:stationId`
- `POST /api/kpis`
- `GET /api/alarms`
- `POST /api/alarms`
- `PUT /api/alarms/:id/resolve`
- `GET /api/configurations`
- `GET /api/configurations/:stationId`
- `PUT /api/configurations/:stationId`
- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/reports/summary`
- `GET /api/reports/export/csv`

