import icon1 from "../Images/icon1.png";
import icon2 from "../Images/icon2.png";
import icon3 from "../Images/icon3.png";
import icon4 from "../Images/icon4.png";

export const WelcomeStep = ({ onNext }) => {
  const steps = [
    {
      id: 2,
      title: "Choose Your Tasks",
      description: "2",
      icon: <img src={icon2} alt="Select Tasks" width="40" height="40" />,
    },
    {
      id: 3,
      title: "Customize your checklist",
      description: "3",
      icon: (
        <img src={icon3} alt="Customize Checklist" width="40" height="40" />
      ),
    },
    {
      id: 4,
      title: "Download",
      description: "4",
      icon: <img src={icon4} alt="Download Checklist" width="40" height="40" />,
    },
  ];

  return (
    <div className="">
      <div className="">
        <h2 className=" lg:text-[55px] sm:text-[45px] text-[34px] text-center text-[#535252]  font-bold xl:mb-[70px] mb-[50px]">
          How it works
        </h2>

        <div className="grid md:grid-cols-4 md:gap-6 gap-14 ">
          <div className="flex gap-4 justify-between relative flex-col items-center cursor-pointer backdrop-blur-lg rounded-xl pb-10 pt-[80px] lg:px-10 xl:px-[30px] px-5 bg-[#fcf1e6] hover:opacity-[0.7] hover:shadow-xl ease-in-out transition-all duration-500">
            <p className="text-3xl font-semibold text-[#fff] w-full max-w-[70px] xl:max-w-[100px] h-[70px] xl:h-[100px] flex items-center justify-center rounded-full absolute xl:top-[-45px] top-[-25px] left-0 right-0 m-auto ">
              <img src={icon1} alt="Choose Category" width="40" height="40" />
            </p>
            <h3 className="lg:text-[24px] text-[20px] text-center  font-normal text-[#535252]">
              Select a <br /> Checlist <br /> Template
            </h3>
          </div>

          {steps.map((step) => (
            <div
              key={step.id}
              className="flex gap-4 justify-between relative flex-col items-center cursor-pointer backdrop-blur-lg rounded-xl pb-10 pt-[80px] lg:px-10 xl:px-[30px] px-5 bg-[#fcf1e6] hover:opacity-[0.7] hover:shadow-xl ease-in-out transition-all duration-500"
            >
              <p className="text-3xl font-semibold text-[#fff] w-full max-w-[70px] xl:max-w-[100px] h-[70px] xl:h-[100px] flex items-center justify-center rounded-full  absolute xl:top-[-45px] top-[-25px] left-0 right-0 m-auto ">
                <div className="text-[#535252]">{step.icon}</div>
              </p>
              <h3 className="lg:text-[24px] text-[20px] text-center  font-normal text-[#535252]">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onNext}
          className="bg-[#1f7333] text-white font-semibold rounded-[10px] px-14 py-4 text-[26px] hover:bg-[#89c497] transition-colors"
        >
          Start now
        </button>
      </div>
    </div>
  );
};
