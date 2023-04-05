import findCoord from "../find/coord.js";
import reorder from "../utils/reorder.js";

/**
 * @name coord
 * @param {String} xml
 * @param {Object} options
 * @param {String} options.order - "default" or "geojson"
 * @param {Boolean} options.raw - whether to return the coordinate numbers as raw strings as they appear in the inputsssss
 * @returns {Array} coordinate point
 */
export default function coord(xml, { order = "default", raw = false } = {}) {
  const tag = findCoord(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  let point = inner.trim().split(/[ ,]+/g);
  if (!raw) point = point.map(n => Number(n));

  if (order === "geojson") point = reorder(point);

  return point;
}
