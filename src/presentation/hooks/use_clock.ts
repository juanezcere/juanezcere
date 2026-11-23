import { useEffect, useState } from 'react';
import type { ClockService } from '../../infrastructure/time/clock_service';

export function useClock(clock: ClockService, locale: string): string {
  const [time, setTime] = useState(() => clock.getCurrentTime(locale));

  useEffect(() => {
    const updateTime = () => {
      setTime(clock.getCurrentTime(locale));
    };

    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [clock, locale]);

  return time;
}
