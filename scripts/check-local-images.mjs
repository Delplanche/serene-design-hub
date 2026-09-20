import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";

const ROOT = process.cwd();
const SOURCE_ROOTS = ["src", "public"];
const TEXT_EXTENSIONS = new Set([".css", ".html", ".js", ".jsx", ".json", ".md", ".mjs", ".ts", ".tsx"]);
const IMAGE_EXTENSIONS = "png|jpe?g|webp|gif|avif|svg|ico";
const failures = [];

function walk(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path).flatMap((name) => {
    const entry = join(path, name);
    return statSync(entry).isDirectory() ? walk(entry) : [entry];
  });
}

for (const file of SOURCE_ROOTS.flatMap((root) => walk(resolve(ROOT, root)))) {
  if (!TEXT_EXTENSIONS.has(extname(file))) continue;
  const text = readFileSync(file, "utf8");
  const display = file.slice(ROOT.length + 1);

  if (/\.asset\.json["']/.test(text) || file.endsWith(".asset.json")) {
    failures.push(`${display}: bevat een CDN-assetverwijzing (.asset.json)`);
  }

  const externalImage = new RegExp(`https?:\\/\\/[^\\s"')>]+\\.(?:${IMAGE_EXTENSIONS})(?:[?#][^\\s"')>]*)?`, "gi");
  for (const match of text.matchAll(externalImage)) {
    failures.push(`${display}: externe afbeelding ${match[0]}`);
  }

  const imports = new RegExp(`["']([^"']+\\.(?:${IMAGE_EXTENSIONS}))["']`, "gi");
  for (const match of text.matchAll(imports)) {
    const reference = match[1];
    if (reference.startsWith("http://") || reference.startsWith("https://") || reference.startsWith("/")) continue;
    const target = reference.startsWith("@/")
      ? resolve(ROOT, "src", reference.slice(2))
      : resolve(dirname(file), reference);
    if (!existsSync(target)) failures.push(`${display}: ontbrekend lokaal beeld ${reference}`);
  }
}

if (failures.length) {
  console.error("Lokale afbeeldingscontrole mislukt:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log("Lokale afbeeldingscontrole geslaagd.");