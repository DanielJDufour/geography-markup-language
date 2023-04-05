import getAttribute from "xml-utils/get-attribute.js";

import findCoordinates from "../find/coordinates.js";
import chunk from "../utils/chunk.js";
import reorder from "../utils/reorder.js";

/**
 *
 * @param {String} xml - representing one or more coordinates
 * @param {Object} options
 * @param {Boolean} options.debug
 * @param {Boolean} options.order
 * @param {Boolean} options.raw
 * @returns {Array}
 */
export default function coordinates(xml, { debug = false, order = "default", raw = false } = {}) {
  const tag = findCoordinates(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  let nums = inner.trim().split(/[ ,\t\n]+/g);
  if (!raw) {
    if (debug) console.log("[geography-markup-language] converting to numbers");
    nums = nums.map(n => Number(n));
  }

  const srsDimension = getAttribute(tag, "srsDimension");
  const chunkSize = srsDimension ? Number(srsDimension) : 2;
  let points = chunk(nums, chunkSize);

  if (order === "geojson") {
    points = points.map(pt => reorder(pt));
  }

  if (points.length === 1) {
    return points[0];
  } else {
    return points;
  }
}
