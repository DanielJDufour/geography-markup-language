import parsePolygon from "../parse/Polygon.js";

export default function Polygon(xml, { format = "default" } = {}) {
  if (format === "geojson") {
    const { rings, srs } = parsePolygon(xml, { order: "geojson" });

    const feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: rings
      }
    };

    if (srs) {
      feature.properties.srsName = srs;
      feature.crs = {
        type: "name",
        properties: {
          name: srs
        }
      };
    }

    return feature;
  } else {
    const obj = parsePolygon(xml);

    return obj;
  }
}
