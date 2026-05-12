import * as fs from "fs";
import * as path from "path";

export function makeOutputFolder(name: string): string {
  const folder = path.join(__dirname, "..", name);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  return folder;
}
