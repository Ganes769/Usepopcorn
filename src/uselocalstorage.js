import { useState, useEffect } from "react";
export function useLocalStoragestate(initialstate, key) {
  const [value, setvalue] = useState(function () {
    const storedvalue = localStorage.getItem("watched");
    return storedvalue ? JSON.parse(storedvalue) : initialstate;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setvalue];
}
