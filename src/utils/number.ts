export function formatNumber(value: number | string, options?: Intl.NumberFormatOptions) {
  const numberValue = +value
  if (isNaN(numberValue)) return null
  return numberValue.toLocaleString('en-US', {
    maximumFractionDigits: 1,
    ...options,
  })
}

export function formatCompactNumber(value: number | string, minValue?: number, options?: Intl.NumberFormatOptions) {
  const trillion = 1_000_000_000_000,
    billion = 1_000_000_000,
    million = 1_000_000,
    thousand = 1_000

  const numberValue = +value
  if (minValue && numberValue < minValue) return formatNumber(numberValue, options)
  if (numberValue / trillion >= 1) return formatNumber(numberValue / trillion, options) + 'T'
  if (numberValue / billion >= 1) return formatNumber(numberValue / billion, options) + 'B'
  if (numberValue / million >= 1) return formatNumber(numberValue / million, options) + 'M'
  if (numberValue / thousand >= 1) return formatNumber(numberValue / thousand, options) + 'K'
  return formatNumber(numberValue, options)
}
