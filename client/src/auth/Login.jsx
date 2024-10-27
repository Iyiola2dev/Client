// Login.jsx
import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config/Index"; // Create a login form configuration
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/auth-slice"; // Update with your actual path

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intendedRoute = useSelector((state) => state.auth.intendedRoute);

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication logic (replace with actual API call)
    const { email, password } = formData;
    if (email === "user@example.com" && password === "password123") {
      const userDetails = { name: "John Doe", email };
      const token = "sampleToken";

      // Dispatch user and token to Redux store
      dispatch(setUser({ user: userDetails, token }));

      // Redirect to the intended route or dashboard
      if (intendedRoute) {
        navigate(intendedRoute);
      } else {
        navigate("/dashboard");
      }
    } else {
      console.log("Invalid email or password");
    }
  };

  return (
    <div className="bg-shadowTherapy bg-cover bg-center h-screen flex justify-center items-center">
      <div className="shadow-lg backdrop-blur-lg bg-white/30 rounded-2xl lg:h-[70%] flex justify-center items-center">
        <div className="mx-auto w-full max-w-md space-y-6 flex justify-center px-7 py-10 lg:py-[10rem] items-center">
          <div className="text-center text-white rounded-xl py-7 flex flex-col">
            <div>
              <Link
                to="/"
                className="flex justify-start items-center ml-5 gap-1 text-xs"
              >
                <ArrowLeft className="text-xs" />
                <h2 className="border-b">Home</h2>
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground text-white mx-10 mt-5">
              Welcome Back!
            </h1>
            {/* Login Form Component */}
            <div className="text-left px-7">
              <CommonForm
                formControls={registerFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleLogin}
                buttonText="Login"
              />
            </div>

            <div>
              <p className="mt-2">
                Don't have an account?
                <Link
                  className="font-medium text-primary text-blue-600 ml-2"
                  to="/auth/register"
                >
                  Sign Up
                </Link>
              </p>
              <p className="mx-2 text-sm">
                <span>Forgot your password?</span>
                <Link className="text-blue-600 ml-2" to="/auth/forgot-password">
                  Reset it
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
