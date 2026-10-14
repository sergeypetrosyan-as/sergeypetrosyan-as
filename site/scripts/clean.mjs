// The hub builds into the repository root (GitHub Pages serves `main` / root),
// so only the hub's own hashed bundle folder is cleared — never anything else.
import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

rmSync(fileURLToPath(new URL('../../arcade/assets', import.meta.url)), { recursive: true, force: true });
console.log('cleaned arcade/assets');
