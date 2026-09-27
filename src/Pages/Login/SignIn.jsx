import { useState } from "react";
import { NavLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { authErrorMessage } from "../../firebase/errors";
import AuthCard from "../../components/AuthCard";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function loginHandler(e) {
    e.preventDefault();
    setLoading(true);
    // Muvaffaqiyatli kirganda PublicRoute avtomatik /crud ga yo'naltiradi
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(() => toast.success("Tizimga muvaffaqiyatli kirdingiz"))
      .catch((error) => toast.error(authErrorMessage(error)))
      .finally(() => setLoading(false));
  }

  return (
    <AuthCard title="Sign In" onSubmit={loginHandler}>
      <div className="form-control">
        <label className="label" htmlFor="signin-email">
          <span className="label-text">Email</span>
        </label>
        <input
          id="signin-email"
          type="email"
          placeholder="email"
          className="input input-bordered"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="label" htmlFor="signin-password">
          <span className="label-text">Password</span>
        </label>
        <input
          id="signin-password"
          type="password"
          placeholder="password"
          className="input input-bordered"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="label">
          <NavLink to="/forgot" className="label-text-alt link link-hover">
            Forgot password?
          </NavLink>
        </label>
      </div>

      <div className="mt-6 w-full flex justify-between">
        <button type="submit" className="btn w-[48%] btn-primary" disabled={loading}>
          {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
        </button>
        <NavLink to="/signup" className="btn w-[48%] btn-outline btn-primary">
          Sign Up
        </NavLink>
      </div>
    </AuthCard>
  );
};

export default SignIn;
