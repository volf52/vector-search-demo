import { DocVector } from "./vector";
import { index, docs } from "./db";

export type Match = [number, string];

export const knn_search = (query: string, k = 5): Match[] => {
  let query_vec = new DocVector(query);
  let matches: Array<Match> = [];

  for (let [i, vec] of index.entries()) {
    const similarity = vec.cosine_similarity(query_vec);
    if (similarity != 0) {
      matches.push([similarity, docs[i]]);
    }
  }

  matches.sort((a, b) => b[0] - a[0]); // descending by similarity

  return matches.slice(0, k);
};
