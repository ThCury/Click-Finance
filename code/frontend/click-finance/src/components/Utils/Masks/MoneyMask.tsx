export function moneyApplyMask(raw: string): string {
  // só dígitos
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';

  // centavos (sempre 2 últimos)
  const centavos = digits.slice(-2).padStart(2, '0');

  // parte inteira sem zeros à esquerda
  const inteiroRaw = digits.slice(0, -2).replace(/^0+/, '') || '0';

  // milhar
  const inteiroFmt = inteiroRaw.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${inteiroFmt},${centavos}`;
}
