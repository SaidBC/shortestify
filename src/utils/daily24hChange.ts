export default function daily24hChange(x: number, y: number) {
  if (y === 0) return 0;
  return (x / y - 1) * 100;
}
