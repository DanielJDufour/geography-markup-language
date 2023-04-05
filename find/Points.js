import find from "../utils/find.js";
import POINT_TAG_NAMES from "../enums/Point.js";

export default function Points(xml) {
  return find(xml, POINT_TAG_NAMES);
}
