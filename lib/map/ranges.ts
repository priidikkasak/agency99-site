export type RangeKey = 'today' | 'yesterday' | '7d' | '30d' | '90d' | 'ytd';

export type RangeDef = { key: RangeKey; label: string };

export const RANGES: RangeDef[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: '7d', label: '7d' },
  { key: '30d', label: '30d' },
  { key: '90d', label: '90d' },
  { key: 'ytd', label: 'YTD' },
];

export const DEFAULT_RANGE: RangeKey = '30d';

export function parseRange(value: string | string[] | undefined): RangeKey {
  const v = Array.isArray(value) ? value[0] : value;
  return RANGES.some((r) => r.key === v) ? (v as RangeKey) : DEFAULT_RANGE;
}

export function rangeToDates(key: RangeKey): { startDate: string; endDate: string } {
  switch (key) {
    case 'today':
      return { startDate: 'today', endDate: 'today' };
    case 'yesterday':
      return { startDate: 'yesterday', endDate: 'yesterday' };
    case '7d':
      return { startDate: '7daysAgo', endDate: 'today' };
    case '30d':
      return { startDate: '30daysAgo', endDate: 'today' };
    case '90d':
      return { startDate: '90daysAgo', endDate: 'today' };
    case 'ytd':
      return { startDate: `${new Date().getUTCFullYear()}-01-01`, endDate: 'today' };
  }
}

export function rangeLabelHuman(key: RangeKey): string {
  switch (key) {
    case 'today':
      return 'today';
    case 'yesterday':
      return 'yesterday';
    case '7d':
      return 'last 7 days';
    case '30d':
      return 'last 30 days';
    case '90d':
      return 'last 90 days';
    case 'ytd':
      return 'year to date';
  }
}
