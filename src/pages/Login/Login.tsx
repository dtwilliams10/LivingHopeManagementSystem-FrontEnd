import React, { useState } from "react";
import HeaderBar from "components/headerBar";
import Home from "pages/Home/Home";
import { accountService } from "../../services/account.service";
//import AlertDialog from "components/warningDialog";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    var user;
    try {
      user = accountService.login(email, password);
      setUser((await user).data);
      localStorage.setItem("user", (await user).data);
    } catch (error) {
      console.log("I made it inside the catch block");
      //return <AlertDialog/>;
      console.log((await user).status);
      console.log((await user).data);
      //return <AlertDialog/>
    }
  };

  if (user) {
    return <Home />;
  }

  return (
    <div>
      <HeaderBar />
      <br />
      <form onSubmit={handleSubmit} className="Login">
        <label htmlFor="username">Email</label>
        <input
          type="text"
          value={email}
          autoComplete="email"
          placeholder="Please enter your email address"
          onChange={({ target }) => setEmail(target.value)}
        />
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            placeholder="Please enter your password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="registration-link">
        If you don't have an account yet, please click{" "}
        <a href="/Register">here</a> to register
      </p>
    </div>
  );
};

export default LoginForm;
