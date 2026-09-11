export const isRelativePathRegex =
  /^\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*(?:\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*)*$/;


export function isUrlOrRelativePath(val: string) {
  try {
    // Tentar criar uma URL válida
    // e se der error tenta um caminho relativo
    new URL(val)
    return true
  } catch {
    return isRelativePathRegex.test(val)
  }
}


