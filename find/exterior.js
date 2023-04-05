import findExteriors from "./exteriors.js";

export default function exterior(xml) {
  return findExteriors(xml)[0];
}
