import test from "flug";
import chunk from "../utils/chunk.js";

import coordinates from "../parse/coordinates.js";
import exterior from "../parse/exterior.js";
import LinearRing from "../parse/LinearRing.js";
import lowerCorner from "../parse/lowerCorner.js";
import parseEnvelope from "../parse/envelope.js";
import parseOuterBoundaryIs from "../parse/outerBoundaryIs.js";
import parseLineString from "../parse/LineString.js";
import parsePoint from "../parse/Point.js";
import parsePolygon from "../parse/polygon.js";
import pos from "../parse/pos.js";
import posList from "../parse/posList.js";
import upperCorner from "../parse/upperCorner.js";

test("chunk", ({ eq }) => {
  const nums = [0, 0, 100, 0, 100, 100, 0, 100, 0, 0];
  eq(chunk(nums, 2), [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
    [0, 0]
  ]);
});

test("coordinates", ({ eq }) => {
  const xml = "<gml:coordinates>0,0 100,0 100,100 0,100 0,0</gml:coordinates>";
  eq(coordinates(xml), [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
    [0, 0]
  ]);
  eq(coordinates(xml, { order: "geojson", raw: true }), [
    ["0", "0"],
    ["0", "100"],
    ["100", "100"],
    ["100", "0"],
    ["0", "0"]
  ]);

  const xml2 = "<gml:coordinates>45.67, 88.56</gml:coordinates>";
  eq(coordinates(xml2), [45.67, 88.56]);
  eq(coordinates(xml2, { order: "geojson", raw: true }), ["88.56", "45.67"]);

  // note: doesn't repeat point at end
  const xml3 = "<gml:coordinates>45.67, 88.56 55.56,89.44</gml:coordinates>";
  eq(coordinates(xml3), [
    [45.67, 88.56],
    [55.56, 89.44]
  ]);
  eq(coordinates(xml3, { order: "geojson", raw: true }), [
    ["88.56", "45.67"],
    ["89.44", "55.56"]
  ]);
});

test("exterior", ({ eq }) => {
  const xml = "<gml:exterior> <gml:LinearRing> <gml:posList> 45.256 -110.45 46.46 -109.48 43.84 -109.86 45.256 -110.45 </gml:posList> </gml:LinearRing> </gml:exterior>";
  eq(exterior(xml), [
    [45.256, -110.45],
    [46.46, -109.48],
    [43.84, -109.86],
    [45.256, -110.45]
  ]);
  eq(exterior(xml, { order: "geojson", raw: true }), [
    ["-110.45", "45.256"],
    ["-109.48", "46.46"],
    ["-109.86", "43.84"],
    ["-110.45", "45.256"]
  ]);
});

test("exterior (without posList)", ({ eq }) => {
  const xml = "<gml:exterior><gml:LinearRing> 44.256 -71.16 44.46 -71.48 44.84 -71.86 44.8 -71.2 44.256 -71.16 </gml:LinearRing></gml:exterior>";
  eq(exterior(xml), [
    [44.256, -71.16],
    [44.46, -71.48],
    [44.84, -71.86],
    [44.8, -71.2],
    [44.256, -71.16]
  ]);
  eq(exterior(xml, { order: "geojson", raw: true }), [
    ["-71.16", "44.256"],
    ["-71.48", "44.46"],
    ["-71.86", "44.84"],
    ["-71.2", "44.8"],
    ["-71.16", "44.256"]
  ]);
});

test("LinearRing: coordinates", ({ eq }) => {
  const xml = `<gml:LinearRing> <gml:coordinates>0,0 100,0 100,100 0,100 0,0</gml:coordinates> </gml:LinearRing>`;
  eq(LinearRing(xml), [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
    [0, 0]
  ]);
  eq(LinearRing(xml, { order: "geojson", raw: true }), [
    ["0", "0"],
    ["0", "100"],
    ["100", "100"],
    ["100", "0"],
    ["0", "0"]
  ]);
});

test("LinearRing: posList", ({ eq }) => {
  const xml = `<gml:LinearRing> <gml:posList> 45.256 -110.45 46.46 -109.48 43.84 -109.86 45.256 -110.45 </gml:posList> </gml:LinearRing>`;
  eq(LinearRing(xml), [
    [45.256, -110.45],
    [46.46, -109.48],
    [43.84, -109.86],
    [45.256, -110.45]
  ]);
  eq(LinearRing(xml, { order: "geojson", raw: true }), [
    ["-110.45", "45.256"],
    ["-109.48", "46.46"],
    ["-109.86", "43.84"],
    ["-110.45", "45.256"]
  ]);
});

test("LinearRing: missing subtag", ({ eq }) => {
  const xml = "<gml:exterior><gml:LinearRing> 44.256 -71.16 44.46 -71.48 44.84 -71.86 44.8 -71.2 44.256 -71.16 </gml:LinearRing></gml:exterior>";
  eq(LinearRing(xml, { order: "geojson", raw: true }), [
    ["-71.16", "44.256"],
    ["-71.48", "44.46"],
    ["-71.86", "44.84"],
    ["-71.2", "44.8"],
    ["-71.16", "44.256"]
  ]);
});

