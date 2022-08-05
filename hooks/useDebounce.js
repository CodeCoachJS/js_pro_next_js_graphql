import { useEffect, useRef, useCallback } from 'react';

const useDebounce = (callback, delay) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args) => {
      const handler = setTimeout(() => callbackRef.current(...args), delay);
      return () => clearTimeout(handler);
    },
    [delay]
  );
};

export { useDebounce };
