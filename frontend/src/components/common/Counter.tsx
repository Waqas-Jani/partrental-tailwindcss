"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = ({ end = 100, decimals = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // count only once
    threshold: 0.2, // when 20% of element is visible
  });

  return (
    <span 
      ref={ref}
      className="inline-block transition-all duration-500 ease-out"
    >
      {inView ? (
        <CountUp 
          end={end} 
          duration={2.5} 
          decimals={decimals}
          separator=","
          className="font-bold"
        />
      ) : (
        <span className="opacity-50">0</span>
      )}
    </span>
  );
};

export default Counter;
