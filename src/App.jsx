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
            setError("No recipes found for the given ingredient.");
          }
        })
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
      {error && <div className="text-red-500">{error}</div>}
      {recipeData && recipeData.meals && (
        <div>
          {recipeData.meals.map((meal) => (
            <>
              <div
                key={meal.idMeal}
                className="border border-black rounded-lg my-2  py-4  flex   flex-wrap items-stretch"
              >
                <div className="w-full sm:w-full md:w-1/3 lg:w-1/3 flex ">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full sm:w-full md:w-2/3 lg:w-2/3 flex flex-col items-center justify-center">
                  <h1 className="text-xl text-orange-500">
                    Recipe Name: {meal.strMeal}
                  </h1>
                  <p>Instructions: {meal.strInstructions}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
