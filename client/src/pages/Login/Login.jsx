import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useState } from "react";
const Login = () => {
  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="card__left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam
            maiores commodi repudiandae corporis quis vero ad alias aliquid unde
            quam esse voluptatem quas magnam modi, sit atque tempora eius.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </div>
        <div className="card__right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && <span style={{ color: "red" }}>{err}</span>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
