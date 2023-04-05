import parsePoint from "../parse/Point.js";

export default function Point(xml, { format = "default" } = { format: "default" }) {
  const obj = parsePoint(xml);

  if (!format || format === "default") return obj;

  const { x, y, srs } = obj;

  if (format === "geojson") {
    const feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [x, y]
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
  }
}
