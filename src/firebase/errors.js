// Firebase xato kodlarini foydalanuvchiga tushunarli matnga aylantirish
const messages = {
  "auth/invalid-email": "Email noto'g'ri kiritilgan",
  "auth/invalid-credential": "Email yoki parol noto'g'ri",
  "auth/wrong-password": "Email yoki parol noto'g'ri",
  "auth/user-not-found": "Bunday foydalanuvchi topilmadi",
  "auth/email-already-in-use": "Bu email allaqachon ro'yxatdan o'tgan",
  "auth/weak-password": "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
  "auth/missing-password": "Parolni kiriting",
  "auth/missing-email": "Emailni kiriting",
  "auth/too-many-requests": "Juda ko'p urinish. Birozdan so'ng qayta urining",
  "auth/network-request-failed": "Internet aloqasi yo'q",
};

export const authErrorMessage = (error) =>
  messages[error?.code] || "Nimadir xato ketdi, qayta urinib ko'ring";
