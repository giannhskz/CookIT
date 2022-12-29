import prisma from "../../../lib/prisma/prismadb";

export default async (req, res) => {
  try {
    // Retrieve the userId from the request body
    // Use Prisma to create a new ingredient
    const incredient = await prisma.userIncredients.create({
      data: {
        name: req.body.name,
        quantity: parseInt(req.body.quantity),
        user: { connect: { id: req.body.userId } },
      },
    });
    res.json(incredient);
  } catch (error) {
    res.status(500).send(error);
  }
};
