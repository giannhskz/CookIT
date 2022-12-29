import prisma from "./prismadb"

export async function addIncredient(userincredients: any) {
    try {
      const incredient = await prisma.userIncredients.create({ data: userincredients})
      return { userincredients : incredient }
    } catch (error) {
      return { error }
    }
  }