import bcrypt from "bcryptjs";
import config from "../../config";

const hashedPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, config.bcrypt_salt_rounds);
};
const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
export const hashedPasswordHelper = {
  hashedPassword,
  comparePassword,
};