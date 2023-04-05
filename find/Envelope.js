import find from "../utils/find.js";
import ENVELOPE_TAG_NAMES from "../enums/Envelope.js";

export default function envelope(xml) {
  return find(xml, ENVELOPE_TAG_NAMES)[0];
}
