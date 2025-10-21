export function splitSecret(secret: string, shares: number, threshold: number): string[] {
  return Array.from({ length: shares }, (_, i) => `${secret}-share-${i + 1}`);
}

export function combineShares(shares: string[]): string {
  return shares[0]?.replace(/-share-.*$/, "") ?? "";
}
