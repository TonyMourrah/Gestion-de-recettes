import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeDetail from "../components/RecipeDetail/RecipeDetail";
import SideBar from "../components/SideBar/SideBar";
import { useAuthContext } from "../hooks/useAuthContext";

export default function MyRecipeList() {
  const { user, token } = useAuthContext();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:4000/api/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        const userRecipes = data.recipes.filter(
          (recipe) => recipe.createdBy === user._id
        );
        setRecipes(userRecipes);
      } else {
        console.error(data.message);
      }
    };
    fetchRecipes();
  }, [user]);

  return (
    <div>
      <SideBar />
      <div className="recipeListPage" style={{ marginLeft: "250px" }}>
        {recipes.map((recipe) => (
          <RecipeDetail recipe={recipe} key={recipe._id} />
        ))}
      </div>
    </div>
  );
}
