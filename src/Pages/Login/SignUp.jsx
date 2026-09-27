import { useState } from "react";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { authErrorMessage } from "../../firebase/errors";
import AuthCard from "../../components/AuthCard";

const SignUp = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const displayName = `${name.trim()} ${surname.trim()}`.trim();
      if (displayName) await updateProfile(user, { displayName });
      toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz");
    } catch (error) {
      toast.error(authErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Sign Up" onSubmit={signUpHandler}>
      <div className="form-control">
        <label className="label" htmlFor="signup-name">
          <span className="label-text">Name</span>
        </label>
        <input
          id="signup-name"
          type="text"
          placeholder="name"
          className="input input-bordered"
          autoComplete="given-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="label" htmlFor="signup-surname">
          <span className="label-text">Surname</span>
        </label>
        <input
          id="signup-surname"
          type="text"
          placeholder="surname"
          className="input input-bordered"
          autoComplete="family-name"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="label" htmlFor="signup-email">
          <span className="label-text">Email</span>
        </label>
        <input
          id="signup-email"
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
        <label className="label" htmlFor="signup-password">
          <span className="label-text">Password</span>
        </label>
        <input
          id="signup-password"
          type="password"
          placeholder="password (min 6)"
          className="input input-bordered"
          autoComplete="new-password"
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-6 w-full flex justify-between">
        <NavLink to="/" className="btn w-[48%] btn-outline btn-primary">
          Sign In
        </NavLink>
        <button type="submit" className="btn w-[48%] btn-primary" disabled={loading}>
          {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
        </button>
      </div>
    </AuthCard>
  );
};

export default SignUp;
