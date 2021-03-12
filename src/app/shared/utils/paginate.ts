export function paginate<T>(
  items: T[],
  pageNumber: number,
  pageSize: number
): T[] {
  const startingIdx = (pageNumber - 1) * pageSize;
  if (startingIdx < items?.length) {
    return items.slice(startingIdx, startingIdx + pageSize);
  }
}
