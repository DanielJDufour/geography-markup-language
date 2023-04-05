import find from "../utils/find.js";

export default function posLists(xml) {
  return find(xml, ["gml:posList", "posList", "gml:PosList", "PosList", "gml:poslist", "poslist"]);
}
