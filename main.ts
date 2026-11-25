// One Line, One Laugh — make.fun entry.
// A single joke line, written out to /output/entry.txt with no trailing
// newline. The line is kept between 1 and 140 characters, and after writing
// we read it back to prove the file on disk matches the joke exactly.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const JOKE =
  'I told my smart speaker a secret, and it replied, "Adding that to your shopping list."';

const MIN_LEN = 1;
const MAX_LEN = 140;

function main(): void {
  const trimmed = JOKE.trim();
  if (trimmed.length < MIN_LEN || trimmed.length > MAX_LEN) {
    throw new Error(
      `entry must be ${MIN_LEN}-${MAX_LEN} characters, got ${trimmed.length}`,
    );
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, trimmed, "utf8");

  // Read-back verification: the file must round-trip byte for byte.
  const back = readFileSync(outPath, "utf8");
  if (back !== trimmed) {
    throw new Error("read-back mismatch: entry.txt does not match the joke");
  }
  console.log(`wrote ${trimmed.length} characters to ${outPath}`);
}

main();
