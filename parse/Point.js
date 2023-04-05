import getAttribute from "xml-utils/get-attribute.js";

import findPoint from "../find/Point.js";
import parseCoordinates from "./coordinates.js";
import parsePos from "./pos.js";
import parsePosList from "./posList.js";

export default function Point(xml, { debug, raw } = {}) {
  const tag = findPoint(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  const point = parsePos(inner, { debug, raw }) || (parsePosList(inner, { debug, raw }) || [])[0] || parseCoordinates(inner, { debug, raw });

  if (!point || point.length === 0) return;

  const [y, x, z = null] = point;

  return {
    type: "Point",
    srs: getAttribute(tag.outer, "srsName") || null,
    coord: point,
    x,
    y,
    z
  };
}
