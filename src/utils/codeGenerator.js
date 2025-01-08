// Helper to generate next code in sequence
export function generateNextCode(prefix, existingCodes) {
  if (!existingCodes.length) return `${prefix}001`;
  
  const numbers = existingCodes
    .map(code => parseInt(code.substring(1)))
    .sort((a, b) => b - a);
  
  const nextNumber = numbers[0] + 1;
  return `${prefix}${nextNumber.toString().padStart(3, '0')}`;
}
