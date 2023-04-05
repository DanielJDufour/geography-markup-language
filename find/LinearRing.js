import find from "../utils/find.js";

export default function LinearRing(xml) {
  return find(xml, ["gml:LinearRing", "LinearRing", "gml:linearRing", "linearRing", "gml:linearring", "linearring"])[0];
}
