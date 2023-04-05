import findTagByName from "xml-utils/find-tag-by-name.js";
import reorder from "../utils/reorder.js";

/**
 * @name lowerCorner
 * @param {String} xml
 * @param {Object} options
 * @param {String} options.order - "default" or "geojson"
 * @param {Boolean} options.raw - whether to return the coordinates as an array of strings
 * @returns {Array} with default ordering [y, x] or with geojson order, [x, y]
 */
export default function lowerCorner(xml, { order = "default", raw = false } = {}) {
  const tag = findTagByName(xml, "gml:lowerCorner") || findTagByName("lowerCorner");
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  let point = inner.trim().split(/[ ,]+/g);
  if (!raw) point = point.map(n => Number(n));

  if (order === "geojson") point = reorder(point);

  return point;
}
