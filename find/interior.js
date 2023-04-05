import findInteriors from "./interiors.js";

export default function interior(xml) {
  return findInteriors(xml)[0];
}
