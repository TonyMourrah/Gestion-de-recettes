import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import "../Login/Login.jsx";
import"../../RecipeListPage/RecipeListPage.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="dropdown">
          <span>Recettes</span>
          <div className="dropdown-content">
            <Link to="/RecipeListPage">Liste des recettes</Link>
            {user && (
              <Link to="/RecipeFormPage">Ajouter une recette</Link>
            )}
          </div>
        </li>
        <li className="dropdown">
         {user && ( 
          <>
          <span>Plans de Repas</span>
          </>
          )}
          <div className="dropdown-content">
          {user && (
            <>
              <Link to="/myMealPlans">Liste de vos plans de repas</Link>
              <Link to="/addMealPlan">
                Ajouter/modifier un plan de repas
              </Link>
            </>
          )}
          </div>
        </li>
        {!user && (
          //desactive au moment qu'un utililisateur est connecte
          <>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/signup">Inscription</Link>
            </li>
          </>
        )}
        {user && (
          //active au moment qu'un utilisateur est connecte
          <>
            <li>
              <button onClick={handleLogout}>Deconnexion</button>
            </li>
            <li>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} /> Mon compte
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
