import test from "flug";

import Geometry from "../geometry/Geometry.js";
import Envelope from "../geometry/Envelope.js";
import LineString from "../geometry/LineString.js";
import Point from "../geometry/Point.js";
import Polygon from "../geometry/Polygon.js";

const XML = {
  Envelope: "<gml:Envelope> <gml:lowerCorner>42.943 -71.032</gml:lowerCorner> <gml:upperCorner>43.039 -69.856</gml:upperCorner> </gml:Envelope>",
  LineString: "<gml:LineString> <gml:posList> 45.256 -110.45 46.46 -109.48 43.84 -109.86 </gml:posList> </gml:LineString>",
  SimplePoint: '<gml:Point gml:id="p21"> <gml:posList>100,200</gml:posList> </gml:Point>',
  CRSPoint: '<gml:Point srsName="urn:ogc:def:crs:EPSG:9.0:4979" srsDimension="3"> <gml:pos>42.3453 -156.2342 45</gml:pos> </gml:Point>',
  Polygon: `<gml:Polygon srsName="urn:ogc:def:crs:EPSG:9.0:26986"> <gml:exterior> <gml:LinearRing> <gml:posList> 45.256 -110.45 46.46 -109.48 43.84 -109.86 45.256 -110.45 </gml:posList> </gml:LinearRing> </gml:exterior> </gml:Polygon>`
};

const EXPECTED = {
  Envelope: {
    default: {
      srs: null,
      corners: [
        [42.943, -71.032],
        [43.039, -69.856]
      ]
    },
    geojson: {
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
    }
  },
  LineString: {
    default: {
      type: "LineString",
      coords: [
        [45.256, -110.45],
        [46.46, -109.48],
        [43.84, -109.86]
      ]
    },
    geojson: {
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
    }
  },
  Polygon: {
    default: {
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
    },
    geojson: {
      type: "Feature",
      properties: { srsName: "urn:ogc:def:crs:EPSG:9.0:26986" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-110.45, 45.256],
            [-109.48, 46.46],
            [-109.86, 43.84],
            [-110.45, 45.256]
          ]
        ]
      },
      crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG:9.0:26986" } }
    }
  },
  SimplePoint: {
    default: { type: "Point", srs: null, coord: [100, 200], x: 200, y: 100, z: null },
    geojson: { type: "Feature", properties: {}, geometry: { type: "Point", coordinates: [200, 100] } }
  },
  CRSPoint: {
    default: { type: "Point", srs: "urn:ogc:def:crs:EPSG:9.0:4979", coord: [42.3453, -156.2342, 45], x: -156.2342, y: 42.3453, z: 45 },
    geojson: {
      type: "Feature",
      properties: { srsName: "urn:ogc:def:crs:EPSG:9.0:4979" },
      geometry: { type: "Point", coordinates: [-156.2342, 42.3453] },
      crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG:9.0:4979" } }
    }
  }
};

test("Envelope(xml)", ({ eq }) => {
  const envelope = Envelope(XML.Envelope);
  eq(envelope, EXPECTED.Envelope.default);
});

test("Envelope(xml, { format: 'geojson' })", ({ eq }) => {
  const envelope = Envelope(XML.Envelope, { format: "geojson" });
  eq(envelope, EXPECTED.Envelope.geojson);
});

test("LineString", ({ eq }) => {
  eq(LineString(XML.LineString), EXPECTED.LineString.default);
  eq(LineString(XML.LineString, { format: "geojson" }), EXPECTED.LineString.geojson);
});

test("Point using posList", ({ eq }) => {
  eq(Point(XML.SimplePoint, { format: "default" }), EXPECTED.SimplePoint.default);
  eq(Point(XML.SimplePoint, { format: "geojson" }), EXPECTED.SimplePoint.geojson);
});

test("Point with srsName using pos", ({ eq }) => {
  eq(Point(XML.CRSPoint, { format: "default" }), EXPECTED.CRSPoint.default);
  eq(Point(XML.CRSPoint, { format: "geojson" }), EXPECTED.CRSPoint.geojson);
});

test("Polygon", ({ eq }) => {
  eq(Polygon(XML.Polygon), EXPECTED.Polygon.default);
  eq(Polygon(XML.Polygon, { format: "geojson" }), EXPECTED.Polygon.geojson);
});

test("Geometry(xml)", ({ eq }) => {
  eq(Geometry(XML.Envelope), EXPECTED.Envelope.default);
  eq(Geometry(XML.Envelope, { format: "default" }), EXPECTED.Envelope.default);
  eq(Geometry(XML.Envelope, { format: "geojson" }), EXPECTED.Envelope.geojson);

  eq(Geometry(XML.LineString), EXPECTED.LineString.default);
  eq(Geometry(XML.LineString, { format: "default" }), EXPECTED.LineString.default);
  eq(Geometry(XML.LineString, { format: "geojson" }), EXPECTED.LineString.geojson);

  eq(Geometry(XML.Polygon), EXPECTED.Polygon.default);
  eq(Geometry(XML.Polygon, { format: "default" }), EXPECTED.Polygon.default);
  eq(Geometry(XML.Polygon, { format: "geojson" }), EXPECTED.Polygon.geojson);

  eq(Geometry(XML.SimplePoint), EXPECTED.SimplePoint.default);
  eq(Geometry(XML.SimplePoint, { format: "default" }), EXPECTED.SimplePoint.default);
  eq(Geometry(XML.SimplePoint, { format: "geojson" }), EXPECTED.SimplePoint.geojson);

  eq(Geometry(XML.CRSPoint), EXPECTED.CRSPoint.default);
  eq(Geometry(XML.CRSPoint, { format: "default" }), EXPECTED.CRSPoint.default);
  eq(Geometry(XML.CRSPoint, { format: "geojson" }), EXPECTED.CRSPoint.geojson);
});
