import prisma from "../../../lib/prisma/prismadb";

export default async (req, res) => {
  const incredient = await prisma.userIncredients.delete({
    where: { id: req.body.id },
  });
  if (!incredient) {
    res.status(404).send({ message: "Item not found" });
  } else {
    res.json(incredient);
  }
};
