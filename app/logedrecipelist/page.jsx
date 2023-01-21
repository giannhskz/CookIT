"use client";
import React from "react";
// import { unstable_getServerSession } from "next-auth/next";
// import { authOptions } from "pages/api/auth/[...nextauth]";
import RecipeList from "./list";

// const User = async () => {
//   const session = await unstable_getServerSession(authOptions);
//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//     include: { userincredients: true },
//   });

//   return <RecipeList user={user} />;
// };

// export default User;

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const User = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Make a request to the endpoint to fetch the user
        const res = await axios.post("/api/users", {
          email: session.user.email,
        });
        setUser(res.data.user);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <RecipeList user={user} />
  );
};

export default User;
