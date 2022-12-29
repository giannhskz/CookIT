
import prisma from "../../../lib/prisma/prismadb";

// const handler = async (req, res) => {
//   if (req.method === "GET") {
//     try {
//       const { email } = req.query;
//       const { user, error } = await getUserById(email);
//       if (error) throw new Error(error);
//       return res.status(200).json({ user });
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }

//   res.setHeader("Allow", ["GET"]);
//   res.status(425).end(`Method ${req.method} is not allowed.`);
// };

// export default handler;

export default async (req, res) => {
  // const {id}   = req.query;
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    include: { userincredients: true },
  });
  return res.status(200).json({ user });
};
