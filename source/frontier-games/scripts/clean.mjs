import { rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// Clears only this package's hashed bundles in the repo root before a build.
rmSync(resolve(dirname(fileURLToPath(import.meta.url)), '../../../frontier/assets'), { recursive: true, force: true });
