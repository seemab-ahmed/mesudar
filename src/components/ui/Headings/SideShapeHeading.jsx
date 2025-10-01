import React from "react";
import { red_highlight_sm } from "../../../assets";

const SideShapeHeading = ({
  children,
  className = "",
  headingClassName = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src={red_highlight_sm}
        className="absolute -left-12 -top-8 max-lg:-left-8 max-lg:-top-6 max-lg:max-w-[40px]"
        alt="Highlight_05"
      />
      <h2
        className={`text-5xl font-medium text-dark-navy ${headingClassName}`}
      >
        {children}
      </h2>
    </div>
  );
};

export default SideShapeHeading;
