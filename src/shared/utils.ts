export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const randomNumberFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
