// Foydalanuvchilar ro'yxati localStorage'da har bir akkaunt uchun alohida saqlanadi
const LEGACY_KEY = "items";

export const FIELDS = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
];

const storageKey = (uid) => `items_${uid}`;

const parse = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function loadItems(uid) {
  const raw = localStorage.getItem(storageKey(uid));
  if (raw !== null) return parse(raw);

  // Eski versiyada barcha ma'lumotlar umumiy "items" kalitida edi —
  // ularni birinchi kirgan akkauntga ko'chiramiz
  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy !== null) {
    const items = parse(legacy);
    saveItems(uid, items);
    localStorage.removeItem(LEGACY_KEY);
    return items;
  }
  return [];
}

export function saveItems(uid, items) {
  localStorage.setItem(storageKey(uid), JSON.stringify(items));
}

export const newId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export const normalize = (text) => String(text ?? "").trim().toLowerCase();

// Ma'lumotni tekshirish: xato bo'lgan maydonlar obyektini qaytaradi
export function validate({ name, field, age }) {
  const errors = {};
  if (!name.trim()) errors.name = "Ismni kiriting";
  if (!field) errors.field = "Yo'nalishni tanlang";
  const ageNumber = Number(age);
  if (!Number.isInteger(ageNumber) || ageNumber < 1 || ageNumber > 120) {
    errors.age = "Yosh 1 dan 120 gacha butun son bo'lishi kerak";
  }
  return errors;
}

export const isDuplicate = (items, { name, field, age }, exceptId) =>
  items.some(
    (item) =>
      item.key !== exceptId &&
      normalize(item.name) === normalize(name) &&
      normalize(item.field) === normalize(field) &&
      Number(item.age) === Number(age)
  );

export const fieldLabel = (value) =>
  FIELDS.find((f) => f.value === normalize(value))?.label ?? value;

const pad = (n) => String(n).padStart(2, "0");

// Yangi yozuvlarda createdAt bor; eski yozuvlar alohida maydonlarda saqlangan
export function formatTime(item) {
  if (item.createdAt) {
    const d = new Date(item.createdAt);
    const weekday = d.toLocaleDateString("en-GB", { weekday: "long" });
    const month = d.toLocaleDateString("en-GB", { month: "long" });
    return `${weekday}, ${d.getDate()} ${month} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  if (item.year) {
    const day = item.day ? `${item.day}, ` : "";
    return `${day}${item.date} ${item.month} ${item.year}, ${pad(item.hour)}:${item.minute}`;
  }
  return "—";
}
