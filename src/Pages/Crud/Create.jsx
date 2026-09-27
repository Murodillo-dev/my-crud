import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CreateContext } from "./CreateContext";
import { FIELDS, isDuplicate, newId, validate } from "./storage";

const Create = () => {
  const { items, addItem, close } = useContext(CreateContext);
  const [form, setForm] = useState({ name: "", field: "", age: "" });
  const [errors, setErrors] = useState({});

  const update = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    setErrors({ ...errors, [key]: undefined });
  };

  const createHandler = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isDuplicate(items, form)) {
      toast.error("Bunday foydalanuvchi mavjud");
      return;
    }

    addItem({
      key: newId(),
      name: form.name.trim(),
      field: form.field,
      age: Number(form.age),
      createdAt: new Date().toISOString(),
    });
    toast.success("Foydalanuvchi qo'shildi");
    close();
  };

  return (
    <div className="modal-box shadow-2xl relative">
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      >
        ✕
      </button>
      <h3 className="font-bold text-lg mb-2">Create User</h3>
      <form onSubmit={createHandler} className="flex flex-col gap-3 mt-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={update("name")}
            autoFocus
            className={`input input-bordered w-full ${errors.name ? "input-error" : "input-accent"}`}
          />
          {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <select
            value={form.field}
            onChange={update("field")}
            className={`select select-bordered w-full ${errors.field ? "select-error" : "select-accent"}`}
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
          {errors.field && <p className="text-error text-sm mt-1">{errors.field}</p>}
        </div>
        <div>
          <input
            type="number"
            placeholder="Age"
            min={1}
            max={120}
            value={form.age}
            onChange={update("age")}
            className={`input input-bordered w-full ${errors.age ? "input-error" : "input-accent"}`}
          />
          {errors.age && <p className="text-error text-sm mt-1">{errors.age}</p>}
        </div>
        <button type="submit" className="btn btn-primary text-[20px] text-white w-full">
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
