import { Logger } from '@nestjs/common';
import bcrypt from 'bcrypt';

export const passwordToHash = async (
  password: string,
  saltRounds: number = 10,
): Promise<string | null> => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error: any) {
    Logger.log(`${error}`, 'PasswrodError');
    return null;
  }
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error: any) {
    Logger.log(`${error}`, 'PasswrodError');
    return false;
  }
};
