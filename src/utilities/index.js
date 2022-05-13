/**
 * @function formatCurency
 * Format number as currency (US Dolalr)
 *
 * @param {number} amount
 * @returs {string} number formated as currency.
 *
 * @example
 *  formatCurrency(0)
 *  // => $0.00
 *
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};
