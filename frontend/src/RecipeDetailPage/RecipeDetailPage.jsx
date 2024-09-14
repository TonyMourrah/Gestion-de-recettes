import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./RecipeDetailPage.css";
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const { user, token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/recipes/${id}`); 
      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        navigate('/RecipeListPage'); 
      } else {
        console.error('Erreur lors de la suppression de la recette');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
    }
  };

  return (
    <div className="recipeDetailPage">
      {isLoading ? ( 
        <p>Chargement en cours...</p>
      ) : recipe ? (
        <>
          {user && user._id === recipe.createdBy && (
            <button onClick={handleDelete}>Supprimer</button>
          )}
          <h2>{recipe.title}</h2> 
          <img src={recipe.image} alt={recipe.title} />
          <p>{recipe.description}</p>
          <div className="column">
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.quantity} {ingredient.unit}  {ingredient.name}</li>
              ))}
            </ul>
          </div>
          <div className="column">
            <h3>Instructions:</h3>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          <p>Catégorie {recipe.category}</p>
          
        </>
      ) : (
        <p>Rien...</p>
      )}
    </div>
  );
};

export default RecipeDetailPage;
