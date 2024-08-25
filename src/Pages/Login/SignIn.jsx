import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  let auth = getAuth();
  function loginHandler(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Logged in successfully");
      })
      .then(() => {
        navigate("crud");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="hero  bg-base-200 min-h-screen">
        <div className="hero-content flex-col  lg:flex-row-reverse">
          <div className="card bg-base-100 w-[700px]  max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <NavLink to="forgot" className="label-text-alt link link-hover">
                    Forgot password?
                  </NavLink>
                </label>
              </div>

              <div className=" mt-6 w-full flex justify-between">
                <button
                  onClick={loginHandler}
                  className="btn w-[48%] btn-primary"
                >
                  Sign In
                </button>
                <NavLink to="signup" className="btn w-[48%] btn-primary">
                  Sign Up
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        transition:Bounce
      />
    </div>
  );
};
export default SignIn;
