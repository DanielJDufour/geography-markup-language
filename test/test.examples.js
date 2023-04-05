import test from "flug";
import { Envelope, LineString, Point, Polygon } from "../index.js";

test("examples: Envelope", ({ eq }) => {
  const xml = `<gml:Envelope>
  <gml:lowerCorner>42.943 -71.032</gml:lowerCorner>
   <gml:upperCorner>43.039 -69.856</gml:upperCorner>
</gml:Envelope>`;
  eq(Envelope(xml), {
    srs: null,
    corners: [
      [42.943, -71.032],
      [43.039, -69.856]
    ]
  });

  eq(Envelope(xml, { format: "geojson" }), {
    type: "Feature",
    bbox: [-71.032, 42.943, -69.856, 43.039],
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-71.032, 43.039],
          [-71.032, 42.943],
          [-69.856, 42.943],
          [-69.856, 43.039],
          [-71.032, 43.039]
        ]
      ]
    }
  });
});

test("examples: LineString", ({ eq }) => {
  const xml = "<gml:LineString> <gml:posList> 45.256 -110.45 46.46 -109.48 43.84 -109.86 </gml:posList> </gml:LineString>";
  eq(LineString(xml), {
    type: "LineString",
    coords: [
      [45.256, -110.45],
      [46.46, -109.48],
      [43.84, -109.86]
    ]
  });
  eq(LineString(xml, { format: "geojson" }), {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [-110.45, 45.256],
        [-109.48, 46.46],
        [-109.86, 43.84]
      ]
    }
  });
});

test("examples: Point", ({ eq }) => {
  const xml = `<gml:Point><gml:pos> 19.741755 -155.844437 </gml:pos></gml:Point>`;
  eq(Point(xml), { type: "Point", srs: null, coord: [19.741755, -155.844437], x: -155.844437, y: 19.741755, z: null });
  eq(Point(xml, { format: "geojson" }), { type: "Feature", properties: {}, geometry: { type: "Point", coordinates: [-155.844437, 19.741755] } });
});

test("examples: Polygon", ({ eq }) => {
  const xml = `
  <gml:Polygon>
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
  </gml:Polygon>
  `;
  eq(Polygon(xml, { format: "geojson" }), {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [0, 0],
          [0, 100],
          [100, 100],
          [100, 0],
          [0, 0]
        ],
        [
          [1, 1],
          [1, 99],
          [99, 99],
          [99, 1],
          [1, 1]
        ]
      ]
    }
  });
});
