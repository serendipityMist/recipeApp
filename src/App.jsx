import "./App.css";
import { useEffect, useRef, useState } from "react";
// api: www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

function App() {
  const inputTarget = useRef();
  const [recipeData, setRecipeData] = useState(null);
  const [initialVal, setInitialVal] = useState("");

  const handleSearch = () => {
    setInitialVal(inputTarget.current.value);
    console.log("The value is stored in ", initialVal);
    inputTarget.current.value = "";
    console.log("This is working");
  };

  useEffect(() => {
    if (initialVal !== "") {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${initialVal}`
      )
        .then((response) => response.json())
        .then((data) => setRecipeData(data))
        .catch((err) => {
          console.log("You are getting this error ", err);
        });
    }
  }, [initialVal]);

  return (
    <>
      <div className="border border-black rounded-lg w-full p-4">
        <input
          type="text"
          className="border border-black rounded-xl text-red-700 pl-1 mr-2"
          ref={inputTarget}
        />
        <button
          className="border bg-black text-white rounded-lg p-1"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {recipeData && recipeData.meals && (
        <div>
          {recipeData.meals.map((meal) => (
            <>
              <div
                key={meal.idMeal}
                className="border border-gray-300 rounded-lg p-4 my-2"
              >
                <h1>Recipe Name: {meal.strMeal}</h1>
                <p>Instructions: {meal.strInstructions}</p>
                <img src={meal.strMealThumb} alt="Meal" />
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
