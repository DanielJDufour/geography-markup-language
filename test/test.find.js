import test from "flug";

import findGeometries from "../find/geometries.js";

test("findGeometries", ({ eq }) => {
  const lines = [
    `<gml:Envelope gml:id="western hemisphere"> <gml:lowerCorner>-90 -180</gml:lowerCorner> <gml:upperCorner>90 0</gml:upperCorner> </gml:Envelope>`,
    `<gml:Envelope gml:id="eastern hemisphere"> <gml:lowerCorner>-90 0</gml:lowerCorner> <gml:upperCorner>90 180</gml:upperCorner> </gml:Envelope>`,
    `<gml:Point gml:id="null island"> <gml:posList>0,0</gml:posList> </gml:Point>`
  ];
  const xml = lines.join("\n");
  const geometries = findGeometries(xml);
  eq(geometries, lines);
});
