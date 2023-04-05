import getAttribute from "xml-utils/get-attribute.js";

import findEnvelope from "../find/Envelope.js";
import parseLowerCorner from "./lowerCorner.js";
import parseUpperCorner from "./upperCorner.js";

/**
 *
 * @param {String} xml
 * @param {Object} options
 * @param {Boolean} options.raw - whether to return precise numbers as text strings
 * @returns {Array} { srs, corners: [[ymin, xmax], [ymax, xmax]] }
 */
export default function envelope(xml, { raw = false } = {}) {
  const tag = findEnvelope(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  const lowerCorner = parseLowerCorner(inner, { raw });
  if (!lowerCorner) return;

  const upperCorner = parseUpperCorner(inner, { raw });
  if (!upperCorner) return;

  if (lowerCorner.length !== upperCorner.length) {
    throw new Error("[geography-markup-language/parse/envelope] inconsistent number of dimensions");
  }

  const srs = getAttribute(tag.outer, "srsName") || null;

  return { srs, corners: [lowerCorner, upperCorner] };
}
