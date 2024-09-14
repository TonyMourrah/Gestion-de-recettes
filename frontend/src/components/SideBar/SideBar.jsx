import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="sidebar">
            <ul>
                <Link to="/profile">
                    <li>Mes Informations</li>
                </Link>
                <Link to="/myRecipes">
                    <li>Mes Recettes</li>
                </Link>
                <Link to="/myMealPlans">
                    <li>Mes Plans de Repas</li>
                </Link>
            </ul>
        </div>
    );
}