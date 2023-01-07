import React from "react";
import Table from "./table";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";


const User = async (req) => {
  const session = await unstable_getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { userincredients: true },
  });

  return <Table user={user} />;
};

export default User;
