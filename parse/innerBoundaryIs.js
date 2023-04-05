import findInnerBoundaryIs from "../find/innerBoundaryIs.js";
import LinearRing from "./LinearRing.js";

export default function innerBoundaryIs(xml, { debug, order, raw } = {}) {
  const tag = findInnerBoundaryIs(xml.outer);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  return LinearRing(inner, { debug, order, raw });
}
