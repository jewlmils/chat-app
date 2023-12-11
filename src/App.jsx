import { RouterProvider } from "react-router-dom";
import router from "./Router";
import "./mainStyle.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
