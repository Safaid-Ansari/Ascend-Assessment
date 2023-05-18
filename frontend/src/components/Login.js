import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/SignUp.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(email && password)) {
      setError(true);
    } else {
      let data = { email, password };
      console.log(data);
      let result = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      result = await result.json();
      console.log(result);
      if (result.success) {
        navigate("/");
      } else {
        navigate("/login");
      }
      console.log(result.success);
      localStorage.setItem("user", JSON.stringify(result));
      setSubmitted(true);
      setError(false);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1 style={{ marginLeft: "95px" }}>User successfully Login!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1 style={{ marginLeft: "95px" }}>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div
      className="form"
      style={{
        height: "50%",
      }}
    >
      <div>
        <h1 className="heading" style={{ marginLeft: "10rem" }}>
          User Login
        </h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          placeholder="Enter email address here..."
          value={email}
          type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          placeholder="Enter your password here..."
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
