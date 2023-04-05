import findPoints from "./Points.js";

export default function Point(xml) {
  return findPoints(xml)[0];
}
