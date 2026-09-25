/** Gerador pseudoaleatório com seed, para decorações estáveis entre renderizações. */
export function seededRandom(seed: number) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export const between = (rand: () => number, min: number, max: number) => min + rand() * (max - min)
