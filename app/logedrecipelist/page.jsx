import React from "react";
export const dynamic = "force-dynamic";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import RecipeList from "./list";
// import { useSession} from "next-auth/react";
// import { useEffect, useState } from "react";

const User = async () => {
  const session = await unstable_getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { userincredients: true },
  });

  return <RecipeList user={user} />;
};

export default User;
