import {
  format,
  formatDistanceToNow as dateFnsFormatDistanceToNow,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cacheTag } from 'next/cache';
import { cacheLife } from 'next/cache';

export function formatDatetime(rawdate: string): string {
  const date = new Date(rawdate);

  return format(date, "dd/MM/yyy 'às' HH'h'mm", {
    locale: ptBR,
  });
}

export async function formatDistanceToNow(rawdate: string): Promise<string> {
  'use cache';
  cacheLife('seconds')
  const date = new Date(rawdate);

  return dateFnsFormatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: false,
  });
}

export function formatHour(timestamp: number): string {
  const date = new Date(timestamp);

  return format(date, 'HH:mm:ss', {
    locale: ptBR,
  });
}

export async function formatHourCached() {
  'use cache';
  cacheLife('seconds');
  cacheTag('formatHourCached');
  return formatHour(Date.now());
}

// export async function generateFullYear() {
//   'use cache'
//   return new Date().getFullYear();
// }
