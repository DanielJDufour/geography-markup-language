import getAttribute from "xml-utils/get-attribute.js";

import findLineString from "../find/LineString.js";
import parseCoordinates from "./coordinates.js";
import parsePosList from "./posList.js";

export default function LineString(xml, { debug, order, raw } = {}) {
  const tag = findLineString(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  const coords = parsePosList(inner, { debug, order, raw }) || parseCoordinates(inner, { debug, order, raw });

  const result = {
    type: "LineString",
    coords
  };

  const srsName = getAttribute(tag.outer, "srsName");
  if (debug) console.log("[geography-markup-language] srsName:", srs);
  if (srsName) {
    result.srs = srsName;
  }

  return result;
}
