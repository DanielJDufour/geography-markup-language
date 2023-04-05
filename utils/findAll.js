import findTagsByName from "xml-utils/find-tags-by-name.js";

export default function find(xml, names) {
  let tags = [];
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    tags = tags.concat(findTagsByName(xml, name));
  }
  return tags;
}
