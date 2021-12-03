import { Vector } from "./vector";
import { index, docs } from "./db";

export type Match = [number, string];

export const search = (query: string) => {
  let query_vec = new Vector(query);
  let matches: Array<Match> = [];

  for (let [i, vec] of index.entries()) {
    const similarity = vec.cosine_similarity(query_vec);
    if (similarity != 0) {
      matches.push([similarity, docs[i]]);
    }
  }

  matches.sort((a, b) => b[0] - a[0]); // descending by similarity

  return matches;
};
