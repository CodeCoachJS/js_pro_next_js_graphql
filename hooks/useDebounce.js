import { useEffect, useRef, useCallback } from 'react';

/**
 * Debouncing will bunch a series of sequential calls to a function into a single call to that function. It ensures that one notification is made for an event that fires multiple times.
 * @param {function name(params) {
  
 }} callback
 * @param {number} delay - The delay in milliseconds
 * @returns {function} - The debounced function
 */
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
    [delay, callbackRef]
  );
};

export { useDebounce };
