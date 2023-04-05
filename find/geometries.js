import findAll from "../utils/findAll.js";

import ENVELOPE_TAG_NAMES from "../enums/Envelope.js";
import LINE_STRING_TAG_NAMES from "../enums/LineString.js";
import POINT_TAG_NAMES from "../enums/Point.js";
import POLYGON_TAG_NAMES from "../enums/Polygon.js";

let GEOMETRY_TAG_NAMES;

// find all the geometries
export default function geometries(xml) {
  if (!GEOMETRY_TAG_NAMES) GEOMETRY_TAG_NAMES = ENVELOPE_TAG_NAMES.concat(LINE_STRING_TAG_NAMES).concat(POINT_TAG_NAMES).concat(POLYGON_TAG_NAMES);
  return findAll(xml, GEOMETRY_TAG_NAMES).map(tag => tag.outer);
}
