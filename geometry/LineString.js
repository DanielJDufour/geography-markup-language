import parseLineString from "../parse/LineString.js";

export default function LineString(xml, { format = "default" } = { format: "default " }) {
  if (format === "geojson") {
    const { coords, srs } = parseLineString(xml, { order: "geojson" });
    const feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: coords
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
    const obj = parseLineString(xml);
    return obj;
  }
}
