import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../firebase/config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgot = () => {
  const [email, setEmail] = useState("");
  function resetHandler() {
    sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        toast.success("New password sent to your email");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  }

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
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

                <div className=" mt-6 w-full flex justify-between">
                  <button
                    onClick={resetHandler}
                    className="btn w-[48%] btn-primary"
                  >
                    Reset
                  </button>
                  <NavLink to="/" className="btn w-[48%] btn-primary">
                    Sign In
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
      <ToastContainer
        position="top-center"
        autoClose={1000}
        transition:Bounce
      />
    </div>
  );
};
export default Forgot;
