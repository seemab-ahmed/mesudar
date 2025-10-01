import React from "react";

const YellowUnderlineHeading = ({
  children,
  className = "",
  strokeClassName = "",
}) => {
  return (
    <span className={`relative z-[1] ${className}`}>
      {children}
      <span
        className={`absolute -z-[1] left-0 bottom-1 max-lg:bottom-[6px] w-full h-5 max-lg:h-3 bg-banana-yellow ${strokeClassName}`}
      ></span>
    </span>
  );
};

export default YellowUnderlineHeading;
