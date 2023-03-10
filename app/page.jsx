"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const types = [
    "snack",
    "soup",
    "breakfast",
    "salad",
    "appetizer",
    "dessert",
    "side dish",
    "main course",
  ];

  useEffect(() => {
    if (session) {
      window.location.replace("/homepage");
    }
  }, [session]);

  if (!session) {
    return (
      <div className="bg-[url('../public/food.png')] h-screen  bg-cover ">
        <div className=" bg-black bg-opacity-50 h-screen bg-cover">
          <div className="flex justify-center items-center pt-12">
            <h2 className="backdrop-blur-sm bg-white/50  border-[#fce4e4]  rounded-full  font-semibold text-dark  text-3xl  p-3">
              Welcome to COOK I.T
            </h2>
          </div>

          <section className="mt-12 flex justify-center ">
            <div className="container">
              <div className="flex justify-center mx-4">
                <div className="w-full md:w-full xl:w-1/2 px-4 ">
                  <div className=" h-full backdrop-blur-md bg-white/50 border-2 border-[#fce4e4] rounded-lg overflow-hidden mb-10">
                    <div className="p-8 text-center">
                      <h3>
                        <a className=" font-semibold text-dark text-xl mb-4 block">
                          Login to Access your Pantry
                        </a>
                      </h3>
                      <p className="text-base text-body-color leading-relaxed mb-7">
                        Login using your acount on the most famous platforms.
                        <br />
                        After Loging in you may create your won Pantry and
                        access thousands of recipes, based on your desired
                        incredients.
                      </p>

                      <button
                        onClick={() => signIn("google")}
                        type="button"
                        className="text-white bg-[#4285F4] hover:bg-transparent hover:border-blue-500 hover:border-2  focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                      >
                        <svg
                          className="mr-2 -ml-1 w-4 h-4"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="google"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 488 512"
                        >
                          <path
                            fill="currentColor"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                          ></path>
                        </svg>
                        Sign in with Google
                      </button>

                      <button
                        onClick={() => {
                          signIn("facebook");
                        }}
                        type="button"
                        className="text-white bg-[#3b5998] hover:bg-transparent hover:border-2 hover:border-[#3b5998] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                      >
                        <svg
                          className="mr-2 -ml-1 w-4 h-4"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="facebook-f"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path
                            fill="currentColor"
                            d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                          ></path>
                        </svg>
                        Sign in with Facebook
                      </button>

                      <button
                        onClick={() => {
                          signIn("github");
                        }}
                        type="button"
                        className="text-white bg-[#24292F] hover:bg-transparent hover:border-2 hover:border-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                      >
                        <svg
                          className="mr-2 -ml-1 w-4 h-4"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="github"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                        >
                          <path
                            fill="currentColor"
                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                          ></path>
                        </svg>
                        Sign in with Github
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-full xl:w-1/2 px-4">
                  <div className="backdrop-blur-md bg-white/50 border-2 border-[#fce4e4] rounded-lg overflow-hidden h-full mb-10">
                    <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                      <h3>
                        <a className=" font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block  ">
                          Find some Random Recipes
                        </a>
                      </h3>
                      <p className="text-base text-body-color leading-relaxed mb-7">
                        Chose one of the following categories to find 10 random
                        recipes ideas.
                      </p>
                      {types.map((type) => (
                        <div
                          key={type}
                          className="m-2 cursor-pointer inline-block py-1 px-5  bg-white/40 border border-[#fce4e4] rounded-full  text-body-color font-semibold  hover:bg-red-200 hover: transition"
                        >
                          <Link
                            href="/recipelist"
                            as={`/recipelist?type=${type}`}
                          >
                            {type}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-[url('../public/food.png')] h-screen  bg-cover ">
        <div className=" bg-black bg-opacity-50 h-screen bg-cover">
          <div className="flex justify-center items-center pt-12">
            <h2 className="backdrop-blur-sm bg-white/50  border-[#fce4e4]  rounded-full  font-semibold text-dark  text-3xl  p-3">
              Welcome to COOK I.T
            </h2>
          </div>

          <section className="mt-12 flex justify-center ">
            <div className="container">
              <div className="flex justify-center mx-4">
                <div className="w-full md:w-full xl:w-1/2 px-4">
                  <div className="backdrop-blur-md bg-white/50 border-2 border-[#fce4e4] rounded-lg overflow-hidden h-full mb-10">
                    <Link
                      href="/homepage"
                      className="flex justify-center  text-lg font-bold "
                    >
                      Head to HomePage
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
