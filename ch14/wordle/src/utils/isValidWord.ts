import { VALID_WORDS } from "./validWords";

export function isValidWord(word: string) {
  return VALID_WORDS.includes(word);
}
