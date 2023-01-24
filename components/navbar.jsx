"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'

export const Navbar = ({}) => {
  const { data: session, status } = useSession();
  console.log(session);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session]);

  const fetchUser = async () => {
    const res = await axios.post("/api/users", {
      email: session.user.email,
    });
    setUser(res.data.user);
    setIsLoading(false);
    Cookies.set("user", JSON.stringify(res.data.user));
  };

  {
    if (session) {
      return (
        <nav className="flex filter drop-shadow-md bg-red-100 px-4 items-center">
          <div className="flex justify-center items-center">
            <Image src="/cookingLogo.png" width={100} height={100} alt={""} />
          </div>
          <div className="grid grid-cols-5 items-center">
            <Link
              href="/homepage"
              className="hover:scale-125 ease-in duration-200 cursor-pointer pl-4"
            >
              HOME
            </Link>

            <div className="border-l-2 h-[2.5rem] border-black/60 ml-8"></div>

            <Link
              href="/pantry"
              className="hover:scale-125 ease-in duration-200 cursor-pointer "
            >
              PANTRY
            </Link>

            <div className="border-l-2 h-[2.5rem] border-black/60 ml-8"></div>
            <Link
              href="/savedrecipes"
              className="hover:scale-125 ease-in duration-200 cursor-pointer "
            >
              SAVED
            </Link>
          </div>

          <div className="w-10/12 flex justify-end items-center">
            <>
              <button
                onClick={() =>
                  signOut({ callbackUrl: "http://localhost:3000" })
                }
              >
                Sign out
              </button>
            </>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="flex filter drop-shadow-md bg-red-100 px-4 items-center">
          <div className="flex justify-center items-center">
            <Image src="/cookingLogo.png" width={100} height={100} />
          </div>
          <div className="grid grid-cols-3 items-center">
            <Link
              href="/homepage"
              className="hover:scale-125 ease-in duration-200 cursor-pointer pl-4"
            >
              HOME
            </Link>

            <div className="border-l-2 h-[2.5rem] border-black/60 ml-8"></div>

            <Link
              href="/pantry"
              className="hover:scale-125 ease-in duration-200 cursor-pointer "
            >
              PANTRY
            </Link>
          </div>
          <div className="w-10/12 flex justify-end items-center">
            <>
              <button onClick={() => signIn()}>Sign in</button>
            </>
          </div>
        </nav>
      );
    }
  }
};
