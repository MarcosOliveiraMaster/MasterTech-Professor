export function maskTelefone(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 10) return d.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (_, a, b, c) => [a && `(${a})`, b, c && `-${c}`].filter(Boolean).join(' '))
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) => `(${a}) ${b}${c ? `-${c}` : ''}`)
}

export function maskData(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 8)
  return d.replace(/(\d{2})(\d{0,2})(\d{0,4})/, (_, dd, mm, yyyy) => [dd, mm, yyyy].filter(Boolean).join('/'))
}

export function maskCEP(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 8)
  return d.replace(/(\d{5})(\d{0,3})/, (_, a, b) => (b ? `${a}-${b}` : a))
}
