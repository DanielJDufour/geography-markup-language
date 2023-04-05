import find from "../utils/find.js";

export default function coord(xml) {
  return find(xml, ["gml:coord", "coord", "gml:Coord", "Coord"])[0];
}
