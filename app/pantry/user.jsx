import React from "react";
import { getUserById } from "../../lib/prisma/users";
import Table from "./table";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

// async function getUser(req, res) {
//   const user = await prisma.user.findUnique({
//     where: { id: req.body.id },
//     include: { userincredients: true },
//   });
//   return user;
// }

const User = async (req) => {
  // const user = await getUser({ body: { id }}, {} );
  const session = await unstable_getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { userincredients: true },
  });

  return <Table user={user} />;
};

export default User;
