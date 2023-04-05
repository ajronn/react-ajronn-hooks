import { useEffect, useState } from "react";

type PromiseReturning<T> = () => Promise<T>;

/**
 * Polls a promise at regular intervals until a specified condition is met
 * @param promise Promise to be polled
 * @param interval Interval of polling in milliseconds
 * @param condition Function that returns true when polling should stop
 * @returns Object with a data field of type T | null
 */
export const usePolling = <T>(
  promise: PromiseReturning<T>,
  interval: number,
  condition: () => boolean
): { data: T | null } => {
  /** Data from resolved promise */
  const [data, setData] = useState<T | null>(null);

  /** Polling */
  const poll = async () => {
    try {
      const result = await promise();
      setData(result);
    } catch (error) {
      console.error(`Error polling: ${error}`);
    }

    if (!condition()) {
      setTimeout(poll, interval);
    }
  };

  /** Start polling */
  useEffect(() => {
    poll();
  }, []);

  /** Return data */
  return { data };
};
