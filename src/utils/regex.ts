// Filtra as letras maiusculas, minusculas e espaços
export function filterRegexUppercaseAndSpaces(value: string) {
  return new RegExp(
    value
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .split("")
      .join("\\s*"),
    "i"
  );
}
