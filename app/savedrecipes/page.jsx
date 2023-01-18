"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  const handleFetchRecipes = async () => {
    try {
      const response = await fetch(
        `/api/findrecipe?email=${session.user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRecipes(data.recipes);
      } else {
        console.log("Error fetching recipes:", response);
      }
    } catch (error) {
      console.log("Error fetching recipes:", error);
    }
  };

  function handleDelete(id) {
    // Show a confirmation modal and delete the item if confirmed
    fetch(`/api/deleterecipe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then(() => {})
      .catch((error) => {
        // Handle error
      });
    handleFetchRecipes();
  }

  const [showRecipe, setShowRecipe] = useState(null);
  const [showMe, setShowMe] = useState(false);

  function toggle() {
    setShowMe(!showMe);
  }

  function cookitButton(event, recipe) {
    event.stopPropagation();
    alert(
      `You successfully executed the ${recipe.title}. Check your mail for more info`
    );
  }

  async function sendEmail(ingredients, title) {
    const response = await fetch(`/api/savedmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        ingredients: ingredients,
        title: title,
      }),
    });
    console.log(ingredients);
    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Failed to send email.");
    }
  }

  return (
    <div
      className="bg-[url('../public/food.png')] h-screen bg-cover "
      onMouseEnter={handleFetchRecipes}
    >
      <div className=" bg-black bg-opacity-70 h-screen bg-cover">
        <div className="flex justify-center items-center pt-6">
          <h2
            onClick={handleFetchRecipes}
            className="backdrop-blur-sm bg-white/50   rounded-full  font-semibold text-dark  text-3xl  p-3"
          >
            Saved Recipes
          </h2>
        </div>
        <div>
          <div className="flex justify-center h-screen pt-4 w-screen">
            <div className="h-2/4 w-3/4 bg-white/95 border-2 rounded-lg border-[#fce4e4] shadow-lg m-12 overflow-y-auto ">
              {recipes.map((recipe) => (
                <div key={recipe.id}>
                  <div className="border-y-2 shadow-md rounded-xl   mx-2 my-2   hover:scale-95 easy-in duration-500">
                    <div className="grid grid-cols-5 gap-6 place-content-strech h-full w-full ">
                      <div className="col-span-1 rounded-xl m-0.5 overflow-hidden relative   ">
                        <img
                          alt={recipe.title}
                          src={`https://spoonacular.com/recipeImages/${recipe.recipeId}-312x231.jpg`}
                        />
                        <button
                          className="inline-flex items-center px-4 py-2 mt-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                          onClick={() => handleDelete(recipe.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
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
                                Ingredients:
                              </div>
                              <div>
                                <ul className="list-disc">
                                  {recipe.ingredients.map((ingredient) => (
                                    <li className="p-1  font-semibold">
                                      {ingredient.original}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <hr />

                            <div className="flex justify-center font-bold p-2 m-2 text-lg">
                              Instructions:
                            </div>
                            <div>
                              <ul className="steps steps-vertical">
                                {recipe.analyzedInstructions.map(
                                  (instraction) => (
                                    <li className="step">{instraction.step}</li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div className="flex justify-center mt-4">
                              <button
                                onClick={(event) =>
                                  sendEmail(recipe.ingredients, recipe.title) &&
                                  cookitButton(event, recipe)
                                }
                                className="group relative inline-block overflow-hidden border rounded-xl backdrop-blur-sm bg-black/20 border-red-200 px-8 py-3 focus:outline-none focus:ring"
                              >
                                <span className="absolute inset-y-0 left-0 w-[2px] bg-red-200 transition-all group-hover:w-full group-active:bg-red-100"></span>
                                <span className="relative text-2xl font-semibold text-red-200 transition-colors group-hover:text-black group-hover:font-semibold">
                                  COOK IT
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
