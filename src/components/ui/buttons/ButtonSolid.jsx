import React from "react";

const ButtonSolid = ({text="Donate now"}) => {
  return (
    <button className="bg-tomato-red hover:bg-white hover:text-tombg-tomato-red border-[1px] border-transparent hover:border-tomato-red transition-all text-white hover:text-tomato-red text-lg max-2xl:text-base font-medium px-7 py-3 max-2xl:px-6 max-2xl:py-[10px] rounded-[4px] max-sm:text-sm">
      {text}
    </button>
  );
};

export default ButtonSolid;
