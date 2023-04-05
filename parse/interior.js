import findInterior from "../find/interior.js";
import LinearRing from "./LinearRing.js";

export default function interior(xml, { debug, order, raw } = {}) {
  const tag = findInterior(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  return LinearRing(inner, { debug, order, raw });
}
