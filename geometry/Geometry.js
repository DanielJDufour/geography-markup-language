import Envelope from "./Envelope.js";
import LineString from "./LineString.js";
import Point from "./Point.js";
import Polygon from "./Polygon.js";

import findEnvelope from "../find/Envelope.js";
import findLineString from "../find/LineString.js";
import findPoint from "../find/Point.js";
import findPolygon from "../find/Polygon.js";

export default function Geometry(xml, { format = "default" } = { format: "default" }) {
  const envelope = findEnvelope(xml);
  if (envelope) {
    const result = Envelope(envelope.outer, { format });
    if (result) {
      return result;
    }
  }

  const lineString = findLineString(xml);
  if (lineString) {
    const result = LineString(lineString.outer, { format });
    if (result) {
      return result;
    }
  }

  const point = findPoint(xml);
  if (point) {
    const result = Point(point.outer, { format });
    if (result) {
      return result;
    }
  }

  const polygon = findPolygon(xml);
  if (polygon) {
    const result = Polygon(polygon.outer, { format });
    if (result) {
      return result;
    }
  }
}
