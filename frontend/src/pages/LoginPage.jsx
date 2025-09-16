import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../components/Assets/person.png";
import email_icon from "../components/Assets/email.png";
import password_icon from "../components/Assets/password.png";
import agent from "../services/api.js"; // Import API agent
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [action, setAction] = useState("Sign Up");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  // Funkcija za Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      setErrorMessage("Email i lozinka su obavezni.");
      return;
    }
    try {
      const response = await agent.Auth.login({
        email: userData.email,
        password: userData.password,
      });
      console.log("Login successful:", response);
      localStorage.setItem("access_token", response.access_token); // Čuvanje JWT tokena

      const me = await axios.get("/profile", {
        headers: { Authorization: `Bearer ${response.access_token}` },
      });

      // 4. Sačuvaj role
      localStorage.setItem("role", me.data.role || "user");

      setErrorMessage(""); // Resetovanje poruke o grešci
      navigate("/");
      // Zamenite alert sa nekom UI porukom za bolji UX
      // alert("Uspešno ste se prijavili!");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Neuspešan login. Proverite svoje podatke.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userData.username || !userData.email || !userData.password) {
      setErrorMessage("Sva polja su obavezna.");
      return;
    }
    try {
      const response = await agent.Auth.register({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      console.log("Registration successful:", response);
      setErrorMessage(""); // Resetovanje poruke o grešci
      setAction("Log In"); // Automatsko prebacivanje na login
      // Zamenite alert sa nekom UI porukom za bolji UX
      // alert("Uspešno ste se registrovali!");
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMessage("Registracija nije uspela. Proverite svoje podatke.");
    }
  };

  // Nova funkcija za navigaciju na Forgot Password stranicu
  const handleForgotPasswordClick = () => {
    navigate("/forgot-password"); // Pretpostavlja da je ruta za ForgotPassword komponentu '/forgot-password'
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {/* Polje za ime prikazuje se samo za "Sign Up" */}
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="User Icon" />
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={userData.username}
              onChange={handleInput}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="Email Icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleInput}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleInput}
          />
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {action === "Log In" && (
        <div className="forgot-password">
          Forgot Password?{" "}
          <span onClick={handleForgotPasswordClick}>Click Here</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Log In" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
            setUserData({ username: "", email: "", password: "" });
            setErrorMessage("");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Log In");
            setUserData({ username: "", email: "", password: "" });
            setErrorMessage("");
          }}
        >
          Log In
        </div>
      </div>

      <div className="confirm-container">
        {action === "Log In" ? (
          <div className="submit" onClick={handleLogin}>
            Confirm Log In
          </div>
        ) : (
          <div className="submit" onClick={handleRegister}>
            Confirm Sign Up
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
