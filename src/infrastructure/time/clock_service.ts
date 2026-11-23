export class ClockService {
  getCurrentTime(locale: string): string {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  }
}
