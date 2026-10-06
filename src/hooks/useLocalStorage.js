
import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue !== null
        ? JSON.parse(storedValue)
        : initialValue;
    } catch (error) {
      console.error("LocalStorage read error:", error);
      return initialValue;
    }
  });

  // IMPORTANT:
  // When user/key changes, load that user's data
  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      } else {
        setValue(initialValue);
      }
    } catch (error) {
      console.error("LocalStorage load error:", error);
      setValue(initialValue);
    }
  }, [key]);

  // Save current value
  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error("LocalStorage save error:", error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
