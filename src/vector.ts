export type FreqMap = Map<string, number>;

export class DocVector {
  freqs: FreqMap; // represent vector as Bag-Of-Words, kinda

  constructor(doc: string) {
    const freqs: FreqMap = new Map();

    doc
      .toLowerCase()
      .split(" ") // naive tokenization of words
      .forEach((word) => {
        let old_freq = freqs.get(word);
        if (old_freq === undefined) freqs.set(word, 1);
        else freqs.set(word, old_freq + 1);
      });

    this.freqs = freqs;
  }

  magnitude(): number {
    let total = 0;

    this.freqs.forEach((count) => {
      total += count;
    });

    return total;
  }

  cosine_similarity(other: DocVector): number {
    let numerator = 0;

    this.freqs.forEach((v, k) => {
      let otherCount = other.freqs.get(k);

      if (otherCount !== undefined) numerator += v * otherCount;
    });

    const denom = this.magnitude() * other.magnitude();

    if (denom !== 0) return numerator / denom;

    return 0;
  }
}
