import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Splits a heading so a single word can carry the brand accent without the
 * content layer having to contain markup.
 */
export function splitOnWord(text: string, word: string) {
  const index = text.indexOf(word);
  if (index === -1) return { before: text, match: "", after: "" };
  return {
    before: text.slice(0, index),
    match: word,
    after: text.slice(index + word.length),
  };
}
