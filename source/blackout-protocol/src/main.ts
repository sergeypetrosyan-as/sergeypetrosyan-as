// Fonts are bundled (OFL-1.1, Latin subset) so the game never touches the network.
import '@fontsource/ibm-plex-sans-condensed/latin-500';
import '@fontsource/ibm-plex-sans-condensed/latin-600';
import '@fontsource/ibm-plex-mono/latin-500';
import '@fontsource/ibm-plex-serif/latin-400';
import '@fontsource/ibm-plex-serif/latin-400-italic';
import '@fontsource/rye/latin-400.css';
import '@fontsource/zilla-slab/latin-500.css';
import '@fontsource/zilla-slab/latin-600.css';
import '@fontsource/zilla-slab/latin-700.css';
import './styles.css';
import { Game } from './game/game.ts';

// Canvas-drawn labels (terminal plates, crate stencils) use Zilla Slab: warm the faces up front.
try { void document.fonts?.load('700 16px "Zilla Slab"'); void document.fonts?.load('600 16px "Zilla Slab"'); } catch { /* ignore */ }

const game = new Game();
game.start();
