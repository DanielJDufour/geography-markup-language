import findPosLists from "./posLists.js";

export default function posList(xml) {
  return findPosLists(xml)[0];
}
