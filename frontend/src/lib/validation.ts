/**
 * Valida se um e-mail é válido.
 * 
 * @param email - O e-mail a ser validado.
 * @returns true se o e-mail for válido, false caso contrário.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}
