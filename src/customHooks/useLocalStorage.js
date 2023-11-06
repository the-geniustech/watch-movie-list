import { useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(() => {
    const storeValue = JSON.parse(localStorage.getItem(key));
    return storeValue ? storeValue : initialState;
  });

  useEffect(function () {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return [value, setValue];
}
