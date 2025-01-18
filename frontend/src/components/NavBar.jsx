import React from 'react'
import agent from '../services/api'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {

    const navigate = useNavigate();

    function handleLogOut() {

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/logout',
        headers: { 
            'Authorization': 'Bearer '+localStorage.getItem("access_token")
            }
        };
        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            localStorage.removeItem("access_token");
            navigate('/authentification')
        })
        .catch((error) => {
            console.log(error);
        });
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#" style={{color: '#3c009d'}}>Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
        <a className="nav-link" href="#">Expenses</a>
        <a className="nav-link" href="#">Incomes</a>
        <a className="nav-link" href="#" onClick={handleLogOut}>Log Out</a>
        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
      </div>
    </div>
  </div>
</nav>
  )
}

export default NavBar