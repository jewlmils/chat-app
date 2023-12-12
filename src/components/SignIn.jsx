import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object({
  email: yup.string().required("Missing email").email("Invalid email format"),
  password: yup.string().required("Missing password"),
});

export function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
    axios
      .post("http://206.189.91.54/api/v1/auth/sign_in", data)
      .then((res) => {
        const { data, headers, status } = res;

        if (status === 200) {
          ["access-token", "client", "expiry", "uid"].forEach((key) =>
            localStorage.setItem(key, headers[key])
          );

          localStorage.setItem("user-info", JSON.stringify(data));
          console.log("succ", res);
          navigate("/main");
          toast.success("Login Successfull!");
        }
      })
      .catch((err) => {
        if (err.response.data.errors) {
          const errorMessage = err.response.data.errors[0];
          toast.error(errorMessage);
        }
      });
  };

  return (
    <div className="register">
      <div className="regContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign in</h1>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} />
            {formErrors.email && (
              <span className="error">{formErrors.email.message}</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} />
            {formErrors.password && (
              <span className="error">{formErrors.password.message}</span>
            )}
          </div>
          <button>Submit</button>
          <p>
            Don&apos;t have a Cat Chat account?{" "}
            <Link to="/signUp">Register now</Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
