import { useEffect } from "react";

export function useKeyPress(key, onCallBack) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.code.toLowerCase === key.toLowerCase) onCallBack();
      }

      document.addEventListener("keydown", callBack);

      return () => document.removeEventListener("keydown", callBack);
    },
    [key, onCallBack]
  );
}
