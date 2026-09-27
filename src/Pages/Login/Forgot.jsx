import { useState } from "react";
import { NavLink } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { authErrorMessage } from "../../firebase/errors";
import AuthCard from "../../components/AuthCard";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function resetHandler(e) {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email.trim())
      .then(() => toast.success("Parolni tiklash havolasi emailingizga yuborildi"))
      .catch((error) => toast.error(authErrorMessage(error)))
      .finally(() => setLoading(false));
  }

  return (
    <AuthCard title="Reset password" onSubmit={resetHandler}>
      <div className="form-control">
        <label className="label" htmlFor="forgot-email">
          <span className="label-text">Email</span>
        </label>
        <input
          id="forgot-email"
          type="email"
          placeholder="email"
          className="input input-bordered"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mt-6 w-full flex justify-between">
        <button type="submit" className="btn w-[48%] btn-primary" disabled={loading}>
          {loading ? <span className="loading loading-spinner"></span> : "Reset"}
        </button>
        <NavLink to="/" className="btn w-[48%] btn-outline btn-primary">
          Sign In
        </NavLink>
      </div>
    </AuthCard>
  );
};

export default Forgot;
