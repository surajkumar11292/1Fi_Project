/**
 * ============================================================================
 * USE DEBOUNCE CUSTOM HOOK (hooks/useDebounce.js)
 * ============================================================================
 * Purpose:
 *   Delays updating a state value until a specified delay (default: 400ms)
 *   has elapsed since the last time the value changed.
 *
 * Why Debounce for Search?
 *   Without debouncing, every single keystroke in the search bar triggers an
 *   HTTP request to the backend. With debouncing, if a user types "iphone",
 *   only 1 API request is made instead of 6 separate requests.
 *   This saves network bandwidth, reduces database load, and prevents race conditions.
 * Implementation:
 *   - Utilizes useEffect cleanup returning clearTimeout to cancel pending invocations
 *     on each keystroke until the user pauses typing for the specified delay.
 * ============================================================================
 */

import { useState, useEffect } from 'react';

/**
 * useDebounce Hook:
 * @param {any} value - The input value to debounce (e.g. search string)
 * @param {number} delay - Time in milliseconds to wait before updating debounced value
 * @returns {any} The debounced value
 */
export const useDebounce = (value, delay = 400) => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update debouncedValue after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: runs on every value change or component unmount
    // Cancels the existing timeout if value updates before timer fires
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect only when input value or delay duration changes

  return debouncedValue;
};

export default useDebounce;
