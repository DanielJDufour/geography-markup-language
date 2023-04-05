import find from "../utils/find.js";
import POLYGON_TAG_NAMES from "../enums/Polygon.js";

export default function Polygon(xml) {
  return find(xml, POLYGON_TAG_NAMES);
}
