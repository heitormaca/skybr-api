export function formatFieldErrors(campos: string[]): string {
  if (campos.length === 0) return ''
  if (campos.length === 1) return campos[0]
  if (campos.length === 2) return `${campos[0]} e ${campos[1]}`

  const allButLast = campos.slice(0, -1).join(', ')
  const last = campos[campos.length - 1]
  return `${allButLast} e ${last}`
}
