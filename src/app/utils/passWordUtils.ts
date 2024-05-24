import bcrypt from 'bcrypt';

class PasswordUtils {
  static async isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      return false;
    }
  }
}

export default PasswordUtils;
