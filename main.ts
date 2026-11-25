// One Line, One Laugh — a single original joke line.
//
// The program writes exactly one funny line of text to /output/entry.txt
// (1-140 characters, UTF-8, no trailing newline), which the judge
// compares against other entries two at a time.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I told my smart speaker a secret, and it replied, \"Adding that to your shopping list.\"";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

const text = LINE.trim();
if (text.length < 1 || text.length > 140) {
  throw new Error(`entry line is ${text.length} characters, must be 1-140`);
}
if (text.includes("\n")) {
  throw new Error("entry line must be a single line");
}
// The gate counts characters, but keep the byte size small too so the
// line stays readable in any feed: it must fit comfortably in one breath.
const bytes = Buffer.byteLength(text, "utf8");
if (bytes > 200) {
  throw new Error(`entry line is ${bytes} bytes, keep it shorter`);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, text, "utf8");
console.log(`wrote ${text.length} characters to ${OUT_FILE}`);
