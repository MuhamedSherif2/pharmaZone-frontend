import DOMPurify from "dompurify";

export function sanitizeField(field) {
  if (typeof field !== "string") return field;

  return DOMPurify.sanitize(field, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}
