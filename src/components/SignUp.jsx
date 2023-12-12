import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object({
  email: yup.string().required("Missing email").email("Invalid email format"),
  password: yup
    .string()
    .required("Missing password")
    .min(8, "Password must have at least 8 characters"),
  password_confirmation: yup
    .string()
    .required("Missing password")
    .oneOf([yup.ref("password"), null], "Password does not match"),
});

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors: regErrors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (userData) => {
    try {
      const res = await axios.post(
        "http://206.189.91.54/api/v1/auth/",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      navigate("/");
      toast.success("Registered Successfully! Please Login :) ");
    } catch (errReg) {
      if (errReg?.response?.data?.errors) {
        const errorMsgs = errReg.response.data.errors.full_messages;
        errorMsgs.forEach((errorMsg) => {
          toast.error(errorMsg);
        });
      } else {
        console.error("Unknown Error", errReg);
      }
    }
  };

  return (
    <div className="register">
      <ToastContainer />
      <div className="regContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign up</h1>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} />
            {regErrors.email && (
              <span className="error">{regErrors.email.message}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} />
            {regErrors.password && (
              <span className="error">{regErrors.password.message}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              type="password"
              id="password_confirmation"
              {...register("password_confirmation")}
            />
            {regErrors.password_confirmation && (
              <span className="error">
                {regErrors.password_confirmation.message}
              </span>
            )}
          </div>
          <button>Submit</button>
          <p>
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
