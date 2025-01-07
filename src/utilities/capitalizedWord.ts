export default function capitalizedWord(word: string): string {
  if (word == null) {
    return ""
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
