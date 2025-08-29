# 📰 Dashboard News AI

Un tableau de bord d’actualités interactif avec **résumés générés par IA**, filtrage par catégorie et recherche par mot-clé.

---

## 🚀 Fonctionnalités

- Affichage des articles par catégorie : Technologie, Business, Sports, Santé
- Recherche par mot-clé avec filtrage instantané
- Résumés IA générés pour chaque article (HuggingFace)
- Pagination ou affichage progressif avec bouton **Show More**
- Responsive et moderne grâce à **Material UI** et **Tailwind CSS**
- Gestion des erreurs et loader stylé

---

## 🛠 Stack technique

- **Frontend** : React.js, Tailwind CSS, Material UI
- **Backend** : NestJS, RSS Parser
- **IA** : HuggingFace API pour génération de résumés
- **Tests** : Jest + React Testing Library pour le frontend, Jest + Supertest pour le backend

---

## ⚙️ Installation

1. **Cloner le repository**

```bash
git clone <URL_REPO>
cd <REPO>
```

2. **Installer les dépendances**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Configuration**

- Créez un fichier `.env` dans le backend avec votre clé HuggingFace :

```
HF_API_KEY=your_huggingface_api_key
```

4. **Lancer le projet**

```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd ../frontend
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 📂 Structure du projet

```
frontend/
  ├─ src/
  │   ├─ components/  # Composants UI réutilisables
  │   ├─ hooks/       # Hooks personnalisés (ex: useNews)
  │   ├─ pages/       # Pages (Home, News, About)
  │   └─ App.jsx
backend/
  ├─ src/
  │   ├─ news/        # Service et controller RSS
  │   ├─ summary/     # Service de résumé IA
  │   └─ main.ts
```

---

## 🧪 Tests

- **Frontend**

```bash
npm run test
```

- **Backend**

```bash
npm run test
```

Tests unitaires pour les composants React, hooks, routes backend et services IA.

---

## 🎨 UI / UX

- Design moderne et responsive
- Couleurs sobres et lisibles
- Loader et messages d’erreur stylés
- Articles avec titre cliquable et résumé mis en avant

---

## 📌 Notes

- Flux RSS : récupère automatiquement les derniers articles de différentes sources
- Résumés IA : génération lazy-load pour éviter les requêtes inutiles
- Optimisation : cache côté frontend pour réduire les appels API
