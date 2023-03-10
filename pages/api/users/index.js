import prisma from "../../../lib/prisma/prismadb";

export default async (req, res) => {
  // const {id}   = req.query;
  console.log(req.body.email);
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    include: { userincredients: true },
  });
  return res.status(200).json({ user });
};
