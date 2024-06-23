import "./App.css";
import { useEffect, useRef, useState } from "react";
// api: www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

function App() {
  const inputTarget = useRef();
  const [recipeData, setRecipeData] = useState(null);
  const [initialVal, setInitialVal] = useState("");
  const [error, setError] = useState("");
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
        .then((data) => {
          if (data.meals) {
            setRecipeData(data);
            setError("");
          } else {
            setRecipeData(null);
            setError(
              `No recipes found for the given ingredient(${initialVal})`
            );
          }
        })
        .catch((err) => {
          console.log("You are getting this error ", err);
        });
    }
  }, [initialVal]);

  return (
    <>
      <div className="  rounded-lg w-full p-4 flex justify-center">
        <input
          type="text"
          className="border border-black rounded-xl text-red-700 pl-1 mr-2 focus:shadow-md focus-within:border-none"
          ref={inputTarget}
        />
        <button
          className=" bg-red-500 text-white rounded-lg p-1 font-bold "
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}

      {recipeData && recipeData.meals && (
        <div className=" p-4 mt-1 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recipeData.meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="border  rounded-lg overflow-hidden bg-white shadow-md shadow-black flex flex-col"
              >
                <div className="flex-shrink-0">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h1 className="text-xl text-orange-500 mb-2 font-bold text-center">
                    Recipe Name: {meal.strMeal}
                  </h1>
                  <p className="text-black flex-grow text-center">
                    Instructions: {meal.strInstructions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
