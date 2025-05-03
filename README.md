# PaymentGateway

Aplicación FullStack que simula un flujo de compra de producto con pagos mediante tarjeta de crédito usando una pasarela(entorno sandbox). 

Este proyecto forma parte de una prueba técnica FullStack e implementa tanto el frontend (SPA) como el backend (API RESTful), cumpliendo con principios de arquitectura limpia, pruebas unitarias.

## 🔧 Tecnologías utilizadas

- **Frontend:** React + TypeScript + Redux + Vite
- **Backend:** NestJS + PostgreSQL + TypeORM
- **Base de datos:** PostgreSQL
- **Testing:** Jest
- **Despliegue recomendado:** AWS (S3, Lambda, RDS)
- **Arquitectura:** Hexagonal / Ports & Adapters

## 🚀 Estructura del proyecto
paymentgateway/
├── backend/ # API REST con NestJS
├── frontend/ # SPA responsive con React
└── README.md

## ▶️ Instalación y ejecución de backend
cd backend
npm install
npm run start:dev

## ⚙️ Variables de entorno
Crea un archivo .env con las siguientes variables:

-------------EJEMPLO-----------------------------
API_URL=https://api-sandbox.co.uat.wompi.dev/v1
PUBLIC_KEY=pub_stagtest_XXXXX
PRIVATE_KEY=prv_stagtest_XXXXX
INTEGRITY_KEY=stagtest_integrity_XXXXX
-------------REAL--------------------------------
DB_HOST=ep-cold-leaf-a4asyus7-pooler.us-east-1.aws.neon.tech
DB_PORT=5432
DB_USERNAME=bd_pagos_owner
DB_PASSWORD=npg_e1ILzG6rJDca
DB_NAME=bd_pagos
DB_SSLMODE=require


## 🧪 Endpoints principales
Método	    Ruta	        Descripción
GET	    /products	        Listar productos
GET     /transactions       Listar transacciones
POST	/transactions/pay	Iniciar pago (tokenización + pago)

## ▶️ Instalación y ejecución frontend
cd frontend
npm install
npm run dev

## 🌐 Comunicación con backend
backend NestJS en http://localhost:3000/.

## 🌐 ruta de frontend
frontend react + vite en http://localhost:5173/.