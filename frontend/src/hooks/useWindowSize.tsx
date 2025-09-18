import { useLayoutEffect, useState } from "react";

export default function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const resizer = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resizer);
    resizer();
    return () => window.removeEventListener("resize", resizer);
  }, []);
  return size;
}
