import getAttribute from "xml-utils/get-attribute.js";

import findInnerBoundaries from "../find/innerBoundaries.js";
import findInteriors from "../find/interiors.js";
import findPolygon from "../find/Polygon.js";
import parseExterior from "./exterior.js";
import parseInnerBoundaryIs from "./innerBoundaryIs.js";
import parseInterior from "./interior.js";
import parseOuterBoundaryIs from "./outerBoundaryIs.js";

export default function Polygon(xml, { debug, order, raw } = {}) {
  const tag = findPolygon(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  const exterior = parseExterior(xml, { debug, order, raw }) || parseOuterBoundaryIs(xml, { debug, order, raw });

  let holes = findInteriors(xml).map(interior => parseInterior(interior, { debug, order, raw }));
  if (holes.length === 0) {
    // if didn't find any, try older format
    holes = findInnerBoundaries(xml).map(boundary => parseInnerBoundaryIs(boundary, { debug, order, raw }));
  }

  // create polygon with first array being the exterior ring
  const rings = [exterior].concat(holes);

  const result = {
    type: "Polygon",
    rings
  };

  const srsName = getAttribute(tag.outer, "srsName");
  if (debug) console.log("[geography-markup-language] srsName:", srs);
  if (srsName) {
    result.srs = srsName;
  }

  return result;
}
