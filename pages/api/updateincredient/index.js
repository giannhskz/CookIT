import prisma from "../../../lib/prisma/prismadb";

export default async (req, res) => {
  try {
    // Retrieve the ingredientId and updated ingredient data from the request
    //   const { ingredientId } = req.params;
    console.log(req.body);
    // Use Prisma to update the ingredient
    const ingredient = await prisma.userIncredients.update({
      where: { id: req.body.id },
      data: {
        name: req.body.name,
        quantity: parseInt(req.body.quantity),
      },
    });

    res.json(ingredient);
  } catch (error) {
    res.status(500).send(error);
  }
};


// export default async (req, res) => {
//     try {
//       // Retrieve the new name and quantity from the request body
//       const { name, quantity } = req.body;
//       console.log(req.body);
//       // Use Prisma to update the ingredient in the database
//       const updatedIngredient = await prisma.userIncredients.update({
//         where: { id: req.params.id },
//         data: { name: req.body.name,
//             quantity: parseInt(req.body.quantity) },
//       });
  
//       res.json(updatedIngredient);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };