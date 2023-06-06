export const normalizeSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);
