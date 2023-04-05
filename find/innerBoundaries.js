import find from "../utils/find.js";

export default function innerBoundaries(xml) {
  return find(xml, ["gml:innerBoundaryIs", "innerBoundaryIs", "gml:InnerBoundaryIs", "InnerBoundaryIs", "gml:innerboundaryis", "innerboundaryis"]);
}
