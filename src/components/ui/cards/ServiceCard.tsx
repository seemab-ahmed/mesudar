import React, { useState } from "react";

const ServiceCard = ({ icon = "", title = "", desc = "" }) => {
  const [expanded, setExpanded] = useState(false);

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    <div
      className="rounded-xl border border-[#B6C2C9] bg-white py-7 px-3 transition-all duration-300 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={icon}
        alt="icon"
        width={64}
        height={64}
        className="mb-4 mx-auto"
      />
      <h3 className="text-dark-navy mb-3 text-2xl max-2xl:text-xl font-medium text-center mx-3 sm:min-h-[70px] flex items-center justify-center">
        {title}
      </h3>
      <div
        className={`relative overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          expanded ? "max-h-[500px]" : "max-h-[96px]"
        }`}
      >
        <p className="text-light-gray text-lg leading-[1.7] text-center max-sm:text-sm max-2xl:text-base">
          {desc}
        </p>
        {!expanded && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent h-8"></div>
        )}
      </div>
      
      {/* {!expanded && ( */}
        <div className={`flex justify-center mt-3 transition-all`}>
          <button 
            className="text-tomato-red font-medium text-sm focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(true);
            }}
          >
            {!expanded ? "Show more" : "Show less"}
            
          </button>
        </div>
      {/* )} */}
    </div>
  );
};

export default ServiceCard;