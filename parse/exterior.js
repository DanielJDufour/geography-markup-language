import findExterior from "../find/exterior.js";
import LinearRing from "./LinearRing.js";

export default function exterior(xml, { debug, order, raw } = {}) {
  const tag = findExterior(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  return LinearRing(inner, { debug, order, raw });
}
