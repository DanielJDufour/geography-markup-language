import find from "../utils/find.js";

export default function pos(xml) {
  return find(xml, ["gml:pos", "pos", "gml:Pos", "Pos"])[0];
}
