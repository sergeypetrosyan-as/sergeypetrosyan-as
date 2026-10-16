// Fonts are bundled (OFL-1.1, Latin subset) so the game never touches the network.
import '@fontsource/ibm-plex-sans-condensed/latin-500';
import '@fontsource/ibm-plex-sans-condensed/latin-600';
import '@fontsource/ibm-plex-mono/latin-500';
import '@fontsource/ibm-plex-serif/latin-400';
import '@fontsource/ibm-plex-serif/latin-400-italic';
import '@fontsource/big-shoulders-stencil-display/latin-800';
import './styles.css';
import { Game } from './game/game.ts';

const game = new Game();
game.start();
