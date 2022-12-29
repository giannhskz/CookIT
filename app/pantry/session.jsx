// import React from "react";
import { PlzSign } from "../../components/plzSign";
// import Table from "./table";
// import { useSession } from "next-auth/react";
import User from "./user";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Table from "./table";
import HomePage from "../homepage/page";

export default async function Page() {
  const session = await unstable_getServerSession(authOptions);
  if (session) {
    return <User />;
  } else {
    return <HomePage />
  }
}
