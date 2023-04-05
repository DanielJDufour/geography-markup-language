import findTagsByName from "xml-utils/find-tags-by-name.js";

export default function find(xml, names) {
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const tags = findTagsByName(xml, name);
    if (tags.length >= 1) {
      return tags;
    }
  }
  return [];
}
