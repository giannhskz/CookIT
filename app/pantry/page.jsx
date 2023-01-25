// import React from "react";
// import Session from "./session";
// import Table from "./table";
// import User from "./user";

// const Pantry = () => {
//   return (
//     <div className="bg-[url('../public/food.png')] h-screen  bg-cover ">
//       <div className=" bg-black bg-opacity-50 h-screen bg-cover">
//         <div className="flex justify-center items-center pt-12">
//           <h2 className="backdrop-blur-sm bg-white/50  border-[#fce4e4]  rounded-full  font-semibold text-dark  text-3xl  p-3">
//             Your Pantry
//           </h2>
//         </div>
//         <div>
//           <Session />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Pantry;
"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { PlzSign } from "../../components/plzSign";

function handleDelete(id) {
  // Show a confirmation modal and delete the item if confirmed
  fetch(`/api/deleteincredients`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then(() => {
      // Refresh the page
      window.location.reload();
    })
    .catch((error) => {
      // Handle error
    });
}

let user;
try {
  user = JSON.parse(Cookies.get("user"));
} catch (e) {
  user = null;
}

const Table = () => {
  const [showMe, setShowMe] = useState(false);
  function toggle() {
    setShowMe(!showMe);
  }
  const [showModal, setShowModal] = useState(false);
  const [editingIngredientId, setEditingIngredientId] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Retrieve the userId of the currently connected user
    const userId = await user.id;

    // Send a POST request to the server to create a new ingredient
    const response = await fetch(`/api/createincredients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity, userId }),
    });
    const data = await response.json();
    window.location.reload();
    // Clear the form fields and show a success message
    setName("");
    setQuantity("");
  };

  const updateIngredient = async (event) => {
    event.preventDefault();

    // Send a PUT request to the server to update the ingredient
    const response = await fetch(`/api/updateincredient`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity, id: editingIngredientId }),
    });
    const data = await response.json();
    console.log(data);

    window.location.reload();
    // Close the modal and show a success message
    setShowModal(false);
  };
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  if (!user) {
    return <PlzSign />;
  }
  return (
    <div className="bg-[url('../public/food.png')] h-screen  bg-cover ">
      <div className=" bg-black bg-opacity-50 h-screen bg-cover">
        <div className="flex justify-center items-center pt-12">
          <h2 className="backdrop-blur-sm bg-white/50  border-[#fce4e4]  rounded-full  font-semibold text-dark  text-3xl  p-3">
            Your Pantry
          </h2>
        </div>
        <div></div>
        <div className="max-w-2xl mx-auto pt-12 ">
          <div className="flex flex-col">
            <div className="overflow-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-scroll max-h-96 ">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="p-4"></th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Quantiy
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {user.userincredients.map((incredient) => (
                        <tr
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          key={incredient.id}
                        >
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-1"
                                type="checkbox"
                                checked={selectedIngredients.includes(
                                  incredient.name
                                )}
                                onChange={() => {
                                  if (
                                    selectedIngredients.includes(
                                      incredient.name
                                    )
                                  ) {
                                    setSelectedIngredients(
                                      selectedIngredients.filter(
                                        (id) => id !== incredient.name
                                      )
                                    );
                                  } else {
                                    setSelectedIngredients([
                                      ...selectedIngredients,
                                      incredient.name,
                                    ]);
                                  }
                                  console.log(selectedIngredients);
                                }}
                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="checkbox-table-1"
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {incredient.name}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {incredient.quantity}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <div
                              style={{
                                display:
                                  showModal &&
                                  editingIngredientId === incredient.id
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <div className="modal-content">
                                <form onSubmit={updateIngredient}>
                                  <label>
                                    Name:
                                    <input
                                      className="m-1"
                                      type="text"
                                      value={name || incredient.name}
                                      onChange={(event) =>
                                        setName(event.target.value)
                                      }
                                    />
                                  </label>
                                  <br />
                                  <label>
                                    Quantity:
                                    <input
                                      className="m-1"
                                      type="number"
                                      value={quantity}
                                      onChange={(event) =>
                                        setQuantity(event.target.value)
                                      }
                                    />
                                  </label>
                                  <br />
                                  <button type="submit">
                                    Update ingredient
                                  </button>
                                </form>
                              </div>
                            </div>
                            <button
                              className="text-blue-600 dark:text-blue-500 hover:underline"
                              onClick={() => {
                                setEditingIngredientId(incredient.id);
                                setShowModal(true);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                              onClick={() => handleDelete(incredient.id)}
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-3 ">
              <form
                onSubmit={handleSubmit}
                style={{ display: showMe ? "block" : "none" }}
              >
                <div className="flex justify-center">
                  <div className="mx-2 w-2/4">
                    <label className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm focus-within:border-red-200 focus-within:ring-1 focus-within:ring-red-200">
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Incredient"
                        className="peer h-[30px] w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      />
                      <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Incredient
                      </span>
                    </label>
                  </div>
                  <div className="mx-2 w-3/12">
                    <label className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm focus-within:border-red-200 focus-within:ring-1 focus-within:ring-red-200">
                      <input
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                        placeholder="Amount"
                        className="peer h-[30px] w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      />
                      <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Amount
                      </span>
                    </label>
                    <button
                      className="p-2 mt-2 ml-4 rounded-xl bg-red-200 hover:bg-transparent hover:text-white hover:border-2 hover:border-red-200 hover:font-bold"
                      type="submit"
                    >
                      Add it
                    </button>
                  </div>
                </div>
              </form>
              <div>
                <button
                  className="py-2 px-4 backdrop-blur-sm bg-black/20 text-white font-semibold border border-red-200 rounded hover:bg-red-200 hover:text-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                  onClick={toggle}
                >
                  Add Incredient
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-[100px]">
          <button className="p-4 backdrop-blur-sm bg-black/20 text-white font-semibold border border-red-200 rounded-full  hover:bg-red-200 hover:text-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
            <Link
              href="/pantryrecipes"
              as={`/pantryrecipes?includedIngredients=${selectedIngredients}`}
            >
              Find Recipes
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
