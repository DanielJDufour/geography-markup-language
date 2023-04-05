// reorder from [y, x, ...] to [x, y, ...]
export default function reorder(point) {
  const y = point[0];
  const x = point[1];
  const rest = point.slice(2);
  return [x, y].concat(rest);
}
