import { Link } from "react-router-dom";
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

  const onSubmit = (data) => {
    console.log("data", data);
    axios
      .post("http://206.189.91.54/api/v1/auth/", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        //! refactor this! working but still not right.
        const { data: userData, headers, status } = res;
        if (status === 200) {
          ["access-token", "client", "expiry", "uid"].forEach((key) =>
            localStorage.getItem(key, headers[key])
          );
          localStorage.setItem("user-info", JSON.stringify(userData));
          console.log("success", res);
        }
      })
      .catch((regErr) => {
        console.log("Error during registration:", regErr.message);
        if (regErr.response.data.errors) {
          const errorMessage = regErr.response.data.errors[0];
          toast.error(errorMessage);
        }
      });
  };

  return (
    <div className="register">
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
        <ToastContainer />
      </div>
    </div>
  );
}
