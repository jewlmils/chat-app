import { useNavigate } from "react-router-dom";
function Main() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <h1>Main </h1>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Main;
