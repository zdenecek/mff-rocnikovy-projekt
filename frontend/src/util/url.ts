
export function makeSlug(str: string): string {
  return str
  .toLowerCase()
  .replace(/ /g, "-")
  .replace(/[^\w-]+/g, "");
}