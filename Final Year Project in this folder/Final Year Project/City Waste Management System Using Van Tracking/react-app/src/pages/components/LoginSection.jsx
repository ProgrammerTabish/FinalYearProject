import { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
function LoginSection(props) {
  let [show, toggle] = useState(false);
  let [login, change] = useState(true);

  let handleChange = () => {
    login ? change(false) : change(true);
  };
  let handleClick = () => {
    show ? toggle(false) : toggle(true);
  };
  {
    /*  */
  }
  return (
    <div className="login-section">
      <button onClick={() => handleClick()}>{show ? "X" : props.title}</button>
      {show ? (
        login ? (
          <>
            <button onClick={() => handleChange()}>SignUp?</button>
            <LoginForm id={props.id} name={props.name} title={props.title} />
          </>
        ) : (
          <>
            <button onClick={() => handleChange()}>Login?</button>
            <SignUpForm id={props.id} name={props.name} title={props.title} />
          </>
        )
      ) : null}
    </div>
  );
}

function LoginForm({ id, name, title }) {
  const navigateTo = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post("http://localhost:3001/login", {
        phone,
        password,
        title,
      });
      const userData = {
        title: response.data.title,
        phone: response.data.phone,
      };
      console.log(userData);

      // Store user information in session

      // Stringify the object and store it in session storage
      sessionStorage.setItem("user", JSON.stringify(userData));
      // Redirect to the appropriate dashboard based on the title

      try {
        navigateTo(`/${response.data.title.toLowerCase()}-dashboard`);
      } catch (error) {
        console.log("an error occured", error);
      }
    } catch (error) {
      let str = "Error logging in:" + error.response.data.error;
      console.error(str);
      setComment(str);
    }
  };

  return (
    <div>
      <h2>{title} Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor={name}>Phone Number:</label>
        <input
          type="tel"
          id={id}
          name={name}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label htmlFor="citizenPassword">Password:</label>
        <input
          type="password"
          id="citizenPassword"
          name="citizenPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <p className="warning">{comment}</p>
      </form>
    </div>
  );
}

function SignUpForm({ id, name, title }) {
  const navigateTo = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Make sure to include the title in the request body
      const response = await axios.post("http://localhost:3001/register", {
        phone,
        password,
        repeatPassword,
        title,
      });
      const userData = {
        title: response.data.title,
        phone: response.data.phone,
      };
      console.log(userData);

      // Store user information in session
      sessionStorage.setItem("user", JSON.stringify(userData));

      // Redirect to the appropriate dashboard based on the title
      navigateTo(`/${response.data.title.toLowerCase()}-dashboard`);
    } catch (error) {
      console.error("Error registering user:", error.response.data.error);
    }
  };

  return (
    <div>
      <h2>{title} SignUp</h2>
      <form className="login-form" onSubmit={handleSignUp}>
        <label htmlFor={name}>Phone Number:</label>
        <input
          type="tel"
          id={id}
          name={name}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label htmlFor="citizenPassword">Password:</label>
        <input
          type="password"
          id="citizenPassword"
          name="citizenPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="citizenPasswordRepeat">Repeat Password:</label>
        <input
          type="password"
          id="citizenPasswordRepeat"
          name="citizenPasswordRepeat"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />

        <button type="submit">Create !</button>
      </form>
    </div>
  );
}

export default LoginSection;
