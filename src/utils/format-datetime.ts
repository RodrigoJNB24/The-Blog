import {
  format,
  formatDistanceToNow as dateFnsFormatDistanceToNow,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDatetime(rawdate: string): string {
  const date = new Date(rawdate);

  return format(date, "dd/MM/yyy 'às' HH'h'mm", {
    locale: ptBR,
  });
}

export function formatDistanceToNow(rawdate: string): string {
  const date = new Date(rawdate);

  return dateFnsFormatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: false,
  });
}

function formatTime(time: string | Date) {
  const dateTime = typeof time === 'string' ? new Date(time) : time;

  return new Intl.DateTimeFormat('pt-br', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(dateTime)
    .replace(',', '');
}



