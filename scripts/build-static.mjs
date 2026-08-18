import { readFile, mkdir, writeFile } from "node:fs/promises";

const html = await readFile("index.html", "utf8");
const css = await readFile("styles.css", "utf8");
const js = await readFile("script.js", "utf8");
const portrait = (await readFile("assets/cristiane-cirrilo.png")).toString("base64");

const files = {
  "/": { type: "text/html; charset=utf-8", body: html },
  "/index.html": { type: "text/html; charset=utf-8", body: html },
  "/styles.css": { type: "text/css; charset=utf-8", body: css },
  "/script.js": { type: "application/javascript; charset=utf-8", body: js },
};

const worker = `
const files = ${JSON.stringify(files)};
const portrait = "${portrait}";

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/assets/cristiane-cirrilo.png") {
      return new Response(decodeBase64(portrait), {
        headers: { "content-type": "image/png", "cache-control": "public, max-age=86400" }
      });
    }
    const file = files[url.pathname];
    if (!file) return new Response("Not found", { status: 404 });
    return new Response(file.body, {
      headers: { "content-type": file.type, "cache-control": url.pathname === "/" ? "no-cache" : "public, max-age=3600" }
    });
  }
};
`;

await mkdir("dist/server", { recursive: true });
await writeFile("dist/server/index.js", worker);
