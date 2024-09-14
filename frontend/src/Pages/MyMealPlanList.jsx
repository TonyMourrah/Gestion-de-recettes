import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import MealPlanDetail from "../components/MealPlan/MealPlanDetail";
import SideBar from "../components/SideBar/SideBar";
import "./MyMealPlanList.css";

export default function MyMealPlanList() {
  const { user, token } = useAuthContext();
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/meal-plans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          const userMealPlans = data.mealPlans.filter(
            (mealPlan) => mealPlan.createdBy === user._id
          );
          setMealPlans(userMealPlans);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };
    fetchMealPlans();
  }, [user, token]);

  return (
    <div>
      <SideBar />
      <div className="mealPlanListPage">
        {mealPlans.map((mealPlan) => (
          <Link to={`/meal-plan/${mealPlan._id}`} key={mealPlan._id}>
            <div className="mealPlanCard">
              <MealPlanDetail mealPlan={mealPlan} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
