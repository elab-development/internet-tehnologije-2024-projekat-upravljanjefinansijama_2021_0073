import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Dodaj Link komponentu
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();

  function handleLogOut() {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/logout',
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.removeItem('access_token');
        navigate('/authentification');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: '#113F67' }}>
          Navbar
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
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
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
