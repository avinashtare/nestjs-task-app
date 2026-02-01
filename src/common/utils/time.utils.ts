// time.utils.ts

const TIME_IN_SECONDS = {
  SECOND: 1,
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 24 * 60 * 60,

  MONTH: 30 * 24 * 60 * 60,
} as const;

const toSeconds = (value: number, unitInSeconds: number): number =>
  value * unitInSeconds;

export const hoursToSeconds = (hours: number): number =>
  toSeconds(hours, TIME_IN_SECONDS.HOUR);

export const daysToSeconds = (days: number): number =>
  toSeconds(days, TIME_IN_SECONDS.DAY);

export const monthsToSeconds = (months: number): number =>
  toSeconds(months, TIME_IN_SECONDS.MONTH);
