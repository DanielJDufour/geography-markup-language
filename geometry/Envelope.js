import bboxToPolygon from "bbox-fns/polygon.js";

import parseEnvelope from "../parse/envelope.js";

export default function Envelope(xml, { format = "default" } = {}) {
  let order = "default";
  let raw = false;
  if (format === "geojson") {
    order = "geojson";
  }

  const obj = parseEnvelope(xml, { order, raw });

  if (!obj) return;

  if (!format || format === "default") return obj;

  const { srs, corners } = obj;

  const [lowerCorner, upperCorner] = corners;

  if (format === "bbox" || format === "geojson") {
    const [ymin, xmin, ...lowerCornerRest] = lowerCorner;
    const [ymax, xmax, ...upperCornerRest] = upperCorner;
    if (format === "bbox") {
      return [xmin, ymin, ...lowerCornerRest, xmax, ymax, ...upperCornerRest];
    } else if (format === "geojson") {
      const bbox = [xmin, ymin, xmax, ymax];
      const feature = {
        type: "Feature",
        bbox,
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: bboxToPolygon(bbox)
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
}
