import { useEffect, useState } from "react";

export function useIsFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");

    const onChange = () => setFine(mql.matches);
    onChange();

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return fine;
}
