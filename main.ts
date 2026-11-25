// Laugh Track: The Crypto Trading Joke Contest
// Entry program: writes one original one-line joke about crypto and
// trading life to /output/entry.txt (UTF-8, 1-200 chars, single line).
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I told my wife I bought the dip. She asked which one — the $60k dip, the $50k dip, or the one that ate our honeymoon fund?";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // The joke must be a single line: no newline characters inside it.
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  const chars = [...JOKE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`joke must be 1-200 characters, got ${chars}`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }

  // Create /output if needed, but never delete /output itself:
  // the grader runs as an unprivileged user and removing the
  // directory it handed us fails with EPERM.
  mkdirSync(OUT_DIR, { recursive: true });
  for (const name of readdirSync(OUT_DIR)) {
    rmSync(join(OUT_DIR, name), { recursive: true, force: true });
  }

  writeFileSync(OUT_FILE, JOKE, "utf8");
  const bytes = Buffer.byteLength(JOKE, "utf8");
  console.log(`wrote ${chars} characters (${bytes} bytes) to ${OUT_FILE}`);
  console.log(JOKE);
}

main();
