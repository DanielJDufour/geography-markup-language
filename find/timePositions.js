import find from "../utils/find.js";

export default function timePositions(xml) {
  return find(xml, ["gml:timePosition", "timePosition", "gml:TimePosition", "TimePosition", "gml:timeposition", "timeposition"]);
}
