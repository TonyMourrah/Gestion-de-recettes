import { useState, useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValue) => ({
      ...prevValue,
      [identifier]: value,
    }));
  };

  const { login } = useContext(AuthContext);

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending request with entered values: ", enteredValues);
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enteredValues),
      });

      const data = await response.json();
      console.log("Received response: ", data);
      if (!response.ok) {
        throw new Error(data.error);
      }

      console.log("Login successful, navigating to home page");
      console.log(data)
      login(data.user, data.token);
      return <Navigate to="/" />;
    } catch (error) {
      console.log("Error during login: ", error);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div>
          <h1>Connectez-Vous</h1>
          <label>
            Vous n'avez pas de compte? <Link to="/signup">Créer un compte</Link>
          </label>
        </div>
        <form onSubmit={authSubmitHandler} className="login-form-flex">
          <div>
            <label htmlFor="email">Adresse Courriel</label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre adresse courriel"
              value={enteredValues.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Mot de Passe</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Entrez votre mot de passe"
              value={enteredValues.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>
          <div className="showPassword">
            <input
              type="checkbox"
              onChange={togglePasswordVisibility}
              checked={showPassword}
            />
            <label> Montrer le mot de passe</label>
          </div>
          <div>
            <button type="submit">Connectez-Vous</button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
