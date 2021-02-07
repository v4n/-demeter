export function generateAntKey({name, length, weight}) {
  return `${name}-${length}-${weight}`;
}
