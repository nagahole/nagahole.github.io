const NUMERALS: [number, string][] = [
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

// Roman numerals for the small indexes used across the site (1 to 39)
export function roman(n: number) {
  let out = ''
  for (const [value, numeral] of NUMERALS) {
    while (n >= value) {
      out += numeral
      n -= value
    }
  }
  return out
}
