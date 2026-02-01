import { daysToSeconds } from '@/common/utils/time.utils';

export const jwtExpire: Record<string, number> = {
  login: daysToSeconds(30),
  register: daysToSeconds(30),
};
