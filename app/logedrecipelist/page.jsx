// "use client";
// import React from "react";
// // import { unstable_getServerSession } from "next-auth/next";
// // import { authOptions } from "pages/api/auth/[...nextauth]";
// import RecipeList from "./list";

// // const User = async () => {
// //   const session = await unstable_getServerSession(authOptions);
// //   const user = await prisma.user.findUnique({
// //     where: { email: session.user.email },
// //     include: { userincredients: true },
// //   });

// //   return <RecipeList user={user} />;
// // };

// // export default User;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

// const User = () => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { data: session } = useSession();
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         // Make a request to the endpoint to fetch the user
//         const res = await axios.post("/api/users", {
//           email: session.user.email,
//         });

//         setUser(res.data.user);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);
//   return isLoading ? (
//     <div>Loading...</div>
//   ) : error ? (
//     <div>{error}</div>
//   ) : (
//     <RecipeList user={user} />
//   );
// };

// export default User;
"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
const API_KEY = "8bf0b47f5fed47e38054c2c57b3dd12b";

let user;
try {
  user = JSON.parse(Cookies.get("user"));
} catch (e) {
  user = null;
}

const RecipeList = () => {
  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(user);
  const { data: session } = useSession();
  const ingredientNames = user.userincredients.map(
    (ingredient) => ingredient.name
  );
  const searchRecipes = async (type) => {
    const offset = Math.floor(Math.random() * 150);

    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&type=${type}&offset=${offset}&fillIngredients=true&addRecipeInformation=true&number=10&sort=max-used-ingredients`,
      {
        params: {
          includeIngredients: ingredientNames.join(","),
        },
      }
    );
    return res.data;
  };

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
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
  }, [type]);

  const [showRecipe, setShowRecipe] = useState(null);
  const [showMe, setShowMe] = useState(false);

  function toggle() {
    setShowMe(!showMe);
  }

  const [likedRecipe, setLikedRecipe] = useState({});

  function handleClick(recipe) {
    const newLikedRecipes = { ...likedRecipe };
    if (newLikedRecipes[recipe.id] === "pink") {
      newLikedRecipes[recipe.id] = "none";
    } else {
      newLikedRecipes[recipe.id] = "pink";
    }
    setLikedRecipe(newLikedRecipes);
  }

  function cookitButton(event, recipe) {
    event.stopPropagation();
    alert(
      `You successfully executed the ${recipe.title}. Check your mail for more info`
    );
  }

  async function sendEmail(missedIngredients, title, usedIngredients) {
    const response = await fetch(`/api/sendmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        missedIngredients: missedIngredients,
        title: title,
        usedIngredients: usedIngredients,
      }),
    });
  }

  const handleSave = async (recipe) => {
    try {
      const response = await fetch(`/api/saverecipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useremail: session.user.email,
          recipeId: recipe.id,
          title: recipe.title,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          imageURL: recipe.image,
          ingredients: recipe.extendedIngredients,
          instructions: recipe.analyzedInstructions[0].steps,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Recipe saved successfully:", data);
      } else {
        console.log("Error saving recipe:", response);
      }
    } catch (error) {
      console.log("Error saving recipe:", error);
    }
  };
  if (!user) {
    return <div>Loading...</div>;
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
              <div className="h-3/5 w-3/4 bg-white/95 border-2 rounded-lg border-[#fce4e4] shadow-lg m-12 overflow-y-auto ">
                {recipes.results.map((recipe) => (
                  <div key={recipe.id}>
                    <div className="border-y-2 shadow-md rounded-xl   mx-2 my-2   hover:scale-95 easy-in duration-500">
                      <div className="grid grid-cols-5 gap-6 place-content-strech h-full w-full ">
                        <div className="col-span-1 rounded-xl m-0.5 overflow-hidden relative   ">
                          <img alt={recipe.title} src={`${recipe.image}`} />

                          <span
                            onClick={() => {
                              {
                                handleClick(recipe);
                                handleSave(recipe);
                              }
                            }}
                            className="flex justify-center mt-5 hover:cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill={likedRecipe[recipe.id] || "none"}
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                              />
                            </svg>
                          </span>
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
                                Used Incredients:{" "}
                              </span>
                              {recipe.usedIngredients.map((alling) => (
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
                            <div className="flex justify-center mt-4">
                              <button
                                onClick={(event) =>
                                  sendEmail(
                                    recipe.missedIngredients,
                                    recipe.title,
                                    recipe.usedIngredients
                                  ) && cookitButton(event, recipe)
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
