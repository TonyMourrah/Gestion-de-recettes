import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {


  return (
    <>
      <div className="home-background">
        <h1>Bienvenue</h1>
        <Link to="/RecipeListPage" className="home-link">
          Voir les recettes
        </Link>
      </div>
    </>
  );
}
