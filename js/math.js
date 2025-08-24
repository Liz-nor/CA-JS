export function calculateTotalPrice(product) {
  return product.reduce((sum, p) => sum + p.price * p.quantity, 0);
}
