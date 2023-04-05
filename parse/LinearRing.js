import getAttribute from "xml-utils/get-attribute.js";

import parseCoordinates from "./coordinates.js";
import parsePosList from "./posList.js";

import findCoordinates from "../find/coordinates.js";
import findLinearRing from "../find/LinearRing.js";
import findPosList from "../find/posList.js";
import chunk from "../utils/chunk.js";
import reorder from "../utils/reorder.js";

export default function LinearRing(xml, { debug, order = "default", raw } = {}) {
  const tag = findLinearRing(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  const coordinatesTag = findCoordinates(inner);
  if (coordinatesTag) {
    return parseCoordinates(coordinatesTag.outer, { debug, order, raw });
  }

  const posListTag = findPosList(xml);
  if (posListTag) {
    return parsePosList(posListTag.outer, { debug, order, raw });
  }

  // sometimes there's no sub tag
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

  return points;
}
