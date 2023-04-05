import find from "../utils/find.js";

export default function interiors(xml) {
  return find(xml, ["gml:interior", "interior", "gml:Interior", "Interior"]);
}
