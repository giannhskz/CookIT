import prisma from "../../../lib/prisma/prismadb";

export default async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        useremail: req.query.email,
      },
    });
    console.log(recipes);
    res.status(200).json({ recipes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching recipes" });
  }
};
