import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <h1>Landing Page</h1>
      <div className="navLinks">
        <Link to="/signIn">Sign in</Link>
        <Link to="/signUp">Sign up</Link>
      </div>
    </>
  );
}
