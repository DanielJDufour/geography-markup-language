import find from "../utils/find.js";

export default function exteriors(xml) {
  return find(xml, ["gml:exterior", "exterior", "gml:Exterior", "Exterior"]);
}
