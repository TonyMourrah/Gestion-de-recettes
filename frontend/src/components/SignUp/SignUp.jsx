import { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [enteredValues, setEnteredValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValue) => ({
      ...prevValue,
      [identifier]: value,
    }));
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("authSubmitHandler called");
    try {
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enteredValues),
      });
      const data = await response.json();
      console.log("Server response:", data);
      if (!response.ok) {
        throw new Error(data.error);
      }
      console.log("Navigating to root route");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Créer un compte</h1>
        <label>
          Vous avez déjà un compte <Link to="/">Connectez-Vous</Link>
        </label>
        <form onSubmit={authSubmitHandler} className="signup-form-flex">
          <div>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              placeholder="Entrez votre nom d'utilisateur"
              value={enteredValues.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Adresse Courriel</label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre adresse courriel"
              value={enteredValues.email}
              onChange={(e) => handleInputChange("email", e.target.value.toLowerCase())}
            />
          </div>
          <div>
            <label htmlFor="password">Mot de Passe</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Créer votre mot de passe"
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

          <button type="submit">Créer un compte</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
