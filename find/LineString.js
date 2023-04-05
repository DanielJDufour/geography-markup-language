import find from "../utils/find.js";
import LINE_STRING_TAG_NAMES from "../enums/LineString.js";

export default function LineString(xml) {
  return find(xml, LINE_STRING_TAG_NAMES)[0];
}
