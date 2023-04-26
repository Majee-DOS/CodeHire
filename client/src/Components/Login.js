// const Login = () => {
//     return (
//         <div style={{ marginTop: "50px" }}>
//             <h1>Login</h1>
//         </div>
//     )
// };

// export default Login;


import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // add code to handle form submission
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="loginLabel">
          Email:
          <input
            className="loginInput"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="loginLabel">
          Password:
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button className="loginButton" type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
