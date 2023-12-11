import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "@comp/SignIn";
import { SignUp } from "@comp/SignUp";
import Main from "./components/Main";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

export default router;
