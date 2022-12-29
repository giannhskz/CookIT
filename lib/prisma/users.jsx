import { userAgent } from "next/server";
import client from "./prismadb";
import prisma from "./prismadb";

export async function getUsers() {
  try {
    const users = await client.user.findMany();
    return { users };
  } catch (error) {
    return { error };
  }
}

export async function createUser(user) {
  try {
    const userFromDB = await prisma.user.create({ data: user });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

export async function getUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { userincredients: true },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
