import { useEffect, useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { useAuth } from "../../firebase/useAuth";
import Create from "./Create";
import { CreateContext } from "./CreateContext";
import {
  FIELDS,
  fieldLabel,
  formatTime,
  isDuplicate,
  loadItems,
  normalize,
  saveItems,
  validate,
} from "./storage";

const getInitialTheme = () => document.documentElement.dataset.theme || "dark";

const Crud = () => {
  const { user } = useAuth();
  const [items, setItems] = useState(() => loadItems(user.uid));

  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [edit, setEdit] = useState(null);
  const [draft, setDraft] = useState({ name: "", field: "", age: "" });
  const [errors, setErrors] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // tema faqat shu sessiya uchun qoladi
    }
  }, [theme]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  function persist(nextItems) {
    setItems(nextItems);
    saveItems(user.uid, nextItems);
  }

  // Qidiruv, filter va saralash birgalikda ishlaydi; saqlangan tartib o'zgarmaydi
  const visibleItems = useMemo(() => {
    const query = normalize(search);
    let result = items.filter(
      (item) =>
        (!query || normalize(item.name).includes(query)) &&
        (!fieldFilter || normalize(item.field) === fieldFilter)
    );
    if (sortOrder) {
      result = [...result].sort((a, b) =>
        sortOrder === "a-z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }
    return result;
  }, [items, search, fieldFilter, sortOrder]);

  const outHandler = () => {
    signOut(auth).catch(() => toast.error("Chiqishda xatolik yuz berdi"));
  };

  function deleteItem(item) {
    if (!window.confirm(`"${item.name}" o'chirilsinmi?`)) return;
    persist(items.filter((value) => value.key !== item.key));
    if (edit === item.key) setEdit(null);
    toast.success("Foydalanuvchi o'chirildi");
  }

  function changeHandler(item) {
    setEdit(item.key);
    setDraft({ name: item.name, field: normalize(item.field), age: String(item.age) });
    setErrors({});
  }

  function updateDraft(key) {
    return (e) => {
      setDraft({ ...draft, [key]: e.target.value });
      setErrors({ ...errors, [key]: undefined });
    };
  }

  function saveHandler() {
    const validationErrors = validate(draft);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error(Object.values(validationErrors)[0]);
      return;
    }
    if (isDuplicate(items, draft, edit)) {
      toast.error("Bunday foydalanuvchi mavjud");
      return;
    }
    persist(
      items.map((value) =>
        value.key === edit
          ? { ...value, name: draft.name.trim(), field: draft.field, age: Number(draft.age) }
          : value
      )
    );
    setEdit(null);
    toast.success("O'zgarishlar saqlandi");
  }

  const contextValue = {
    items,
    addItem: (item) => persist([...items, item]),
    close: () => setIsOpen(false),
  };

  return (
    <div className="min-h-screen bg-base-100">
      {isOpen && (
        <CreateContext.Provider value={contextValue}>
          <div
            className="fixed inset-0 z-20 flex justify-center items-center bg-black/40 px-4"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <Create />
          </div>
        </CreateContext.Provider>
      )}

      <div className="flex flex-wrap items-center justify-end sticky top-0 z-10 bg-base-200 shadow">
        <span className="mr-auto m-3 text-sm opacity-70 truncate max-w-[40%]" title={user.email}>
          {user.email}
        </span>

        <select
          value={fieldFilter}
          onChange={(e) => setFieldFilter(e.target.value)}
          className="select select-success w-44 m-3"
          aria-label="Filter by field"
        >
          <option value="">All fields</option>
          {FIELDS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-success w-28 m-3"
          aria-label="Sort by name"
        >
          <option value="">Sort</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>

        <label className="input input-bordered flex items-center m-3 gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
        <button onClick={() => setIsOpen(true)} className="btn btn-success m-3">
          Create User
        </button>
        <button className="btn btn-error m-3" onClick={outHandler}>
          Log Out
        </button>

        <label className="swap swap-rotate m-3" aria-label="Toggle theme">
          <input
            type="checkbox"
            checked={theme === "light"}
            onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
          />

          {/* sun icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>

      <div className={isOpen ? "blur-sm" : ""}>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-[20px]">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Job</th>
                <th>Age</th>
                <th>Remove</th>
                <th>Update</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody className="text-[18px]">
              {visibleItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center opacity-60 py-10">
                    {items.length === 0
                      ? "Hali foydalanuvchilar yo'q. \"Create User\" tugmasi orqali qo'shing."
                      : "Hech narsa topilmadi"}
                  </td>
                </tr>
              )}
              {visibleItems.map((value, index) => {
                const isEditing = value.key === edit;
                return (
                  <tr key={value.key}>
                    <td>{index + 1}</td>
                    <td className="capitalize">
                      {isEditing ? (
                        <input
                          value={draft.name}
                          onChange={updateDraft("name")}
                          className={`input input-bordered w-[200px] ${errors.name ? "input-error" : "input-accent"}`}
                        />
                      ) : (
                        value.name
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <select
                          value={draft.field}
                          onChange={updateDraft("field")}
                          className={`select select-bordered w-[200px] ${errors.field ? "select-error" : "select-accent"}`}
                        >
                          <option value="" disabled>
                            Field
                          </option>
                          {FIELDS.map((f) => (
                            <option key={f.value} value={f.value}>
                              {f.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        fieldLabel(value.field)
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          min={1}
                          max={120}
                          value={draft.age}
                          onChange={updateDraft("age")}
                          className={`input input-bordered w-24 ${errors.age ? "input-error" : "input-accent"}`}
                        />
                      ) : (
                        value.age
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => deleteItem(value)}
                        className="btn btn-error text-[16px] text-white"
                      >
                        Delete
                      </button>
                    </td>

                    <td>
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button onClick={saveHandler} className="btn btn-success">
                            Save
                          </button>
                          <button onClick={() => setEdit(null)} className="btn btn-ghost">
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => changeHandler(value)}
                          className="btn btn-success text-[16px] text-white"
                        >
                          Edit
                        </button>
                      )}
                    </td>

                    <td className="text-[15px] whitespace-nowrap">{formatTime(value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Crud;
