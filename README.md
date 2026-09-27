# My CRUD

React + Vite asosidagi CRUD ilova. Firebase Authentication orqali ro'yxatdan o'tish,
kirish va parolni tiklash; foydalanuvchilar ro'yxatini qo'shish, tahrirlash, o'chirish,
qidirish, yo'nalish bo'yicha filterlash va ism bo'yicha saralash.

## Texnologiyalar

- React 18, React Router 6
- Firebase Authentication
- Tailwind CSS + daisyUI (light/dark tema)
- react-toastify

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build (dist/)
npm run lint     # ESLint tekshiruvi
```

## Tuzilishi

- `src/firebase/` — Firebase sozlamasi, `AuthProvider` va xato matnlari
- `src/components/Routes.jsx` — `ProtectedRoute` (faqat kirganlar uchun) va `PublicRoute`
- `src/Pages/Login/` — Sign In, Sign Up, Forgot password sahifalari
- `src/Pages/Crud/` — CRUD jadvali, yaratish oynasi va `storage.js` (localStorage yordamchilari)

Ma'lumotlar brauzerning localStorage'ida har bir akkaunt uchun alohida
(`items_<uid>` kaliti ostida) saqlanadi.
