import prisma from "../../../lib/prisma/prismadb";

export default async (req, res) => {
  try {
    const ingredients = req.body.ingredients.map((ingredient) => {
      return { original: ingredient.original };
    });

    const instructions = req.body.instructions.map((instruction) => {
      return { number: instruction.number, step: instruction.step };
    });

    const recipe = await prisma.recipe.create({
      data: {
        user: { connect: { email: req.body.useremail } },
        recipeId: req.body.recipeId,
        title: req.body.title,
        readyInMinutes: req.body.readyInMinutes,
        servings: req.body.servings,
        imageURL: req.body.imageURL,
        ingredients: {
          set: ingredients,
        },
        analyzedInstructions: {
          set: instructions,
        },
      },
    });
    res.status(200).json({ recipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving recipe" });
  }
};
