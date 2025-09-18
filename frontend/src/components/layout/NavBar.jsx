import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();

  function handleLogOut() {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/logout",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.removeItem("access_token");
        localStorage.removeItem('role');
        navigate("/authentification");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            color: "#113F67",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-home"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">
              Dashboard
            </Link>
            <Link className="nav-link" to="/max-expense">
              Expenses
            </Link>
            <Link className="nav-link" to="/savings">
              Savings
            </Link>
            <Link className="nav-link" to="/analytics">
              Analytics
            </Link>
            <Link className="nav-link" to="/tools">
              Tools
            </Link>
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
            {localStorage.getItem("role") === "admin" && (
              <Link className="nav-link" to="/admin/users">
                Admin
              </Link>
            )}
            <a className="nav-link" href="#" onClick={handleLogOut}>
              Log Out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
