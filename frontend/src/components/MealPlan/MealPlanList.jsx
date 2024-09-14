import React from "react";
//
const MealPlanList = ({ mealPlans }) => {
  return (
    <div>
      <ul>
        {mealPlans.map((mealPlan) => (
          <li key={mealPlan.id}>
            <h3>{mealPlan.title}</h3>
            <p>{mealPlan.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealPlanList;
