export const convertCurrency = (
  value: number,
  from: string,
  to: string
): number => {
  const fromCurrency = from.toLowerCase();
  const toCurrency = to.toLowerCase();
  if (fromCurrency === "dollar" && toCurrency === "inr") return value * 82.5;
  return 0;
};
