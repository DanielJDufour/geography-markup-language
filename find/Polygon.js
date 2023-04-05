import findPolygons from "./Polygons.js";

export default function Polygon(xml) {
  return findPolygons(xml)[0];
}
