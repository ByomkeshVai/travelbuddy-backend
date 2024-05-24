export function generateRandom4Digit(): number {
  return Math.floor(10000 + Math.random() * 90000); // Returns a random 5-digit number
}
