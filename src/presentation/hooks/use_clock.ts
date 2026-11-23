import { useCallback, useEffect, useState } from 'react';
import type { ClockService } from '../../infrastructure/time/clock_service';

interface ClockValue {
  readonly time: string;
  readonly date: string;
}

export function useClock(clock: ClockService, locale: string): ClockValue {
  const readClock = useCallback<() => ClockValue>(
    () => ({
      time: clock.getCurrentTime(locale),
      date: clock.getCurrentDate(locale),
    }),
    [clock, locale],
  );

  const [value, setValue] = useState<ClockValue>(readClock);

  useEffect(() => {
    const update = () => {
      setValue(readClock());
    };

    update();
    const intervalId = window.setInterval(update, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [readClock]);

  return value;
}
