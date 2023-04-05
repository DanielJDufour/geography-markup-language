import find from "../utils/find.js";

export default function outerBoundaryIs(xml) {
  return find(xml, ["gml:outerBoundaryIs", "outerBoundaryIs", "gml:OuterBoundaryIs", "OuterBoundaryIs", "gml:outerboundaryis", "outerboundaryis"])[0];
}
