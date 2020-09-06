import { useState, useEffect } from "react";
import { useViewportScroll } from "framer-motion";

export const useChangeableHtmlBackgroundColors = (
  upperColor: string,
  lowerColor: string,
  thresholdY: number
) => {
  const { scrollY } = useViewportScroll();
  const [currColor, setCurrColor] = useState(upperColor);

  useEffect(() => {
    const updateHtmlBackgroundColor = (y) => {
      if (y < thresholdY && currColor !== upperColor) {
        document.querySelector("html").style.background = upperColor;
        setCurrColor(upperColor);
      }
      if (y > thresholdY && currColor !== lowerColor) {
        document.querySelector("html").style.background = lowerColor;
        setCurrColor(lowerColor);
      }
    };

    const unsubscribe = scrollY.onChange(updateHtmlBackgroundColor);

    return () => {
      unsubscribe();
    };
  }, [currColor, setCurrColor, scrollY, thresholdY, upperColor, lowerColor]);

  return null;
};