test("lowerCorner", ({ eq }) => {
  eq(lowerCorner("<gml:lowerCorner>42.943 -71.032</gml:lowerCorner>"), [42.943, -71.032]);
  eq(lowerCorner("\n<gml:lowerCorner>\n \t42.943,-71.032</gml:lowerCorner>"), [42.943, -71.032]);
});

test("parseOuterBoundaryIs", ({ eq }) => {
  const xml = `         <gml:outerBoundaryIs>
  <gml:LinearRing>
          <gml:coordinates>0,0 100,0 100,100 0,100 0,0</gml:coordinates>
  </gml:LinearRing>
</gml:outerBoundaryIs>`;
  eq(parseOuterBoundaryIs(xml), [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
    [0, 0]
  ]);
  eq(parseOuterBoundaryIs(xml, { order: "geojson", raw: true }), [
    ["0", "0"],
    ["0", "100"],
    ["100", "100"],
    ["100", "0"],
    ["0", "0"]
  ]);
});

test("parseEnvelope", ({ eq }) => {
  const xml = "<gml:Envelope> <gml:lowerCorner>42.943 -71.032</gml:lowerCorner> <gml:upperCorner>43.039 -69.856</gml:upperCorner> </gml:Envelope>";
  eq(parseEnvelope(xml), {
    corners: [
      [42.943, -71.032],
      [43.039, -69.856]
    ],
    srs: null
  });
  eq(parseEnvelope(xml, { raw: true }), {
    srs: null,
    corners: [
      ["42.943", "-71.032"],
      ["43.039", "-69.856"]
    ]
  });
});

test("parseLineString", ({ eq }) => {
  const xml = "<gml:LineString> <gml:posList> 45.256 -110.45 46.46 -109.48 43.84 -109.86 </gml:posList> </gml:LineString>";
  eq(parseLineString(xml), {
    type: "LineString",
    coords: [
      [45.256, -110.45],
      [46.46, -109.48],
      [43.84, -109.86]
    ]
  });
  eq(parseLineString(xml, { order: "geojson", raw: true }), {
    type: "LineString",
    coords: [
      ["-110.45", "45.256"],
      ["-109.48", "46.46"],
      ["-109.86", "43.84"]
    ]
  });
});

test("parsePoint", ({ eq }) => {
  const xml = `<gml:Point> <gml:pos>45.256 -71.92</gml:pos> </gml:Point>`;
  eq(parsePoint(xml), { type: "Point", srs: null, coord: [45.256, -71.92], x: -71.92, y: 45.256, z: null });
  eq(parsePoint(xml, { raw: true }), { type: "Point", srs: null, coord: ["45.256", "-71.92"], x: "-71.92", y: "45.256", z: null });
});

test("parsePoint (srs)", ({ eq }) => {
  const xml = `<gml:Point srsName="urn:ogc:def:crs:EPSG:9.0:4979" srsDimension="3"> <gml:pos>42.3453 -156.2342 45</gml:pos> </gml:Point>`;
  eq(parsePoint(xml), { type: "Point", srs: "urn:ogc:def:crs:EPSG:9.0:4979", coord: [42.3453, -156.2342, 45], x: -156.2342, y: 42.3453, z: 45 });
  eq(parsePoint(xml, { raw: true }), { type: "Point", srs: "urn:ogc:def:crs:EPSG:9.0:4979", coord: ["42.3453", "-156.2342", "45"], x: "-156.2342", y: "42.3453", z: "45" });
});

test("parsePoint (old school)", ({ eq }) => {
  const xml = `<gml:Point gml:id="p21" srsName="http://www.opengis.net/def/crs/EPSG/0/4326"> <gml:coordinates>45.67, 88.56</gml:coordinates> </gml:Point>`;
  const expected = { type: "Point", srs: "http://www.opengis.net/def/crs/EPSG/0/4326", coord: [45.67, 88.56], x: 88.56, y: 45.67, z: null };
  const expected2 = { type: "Point", srs: "http://www.opengis.net/def/crs/EPSG/0/4326", coord: ["45.67", "88.56"], x: "88.56", y: "45.67", z: null };
  eq(parsePoint(xml), expected);
  eq(parsePoint(xml, { order: "geojson", raw: true }), { type: "Point", srs: "http://www.opengis.net/def/crs/EPSG/0/4326", coord: ["45.67", "88.56"], x: "88.56", y: "45.67", z: null });

  const xml2 = `<gml:Point gml:id="p21" srsName="http://www.opengis.net/def/crs/EPSG/0/4326"> <gml:pos srsDimension="2">45.67 88.56</gml:pos> </gml:Point>`;
  eq(parsePoint(xml2), expected);
  eq(parsePoint(xml2, { order: "geojson", raw: true }), expected2);
});

