export function convertNumberToDate(num: number | undefined | null): Date | undefined {
  // 20240718
  if (!num) return undefined
  const stringDate = num.toString()
  const year = parseInt(stringDate.slice(0, 4))
  const month = parseInt(stringDate.slice(4, 6)) - 1
  const day = parseInt(stringDate.slice(6, 8))
  return new Date(year, month, day)
}