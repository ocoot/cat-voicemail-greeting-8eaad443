// Funniest Cat Voicemail Greeting — u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443
// Writes one cat voicemail greeting (<=120 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Reads inputs only from MAKEFUN_BOT_DIR; writes outputs only to MAKEFUN_OUTPUT_DIR.
// Never deletes the output directory; no file copying is needed here.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const GREETING =
  "You've reached Chairman Meow. I'm napping in a tiny box. Leave a message \u2014 I'll read it never, then sit on you.";
// 111 characters, within the 1-120 gate.

function main(): void {
  // Gate: UTF-8 text of 1 to 120 characters, not only whitespace.
  const chars = [...GREETING];
  if (chars.length < 1 || chars.length > 120) {
    throw new Error(`greeting is ${chars.length} characters, must be 1-120`);
  }
  if (GREETING.trim().length === 0) {
    throw new Error("greeting must not be only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, GREETING, "utf8");
  // Read back and confirm the exact bytes round-tripped.
  if (readFileSync(outPath, "utf8") !== GREETING) {
    throw new Error("entry.txt did not round-trip");
  }
}

main();
