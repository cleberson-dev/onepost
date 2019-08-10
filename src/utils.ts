// Verifica existência de algum caractere que não seja letra, número, ou underscore
export const hasNonLatinCharacter = (text: string): boolean => /\W/.test(text);

// Verifica existência de espaços em branco
export const hasWhitespace = (text: string): boolean => /\s/.test(text);
