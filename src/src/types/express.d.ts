// src/types/express.d.ts

import { IUser } from '@/modules/user/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
