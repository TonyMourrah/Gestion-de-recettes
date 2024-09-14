import React from "react";
//
const MealPlanDetail = ({ mealPlan }) => {
  return (
    <div key={mealPlan._id}>
      <h2>{mealPlan.title}</h2>
      <p>{mealPlan.description}</p>
      <p>{mealPlan.ingredients}</p>
      <p>{mealPlan.calories}</p>
    </div>
  );
};

export default MealPlanDetail;
