"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { PlzSign } from "../../components/plzSign";

const HomePage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser);

  const { data: session, status } = useSession();
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
  if (session) {
    return (
      <div className="bg-[url('../public/food.png')] h-screen  bg-cover ">
        <div className=" bg-black bg-opacity-50 h-screen bg-cover">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex justify-start m-3 ">
              <img
                width={100}
                height={100}
                className="rounded-full transition ease-in duration-200 transform hover:scale-110"
                alt={""}
                src={session.user.image}
              />
            </div>

            <div className="flex justify-center items-center">
              <h2 className="backdrop-blur-sm bg-white/50  border-[#fce4e4]  rounded-full  font-semibold text-dark  text-3xl  p-3 align-middle">
                Welcome {session.user.name}
              </h2>
            </div>
          </div>

          <section className="mt-12  flex justify-center ">
            <div className="container">
              <div className="flex justify-center mx-4">
                <div className="w-full md:w-full xl:w-1/2 px-4 ">
                  <div className=" h-full backdrop-blur-sm bg-white/50 border-2 border-[#fce4e4] rounded-lg overflow-hidden mb-10">
                    <div className="p-8 text-center">
                      <h3>
                        <a className=" font-semibold text-dark text-xl mb-4 block hover:text-primary">
                          Visit your Pantry
                        </a>
                      </h3>
                      <p className="pb-3">
                        Enter and configure you personal e-pantry to discover
                        all the features.
                      </p>
                      <ul className=" list-disc">
                        <li className="pb-2">Add all your incredients</li>
                        <li className="pb-2">Manage the quanities</li>
                        <li className="pb-2">
                          Get notified via email when you run out of an
                          incredient
                        </li>
                        <li>
                          Select your favorite incredients and find the best
                          recipes including them
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center mt-4">
                      <Link
                        href="/pantry"
                        className="m-2 cursor-pointer inline-block py-1 px-5  bg-white/40 border border-[#fce4e4] rounded-full  text-body-color font-semibold  hover:bg-red-200 hover:text-xl transition"
                      >
                        Enter the Pantry
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-full xl:w-1/2 px-4">
                  <div className="backdrop-blur-sm bg-white/50 border-2 border-[#fce4e4] rounded-lg overflow-hidden h-full mb-10">
                    <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                      <h3>
                        <a className=" font-semibold text-dark text-xl mb-4 block ">
                          Find and Save Recipes based on your Incredients
                        </a>
                      </h3>
                      <p className="text-base text-body-color leading-relaxed mb-7">
                        Choose one of the following categories to find 10 random
                        recipes ideas based on the incredients you own.
                      </p>
                      {types.map((type) => (
                        <div
                          key={type}
                          className="m-2 cursor-pointer inline-block py-1 px-5  bg-white/40 border border-[#fce4e4] rounded-full  text-body-color font-semibold  hover:bg-red-200 hover: transition"
                        >
                          <Link
                            href="/logedrecipelist"
                            as={`/logedrecipelist?type=${type}`}
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
    return <PlzSign />;
  }
};
export default HomePage;
