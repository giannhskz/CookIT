import prisma from "../../../lib/prisma/prismadb";

export default async (req, res) => {
  const recipe = await prisma.recipe.delete({
    where: { id: req.body.id },
  });
  if (!incredient) {
    res.status(404).send({ message: "Item not found" });
  } else {
    res.json(incredient);
  }
};
