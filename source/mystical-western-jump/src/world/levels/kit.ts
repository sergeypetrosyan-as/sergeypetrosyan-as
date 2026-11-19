/** Expands a run spec: `run('10# 3. o.o 6#')` → `##########...o.o######`. Tokens without a count are literal. */
export const run = (spec: string): string =>
  spec
    .split(' ')
    .map((tok) => {
      const m = /^(\d+)(.)$/.exec(tok);
      return m ? m[2].repeat(Number(m[1])) : tok;
    })
    .join('');

/** The three bottom rows of a chunk, all the same. */
export const floor = (spec: string): string[] => {
  const r = run(spec);
  return [r, r, r];
};

/** The same row repeated `n` times. */
export const rows = (n: number, spec: string): string[] => Array(n).fill(run(spec));
