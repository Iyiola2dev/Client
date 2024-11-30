import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config/index";
import { useToast } from "@/hooks/use-toast";
import { loginUser, clearIntendedRoute } from "@/store/auth-slice"; // Import the clearIntendedRoute action
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();


  // const navigate = useNavigate();
  const { toast } = useToast();

  // Get the intended route from the Redux state
  // const intendedRoute = useSelector((state) => state.auth.intendedRoute);
  //I commented this codes out because it is not used in the Login component

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });

      } else {
        toast({
          title: data?.payload?.message || "Incorrect email or password",
          variant: "destructive",
        });
      }
    });

    console.log(formData);
  };

  return (
    <div className="bg-shadowTherapy bg-cover bg-center h-screen flex justify-center items-center">
      <div className="shadow-lg backdrop-blur-lg bg-white/30 rounded-2xl lg:max-w-xl lg:h-[70%] flex justify-center items-center">
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
            <h1 className="list-item-text-3 text-3xl font-bold tracking-tight text-foreground text-white mx-10 mt-5">
              Welcome Back!
            </h1>
            {/* Login Form Component */}
            <div className="text-left px-7">
              <CommonForm
                formControls={loginFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText="Login"
                borderRadius="rounded-full"
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
                <span className="list-item-text-3">Forgot your password?</span>{" "}
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
