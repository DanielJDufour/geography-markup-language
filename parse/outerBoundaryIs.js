import findOuterBoundaryIs from "../find/outerBoundaryIs.js";
import LinearRing from "./LinearRing.js";

export default function outerBoundaryIs(xml, { debug, order, raw } = {}) {
  const tag = findOuterBoundaryIs(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  return LinearRing(inner, { debug, order, raw });
}
