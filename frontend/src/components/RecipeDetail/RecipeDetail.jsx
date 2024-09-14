import React from 'react';
import { Link } from 'react-router-dom';
import "../RecipeDetail/RecipeDetail.css";

const RecipeDetail = ({ recipe }) => {
  return (
    <div key={recipe._id}>
      <h2>{recipe.title}</h2>
      <Link to={`/recipe/${recipe._id}`}>
        <img src={recipe.image} alt={recipe.title} className='recipeDetail-img'/>
      </Link>
    </div>
  );
};

export default RecipeDetail;