test("parsePoint (coordinates and srs hash)", ({ eq }) => {
  const xml = '<gml:Point gml:id="p1" srsName="#srs36"> <gml:coordinates>100,200</gml:coordinates> </gml:Point>';
  eq(parsePoint(xml), { type: "Point", srs: "#srs36", coord: [100, 200], x: 200, y: 100, z: null });
  eq(parsePoint(xml, { raw: true }), { type: "Point", srs: "#srs36", coord: ["100", "200"], x: "200", y: "100", z: null });
});

test("parsePoint (posList)", ({ eq }) => {
  const xml = '<gml:Point gml:id="p21"> <gml:posList>100,200</gml:posList> </gml:Point>';
  eq(parsePoint(xml), { type: "Point", srs: null, coord: [100, 200], x: 200, y: 100, z: null });
  eq(parsePoint(xml, { raw: true }).coord, ["100", "200"]);
});

test("parsePolygon", ({ eq }) => {
  const xml = `      <gml:Polygon>
  <gml:exterior>
     <gml:LinearRing>
        <gml:posList>
     45.256 -110.45 46.46 -109.48 43.84 -109.86 45.256 -110.45
        </gml:posList>
     </gml:LinearRing>
  </gml:exterior>
</gml:Polygon>`;
  eq(parsePolygon(xml), {
    type: "Polygon",
    rings: [
      [
        [45.256, -110.45],
        [46.46, -109.48],
        [43.84, -109.86],
        [45.256, -110.45]
      ]
    ]
  });
});

test("parsePolygon (with srs)", ({ eq }) => {
  const xml = `<gml:Polygon srsName="urn:ogc:def:crs:EPSG:9.0:26986"> <gml:exterior> <gml:LinearRing> <gml:posList> 45.256 -110.45 46.46 -109.48 43.84 -109.86 45.256 -110.45 </gml:posList> </gml:LinearRing> </gml:exterior> </gml:Polygon>`;
  eq(parsePolygon(xml), {
    type: "Polygon",
    rings: [
      [
        [45.256, -110.45],
        [46.46, -109.48],
        [43.84, -109.86],
        [45.256, -110.45]
      ]
    ],
    srs: "urn:ogc:def:crs:EPSG:9.0:26986"
  });
});

test("parsePolygon (old GML)", ({ eq }) => {
  // partially from https://en.wikipedia.org/wiki/Geography_Markup_Language#Examples
  const xml = `     <gml:Polygon>
  <gml:outerBoundaryIs>
          <gml:LinearRing>
                  <gml:coordinates>0,0 100,0 100,100 0,100 0,0</gml:coordinates>
          </gml:LinearRing>
 </gml:outerBoundaryIs>
 <gml:innerBoundaryIs>
 <gml:LinearRing>
         <gml:coordinates>1,1 99,1 99,99 1,99 1,1</gml:coordinates>
 </gml:LinearRing>
</gml:innerBoundaryIs>
</gml:Polygon>`;
  eq(parsePolygon(xml), {
    type: "Polygon",
    rings: [
      [
        [0, 0],
        [100, 0],
        [100, 100],
        [0, 100],
        [0, 0]
      ],
      [
        [1, 1],
        [99, 1],
        [99, 99],
        [1, 99],
        [1, 1]
      ]
    ]
  });
});

test("pos", ({ eq }) => {
  const xml = `<gml:pos srsDimension="2">45.67 88.56</gml:pos>`;
  eq(pos(xml), [45.67, 88.56]);
  eq(pos(xml, { order: "geojson", raw: true }), ["88.56", "45.67"]);

  const xml_with_whitespace = "<gml:pos>\n\t0.200000 0.800000 1.000000\n</gml:pos>";
  eq(pos(xml_with_whitespace), [0.2, 0.8, 1]);
  eq(pos(xml_with_whitespace, { order: "geojson", raw: true }), ["0.800000", "0.200000", "1.000000"]);
});

test("posList", ({ eq }) => {
  const xml = `<gml:posList>\n\t45.256 -110.45 46.46 -109.48 43.84 -109.86 45.256 -110.45\n</gml:posList>`;
  eq(posList(xml), [
    [45.256, -110.45],
    [46.46, -109.48],
    [43.84, -109.86],
    [45.256, -110.45]
  ]);
  eq(posList(xml, { order: "geojson", raw: true }), [
    ["-110.45", "45.256"],
    ["-109.48", "46.46"],
    ["-109.86", "43.84"],
    ["-110.45", "45.256"]
  ]);
});

test("upperCorner", ({ eq }) => {
  eq(upperCorner("<gml:upperCorner>42.943 -71.032</gml:upperCorner>"), [42.943, -71.032]);
  eq(upperCorner("\n<gml:upperCorner>\n \t42.943,-71.032</gml:upperCorner>"), [42.943, -71.032]);
});
