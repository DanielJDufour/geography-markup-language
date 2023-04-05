import findTagByName from "xml-utils/find-tag-by-name.js";
import reorder from "../utils/reorder.js";

export default function upperCorner(xml, { order = "default", raw = false } = {}) {
  const tag = findTagByName(xml, "gml:upperCorner") || findTagByName("upperCorner");
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  let point = inner.trim().split(/[ ,]+/g);
  if (!raw) point = point.map(n => Number(n));

  if (order === "geojson") point = reorder(point);

  return point;
}
