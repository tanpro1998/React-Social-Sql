import "./signup.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/signup", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="signup">
      <div className="card">
        <div className="card__left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam
            maiores commodi repudiandae corporis quis vero ad alias aliquid unde
            quam esse voluptatem quas magnam modi, sit atque tempora eius.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="card__right">
          <h1>Sign Up</h1>
          <form>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && <span style={{ color: "red" }}>{err}</span>}
            <button onClick={handleSignup}>Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
