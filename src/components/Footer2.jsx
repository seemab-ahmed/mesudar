import React from "react";
import { Link } from "react-router-dom";
const Footer2 = () => {
    const footerLinks = [
        {
          title: "Product",
          links: [
            { text: "Gorem ipsum", to: "/" },
            { text: "Forem", to: "/" },
            { text: "Torem", to: "/" },
            { text: "Sorem", to: "/" }
          ]
        },
        {
          title: "S2E",
          links: [
            { text: "Gorem ipsum", to: "/" },
            { text: "Forem", to: "/" },
            { text: "Torem", to: "/" },
            { text: "Sorem", to: "/" }
          ]
        },
        {
          title: "Contact Us",
          links: [
            { text: "Gorem ipsum", to: "/" },
            { text: "Forem", to: "/" },
            { text: "Torem", to: "/" },
            { text: "Sorem", to: "/" }
          ]
        }
      ];
  return (
     <div className="mt-10">
       {/* <div className="bg-slate-700">
        <div className="max-w-[1080px] 2xl:max-w-[1440px] m-auto px-5 ">
                <div className="flex-col justify-center flex md:flex-row items-center gap-6  pt-[66px] pb-[44px]">
                   
                    <div className="md:max-w-[500px] w-full flex flex-col items-center">
                        <div className="flex max-w-[228px] mb-[24px] logo text-[30px] font-bold text-[#fff]">
                        <Link to="/"> MESUDAR</Link>
                        </div>
                        <p className=" text-center text-[16px]  font-normal leading-6 text-[#fff] mb-[24px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.
                        </p>
                        <div className=" flex gap-4 text-sm flex-wrap font-medium text-gray-700">
                            <ul className="m-0 p-0 flex items-center gap-4 ">
                                <li>
                                    
                                    <Link to="/" className="text-[#fff] hover:text-[#13AE8D] transition-all duration-300 ease-in-out">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.5 6.72754H13.5C12.9477 6.72754 12.5 7.17526 12.5 7.72754V10.7275H16.5C16.6137 10.725 16.7216 10.7779 16.7892 10.8694C16.8568 10.9609 16.8758 11.0795 16.84 11.1875L16.1 13.3875C16.0318 13.5894 15.8431 13.7259 15.63 13.7275H12.5V21.2275C12.5 21.5036 12.2761 21.7275 12 21.7275H9.5C9.22386 21.7275 9 21.5036 9 21.2275V13.7275H7.5C7.22386 13.7275 7 13.5036 7 13.2275V11.2275C7 10.9514 7.22386 10.7275 7.5 10.7275H9V7.72754C9 5.5184 10.7909 3.72754 13 3.72754H16.5C16.7761 3.72754 17 3.9514 17 4.22754V6.22754C17 6.50368 16.7761 6.72754 16.5 6.72754Z" fill="currentColor"/>
                                    </svg>

                                </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-[#fff] hover:text-[#13AE8D] transition-all duration-300 ease-in-out">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.99846 3.12793C4.91126 3.12793 2.40002 5.64149 2.40002 8.72949V16.7295C2.40002 19.8167 4.91359 22.3279 8.00159 22.3279H16.0016C19.0888 22.3279 21.6 19.8144 21.6 16.7264V8.72637C21.6 5.63917 19.0865 3.12793 15.9985 3.12793H7.99846ZM17.6 6.32793C18.0416 6.32793 18.4 6.68633 18.4 7.12793C18.4 7.56953 18.0416 7.92793 17.6 7.92793C17.1584 7.92793 16.8 7.56953 16.8 7.12793C16.8 6.68633 17.1584 6.32793 17.6 6.32793ZM12 7.92793C14.6472 7.92793 16.8 10.0807 16.8 12.7279C16.8 15.3751 14.6472 17.5279 12 17.5279C9.35282 17.5279 7.20002 15.3751 7.20002 12.7279C7.20002 10.0807 9.35282 7.92793 12 7.92793ZM12 9.52793C11.1513 9.52793 10.3374 9.86507 9.73728 10.4652C9.13717 11.0653 8.80002 11.8792 8.80002 12.7279C8.80002 13.5766 9.13717 14.3906 9.73728 14.9907C10.3374 15.5908 11.1513 15.9279 12 15.9279C12.8487 15.9279 13.6626 15.5908 14.2628 14.9907C14.8629 14.3906 15.2 13.5766 15.2 12.7279C15.2 11.8792 14.8629 11.0653 14.2628 10.4652C13.6626 9.86507 12.8487 9.52793 12 9.52793Z" fill="currentColor"/>
                                    </svg>

                                </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-[#fff] hover:text-[#13AE8D] transition-all duration-300 ease-in-out">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 3.72754H19C20.1046 3.72754 21 4.62297 21 5.72754V19.7275C21 20.8321 20.1046 21.7275 19 21.7275H5C3.89543 21.7275 3 20.8321 3 19.7275V5.72754C3 4.62297 3.89543 3.72754 5 3.72754ZM8 18.7275C8.27614 18.7275 8.5 18.5036 8.5 18.2275V11.2275C8.5 10.9514 8.27614 10.7275 8 10.7275H6.5C6.22386 10.7275 6 10.9514 6 11.2275V18.2275C6 18.5036 6.22386 18.7275 6.5 18.7275H8ZM7.25 9.72754C6.42157 9.72754 5.75 9.05597 5.75 8.22754C5.75 7.39911 6.42157 6.72754 7.25 6.72754C8.07843 6.72754 8.75 7.39911 8.75 8.22754C8.75 9.05597 8.07843 9.72754 7.25 9.72754ZM17.5 18.7275C17.7761 18.7275 18 18.5036 18 18.2275V13.6275C18.0325 12.0383 16.8576 10.6821 15.28 10.4875C14.177 10.3868 13.1083 10.9019 12.5 11.8275V11.2275C12.5 10.9514 12.2761 10.7275 12 10.7275H10.5C10.2239 10.7275 10 10.9514 10 11.2275V18.2275C10 18.5036 10.2239 18.7275 10.5 18.7275H12C12.2761 18.7275 12.5 18.5036 12.5 18.2275V14.4775C12.5 13.6491 13.1716 12.9775 14 12.9775C14.8284 12.9775 15.5 13.6491 15.5 14.4775V18.2275C15.5 18.5036 15.7239 18.7275 16 18.7275H17.5Z" fill="currentColor"/>
                                    </svg>

                                </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-[#fff] hover:text-[#13AE8D] transition-all duration-300 ease-in-out">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0765 3.72559H12.21C13.443 3.73009 19.6905 3.77509 21.375 4.22809C21.8842 4.36634 22.3483 4.63582 22.7207 5.0096C23.0932 5.38338 23.361 5.84836 23.4975 6.35809C23.649 6.92809 23.7555 7.68259 23.8275 8.46109L23.8425 8.61709L23.8755 9.00709L23.8875 9.16309C23.985 10.5341 23.997 11.8181 23.9985 12.0986V12.2111C23.997 12.5021 23.9835 13.8731 23.8755 15.3011L23.8635 15.4586L23.85 15.6146C23.775 16.4726 23.664 17.3246 23.4975 17.9516C23.3615 18.4615 23.0938 18.9267 22.7212 19.3006C22.3487 19.6744 21.8844 19.9437 21.375 20.0816C19.635 20.5496 13.0215 20.5826 12.105 20.5841H11.892C11.4285 20.5841 9.5115 20.5751 7.5015 20.5061L7.2465 20.4971L7.116 20.4911L6.8595 20.4806L6.603 20.4701C4.938 20.3966 3.3525 20.2781 2.622 20.0801C2.11273 19.9424 1.6486 19.6733 1.27609 19.2997C0.903575 18.9261 0.63577 18.4612 0.4995 17.9516C0.333 17.3261 0.222 16.4726 0.147 15.6146L0.135 15.4571L0.123 15.3011C0.0489714 14.2847 0.0079498 13.2661 0 12.2471L0 12.0626C0.003 11.7401 0.015 10.6256 0.096 9.39559L0.1065 9.24109L0.111 9.16309L0.123 9.00709L0.156 8.61709L0.171 8.46109C0.243 7.68259 0.3495 6.92659 0.501 6.35809C0.63704 5.84816 0.904743 5.38295 1.27727 5.00911C1.6498 4.63527 2.11405 4.36592 2.6235 4.22809C3.354 4.03309 4.9395 3.91309 6.6045 3.83809L6.8595 3.82759L7.1175 3.81859L7.2465 3.81409L7.503 3.80359C8.93056 3.75765 10.3587 3.73215 11.787 3.72709H12.0765V3.72559ZM9.6 8.54059V15.7676L15.8355 12.1556L9.6 8.54059Z" fill="currentColor"/>
                                    </svg>

                                </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-[#fff] hover:text-[#13AE8D] transition-all duration-300 ease-in-out">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.2437 2.97754H21.5531L14.325 11.2369L22.8281 22.4775H16.1719L10.9547 15.6619L4.99216 22.4775H1.6781L9.40779 13.6416L1.25623 2.97754H8.08123L12.7922 9.20723L18.2437 2.97754ZM17.0812 20.4994H18.914L7.08279 4.85254H5.11404L17.0812 20.4994Z" fill="currentColor"/>
                                    </svg>

                                </Link>
                                </li>
                            </ul>
                        </div>
                    
                    </div>

                    Right Column - Links
                    <div className="md:max-w-[532px] w-full justify-between flex md:flex-nowrap flex-wrap gap-4 text-sm text-gray-700">
                        {footerLinks.map((column, index) => (
                        <div key={index}>
                            <h3 className="text-[16px]  leading-6 text-[#1E1E1E] mb-[12px] font-semibold">
                            {column.title}
                            </h3>
                            <ul className="flex flex-col gap-[8px]">
                            {column.links.map((link, index) => (
                                <li key={index}>
                                <Link
                                    to={link.to}
                                    className="text-[16px]  leading-6 text-[#1E1E1E] font-normal"
                                >
                                    {link.text}
                                </Link>
                                </li>
                            ))}
                            </ul>
                        </div>
                        ))}
                    </div> 
                </div>
        </div>

      </div> */}
       <div className="copy-right py-5 border-t bg-[#1f7333] px-4">
                <span className="w-full block text-center text-[14px]  leading-6 text-[#fff] font-normal">Copyright 2025. All Rights Reserved.</span>
            </div>
    </div>
  );
};

export default Footer2;
