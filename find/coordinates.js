import find from "../utils/find.js";

export default function coordinates(xml) {
  return find(xml, ["gml:coordinates", "coordinates", "gml:Coordinates", "Coordinates"])[0];
}
