import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

class UserModel {
  static async isUserExistsByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return !!user;
  }

  static async isUserExistsById(id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return !!user;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
}

export default UserModel;
