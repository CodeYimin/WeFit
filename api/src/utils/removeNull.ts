function removeNull<T>(data: T | null | undefined) {
  if (typeof data === null) return undefined;
  return data;
}
