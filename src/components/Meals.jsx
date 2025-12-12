import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) {
          throw new Error("Unable to fetch meals. Check your connection!");
        }
        const restData = await response.json();
        setAvailableMeals(restData);
      } catch (error) {
        setError(true)
        setIsLoading(false)
      }
    }
    fetchMeals()
  }, []);

  //   console.log(error.message)
  return (
    <section>
      <div id="meals">
        {availableMeals &&
          availableMeals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              image={meal.image}
              name={meal.name}
              price={meal.price}
              description={meal.description}
            />
          ))}
      </div>
      {isLoading && (
        <div className="loading">
          <h2>Loading all meals....</h2>
        </div>
      )}
      {error && (
        <div className="error">
          <h2>Unable to fetch meals. Check your connection</h2>
        </div>
      )}
    </section>
  );
}
