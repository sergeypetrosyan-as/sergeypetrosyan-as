import './styles/shell.css';
import { CONCEPTS } from '../concepts.mjs';
import { runShell } from './core/shell';
import type { Factory, Meta } from './core/types';

const id = document.documentElement.dataset.game ?? '';
const concept = CONCEPTS.find((c: { id: string }) => c.id === id);
const games = import.meta.glob<{ default: Factory }>('./games/*.ts');
const metas = import.meta.glob<{ default: Meta }>('./meta/*.mjs');

async function main(): Promise<void> {
  const app = document.getElementById('app')!;
  const loadGame = games[`./games/${id}.ts`];
  const loadMeta = metas[`./meta/${id}.mjs`];
  if (!concept || !loadGame || !loadMeta) {
    app.innerHTML = '<div style="padding:24px;text-align:center"><h1>This card is not drawn yet</h1><p><a href="../../frontier/">Back to the catalog</a></p></div>';
    return;
  }
  const meta = (await loadMeta()).default;
  runShell({
    id,
    title: concept.title,
    line: concept.line,
    meta,
    load: loadGame,
    catalogUrl: '../../frontier/',
    coverUrl: `../../frontier/covers/${id}.svg`,
  });
}
void main();
