import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);
  // Remember the latest callback if it changes.

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.

  useEffect(() => {
    if (delay === null) return;
    // Don't schedule if no delay is specified.

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;

// This whole thing is available on the internet, to work around setInterval not working like in vanilla JS.
// Needs more study to understand.
