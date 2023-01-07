"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = "8bf0b47f5fed47e38054c2c57b3dd12b";

const getQueryParams = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params;
};

const RecipeList = () => {
  const searchRecipes = async (type) => {
    const offset = Math.floor(Math.random() * 150);

    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&type=${type}&offset=${offset}&fillIngredients=true&addRecipeInformation=true&number=2`
    );
    return res.data;
  };

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = getQueryParams();
    const type = params.get("type");

    const fetchRecipes = async () => {
      try {
        const data = await searchRecipes(type);
        setRecipes(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);
  console.log(recipes);

  const [showRecipe, setShowRecipe] = useState(null);
  const [showMe, setShowMe] = useState(false);

  function toggle() {
    setShowMe(!showMe);
  }


  return (
    <div className="bg-[url('../public/food.png')] h-screen  bg-cover ">
      <div className=" bg-black bg-opacity-70 h-screen bg-cover">
        <div className="flex justify-center items-center pt-6">
          <h2 className="backdrop-blur-sm bg-white/50   rounded-full  font-semibold text-dark  text-3xl  p-3">
            Recipes List
          </h2>
        </div>
        <div>
          <div className="flex justify-center h-screen pt-4 w-screen">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {isLoading === false && (
              <div className="h-3/4 w-3/4 bg-white/95 border-2 rounded-lg border-[#fce4e4] shadow-lg m-12 overflow-y-auto ">
                {recipes.results.map((recipe) => (
                  <div key={recipe.id}>
                    <div className="border-y-2 shadow-md rounded-xl   mx-2 my-2   hover:scale-95 easy-in duration-500">
                      <div className="grid grid-cols-5 gap-6 place-content-strech h-full w-full ">
                        <div className="col-span-1 rounded-xl m-0.5 overflow-hidden relative   ">
                          <img alt={recipe.title} src={`${recipe.image}`} />

                          
                        </div>

                        <div
                          className="col-span-4  m-3"
                          onClick={() => {
                            setShowRecipe(recipe.id);
                            {
                              toggle();
                            }
                          }}
                        >
                          <div className="flex justify-center font-semibold text-2xl  pt-2">
                            {recipe.title}
                          </div>

                          <div className="flex justify-around">
                            <div className="pt-8 text-lg font-">
                              {recipe.servings} Servings
                            </div>

                            <div className="pt-8 flex gap-2 text-lg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {recipe.readyInMinutes}
                            </div>
                          </div>
                          <div className="m-1">
                            <div className="p-1 bg-green-200 rounded-xl">
                              <span className="font-bold">
                                Included Incredients:{" "}
                              </span>
                              {recipe.extendedIngredients.map((alling) => (
                                <span>{alling.name} | </span>
                              ))}
                            </div>

                            <div className="p-1 bg-red-200 rounded-xl">
                              <span className="font-bold">
                                Missing Incredients:{" "}
                              </span>
                              {recipe.missedIngredients.map((missing) => (
                                <span>{missing.name} | </span>
                              ))}
                            </div>
                            <div className="flex justify-center pt-2 text-xs  hover:text-blue-500 text-underline  ">
                              Click on the card to show instraction
                            </div>
                          </div>
                          <div
                            style={{
                              display:
                                showMe && showRecipe === recipe.id
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <hr />
                            <div>
                              <div className="flex justify-center font-bold p-2 m-2 text-lg">
                                Incredients:
                              </div>
                              <div>
                                <ul className="list-disc">
                                  {recipe.extendedIngredients.map(
                                    (ingredient) => (
                                      <li className="p-1  font-semibold">
                                        {ingredient.original}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                            <hr />

                            <div className="flex justify-center font-bold p-2 m-2 text-lg">
                              Instructions:
                            </div>
                            <div>
                              <ul className="steps steps-vertical">
                                {recipe.analyzedInstructions[0].steps.map(
                                  (instraction) => (
                                    <li className="step">{instraction.step}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
