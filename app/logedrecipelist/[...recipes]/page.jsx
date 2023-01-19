import React from "react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import RecipeList from "./list";


const User = async (req) => {
  const session = await unstable_getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { userincredients: true },
  });

  return <RecipeList user={user} />;
};

export default User;
