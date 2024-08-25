import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
import "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Crud from "../Crud/Crud";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  let auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, []);

  function signUpHandler(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        toast.success("Logged in successfully");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }

  return (
    <>
      {isLogged ? (
        <Crud />
      ) : (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
          <div className="hero  bg-base-200 min-h-screen">
            <div className="hero-content flex-col  lg:flex-row-reverse">
              <div className="card bg-base-100 w-[700px]  max-w-sm shrink-0 shadow-2xl">
                <form className="card-body">
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="name "
                      className="input input-bordered"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Surname</span>
                    </label>
                    <input
                      type="text"
                      placeholder="surname"
                      className="input input-bordered"
                    />
                  </div>

                  <div className="form-control">
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
                  </div>

                  <div className=" mt-6 w-full flex justify-between">
                    <NavLink to="/" className="btn w-[48%] btn-primary">
                      Sign In
                    </NavLink>
                    <button
                      to="signup"
                      onClick={signUpHandler}
                      className="btn w-[48%] btn-primary"
                    >
                      Sign Up
                    </button>
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
      )}
    </>
  );
};
export default SignUp;
